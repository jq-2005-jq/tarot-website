// ==================== 塔罗占卜 — 多牌阵自选 ====================
document.addEventListener("DOMContentLoaded", () => {
  const spreadCards = document.getElementById("spread-cards");
  const drawBtn = document.getElementById("draw-btn");
  const spreadSection = document.getElementById("spread-section");
  const cardsSection = document.getElementById("cards-section");
  const cardsRow = document.getElementById("cards-row");
  const readingSection = document.getElementById("reading-section");
  const readingContent = document.getElementById("reading-content");
  const reshuffleBtn = document.getElementById("reshuffle-btn");
  const flipHint = document.querySelector(".flip-hint");

  let currentSpread = "three";   // 默认三张牌阵
  let drawnCards = [];           // [{ card, isReversed }]
  let flippedCount = 0;
  let totalCards = 3;

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
      // Image error fallback
      const img = slot.querySelector(".card-img");
      img.onerror = () => { slot.classList.add("img-fallback"); };
      cardsRow.appendChild(slot);
    });

    // Show cards, hide selector
    spreadSection.classList.add("hidden");
    cardsSection.classList.remove("hidden");
    readingSection.classList.add("hidden");
    readingContent.innerHTML = "";
    flippedCount = 0;
    flipHint.style.display = "";

    // Scroll to cards
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
  }

  // ==================== 重新选择牌阵 ====================
  reshuffleBtn.addEventListener("click", () => {
    cardsSection.classList.add("hidden");
    readingSection.classList.add("hidden");
    spreadSection.classList.remove("hidden");
    readingContent.innerHTML = "";
    flippedCount = 0;
    cardsRow.innerHTML = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
