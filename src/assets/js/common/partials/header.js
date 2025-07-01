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

class HamburgerManager {
  constructor() {
    this.positionButton = document.querySelector(".js-hamburger-header-button");
    this.positionMenu = document.querySelector(".js-hamburger-menu");
    this.syncButtons = document.querySelectorAll(".js-hamburger");
    this.menu = document.querySelector(".js-hamburger-menu");
    this.button = document.querySelector(".js-hamburger");
    this.menuClose = document.querySelector(".js-hamburger-close");
    this.menuBgClose = document.querySelector(".js-hamburger-bg-close");

    this.lastScrollTopButtons = 0;
    this.initPositionToggle();
    this.initSyncButtons();
    this.initCloseHandlers();
  }

  initPositionToggle() {
    if (!this.positionButton || !this.positionMenu) return;
    this.positionButton.addEventListener("click", () => {
      this.positionMenu.classList.toggle("position");
    });
  }

  initSyncButtons() {
    if (!this.syncButtons.length) return;

    this.syncButtons.forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.toggle("active");
        this.syncActiveClass();
      });
    });

    window.addEventListener("scroll", () => this.handleSyncScroll());
  }

  syncActiveClass() {
    const buttons = Array.from(this.syncButtons);
    const isActive = buttons[0].classList.contains("active");
    const isOtherActive = buttons[1].classList.contains("active");

    if ((isActive && !isOtherActive) || (!isActive && isOtherActive)) {
      buttons.forEach((btn) => btn.classList.remove("active"));
    }
  }

  handleSyncScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop < this.lastScrollTopButtons) this.syncActiveClass();
    this.lastScrollTopButtons = scrollTop;
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
    if (this.menu) this.menu.classList.remove("active");
    if (this.button) this.button.classList.remove("active");
  }
}

class ScrollManager {
  constructor() {
    this.header = document.querySelector(".new-header");
    this.fixedCard = document.querySelector(".fixed-card");
    this.hamburgerMenu = document.querySelector(".js-hamburger-menu");
    this.hamburgerButton = document.querySelector(".js-hamburger");
    this.positionMenu = document.querySelector(".js-hamburger-menu");

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
      if (this.positionMenu) this.positionMenu.classList.remove("position");
    }
  }

  closeHamburgerMenu() {
    if (!this.hamburgerMenu || !this.hamburgerButton) return;

    this.hamburgerMenu.classList.remove("active");
    this.hamburgerButton.classList.remove("active");
  }

  handleCardScroll(scrollPos) {
    if (!this.fixedCard) return;

    const shouldShowCard =
      scrollPos > 600 &&
      (!this.header || this.header.classList.contains("active"));

    this.fixedCard.classList.toggle("active", shouldShowCard);
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

// Инициализация приложения
new HeaderManager();
new HamburgerManager();
new ScrollManager();
new CategoryMenu();
