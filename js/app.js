// ==================== 塔罗占卜 — 多牌阵自选 + 浏览器AI解读 ====================
document.addEventListener("DOMContentLoaded", () => {
  // 浮动粒子背景
  initParticles();

  // DOM refs
  const spreadCards = document.getElementById("spread-cards");
  const drawBtn = document.getElementById("draw-btn");
  const spreadSection = document.getElementById("spread-section");
  const cardsSection = document.getElementById("cards-section");
  const cardsRow = document.getElementById("cards-row");
  const readingSection = document.getElementById("reading-section");
  const readingContent = document.getElementById("reading-content");
  const aiReading = document.getElementById("ai-reading");
  const reshuffleBtn = document.getElementById("reshuffle-btn");
  const flipHint = document.querySelector(".flip-hint");
  const questionInput = document.getElementById("question-input");

  let currentSpread = "three";
  let drawnCards = [];
  let flippedCount = 0;
  let totalCards = 3;

  // WebLLM engine (lazy init)
  let mlcEngine = null;
  let aiInitPromise = null;
  let aiReady = false;

  // ==================== 浮动粒子 ====================
  function initParticles() {
    const container = document.getElementById("particles");
    if (!container) return;
    for (let i = 0; i < 25; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      const size = Math.random() * 3 + 1;
      p.style.width = size + "px";
      p.style.height = size + "px";
      p.style.left = Math.random() * 100 + "%";
      p.style.top = (60 + Math.random() * 40) + "%";
      p.style.animationDuration = (6 + Math.random() * 10) + "s";
      p.style.animationDelay = (Math.random() * 8) + "s";
      if (Math.random() > 0.5) p.style.background = "var(--gold-light)";
      container.appendChild(p);
    }
  }

  // ==================== 牌阵选择 ====================
  spreadCards.addEventListener("click", (e) => {
    const btn = e.target.closest(".spread-option");
    if (!btn) return;
    spreadCards.querySelectorAll(".spread-option").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentSpread = btn.dataset.spread;
  });

  // ==================== 洗牌 & 抽牌 ====================
  drawBtn.addEventListener("click", () => {
    const spread = SPREADS[currentSpread];
    totalCards = spread.count;

    // Fisher-Yates shuffle, pick required count
    const pool = [...TAROT_CARDS];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    drawnCards = pool.slice(0, totalCards).map(card => ({
      card,
      isReversed: Math.random() < 0.5
    }));

    // Build card slots dynamically
    cardsRow.innerHTML = "";
    spread.positions.forEach((pos, i) => {
      const data = drawnCards[i];
      const slot = document.createElement("div");
      slot.className = "card-slot";
      if (data.isReversed) slot.classList.add("reversed");
      slot.dataset.index = i;
      slot.innerHTML = `
        <div class="card-inner">
          <div class="card-back">
            <div class="card-back-pattern">✦</div>
          </div>
          <div class="card-face">
            <img class="card-img" src="${getCardImage(data.card.key)}" alt="${data.card.name}" />
            <div class="card-name">${data.card.name}</div>
            <div class="card-keywords">${data.isReversed ? data.card.rev_keywords : data.card.up_keywords}</div>
            <span class="card-orientation ${data.isReversed ? 'reversed' : 'upright'}">${data.isReversed ? '逆位' : '正位'}</span>
          </div>
        </div>
        <div class="position-label">${pos.label}</div>
      `;
      const img = slot.querySelector(".card-img");
      img.onerror = () => { slot.classList.add("img-fallback"); };
      cardsRow.appendChild(slot);
    });

    spreadSection.classList.add("hidden");
    cardsSection.classList.remove("hidden");
    readingSection.classList.add("hidden");
    readingContent.innerHTML = "";
    aiReading.classList.add("hidden");
    aiReading.innerHTML = "";
    flippedCount = 0;
    flipHint.style.display = "";

    cardsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // ==================== 翻牌 ====================
  cardsRow.addEventListener("click", (e) => {
    const slot = e.target.closest(".card-slot");
    if (!slot || slot.classList.contains("flipped")) return;

    slot.classList.add("flipped");
    flippedCount++;

    if (flippedCount === totalCards) {
      flipHint.style.display = "none";
      setTimeout(showReading, 600);
    }
  });

  // ==================== 生成解读 ====================
  function showReading() {
    const spread = SPREADS[currentSpread];
    let html = `<div class="reading-summary"><span class="spread-name-tag">${spread.name}</span></div>`;

    drawnCards.forEach((data, i) => {
      const { card, isReversed } = data;
      const pos = spread.positions[i];
      html += `
        <div class="reading-card">
          <div class="rc-header">
            <span class="rc-position">${pos.label} · ${pos.desc}</span>
            <span class="rc-name">${card.name}</span>
            <span class="rc-orient" style="color:${isReversed ? '#e07070' : '#7ec78e'}">${isReversed ? '▼ 逆位' : '▲ 正位'}</span>
          </div>
          <p class="rc-meaning">${isReversed ? card.rev_meaning : card.up_meaning}</p>
        </div>`;
    });

    readingContent.innerHTML = html;
    readingSection.classList.remove("hidden");
    readingSection.scrollIntoView({ behavior: "smooth", block: "start" });

    // 启动 AI 解读
    requestAIReading(spread);
  }

  // ==================== AI 解读 (WebLLM) ====================
  async function requestAIReading(spread) {
    aiReading.classList.remove("hidden");

    // 检查 WebGPU 支持
    if (!navigator.gpu) {
      aiReading.innerHTML = `
        <div class="ai-reading-header">
          <span class="ai-icon">✨</span>
          <span class="ai-title">AI 综合分析</span>
        </div>
        <div class="ai-unsupported">
          你的浏览器暂不支持本地AI。<br>
          请使用 <strong>Chrome 113+</strong> 或 <strong>Edge 113+</strong> 访问即可启用此功能。
        </div>`;
      return;
    }

    // 显示初始状态
    aiReading.innerHTML = `
      <div class="ai-reading-header">
        <span class="ai-icon">✨</span>
        <span class="ai-title">AI 综合分析</span>
      </div>
      <div id="ai-progress-area" class="ai-progress">
        <div class="ai-progress-text">正在准备AI模型...</div>
        <div class="ai-progress-bar"><div class="ai-progress-fill" style="width:0%"></div></div>
      </div>
    `;

    try {
      // 初始化引擎（如果不是第一次，会从缓存快速加载）
      const engine = await getAIEngine();
      const progressArea = document.getElementById("ai-progress-area");
      if (progressArea) {
        progressArea.innerHTML = `
          <div class="ai-loading">
            <div class="ai-loading-dots"><span></span><span></span><span></span></div>
            <span>AI 正在解读牌面...</span>
          </div>`;
      }

      // 构建提示词
      const userQuestion = questionInput.value.trim();
      const cardDescriptions = drawnCards.map((data, i) => {
        const { card, isReversed } = data;
        const pos = spread.positions[i];
        return `【${pos.label}】${card.name}（${isReversed ? '逆位' : '正位'}）：${isReversed ? card.rev_meaning : card.up_meaning}`;
      }).join("\n");

      const systemPrompt = `你是一位资深塔罗解读师，博学、温暖、富有洞察力。请根据抽到的牌阵给用户一段 150-250 字的综合分析。将各张牌串联成完整故事，指出牌与牌的关联和整体趋势。语气像真正的塔罗师在说话——自然、有深度、给出实用建议。用中文回复，不要使用markdown格式。`;
      const userPrompt = `牌阵：${spread.name}\n${userQuestion ? `问题：${userQuestion}\n` : ""}\n抽牌结果：\n${cardDescriptions}\n\n请给出综合分析：`;

      const reply = await engine.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        max_tokens: 500,
        temperature: 0.8
      });

      const aiText = reply.choices[0].message.content;

      const paragraphs = aiText
        .split("\n\n")
        .filter(p => p.trim())
        .map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`)
        .join("");

      aiReading.innerHTML = `
        <div class="ai-reading-header">
          <span class="ai-icon">✨</span>
          <span class="ai-title">AI 综合分析</span>
        </div>
        <div class="ai-reading-body">${paragraphs}</div>
      `;
    } catch (error) {
      console.error("AI reading error:", error);
      // WebLLM 加载失败时，使用规则引擎兜底
      const fallback = generateFallbackReading(spread);
      aiReading.innerHTML = `
        <div class="ai-reading-header">
          <span class="ai-icon">✨</span>
          <span class="ai-title">综合分析</span>
        </div>
        <div class="ai-reading-body">${fallback}</div>
      `;
    }
  }

  // ==================== 规则引擎兜底 — 卡牌综合解读 ====================
  function generateFallbackReading(spread) {
    const question = questionInput.value.trim();
    const cards = drawnCards.map((d, i) => ({
      ...d,
      position: spread.positions[i]
    }));

    // 统计
    const majorCount = cards.filter(c => c.card.type === "major").length;
    const reversedCount = cards.filter(c => c.isReversed).length;
    const suits = {};
    cards.forEach(c => {
      if (c.card.suit) {
        suits[c.card.suit] = (suits[c.card.suit] || 0) + 1;
      }
    });

    const paragraphs = [];

    // 开场
    if (question) {
      paragraphs.push(`<p>关于你提出的「${question}」，牌面给出了以下启示。</p>`);
    } else {
      paragraphs.push(`<p>牌阵已为你展开。${spread.name}揭示了如下的能量图景。</p>`);
    }

    // 大牌占比
    if (majorCount >= totalCards * 0.6 && totalCards > 1) {
      paragraphs.push(`<p>本次抽牌中大阿尔卡纳占据了主导地位，这意味着你正处在一个<strong>重要的生命转折点</strong>。命运的力量正在运作，每一个选择都将对未来产生深远影响。不要轻视这些信号——它们是你灵魂成长的契机。</p>`);
    }

    // 逆位分析
    if (reversedCount > 0) {
      const revNames = cards.filter(c => c.isReversed).map(c => c.card.name).join("、");
      paragraphs.push(`<p>${revNames} 以逆位出现，提示你在相关领域存在<strong>内在阻塞或未完成的课题</strong>。逆位并非凶兆，而是一面镜子，邀请你正视被忽略的阴影面，从中找到突破的力量。</p>`);
    } else if (totalCards > 1) {
      paragraphs.push(`<p>全部牌面以正位展现，能量流动顺畅。你正处于一个<strong>意识清晰、行动有力</strong>的阶段，宇宙在支持你前进的每一步。</p>`);
    }

    // 牌面串联
    const cardPhrases = cards.map((c, i) => {
      const orient = c.isReversed ? "逆位提醒" : "正位昭示";
      return `<strong>${c.position.label}</strong>的 ${c.card.name} ${orient}：${c.isReversed ? c.card.rev_meaning : c.card.up_meaning}`;
    });
    paragraphs.push(`<p>将这 ${totalCards} 张牌串联起来看：${cardPhrases.join("；")}。</p>`);

    // 同花色提示
    const dominantSuit = Object.entries(suits).find(([, count]) => count >= 2);
    if (dominantSuit) {
      const suitInsights = {
        "权杖": "权杖的能量反复出现，说明<strong>行动与激情</strong>是当前的核心主题。你需要关注自己的内在动力，勇敢地迈出步伐，不要被迟疑所困。",
        "圣杯": "圣杯的多次出现将焦点引向<strong>情感与关系</strong>的世界。此刻你需要倾听内心的声音，关注那些被表面掩盖的真实感受。",
        "宝剑": "宝剑的反复到场提示<strong>思维与沟通</strong>是当下的关键课题。理性是你的利刃，但也要注意锋芒不要伤害到自己或身边的人。",
        "星币": "星币的集中出现指向<strong>物质与现实</strong>的领域。现在是用务实态度处理工作、财务和生活根基的时候，耐心耕耘终将有收获。"
      };
      if (suitInsights[dominantSuit[0]]) {
        paragraphs.push(`<p>${suitInsights[dominantSuit[0]]}</p>`);
      }
    }

    // 结尾建议
    paragraphs.push(`<p>最后，请记住：塔罗牌给出的从来不是注定的命运，而是一张<strong>当下的能量地图</strong>。你所看到的每一张牌，都是你内心早已存在的智慧在外界的投射。带着这份觉察回到生活中，你会发现答案一直在你手中。</p>`);

    return paragraphs.join("");
  }

  // ==================== WebLLM 引擎初始化 ====================
  async function getAIEngine() {
    if (mlcEngine && aiReady) return mlcEngine;

    // 避免重复初始化
    if (aiInitPromise) return aiInitPromise;

    aiInitPromise = (async () => {
      const { CreateMLCEngine } = await import("https://esm.sh/@mlc-ai/web-llm@0.2.83");

      mlcEngine = await CreateMLCEngine(
        "Qwen2.5-1.5B-Instruct-q4f32_1-MLC",
        {
          initProgressCallback: (report) => {
            const progressArea = document.getElementById("ai-progress-area");
            if (!progressArea) return;
            const pct = Math.round(report.progress * 100);
            let statusText = "正在准备AI模型...";
            if (report.text) {
              if (report.text.includes("Loading")) statusText = "正在加载模型...";
              else if (report.text.includes("Download")) statusText = `正在下载AI模型（首次使用）... ${pct}%`;
              else if (report.text.includes("Compiling")) statusText = "正在编译模型...";
            }
            progressArea.innerHTML = `
              <div class="ai-progress-text">${statusText}</div>
              <div class="ai-progress-bar"><div class="ai-progress-fill" style="width:${pct}%"></div></div>
            `;
          }
        }
      );

      aiReady = true;
      return mlcEngine;
    })();

    return aiInitPromise;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // ==================== 重新选择牌阵 ====================
  reshuffleBtn.addEventListener("click", () => {
    cardsSection.classList.add("hidden");
    readingSection.classList.add("hidden");
    spreadSection.classList.remove("hidden");
    readingContent.innerHTML = "";
    aiReading.classList.add("hidden");
    aiReading.innerHTML = "";
    flippedCount = 0;
    cardsRow.innerHTML = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
