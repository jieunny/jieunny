window.onload = function () {
  const items = document.querySelectorAll(".item");
  const textBox = document.getElementById("mainText");
  const oval = document.querySelector(".oval");

  let typingTimer = null;
  let activeItem = null;

  items.forEach(item => {
    item.addEventListener("click", () => {
      // 같은 아이템 다시 클릭하면 무시
      if (item === activeItem) return;
      activeItem = item;

      // ⭐ oval 색 변경
      oval.style.backgroundColor = item.dataset.color || "#ffffff";

      // ⭐ 텍스트 타이핑 시작
      startTyping(
        item.dataset.text,
        item.dataset.align || "left"
      );
    });
  });

  // =============================
  // ✨ 타이핑 함수 (정렬 + 줄 멈춤)
  // =============================
  function startTyping(text, align) {
    clearTimeout(typingTimer);

    // 정렬 클래스 적용
    textBox.classList.remove("left", "center", "right");
    textBox.classList.add(align);

    // 항상 초기화
    textBox.textContent = "";

    let i = 0;

    function typeChar() {
      if (i >= text.length) return;

      const char = text[i];
      textBox.textContent += char;
      i++;

      // 줄바꿈이면 잠깐 멈춤
      if (char === "\n") {
        typingTimer = setTimeout(typeChar, 50);
      } else {
        typingTimer = setTimeout(typeChar, 10);
      }
    }

    typeChar();
  }
};
