// ==================== 塔罗占卜 — 多牌阵自选 + AI 解读 ====================
document.addEventListener("DOMContentLoaded", () => {
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

  // API key modal
  const apiModal = document.getElementById("api-modal");
  const apiKeyInput = document.getElementById("api-key-input");
  const apiSaveBtn = document.getElementById("api-save-btn");
  const apiSkipBtn = document.getElementById("api-skip-btn");
  const apiSettingsBtn = document.getElementById("api-settings-btn");

  let currentSpread = "three";
  let drawnCards = [];
  let flippedCount = 0;
  let totalCards = 3;
  let apiKey = localStorage.getItem("tarot_anthropic_key") || "";

  // ==================== API Key 管理 ====================
  if (apiKey) {
    apiSettingsBtn.classList.add("has-key");
    apiSettingsBtn.title = "AI 解读已配置，点击更换 Key";
  }

  function openApiModal() {
    apiKeyInput.value = apiKey;
    apiModal.classList.remove("hidden");
    apiKeyInput.focus();
  }
  function closeApiModal() { apiModal.classList.add("hidden"); }

  apiSettingsBtn.addEventListener("click", openApiModal);
  apiSkipBtn.addEventListener("click", closeApiModal);
  apiModal.querySelector(".api-modal-overlay").addEventListener("click", closeApiModal);

  apiSaveBtn.addEventListener("click", () => {
    const val = apiKeyInput.value.trim();
    if (val) {
      apiKey = val;
      localStorage.setItem("tarot_anthropic_key", apiKey);
      apiSettingsBtn.classList.add("has-key");
      apiSettingsBtn.title = "AI 解读已配置，点击更换 Key";
    } else {
      apiKey = "";
      localStorage.removeItem("tarot_anthropic_key");
      apiSettingsBtn.classList.remove("has-key");
      apiSettingsBtn.title = "AI 解读设置";
    }
    closeApiModal();
  });

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

    // 如果配置了 API Key，调用 AI 解读
    if (apiKey) {
      requestAIReading(spread);
    }
  }

  // ==================== AI 解读 ====================
  async function requestAIReading(spread) {
    aiReading.classList.remove("hidden");
    aiReading.innerHTML = `
      <div class="ai-reading-header">
        <span class="ai-icon">✨</span>
        <span class="ai-title">AI 综合分析中...</span>
      </div>
      <div class="ai-loading">
        <div class="ai-loading-dots"><span></span><span></span><span></span></div>
        <span>正在解读牌面关联与深层含义</span>
      </div>
    `;

    try {
      const userQuestion = questionInput.value.trim();
      const cardDescriptions = drawnCards.map((data, i) => {
        const { card, isReversed } = data;
        const pos = spread.positions[i];
        return `【${pos.label} — ${pos.desc}】${card.name}（${isReversed ? '逆位' : '正位'}）：${isReversed ? card.rev_meaning : card.up_meaning}`;
      }).join("\n");

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json"
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 800,
          messages: [{
            role: "user",
            content: `你是一位资深塔罗解读师。请根据以下塔罗牌阵信息，给出一段 150-250 字的综合分析解读。要求：自然流畅，像一位真正的塔罗师在说话；将各张牌的含义串联成一个完整的故事，指出牌与牌之间的关联和整体趋势；用温暖、有洞察力的语气，给出实用建议。${userQuestion ? `\n问卜者的问题：${userQuestion}` : ""}\n\n牌阵类型：${spread.name}\n\n抽牌结果：\n${cardDescriptions}`
          }]
        })
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `API 请求失败 (${response.status})`);
      }

      const data = await response.json();
      const aiText = data.content[0].text;

      // 将 markdown 换行转为 HTML 段落
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
      aiReading.innerHTML = `
        <div class="ai-reading-header">
          <span class="ai-icon">✨</span>
          <span class="ai-title">AI 综合分析</span>
        </div>
        <div class="ai-error">${escapeHtml(error.message)}</div>
      `;
    }
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

  // ==================== 键盘快捷键 ====================
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeApiModal();
  });
});
