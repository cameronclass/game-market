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

/* Скролл Меню */
let lastScrollTop = 0;

window.addEventListener("scroll", function () {
  const header = document.querySelector(".new-header");
  const currentScroll = window.scrollY;

  if (currentScroll > lastScrollTop && currentScroll > 50) {
    header.classList.add("active");

    // Закрываем меню и кнопку при скролле вниз
    if (hamburgerMenu && hamburgerButton) {
      hamburgerMenu.classList.remove("active");
      hamburgerButton.classList.remove("active");
    }
  } else if (currentScroll < lastScrollTop) {
    header.classList.remove("active");
  }

  lastScrollTop = currentScroll;
});
