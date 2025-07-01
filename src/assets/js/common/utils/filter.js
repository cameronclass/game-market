function initExpandableFilterBlock(
  containerSelector = ".filter-block__card_content"
) {
  document.querySelectorAll(containerSelector).forEach((block) => {
    const items = block.querySelectorAll(".main-input__checkbox");
    const button = block.querySelector(".filter-block__card_more");

    if (!button || items.length <= 4) {
      if (button) button.style.display = "none";
      return;
    }

    // Скрываем все элементы, начиная с 5-го
    items.forEach((item, index) => {
      if (index >= 4) item.style.display = "none";
    });

    let expanded = false;

    button.addEventListener("click", () => {
      expanded = !expanded;
      items.forEach((item, index) => {
        if (index >= 4) {
          item.style.display = expanded ? "" : "none";
        }
      });
      button.textContent = expanded ? "Скрыть" : "Показать все";
    });
  });
}
initExpandableFilterBlock();
