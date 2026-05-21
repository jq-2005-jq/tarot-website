// ==================== 塔罗三张牌阵 — 游戏逻辑 ====================
document.addEventListener("DOMContentLoaded", () => {
  const drawBtn = document.getElementById("draw-btn");
  const drawSection = document.getElementById("draw-section");
  const cardsSection = document.getElementById("cards-section");
  const readingSection = document.getElementById("reading-section");
  const readingContent = document.getElementById("reading-content");
  const reshuffleBtn = document.getElementById("reshuffle-btn");
  const flipHint = document.querySelector(".flip-hint");

  let drawnCards = [];        // { card, isReversed }
  let flippedCount = 0;

  // ==================== 洗牌 & 抽牌 ====================
  drawBtn.addEventListener("click", () => {
    // Fisher-Yates shuffle, pick first 3
    const pool = [...TAROT_CARDS];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    drawnCards = pool.slice(0, 3).map(card => ({
      card,
      isReversed: Math.random() < 0.5
    }));

    // Populate card slots
    const slots = document.querySelectorAll(".card-slot");
    slots.forEach((slot, i) => {
      const data = drawnCards[i];
      const face = slot.querySelector(".card-face");
      const img = face.querySelector(".card-img");
      img.src = getCardImage(data.card.key);
      img.alt = data.card.name;
      img.onerror = () => { slot.classList.add("img-fallback"); };
      face.querySelector(".card-name").textContent = data.card.name;
      face.querySelector(".card-keywords").textContent =
        data.isReversed ? data.card.rev_keywords : data.card.up_keywords;

      const orient = face.querySelector(".card-orientation");
      orient.textContent = data.isReversed ? "逆位" : "正位";
      orient.className = "card-orientation " + (data.isReversed ? "reversed" : "upright");

      slot.classList.remove("flipped", "reversed");
      if (data.isReversed) slot.classList.add("reversed");
    });

    // Show cards section
    drawSection.classList.add("hidden");
    cardsSection.classList.remove("hidden");
    readingSection.classList.add("hidden");
    readingContent.innerHTML = "";
    flippedCount = 0;
    flipHint.style.display = "";
  });

  // ==================== 翻牌 ====================
  document.querySelector(".cards-row").addEventListener("click", (e) => {
    const slot = e.target.closest(".card-slot");
    if (!slot || slot.classList.contains("flipped")) return;

    slot.classList.add("flipped");
    flippedCount++;

    if (flippedCount === 3) {
      flipHint.style.display = "none";
      setTimeout(showReading, 600);
    }
  });

  // ==================== 生成解读 ====================
  function showReading() {
    let html = "";
    drawnCards.forEach((data, i) => {
      const { card, isReversed } = data;
      const pos = SPREAD_POSITIONS[i];
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

  // ==================== 重新抽牌 ====================
  reshuffleBtn.addEventListener("click", () => {
    cardsSection.classList.add("hidden");
    readingSection.classList.add("hidden");
    drawSection.classList.remove("hidden");
    readingContent.innerHTML = "";
    flippedCount = 0;

    // Reset card slots
    document.querySelectorAll(".card-slot").forEach(s => {
      s.classList.remove("flipped", "reversed");
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
