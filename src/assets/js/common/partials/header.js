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

class MobileMenu {
  constructor(toggleManager) {
    this.menuButton = document.querySelector(".new-header__mobile-menu");
    this.menu = document.querySelector(".new-header__menu");
    this.hamburger = document.querySelector(".hamburger");
    this.hamburgerMenu = document.querySelector(".js-hamburger-menu");
    this.toggleManager = toggleManager; // Reference to ToggleClassManager
    this.lastScrollPosition = 0;

    this.init();
  }

  init() {
    // Bind event listeners
    this.menuButton.addEventListener("click", this.toggleMenu.bind(this));
    window.addEventListener("scroll", this.handleScroll.bind(this));
    document.addEventListener("click", this.handleOutsideClick.bind(this));
  }

  toggleMenu(event) {
    event.stopPropagation();
    // Close the other menu (js-hamburger-menu)
    if (this.hamburgerMenu && this.toggleManager) {
      const targetId = this.hamburgerMenu.getAttribute("data-class-element");
      if (targetId) {
        this.toggleManager.deactivateByTarget(targetId, "active");
      }
    }
    // Toggle active classes for this menu
    this.menu.classList.toggle("active");
    this.menuButton.classList.toggle("is-active");
    this.hamburger.classList.toggle("is-active");
  }

  handleOutsideClick(event) {
    const target = event.target;
    const isButton = target.tagName === "BUTTON" || target.type === "button";
    const isOutsideMenu =
      !this.menu.contains(target) && !this.menuButton.contains(target);
    const isOutsideHamburgerMenu =
      !this.hamburgerMenu || !this.hamburgerMenu.contains(target);

    // Close both menus if clicking outside or on another button (except menuButton)
    if (
      (isOutsideMenu && isOutsideHamburgerMenu) ||
      (isButton && !this.menuButton.contains(target))
    ) {
      // Close mobile menu
      this.menu.classList.remove("active");
      this.menuButton.classList.remove("is-active");
      this.hamburger.classList.remove("is-active");
      // Close hamburger menu
      if (this.hamburgerMenu && this.toggleManager) {
        const targetId = this.hamburgerMenu.getAttribute("data-class-element");
        if (targetId) {
          this.toggleManager.deactivateByTarget(targetId, "active");
        }
      }
    }
  }

  handleScroll() {
    const currentScrollPosition = window.pageYOffset;

    // Check if scrolling down
    if (currentScrollPosition > this.lastScrollPosition) {
      // Remove active classes for mobile menu
      this.menu.classList.remove("active");
      this.menuButton.classList.remove("is-active");
      this.hamburger.classList.remove("is-active");
      // Remove active classes for hamburger menu
      if (this.hamburgerMenu && this.toggleManager) {
        const targetId = this.hamburgerMenu.getAttribute("data-class-element");
        if (targetId) {
          this.toggleManager.deactivateByTarget(targetId, "active");
        }
      }
    }

    // Update last scroll position
    this.lastScrollPosition = currentScrollPosition;
  }
}

class ToggleClassManager {
  constructor() {
    this.stateMap = new Map();
    this.buttons = document.querySelectorAll(".add-class-btn");
    this.init();
  }

  init() {
    this.buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
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

    // Close mobile menu if it's open
    const mobileMenu = document.querySelector(".new-header__menu");
    const mobileMenuButton = document.querySelector(".new-header__mobile-menu");
    const hamburger = document.querySelector(".hamburger");
    if (mobileMenu && mobileMenuButton && hamburger) {
      mobileMenu.classList.remove("active");
      mobileMenuButton.classList.remove("is-active");
      hamburger.classList.remove("is-active");
    }

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
new MobileMenu(toggleManager);
new HamburgerManager(toggleManager);
new ScrollManager(toggleManager);
