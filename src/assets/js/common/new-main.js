const hamburgerButton = document.querySelector(".js-hamburger");
const hamburgerMenu = document.querySelector(".js-hamburger-menu");
const hamburgerMenuClose = document.querySelector(".js-hamburger-close");

const hamburgerMenuBgClose = document.querySelector(".js-hamburger-bg-close");

if (hamburgerMenuBgClose) {
  hamburgerMenuBgClose.addEventListener("click", function () {
    hamburgerMenu.classList.remove("active");
    hamburgerButton.classList.remove("active");
  });
}
if (hamburgerMenuClose) {
  hamburgerMenuClose.addEventListener("click", function () {
    hamburgerMenu.classList.remove("active");
    hamburgerButton.classList.remove("active");
  });
}

/* Категория */
(function initCategoryMenu() {
  // Получаем элементы внутри функции
  const buttons = document.querySelectorAll("[data-category-target]");
  const menus = document.querySelectorAll("[data-category-id]");

  // Текущее активное меню (запоминаем последнее выбранное)
  let currentActiveMenu = null;

  // Функция для активации меню
  function activateMenu(targetId) {
    // Удаляем активные классы у всех элементов
    buttons.forEach((button) => button.classList.remove("active"));
    menus.forEach((menu) => menu.classList.remove("active"));

    // Активируем нужные элементы
    const activeButton = document.querySelector(
      `[data-category-target="${targetId}"]`
    );
    const activeMenu = document.querySelector(
      `[data-category-id="${targetId}"]`
    );

    if (activeButton) activeButton.classList.add("active");
    if (activeMenu) {
      activeMenu.classList.add("active");
      currentActiveMenu = targetId; // Запоминаем текущее активное меню
    }
  }

  // Обработчики событий для кнопок
  function setupButtonEvents() {
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", function () {
        const targetId = this.getAttribute("data-category-target");
        activateMenu(targetId);
      });

      // Убрали обработчик mouseleave для кнопок, чтобы меню не скрывалось
    });
  }

  // Инициализация
  setupButtonEvents();

  // Активируем первый элемент по умолчанию
  if (buttons.length > 0) {
    const firstTarget = buttons[0].getAttribute("data-category-target");
    activateMenu(firstTarget);
  }
})();

/* new-reviews */
(function () {
  const content = document.querySelector(".new-reviews__content");

  if (content) {
    content.addEventListener("mousedown", (e) => {
      let isDown = true;
      let startX = e.pageX - content.offsetLeft;
      let scrollLeft = content.scrollLeft;

      content.classList.add("active");

      const mouseMoveHandler = (e) => {
        if (!isDown) return; // Если мышь не нажата, выходим
        e.preventDefault();
        const x = e.pageX - content.offsetLeft;
        const walk = (x - startX) * 2; // Увеличьте или уменьшите скорость прокрутки
        content.scrollLeft = scrollLeft - walk;
      };

      const mouseUpHandler = () => {
        isDown = false;
        content.classList.remove("active");
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
      };

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    });

    content.addEventListener("mouseleave", () => {
      content.classList.remove("active");
    });
  }
})();
