class MobileMenu {
  constructor(toggleManager) {
    this.menuButton = document.querySelector(".new-header__mobile-menu");
    this.menu = document.querySelector(".new-header__menu");
    this.hamburger = document.querySelector(".hamburger");
    this.categoryMenu = document.querySelector(".js-category-menu");
    this.overlay = document.querySelector(".overlay-bg");
    this.toggleManager = toggleManager; // Reference to ToggleClassManager
    this.lastScrollPosition = 0;

    this.init();
  }

  init() {
    // Bind event listeners
    this.menuButton.addEventListener("click", this.toggleMenu.bind(this));
    window.addEventListener("scroll", this.handleScroll.bind(this));
    document.addEventListener("click", this.handleOutsideClick.bind(this));
    if (this.overlay) {
      this.overlay.addEventListener(
        "click",
        this.handleOverlayClick.bind(this)
      );
    }
  }

  toggleMenu(event) {
    event.stopPropagation();
    // Close the category menu
    if (this.categoryMenu && this.toggleManager) {
      this.toggleManager.deactivateCategoryMenu();
    }
    // Toggle active classes for this menu
    const isActive = this.menu.classList.contains("active");
    this.menu.classList.toggle("active");
    this.menuButton.classList.toggle("is-active");
    this.hamburger.classList.toggle("is-active");
    // Toggle overlay
    if (this.overlay) {
      this.overlay.classList.toggle("active", !isActive);
    }
  }

  handleOutsideClick(event) {
    const target = event.target;
    const isButton = target.tagName === "BUTTON" || target.type === "button";
    const isOutsideMenu =
      !this.menu.contains(target) && !this.menuButton.contains(target);
    const isOutsideCategoryMenu =
      !this.categoryMenu || !this.categoryMenu.contains(target);

    // Close menus only if clicking outside both menus or on a button (except menuButton)
    if (
      (isOutsideMenu && isOutsideCategoryMenu) ||
      (isButton && !this.menuButton.contains(target) && isOutsideCategoryMenu)
    ) {
      // Close mobile menu
      this.menu.classList.remove("active");
      this.menuButton.classList.remove("is-active");
      this.hamburger.classList.remove("is-active");
      // Close category menu
      if (this.categoryMenu && this.toggleManager) {
        this.toggleManager.deactivateCategoryMenu();
      }
      // Remove overlay active class
      if (this.overlay) {
        this.overlay.classList.remove("active");
      }
    }
  }

  handleOverlayClick() {
    // Close mobile menu
    this.menu.classList.remove("active");
    this.menuButton.classList.remove("is-active");
    this.hamburger.classList.remove("is-active");
    // Close category menu
    if (this.categoryMenu && this.toggleManager) {
      this.toggleManager.deactivateCategoryMenu();
    }
    // Remove overlay active class
    if (this.overlay) {
      this.overlay.classList.remove("active");
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
      // Remove active classes for category menu
      if (this.categoryMenu && this.toggleManager) {
        this.toggleManager.deactivateCategoryMenu();
      }
      // Remove overlay active class
      if (this.overlay) {
        this.overlay.classList.remove("active");
      }
    }

    // Update last scroll position
    this.lastScrollPosition = currentScrollPosition;
  }
}

class ToggleClassManager {
  constructor() {
    this.categoryButton = document.querySelector(".js-category-button");
    this.categoryButtonTop = document.querySelector(".js-category-button-top");
    this.categoryMenu = document.querySelector(".js-category-menu");
    this.overlay = document.querySelector(".overlay-bg");
    this.init();
  }

  init() {
    if (this.categoryButton) {
      this.categoryButton.addEventListener("click", (e) => {
        e.stopPropagation();
        this.handleCategoryButtonClick();
      });
    }
    if (this.categoryButtonTop) {
      this.categoryButtonTop.addEventListener("click", (e) => {
        e.stopPropagation();
        this.handleCategoryButtonTopClick();
      });
    }
  }

  handleCategoryButtonClick() {
    if (!this.categoryMenu) return;

    const isActive = this.categoryMenu.classList.contains("active");

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
      this.deactivateCategoryMenu();
    } else {
      this.activateCategoryMenu();
    }
  }

  handleCategoryButtonTopClick() {
    if (!this.categoryMenu) return;

    const isActive = this.categoryMenu.classList.contains("active");

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
      this.deactivateCategoryMenu();
    } else {
      this.activateCategoryMenu(true); // Pass true to add position class
    }
  }

  activateCategoryMenu(addPosition = false) {
    if (this.categoryMenu) {
      this.categoryMenu.classList.add("active");
      if (addPosition) {
        this.categoryMenu.classList.add("position");
      }
      if (this.categoryButton) {
        this.categoryButton.classList.add("active");
      }
      if (this.categoryButtonTop) {
        this.categoryButtonTop.classList.add("active");
      }
      if (this.overlay) {
        this.overlay.classList.add("active");
      }
    }
  }

  deactivateCategoryMenu() {
    if (this.categoryMenu) {
      this.categoryMenu.classList.remove("active");
      this.categoryMenu.classList.remove("position");
      if (this.categoryButton) {
        this.categoryButton.classList.remove("active");
      }
      if (this.categoryButtonTop) {
        this.categoryButtonTop.classList.remove("active");
      }
      if (this.overlay) {
        this.overlay.classList.remove("active");
      }
    }
  }
}

class HamburgerManager {
  constructor(toggleManager) {
    this.toggleManager = toggleManager;
    this.menu = document.querySelector(".js-category-menu");
    this.menuClose = document.querySelector(".js-hamburger-close");
    this.overlay = document.querySelector(".overlay-bg");

    this.initCloseHandlers();
  }

  initCloseHandlers() {
    if (this.menuClose) {
      this.menuClose.addEventListener("click", () => this.closeMenu());
    }
  }

  closeMenu() {
    if (!this.menu) return;

    // Используем ToggleClassManager для деактивации
    this.toggleManager.deactivateCategoryMenu();
  }
}

class ScrollManager {
  constructor(toggleManager) {
    this.toggleManager = toggleManager;
    this.header = document.querySelector(".new-header");
    this.fixedCard = document.querySelector(".fixed-card");
    this.categoryMenu = document.querySelector(".js-category-menu");
    this.overlay = document.querySelector(".overlay-bg");

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
      this.closeCategoryMenu();
    } else if (scrollPos < this.lastScrollTop) {
      this.header.classList.remove("active");
      if (this.categoryMenu) {
        this.categoryMenu.classList.remove("position");
      }
    }
  }

  closeCategoryMenu() {
    if (!this.categoryMenu) return;

    // Используем ToggleClassManager для деактивации
    this.toggleManager.deactivateCategoryMenu();
  }

  handleCardScroll(scrollPos) {
    if (!this.fixedCard) return;

    const shouldShowCard =
      scrollPos > 600 &&
      (!this.header || this.header.classList.contains("active"));

    this.fixedCard.classList.toggle("active", shouldShowCard);
  }
}

class HeaderManager {
  constructor(toggleManager) {
    this.toggleManager = toggleManager;
    this.headerGameBtns = document.querySelectorAll(".js-header-game-open");
    this.headerAdminBtn = document.querySelector(".header__actions_admin_open");
    this.headerAdminDrop = document.querySelector(
      ".header__actions_admin_drop"
    );
    this.headerScroll = document.querySelector(".new-header");
    this.overlay = document.querySelector(".overlay-bg");

    this.initHeaderGame();
    this.initHeaderAdmin();
  }

  initHeaderGame() {
    if (!this.headerGameBtns) return;

    this.headerGameBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.classList.add("remove");
        // Close both menus
        const mobileMenu = document.querySelector(".new-header__menu");
        const mobileMenuButton = document.querySelector(
          ".new-header__mobile-menu"
        );
        const hamburger = document.querySelector(".hamburger");
        if (mobileMenu && mobileMenuButton && hamburger) {
          mobileMenu.classList.remove("active");
          mobileMenuButton.classList.remove("is-active");
          hamburger.classList.remove("is-active");
        }
        if (this.toggleManager) {
          this.toggleManager.deactivateCategoryMenu();
        }
        // Remove overlay active class
        if (this.overlay) {
          this.overlay.classList.remove("active");
        }
      });
    });
  }

  initHeaderAdmin() {
    if (!this.headerAdminBtn || !this.headerAdminDrop) return;

    this.headerAdminBtn.addEventListener("click", () => {
      this.toggleAdminMenu();
    });
    document.addEventListener("click", (e) => this.closeAdminMenu(e));
    if (this.overlay) {
      this.overlay.addEventListener("click", () => {
        this.headerAdminBtn.classList.remove("_active");
        this.headerAdminDrop.classList.remove("_active");
        // Remove overlay active class
        this.overlay.classList.remove("active");
      });
    }
  }

  toggleAdminMenu() {
    const isActive = this.headerAdminDrop.classList.contains("_active");
    this.headerAdminBtn.classList.toggle("_active");
    this.headerAdminDrop.classList.toggle("_active");
    // Toggle overlay
    if (this.overlay) {
      this.overlay.classList.toggle("active", !isActive);
    }
    // Close other menus
    const mobileMenu = document.querySelector(".new-header__menu");
    const mobileMenuButton = document.querySelector(".new-header__mobile-menu");
    const hamburger = document.querySelector(".hamburger");
    if (mobileMenu && mobileMenuButton && hamburger) {
      mobileMenu.classList.remove("active");
      mobileMenuButton.classList.remove("is-active");
      hamburger.classList.remove("is-active");
    }
    if (this.toggleManager) {
      this.toggleManager.deactivateCategoryMenu();
    }
  }

  closeAdminMenu(event) {
    if (
      !this.headerAdminBtn.contains(event.target) &&
      !this.headerAdminDrop.contains(event.target)
    ) {
      this.headerAdminBtn.classList.remove("_active");
      this.headerAdminDrop.classList.remove("_active");
      // Remove overlay active class
      if (this.overlay) {
        this.overlay.classList.remove("active");
      }
    }
  }
}

class CategoryMenu {
  constructor() {
    this.buttons = document.querySelectorAll("[data-category-target]");
    this.menus = document.querySelectorAll("[data-category-id]");
    this.overlay = document.querySelector(".overlay-bg");
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
    if (this.overlay) {
      this.overlay.addEventListener("click", () => {
        this.deactivateAll();
        this.overlay.classList.remove("active");
      });
    }
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
    // Add overlay active class
    if (this.overlay) {
      this.overlay.classList.add("active");
    }
  }

  deactivateAll() {
    this.buttons.forEach((btn) => btn.classList.remove("active"));
    this.menus.forEach((menu) => menu.classList.remove("active"));
    // Remove overlay active class
    if (this.overlay) {
      this.overlay.classList.remove("active");
    }
  }

  activateFirstMenu() {
    const firstTarget = this.buttons[0].getAttribute("data-category-target");
    const activeButton = document.querySelector(
      `[data-category-target="${firstTarget}"]`
    );
    const activeMenu = document.querySelector(
      `[data-category-id="${firstTarget}"]`
    );

    if (activeButton) activeButton.classList.add("active");
    if (activeMenu) {
      activeMenu.classList.add("active");
      this.currentActiveMenu = firstTarget;
    }
  }
}

const toggleManager = new ToggleClassManager();
new MobileMenu(toggleManager);
new HamburgerManager(toggleManager);
new ScrollManager(toggleManager);
new HeaderManager(toggleManager);
new CategoryMenu();
