class MobileMenu {
  constructor(toggleManager, categoryMenuManager, searchManager) {
    this.menuButton = document.querySelector(".new-header__mobile-menu");
    this.menu = document.querySelector(".new-header__menu");
    this.hamburger = document.querySelector(".hamburger");
    this.categoryMenu = document.querySelector(".js-category-menu");
    this.overlay = document.querySelector(".overlay-bg");
    this.toggleManager = toggleManager;
    this.categoryMenuManager = categoryMenuManager;
    this.searchManager = searchManager;
    this.lastScrollPosition = 0;

    this.init();
  }

  init() {
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
    // Close search
    if (this.searchManager) {
      this.searchManager.closeSearch();
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
    // Toggle locked class on body
    if (window.innerWidth < 979) {
      document.body.classList.toggle("locked", !isActive);
    } else {
      document.body.classList.remove("locked");
    }
  }

  handleOutsideClick(event) {
    const target = event.target;
    const isButton = target.tagName === "BUTTON" || target.type === "button";
    const isOutsideMenu =
      !this.menu.contains(target) && !this.menuButton.contains(target);
    const isOutsideCategoryMenu =
      !this.categoryMenu || !this.categoryMenu.contains(target);
    const isOutsideSearch =
      !document
        .querySelector(".new-header__search_content")
        ?.contains(target) &&
      !document.querySelector(".new-header__search-mobile")?.contains(target);

    if (
      (isOutsideMenu && isOutsideCategoryMenu && isOutsideSearch) ||
      (isButton &&
        !this.menuButton.contains(target) &&
        isOutsideCategoryMenu &&
        isOutsideSearch)
    ) {
      // Close mobile menu
      this.menu.classList.remove("active");
      this.menuButton.classList.remove("is-active");
      this.hamburger.classList.remove("is-active");
      // Close category menu
      if (this.categoryMenu && this.toggleManager) {
        this.toggleManager.deactivateCategoryMenu();
      }
      // Close categories
      if (this.categoryMenuManager) {
        this.categoryMenuManager.deactivateAll();
      }
      // Close search
      if (this.searchManager) {
        this.searchManager.closeSearch();
      }
      // Remove overlay active class
      if (this.overlay) {
        this.overlay.classList.remove("active");
      }
      // Remove locked class from body
      document.body.classList.remove("locked");
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
    // Close categories
    if (this.categoryMenuManager) {
      this.categoryMenuManager.deactivateAll();
    }
    // Close search
    if (this.searchManager) {
      this.searchManager.closeSearch();
    }
    // Remove overlay active class
    if (this.overlay) {
      this.overlay.classList.remove("active");
    }
    // Remove locked class from body
    document.body.classList.remove("locked");
  }

  handleScroll() {
    const currentScrollPosition = window.pageYOffset;

    if (currentScrollPosition > this.lastScrollPosition) {
      // Close mobile menu
      this.menu.classList.remove("active");
      this.menuButton.classList.remove("is-active");
      this.hamburger.classList.remove("is-active");
      // Close category menu
      if (this.categoryMenu && this.toggleManager) {
        this.toggleManager.deactivateCategoryMenu();
      }
      // Close categories
      if (this.categoryMenuManager) {
        this.categoryMenuManager.deactivateAll();
      }
      // Close search
      if (this.searchManager) {
        this.searchManager.closeSearch();
      }
      // Remove overlay active class
      if (this.overlay) {
        this.overlay.classList.remove("active");
      }
      // Remove locked class from body
      document.body.classList.remove("locked");
    }

    this.lastScrollPosition = currentScrollPosition;
  }
}

class ToggleClassManager {
  constructor(categoryMenuManager, searchManager) {
    this.categoryButton = document.querySelector(".js-category-button");
    this.categoryButtonTop = document.querySelector(".js-category-button-top");
    this.categoryMenu = document.querySelector(".js-category-menu");
    this.overlay = document.querySelector(".overlay-bg");
    this.categoryMenuManager = categoryMenuManager;
    this.searchManager = searchManager;
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

    // Close mobile menu
    const mobileMenu = document.querySelector(".new-header__menu");
    const mobileMenuButton = document.querySelector(".new-header__mobile-menu");
    const hamburger = document.querySelector(".hamburger");
    if (mobileMenu && mobileMenuButton && hamburger) {
      mobileMenu.classList.remove("active");
      mobileMenuButton.classList.remove("is-active");
      hamburger.classList.remove("is-active");
    }

    // Close search
    if (this.searchManager) {
      this.searchManager.closeSearch();
    }

    // Деактивируем категории
    if (this.categoryMenuManager) {
      this.categoryMenuManager.deactivateAll();
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

    // Close mobile menu
    const mobileMenu = document.querySelector(".new-header__menu");
    const mobileMenuButton = document.querySelector(".new-header__mobile-menu");
    const hamburger = document.querySelector(".hamburger");
    if (mobileMenu && mobileMenuButton && hamburger) {
      mobileMenu.classList.remove("active");
      mobileMenuButton.classList.remove("is-active");
      hamburger.classList.remove("is-active");
    }

    // Close search
    if (this.searchManager) {
      this.searchManager.closeSearch();
    }

    // Деактивируем категории
    if (this.categoryMenuManager) {
      this.categoryMenuManager.deactivateAll();
    }

    if (isActive) {
      this.deactivateCategoryMenu();
    } else {
      this.activateCategoryMenu(true);
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
      // Add locked class to body on mobile
      if (window.innerWidth < 979) {
        document.body.classList.add("locked");
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
      // Remove locked class from body
      document.body.classList.remove("locked");
    }
  }
}

class HamburgerManager {
  constructor(toggleManager, categoryMenuManager, searchManager) {
    this.toggleManager = toggleManager;
    this.categoryMenuManager = categoryMenuManager;
    this.searchManager = searchManager;
    this.menu = document.querySelector(".js-category-menu");
    this.menuClose = document.querySelector(".js-hamburger-close");
    this.categoryClose = document.querySelector(
      ".new-header-category__second-close"
    );
    this.overlay = document.querySelector(".overlay-bg");

    this.initCloseHandlers();
  }

  initCloseHandlers() {
    if (this.menuClose) {
      this.menuClose.addEventListener("click", () => this.closeMenu());
    }
    if (this.categoryClose) {
      this.categoryClose.addEventListener("click", () => this.closeCategory());
    }
  }

  closeMenu() {
    if (!this.menu) return;

    this.toggleManager.deactivateCategoryMenu();
    if (this.categoryMenuManager) {
      this.categoryMenuManager.deactivateAll();
    }
    if (this.searchManager) {
      this.searchManager.closeSearch();
    }
    document.body.classList.remove("locked");
  }

  closeCategory() {
    if (this.categoryMenuManager) {
      this.categoryMenuManager.deactivateAll();
    }
    if (this.searchManager) {
      this.searchManager.closeSearch();
    }
    document.body.classList.remove("locked");
  }
}

class ScrollManager {
  constructor(toggleManager, categoryMenuManager, searchManager) {
    this.toggleManager = toggleManager;
    this.categoryMenuManager = categoryMenuManager;
    this.searchManager = searchManager;
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

    this.toggleManager.deactivateCategoryMenu();
    if (this.categoryMenuManager) {
      this.categoryMenuManager.deactivateAll();
    }
    if (this.searchManager) {
      this.searchManager.closeSearch();
    }
    document.body.classList.remove("locked");
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
    this.overlay = document.querySelector(".overlay-bg");
    this.currentActiveMenu = null;

    if (this.buttons.length) this.init();
  }

  init() {
    this.setupButtonEvents();
    if (window.innerWidth >= 979) {
      this.activateFirstMenu();
    }
    // Обработка изменения размера окна
    window.addEventListener("resize", () => this.handleResize());
  }

  setupButtonEvents() {
    this.buttons.forEach((button) => {
      const eventType = window.innerWidth < 979 ? "click" : "mouseenter";
      button.removeEventListener("click", this.handleButtonEvent); // Удаляем старый обработчик
      button.removeEventListener("mouseenter", this.handleButtonEvent); // Удаляем старый обработчик
      button.addEventListener(eventType, this.handleButtonEvent.bind(this));
    });
    if (this.overlay) {
      this.overlay.addEventListener("click", () => {
        this.deactivateAll();
        document.body.classList.remove("locked");
      });
    }
  }

  handleButtonEvent(event) {
    const targetId = event.target.getAttribute("data-category-target");
    this.activateMenu(targetId);
  }

  activateMenu(targetId) {
    this.deactivateAll();

    const activeButton = document.querySelector(
      `[data-category-target="${targetId}"]`
    );
    const activeMenu = document.querySelector(
      `[data-category-id="${targetId}"]`
    );
    const secondCloseButton = document.querySelector(
      ".new-header-category__second-close"
    );

    if (activeButton) activeButton.classList.add("active");
    if (activeMenu) {
      activeMenu.classList.add("active");
      this.currentActiveMenu = targetId;
    }
    if (this.overlay) {
      this.overlay.classList.add("active");
    }
    if (window.innerWidth < 979) {
      document.body.classList.add("locked");
      if (secondCloseButton) {
        secondCloseButton.classList.add("active");
      }
    }
  }

  deactivateAll() {
    this.buttons.forEach((btn) => btn.classList.remove("active"));
    this.menus.forEach((menu) => menu.classList.remove("active"));
    this.currentActiveMenu = null;
    if (this.overlay) {
      this.overlay.classList.remove("active");
    }
    const secondCloseButton = document.querySelector(
      ".new-header-category__second-close"
    );
    if (secondCloseButton) {
      secondCloseButton.classList.remove("active");
    }
    document.body.classList.remove("locked");
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

  handleResize() {
    if (window.innerWidth < 979) {
      this.deactivateAll();
    } else if (this.currentActiveMenu === null) {
      this.activateFirstMenu();
    }
    // Обновляем обработчики событий для кнопок
    this.setupButtonEvents();
  }
}

class SearchManager {
  constructor(toggleManager, categoryMenuManager) {
    this.searchButton = document.querySelector(".new-header__search-mobile");
    this.searchInput = document.querySelector(".new-search-block__input");
    this.searchContent = document.querySelector(".new-header__search_content");
    this.overlay = document.querySelector(".overlay-bg");
    this.toggleManager = toggleManager;
    this.categoryMenuManager = categoryMenuManager;

    this.init();
  }

  init() {
    if (this.searchButton) {
      this.searchButton.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleSearch();
      });
    }
    if (this.searchInput) {
      this.searchInput.addEventListener("input", () => this.handleInput());
      this.searchInput.addEventListener("click", (e) => e.stopPropagation());
    }
    if (this.overlay) {
      this.overlay.addEventListener("click", () => this.closeSearch());
    }
  }

  toggleSearch() {
    const isActive = this.searchContent.classList.contains("active");

    this.closeOtherMenus();

    if (isActive) {
      this.closeSearch();
    } else {
      this.openSearch();
    }
  }

  handleInput() {
    if (this.searchInput.value.trim() !== "") {
      this.openSearch();
    } else {
      this.closeSearch();
    }
  }

  openSearch() {
    if (this.searchContent) {
      this.searchContent.classList.add("active");
    }
    if (this.overlay) {
      this.overlay.classList.add("active");
    }
    if (window.innerWidth < 979) {
      document.body.classList.add("locked");
    }
  }

  closeSearch() {
    if (this.searchContent) {
      this.searchContent.classList.remove("active");
    }
    if (this.overlay) {
      this.overlay.classList.remove("active");
    }
    document.body.classList.remove("locked");
  }

  closeOtherMenus() {
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
    if (this.categoryMenuManager) {
      this.categoryMenuManager.deactivateAll();
    }
  }
}

const toggleManager = new ToggleClassManager();
const categoryMenuManager = new CategoryMenu();
const searchManager = new SearchManager(toggleManager, categoryMenuManager);
new MobileMenu(toggleManager, categoryMenuManager, searchManager); // Передаем все менеджеры
new HamburgerManager(toggleManager, categoryMenuManager, searchManager);
new ScrollManager(toggleManager, categoryMenuManager, searchManager);
