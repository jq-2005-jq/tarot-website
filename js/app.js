// ==================== 塔罗占卜 — 多牌阵自选 + 智能解读 ====================
document.addEventListener("DOMContentLoaded", () => {
  initParticles();
  initTarotSymbols();
  initConstellation();
  preloadImages();

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

  // WebLLM
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

  // ==================== 塔罗元素浮动符号 ====================
  function initTarotSymbols() {
    const container = document.getElementById("tarot-symbols");
    if (!container) return;
    const symbols = [
      { char: "✧", color: "#c9a84c" },  // 神秘之星
      { char: "☽", color: "#e4c76b" },  // 新月
      { char: "☉", color: "#f5deb3" },  // 太阳
      { char: "⚔", color: "#9b6fd4" },  // 宝剑
      { char: "🜁", color: "#e0d8f0" },  // 权杖/风
      { char: "🜄", color: "#7eb8da" },  // 圣杯/水
      { char: "⛧", color: "#c9a84c" },  // 五角星
      { char: "◈", color: "#b8a0e0" },  // 钻石/星币
      { char: "☿", color: "#9088a0" },  // 水星/魔术师
      { char: "♃", color: "#e4c76b" },  // 木星/命运之轮
      { char: "□", color: "#9088a0" },  // 星币轮廓
      { char: "△", color: "#9b6fd4" },  // 宝剑三角
    ];
    symbols.forEach((sym, i) => {
      const el = document.createElement("span");
      el.className = "tarot-sym";
      el.textContent = sym.char;
      el.style.color = sym.color;
      el.style.left = (5 + Math.random() * 90) + "%";
      el.style.top = (5 + Math.random() * 90) + "%";
      el.style.animationDuration = (10 + Math.random() * 14) + "s";
      el.style.animationDelay = (Math.random() * 10) + "s";
      el.style.fontSize = (1 + Math.random() * 2.2) + "rem";
      container.appendChild(el);
    });
  }

  // ==================== 星座连线 ====================
  function initConstellation() {
    const container = document.getElementById("constellation");
    if (!container) return;
    // 在几个"锚点星"之间画淡色连线
    const anchors = [
      { x: 8, y: 12 }, { x: 25, y: 22 }, { x: 48, y: 10 },
      { x: 60, y: 18 }, { x: 82, y: 25 }, { x: 92, y: 32 },
      { x: 15, y: 40 }, { x: 28, y: 50 }, { x: 45, y: 55 },
      { x: 62, y: 48 }, { x: 78, y: 42 }, { x: 85, y: 42 },
      { x: 5, y: 65 }, { x: 22, y: 72 }, { x: 52, y: 75 },
      { x: 68, y: 70 }, { x: 80, y: 78 }
    ];
    // Draw lines between nearby anchors
    const lines = [
      [0,1],[1,2],[2,3],[3,4],[4,5],
      [6,7],[7,8],[8,9],[9,10],[10,11],
      [12,13],[13,14],[14,15],[15,16],
      [0,6],[1,7],[2,8],[3,9],[4,10],
      [6,12],[7,13],[8,14],[9,15],[10,16]
    ];
    lines.forEach(([a, b]) => {
      if (a >= anchors.length || b >= anchors.length) return;
      const ax = anchors[a].x, ay = anchors[a].y;
      const bx = anchors[b].x, by = anchors[b].y;
      const dx = bx - ax, dy = by - ay;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      const line = document.createElement("div");
      line.className = "constellation-line";
      line.style.left = ax + "%";
      line.style.top = ay + "%";
      line.style.width = length + "vh";
      line.style.transform = `rotate(${angle}deg)`;
      line.style.animationDelay = (Math.random() * 5) + "s";
      container.appendChild(line);
    });
  }

  // ==================== 图片预加载 ====================
  function preloadImages() {
    // 页面空闲时预加载所有本地卡牌图片，确保抽牌时图片已在缓存
    const keys = TAROT_CARDS.map(c => c.key);
    let idx = 0;
    function loadBatch() {
      const batch = keys.slice(idx, idx + 15);
      batch.forEach(key => {
        const img = new Image();
        img.src = getCardImage(key);
      });
      idx += 15;
      if (idx < keys.length) {
        // 使用 requestIdleCallback 在浏览器空闲时加载，不阻塞交互
        if (window.requestIdleCallback) {
          requestIdleCallback(loadBatch);
        } else {
          setTimeout(loadBatch, 150);
        }
      }
    }
    if (window.requestIdleCallback) {
      requestIdleCallback(loadBatch);
    } else {
      setTimeout(loadBatch, 800);
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

    const pool = [...TAROT_CARDS];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    drawnCards = pool.slice(0, totalCards).map(card => ({
      card,
      isReversed: Math.random() < 0.5
    }));

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
            <img class="card-img" src="${getCardImage(data.card.key)}" alt="${data.card.name}" loading="eager" />
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

    // 立即展示规则引擎综合解读
    showInstantReading(spread);

    // 后台尝试 WebLLM AI，成功则替换
    tryWebLLM(spread);
  }

  // ==================== 即时综合解读（规则引擎） ====================
  function showInstantReading(spread) {
    const synthesis = buildSynthesis(spread);
    aiReading.classList.remove("hidden");
    aiReading.innerHTML = `
      <div class="ai-reading-header">
        <span class="ai-icon">✨</span>
        <span class="ai-title">综合分析</span>
      </div>
      <div class="ai-reading-body">${synthesis}</div>
    `;
  }

  function buildSynthesis(spread) {
    const question = questionInput.value.trim();
    const cards = drawnCards.map((d, i) => ({
      ...d,
      position: spread.positions[i]
    }));

    const majorCount = cards.filter(c => c.card.type === "major").length;
    const reversedCount = cards.filter(c => c.isReversed).length;
    const suits = {};
    cards.forEach(c => {
      if (c.card.suit) suits[c.card.suit] = (suits[c.card.suit] || 0) + 1;
    });

    const paragraphs = [];

    // 开场
    if (question) {
      paragraphs.push(`<p>关于你提出的「<strong>${question}</strong>」，牌面给出了以下启示。</p>`);
    } else if (totalCards === 1) {
      paragraphs.push(`<p>你抽到的这张牌，是宇宙此刻给你的核心讯息。</p>`);
    } else {
      paragraphs.push(`<p>${spread.name}已然展开。${totalCards}张牌的排列，构成了一幅完整的能量画卷。</p>`);
    }

    // 大牌占比分析
    if (majorCount === totalCards && totalCards > 1) {
      paragraphs.push(`<p>所有牌面均为<strong>大阿尔卡纳</strong>，这是一个极为强烈的信号——你正站在人生的重要十字路口。宇宙不是在轻声低语，而是在对你呐喊。这些原型力量汇聚在一起，预示着一场深层次的灵魂蜕变正在发生。</p>`);
    } else if (majorCount >= totalCards * 0.6 && totalCards > 1) {
      paragraphs.push(`<p>大阿尔卡纳在牌阵中占据了主导地位，这意味当前的议题<strong>超越了日常琐事</strong>，触及到你生命更深层的脉络。这是一个需要你拿出勇气与智慧的时刻。</p>`);
    }

    // 逆位分析
    if (reversedCount === totalCards && totalCards > 1) {
      paragraphs.push(`<p>所有牌面以逆位呈现，这并非凶兆，而是在强烈提醒：<strong>某些内在的课题已经到了必须面对的时刻</strong>。逆位的能量像是被按下的弹簧——一旦你正视它的源头，释放出来的力量将超乎想象。</p>`);
    } else if (reversedCount > 0) {
      const revNames = cards.filter(c => c.isReversed).map(c => c.card.name).join("、");
      paragraphs.push(`<p>${revNames} 以<strong>逆位</strong>出现，提示这些领域的能量尚在酝酿或受阻。逆位是一面诚实的镜子，邀请你看见那些被忽略的内在真相。</p>`);
    } else if (totalCards > 1) {
      paragraphs.push(`<p>所有牌面以<strong>正位</strong>展现，能量流通顺畅。当下的你处于一个意识清明、行动有力的阶段，宇宙的力量在支撑着你的每一步。</p>`);
    }

    // 牌面串联解读
    const cardPhrases = cards.map((c, i) => {
      const prefix = c.isReversed ? "逆位提醒" : "正位预示";
      return `<strong>${c.position.label}</strong>的<em>${c.card.name}</em>${prefix}着：${c.isReversed ? c.card.rev_meaning : c.card.up_meaning}`;
    });
    paragraphs.push(`<p>将这${totalCards}张牌串联起来，一条清晰的线索浮现了出来：${cardPhrases.join("；")}。这些牌面彼此呼应，共同编织出一个完整的故事。</p>`);

    // 同花色强化解读
    const dominantSuit = Object.entries(suits).find(([, count]) => count >= 2);
    if (dominantSuit) {
      const suitInsights = {
        "权杖": "值得一提的是，<strong>权杖</strong>的能量在牌阵中反复出现，🔥 行动、激情与创造力是贯穿全局的主旋律。你需要信任自己的内在火焰，大胆迈出第一步——世界会为勇敢者让路。",
        "圣杯": "值得关注的是，<strong>圣杯</strong>的反复到场将焦点坚定地指向了情感与人际的世界。💧 此刻你最需要的不是理性的分析，而是倾听内心真实的声音，允许情绪的潮汐自然流动。",
        "宝剑": "引人注目的是，<strong>宝剑</strong>的能量贯穿了整个牌阵。⚔️ 思维、沟通与真相是你当下无法绕开的课题。理性是你的利刃，但也请当心——这把剑既能切开迷雾，也可能在不经意间划伤自己和他人。",
        "星币": "需要特别指出的是，<strong>星币</strong>的集中出现牢牢锚定了物质与现实的主题。🪙 这是一个用务实态度深耕细作的时期——无论是工作、财务还是健康，耐心与坚持终将铸就丰硕的果实。"
      };
      if (suitInsights[dominantSuit[0]]) {
        paragraphs.push(`<p>${suitInsights[dominantSuit[0]]}</p>`);
      }
    }

    // 针对性建议
    if (question) {
      paragraphs.push(`<p>回到你最初的问题——牌面给出的答案已经蕴含在上述图景之中。塔罗不会替你做出选择，但它为你照亮了前行的路。接下来的行动，由你来书写。</p>`);
    } else {
      paragraphs.push(`<p>记住：塔罗牌从不是关于无法更改的宿命，它只是一面<strong>映照当下的灵性之镜</strong>。每一张牌上的讯息，都是你内在智慧的投射。带着这份觉察回归日常，你会发现——答案，一直都在你自己手中。</p>`);
    }

    return paragraphs.join("");
  }

  // ==================== WebLLM 后台尝试 ====================
  async function tryWebLLM(spread) {
    if (!navigator.gpu) return;

    try {
      const engine = await getAIEngine();
      const userQuestion = questionInput.value.trim();
      const cardDescriptions = drawnCards.map((data, i) => {
        const { card, isReversed } = data;
        const pos = spread.positions[i];
        return `【${pos.label}】${card.name}（${isReversed ? '逆位' : '正位'}）：${isReversed ? card.rev_meaning : card.up_meaning}`;
      }).join("\n");

      const systemPrompt = "你是一位资深塔罗解读师，博学、温暖、富有洞察力。请根据牌阵给出一段 150-250 字的综合分析。将各张牌串联成完整故事，指出牌与牌的关系和整体趋势。语气像真正的塔罗师在说话。用中文回复，不用markdown。";
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
      const paragraphs = aiText.split("\n\n").filter(p => p.trim()).map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("");

      // 替换为 AI 增强版
      aiReading.innerHTML = `
        <div class="ai-reading-header">
          <span class="ai-icon">✨</span>
          <span class="ai-title">AI 深度解读</span>
        </div>
        <div class="ai-reading-body">${paragraphs}</div>
      `;
    } catch (error) {
      // 静默失败 — 即时综合解读已经显示了
      console.log("WebLLM unavailable, using instant synthesis:", error.message);
    }
  }

  // ==================== WebLLM 引擎 ====================
  async function getAIEngine() {
    if (mlcEngine && aiReady) return mlcEngine;
    if (aiInitPromise) return aiInitPromise;

    aiInitPromise = (async () => {
      const { CreateMLCEngine } = await import("https://esm.sh/@mlc-ai/web-llm@0.2.83");
      mlcEngine = await CreateMLCEngine("Qwen2.5-1.5B-Instruct-q4f32_1-MLC", {
        initProgressCallback: () => {} // 静默加载，不显示进度
      });
      aiReady = true;
      return mlcEngine;
    })();

    return aiInitPromise;
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
