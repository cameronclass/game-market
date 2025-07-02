class HeaderManager {
  constructor() {
    this.headerGameBtns = document.querySelectorAll(".js-header-game-open");
    this.headerAdminBtn = document.querySelector(".header__actions_admin_open");
    this.headerAdminDrop = document.querySelector(
      ".header__actions_admin_drop"
    );
    this.headerScroll = document.querySelector(".new-header");

    this.initHeaderGame();
    this.initHeaderAdmin();
  }

  initHeaderGame() {
    if (!this.headerGameBtns) return;

    this.headerGameBtns.forEach((btn) => {
      btn.addEventListener("click", () => btn.classList.add("remove"));
    });
  }

  initHeaderAdmin() {
    if (!this.headerAdminBtn || !this.headerAdminDrop) return;

    this.headerAdminBtn.addEventListener("click", () => this.toggleAdminMenu());
    document.addEventListener("click", (e) => this.closeAdminMenu(e));
  }

  toggleAdminMenu() {
    this.headerAdminBtn.classList.toggle("_active");
    this.headerAdminDrop.classList.toggle("_active");
  }

  closeAdminMenu(event) {
    if (
      !this.headerAdminBtn.contains(event.target) &&
      !this.headerAdminDrop.contains(event.target)
    ) {
      this.headerAdminBtn.classList.remove("_active");
      this.headerAdminDrop.classList.remove("_active");
    }
  }
}

class CategoryMenu {
  constructor() {
    this.buttons = document.querySelectorAll("[data-category-target]");
    this.menus = document.querySelectorAll("[data-category-id]");
    this.currentActiveMenu = null;

    if (this.buttons.length) this.init();
  }

  init() {
    this.setupButtonEvents();
    this.activateFirstMenu();
  }

  setupButtonEvents() {
    this.buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        const targetId = button.getAttribute("data-category-target");
        this.activateMenu(targetId);
      });
    });
  }

  activateMenu(targetId) {
    this.deactivateAll();

    const activeButton = document.querySelector(
      `[data-category-target="${targetId}"]`
    );
    const activeMenu = document.querySelector(
      `[data-category-id="${targetId}"]`
    );

    if (activeButton) activeButton.classList.add("active");
    if (activeMenu) {
      activeMenu.classList.add("active");
      this.currentActiveMenu = targetId;
    }
  }

  deactivateAll() {
    this.buttons.forEach((btn) => btn.classList.remove("active"));
    this.menus.forEach((menu) => menu.classList.remove("active"));
  }

  activateFirstMenu() {
    const firstTarget = this.buttons[0].getAttribute("data-category-target");
    this.activateMenu(firstTarget);
  }
}

new HeaderManager();
new CategoryMenu();

/* Меню и Скроллы */

class ToggleClassManager {
  constructor() {
    this.stateMap = new Map();
    this.buttons = document.querySelectorAll(".add-class-btn");
    this.init();
  }

  init() {
    this.buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation(); // Предотвращаем всплытие
        this.handleButtonClick(button);
      });
    });
  }

  handleButtonClick(button) {
    const targetId = button.getAttribute("data-class-target");
    const className = button.getAttribute("data-class-name");

    if (!targetId || !className) return;

    const targetElements = Array.from(
      document.querySelectorAll(`[data-class-element="${targetId}"]`)
    );

    if (targetElements.length === 0) return;

    const isActive = button.classList.contains(className);

    if (isActive) {
      this.deactivateAll(targetElements, button, className, targetId);
    } else {
      this.activate(targetElements, button, className, targetId);
    }
  }

  deactivateAll(elements, button, className, targetId) {
    elements.forEach((el) => el.classList.remove(className));
    button.classList.remove(className);
    this.stateMap.set(targetId, {
      lastElements: [],
      lastButton: null,
    });
  }

  activate(elements, button, className, targetId) {
    const state = this.stateMap.get(targetId) || {
      lastElements: [],
      lastButton: null,
    };

    state.lastElements.forEach((el) => el.classList.remove(className));
    if (state.lastButton && state.lastButton !== button) {
      state.lastButton.classList.remove(className);
    }

    elements.forEach((el) => el.classList.add(className));
    button.classList.add(className);

    this.stateMap.set(targetId, {
      lastElements: elements,
      lastButton: button,
    });
  }

  // Новый метод для внешнего управления
  deactivateByTarget(targetId, className) {
    const state = this.stateMap.get(targetId);
    if (!state) return;

    state.lastElements.forEach((el) => el.classList.remove(className));
    if (state.lastButton) {
      state.lastButton.classList.remove(className);
    }

    this.stateMap.set(targetId, {
      lastElements: [],
      lastButton: null,
    });
  }
}

class HamburgerManager {
  constructor(toggleManager) {
    this.toggleManager = toggleManager;
    this.positionButton = document.querySelector(".js-hamburger-header-button");
    this.positionMenu = document.querySelector(".js-hamburger-menu");
    this.menu = document.querySelector(".js-hamburger-menu");
    this.menuClose = document.querySelector(".js-hamburger-close");
    this.menuBgClose = document.querySelector(".js-hamburger-bg-close");

    this.initPositionToggle();
    this.initCloseHandlers();
  }

  initPositionToggle() {
    if (!this.positionButton || !this.positionMenu) return;
    this.positionButton.addEventListener("click", () => {
      this.positionMenu.classList.add("position");
    });
  }

  initCloseHandlers() {
    if (this.menuBgClose) {
      this.menuBgClose.addEventListener("click", () => this.closeMenu());
    }
    if (this.menuClose) {
      this.menuClose.addEventListener("click", () => this.closeMenu());
    }
  }

  closeMenu() {
    if (!this.menu) return;

    // Используем ToggleClassManager для деактивации
    const targetId = this.menu.getAttribute("data-class-element");
    if (targetId) {
      this.toggleManager.deactivateByTarget(targetId, "active");
    }
  }
}

class ScrollManager {
  constructor(toggleManager) {
    this.toggleManager = toggleManager;
    this.header = document.querySelector(".new-header");
    this.fixedCard = document.querySelector(".fixed-card");
    this.hamburgerMenu = document.querySelector(".js-hamburger-menu");

    this.lastScrollTop = 0;
    this.initScrollHandlers();
  }

  initScrollHandlers() {
    window.addEventListener("DOMContentLoaded", () => this.handleScroll());
    window.addEventListener("scroll", () => this.handleScroll());
  }

  handleScroll() {
    const currentScroll = window.scrollY;
    this.handleHeaderScroll(currentScroll);
    this.handleCardScroll(currentScroll);
    this.lastScrollTop = currentScroll;
  }

  handleHeaderScroll(scrollPos) {
    if (!this.header) return;

    if (scrollPos > this.lastScrollTop && scrollPos > 50) {
      this.header.classList.add("active");
      this.closeHamburgerMenu();
    } else if (scrollPos < this.lastScrollTop) {
      this.header.classList.remove("active");
      this.hamburgerMenu.classList.remove("position");
    }
  }

  closeHamburgerMenu() {
    if (!this.hamburgerMenu) return;

    // Используем ToggleClassManager для деактивации
    const targetId = this.hamburgerMenu.getAttribute("data-class-element");
    if (targetId) {
      this.toggleManager.deactivateByTarget(targetId, "active");
    }
  }

  handleCardScroll(scrollPos) {
    if (!this.fixedCard) return;

    const shouldShowCard =
      scrollPos > 600 &&
      (!this.header || this.header.classList.contains("active"));

    this.fixedCard.classList.toggle("active", shouldShowCard);
  }
}

const toggleManager = new ToggleClassManager();
const hamburgerManager = new HamburgerManager(toggleManager);
const scrollManager = new ScrollManager(toggleManager);

