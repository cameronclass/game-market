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



(function () {
  let isMobile = window.matchMedia("(max-width: 979px)").matches;

  const filterBlock = document.querySelector(".filter-block");
  const filterButton = document.querySelector(".filter-block__button");
  const filterContent = document.querySelector(".filter-block__content");

  if (!filterBlock || !filterButton || !filterContent) return;

  function deactivateAll() {
    filterBlock.classList.remove("active");
    filterButton.classList.remove("active");
    filterContent.classList.remove("active");
  }

  function enableMobileBehavior() {
    deactivateAll(); // Очистка состояния при входе в моб.режим
    filterButton.addEventListener("click", onFilterButtonClick);
    filterContent.addEventListener("click", stopPropagation);
    document.addEventListener("click", onOutsideClick);
  }

  function disableMobileBehavior() {
    filterButton.removeEventListener("click", onFilterButtonClick);
    filterContent.removeEventListener("click", stopPropagation);
    document.removeEventListener("click", onOutsideClick);
    deactivateAll(); // Очистить все active при выходе из моб.режима

    // 💡 Вернуть только `.active` на `.filter-block__content`
    filterContent.classList.add("active");
  }

  function onFilterButtonClick(e) {
    e.stopPropagation();
    filterBlock.classList.toggle("active");
    filterButton.classList.toggle("active");
    filterContent.classList.toggle("active");
  }

  function stopPropagation(e) {
    e.stopPropagation();
  }

  function onOutsideClick() {
    if (filterBlock.classList.contains("active")) {
      deactivateAll();
    }
  }

  function checkScreenSize() {
    const currentIsMobile = window.matchMedia("(max-width: 979px)").matches;
    if (currentIsMobile !== isMobile) {
      isMobile = currentIsMobile;
      if (isMobile) {
        enableMobileBehavior();
      } else {
        disableMobileBehavior();
      }
    }
  }

  // При загрузке
  if (isMobile) {
    enableMobileBehavior();
  } else {
    filterContent.classList.add("active"); // для десктопа сразу показать
  }

  window.addEventListener("resize", checkScreenSize);
})();



