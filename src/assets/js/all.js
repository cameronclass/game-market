document.addEventListener("DOMContentLoaded", function () {
  /* Utils */
  /* Аккордион */
  const accordions = document.querySelectorAll(".accordion");
  const openAccordion = (accordion) => {
    const content = accordion.querySelector(".accordion__content");
    accordion.classList.add("accordion__active");
    content.style.maxHeight = content.scrollHeight + 40 + "px";
  };
  const closeAccordion = (accordion) => {
    const content = accordion.querySelector(".accordion__content");
    accordion.classList.remove("accordion__active");
    content.style.maxHeight = null;
  };
  accordions.forEach((accordion) => {
    const intro = accordion.querySelector(".accordion__intro");
    const content = accordion.querySelector(".accordion__content");

    intro.onclick = () => {
      if (content.style.maxHeight) {
        closeAccordion(accordion);
      } else {
        accordions.forEach((accordion) => closeAccordion(accordion));
        openAccordion(accordion);
      }
    };
  });

  function setupToggleClassButtons() {
    const addClassBtns = document.querySelectorAll(".add-class-btn");

    const stateMap = new Map(); // хранит lastElements и lastButton по targetId

    addClassBtns.forEach((button) => {
      button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-class-target");
        const classToAdd = button.getAttribute("data-class-name");

        const targetElements = document.querySelectorAll(
          `[data-class-element="${targetId}"]`
        );

        if (targetElements.length === 0 || !classToAdd) return;

        const isActive = Array.from(targetElements).some((el) =>
          el.classList.contains(classToAdd)
        );

        const state = stateMap.get(targetId) || {
          lastElements: [],
          lastButton: null,
        };

        if (isActive) {
          // Удалить класс у всех элементов с текущим targetId
          targetElements.forEach((el) => el.classList.remove(classToAdd));
          button.classList.remove(classToAdd);
          stateMap.set(targetId, {
            lastElements: [],
            lastButton: null,
          });
        } else {
          // Удалить с предыдущих элементов, если они есть
          state.lastElements.forEach((el) => el.classList.remove(classToAdd));
          if (state.lastButton && state.lastButton !== button) {
            state.lastButton.classList.remove(classToAdd);
          }

          // Добавить класс к текущим элементам
          targetElements.forEach((el) => el.classList.add(classToAdd));
          button.classList.add(classToAdd);

          // Обновить stateMap
          stateMap.set(targetId, {
            lastElements: Array.from(targetElements),
            lastButton: button,
          });
        }
      });
    });
  }
  setupToggleClassButtons();

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

  /* Таймер */
  const formatNumber = (number) => {
    return `<div class="timer__wrapper">${number
      .toString()
      .split("")
      .map(
        (digit) =>
          `<span class="timer__digit"><span class="timer__digit_num">${digit}</span></span>`
      )
      .join("")}</div>`;
  };

  const updateTimer = (timer, deadline) => {
    const now = new Date().getTime();
    const distance = deadline - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((distance % (1000 * 60)) / 1000);

    const daysContainer = timer.querySelector(".timer__day");
    const hoursContainer = timer.querySelector(".timer__hours");
    const minsContainer = timer.querySelector(".timer__minutes");
    const secsContainer = timer.querySelector(".timer__seconds");
    const timerInfo = timer.querySelector(".timer__info");
    const messageContainer = timer.querySelector(".timer__message");

    if (daysContainer)
      daysContainer.innerHTML =
        formatNumber(days) + '<h3 class="timer__label">Дней</h3>';
    if (hoursContainer)
      hoursContainer.innerHTML =
        formatNumber(hours) + '<h3 class="timer__label">Часов</h3>';
    if (minsContainer)
      minsContainer.innerHTML =
        formatNumber(mins) + '<h3 class="timer__label">Минут</h3>';
    if (secsContainer)
      secsContainer.innerHTML =
        formatNumber(secs) + '<h3 class="timer__label">Секунд</h3>';

    if (distance < 0) {
      clearInterval(timer.interval);
      if (timerInfo) timerInfo.classList.add("is-hidden");
      if (messageContainer) messageContainer.classList.add("is-visible");
    }
  };

  const timers = document.querySelectorAll(".timer");

  timers.forEach((timer) => {
    const deadline = new Date(timer.getAttribute("data-deadline")).getTime();

    timer.interval = setInterval(() => {
      updateTimer(timer, deadline);
    }, 1000);

    updateTimer(timer, deadline);
  });

  // Init readmore.js
  const ReadSmore = window.readSmore;
  const readMoreEls = document.querySelectorAll(".js-read-smore");
  ReadSmore(readMoreEls).init();

  class CustomSelect {
    constructor(container) {
      this.container = container;
      this.selectElement = container.querySelector("select");
      this.init();
    }

    init() {
      this.createSelectContainer();
      this.createOptionsList();
      this.addEventListeners();
    }

    createSelectContainer() {
      this.selectedContainer = document.createElement("DIV");
      this.selectedContainer.classList.add("select-selected");
      this.selectedContainer.innerHTML =
        this.selectElement.options[this.selectElement.selectedIndex].innerHTML;
      this.container.appendChild(this.selectedContainer);
    }

    createOptionsList() {
      this.optionsList = document.createElement("DIV");
      this.optionsList.classList.add("select-items", "select-hide");

      for (let i = 1; i < this.selectElement.length; i++) {
        const optionItem = document.createElement("DIV");
        optionItem.innerHTML = this.selectElement.options[i].innerHTML;
        optionItem.addEventListener("click", () =>
          this.updateSelect(optionItem)
        );
        this.optionsList.appendChild(optionItem);
      }

      this.container.appendChild(this.optionsList);
    }

    updateSelect(selectedItem) {
      const selectedOption = Array.from(this.selectElement.options).find(
        (option) => option.innerHTML === selectedItem.innerHTML
      );

      this.selectElement.selectedIndex = selectedOption.index;
      this.selectedContainer.innerHTML = selectedItem.innerHTML;

      const sameAsSelected =
        this.optionsList.querySelectorAll(".same-as-selected");
      sameAsSelected.forEach((item) =>
        item.classList.remove("same-as-selected")
      );
      selectedItem.classList.add("same-as-selected");

      this.closeSelect();
    }

    toggleSelect() {
      CustomSelect.closeAllSelects(this);
      this.optionsList.classList.toggle("select-hide");
      this.selectedContainer.classList.toggle("select-arrow-active");
    }

    closeSelect() {
      this.optionsList.classList.add("select-hide");
      this.selectedContainer.classList.remove("select-arrow-active");
    }

    static closeAllSelects(currentSelect) {
      document.querySelectorAll(".select-items").forEach((optionsList) => {
        if (optionsList.previousSibling !== currentSelect?.selectedContainer) {
          optionsList.classList.add("select-hide");
        }
      });

      document
        .querySelectorAll(".select-selected")
        .forEach((selectedContainer) => {
          if (selectedContainer !== currentSelect?.selectedContainer) {
            selectedContainer.classList.remove("select-arrow-active");
          }
        });
    }

    addEventListeners() {
      this.selectedContainer.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleSelect();
      });
    }
  }

  class FormSelect {
    constructor(container) {
      this.container = container;
      this.searchInput = container.querySelector(".form-input");
      this.selectOptions = container.querySelector(".form-select__options");
      this.options = container.querySelectorAll(".form-select__option");
      this.init();
    }

    init() {
      this.setupEventListeners();
      this.adjustOptionsHeight();
    }

    setupEventListeners() {
      this.searchInput.addEventListener("focus", () => this.openOptions());
      this.searchInput.addEventListener("input", () => this.filterOptions());

      this.options.forEach((option) => {
        option.addEventListener("click", () => this.selectOption(option));
      });

      document.addEventListener("click", (e) => {
        if (!this.container.contains(e.target)) {
          this.closeOptions();
        }
      });
    }

    filterOptions() {
      const filter = this.searchInput.value.toLowerCase();

      this.options.forEach((option) => {
        const text = option.textContent.toLowerCase();
        option.classList.toggle("hidden", !text.includes(filter));
      });
    }

    openOptions() {
      this.selectOptions.style.display = "block";
    }

    closeOptions() {
      this.selectOptions.style.display = "none";
    }

    selectOption(option) {
      this.searchInput.value = option.textContent;
      this.closeOptions();
    }

    adjustOptionsHeight() {
      if (this.options.length > 4) {
        this.selectOptions.style.maxHeight = "150px";
        this.selectOptions.style.overflowY = "scroll";
      } else {
        this.selectOptions.style.maxHeight = "";
        this.selectOptions.style.overflowY = "";
      }
    }
  }

  class AttrDataSelect {
    constructor(container) {
      this.container = container;
      this.trigger = container.querySelector("[data-select-trigger]");
      this.optionsContainer = container.querySelector("[data-select-options]");
      this.options = container.querySelectorAll("[data-select-option]");
      this.hiddenInput = container.querySelector("[data-select-input]");
      this.init();
    }

    init() {
      this.setupEventListeners();
      this.selectFirstOption();
    }

    setupEventListeners() {
      this.trigger.addEventListener("click", () => this.toggleOptions());

      this.options.forEach((option) => {
        option.addEventListener("click", () => this.selectOption(option));
      });

      document.addEventListener("click", (e) => {
        if (!this.container.contains(e.target)) {
          this.closeOptions();
        }
      });
    }

    toggleOptions() {
      const isOpen = this.optionsContainer.style.display === "block";

      AttrDataSelect.closeAllSelects();

      if (!isOpen) {
        this.optionsContainer.style.display = "block";
        this.trigger.classList.add("open");
      }
    }

    closeOptions() {
      this.optionsContainer.style.display = "none";
      this.trigger.classList.remove("open");
    }

    selectOption(option) {
      const value = option.getAttribute("data-value");
      const flagSrc = option.getAttribute("data-flag");

      this.trigger.querySelector("img").setAttribute("src", flagSrc);
      this.hiddenInput.value = value;

      this.closeOptions();

      this.options.forEach((opt) => opt.classList.remove("active"));
      option.classList.add("active");
    }

    selectFirstOption() {
      const firstOption = this.options[0];
      this.trigger
        .querySelector("img")
        .setAttribute("src", firstOption.getAttribute("data-flag"));
      this.hiddenInput.value = firstOption.getAttribute("data-value");
      firstOption.classList.add("active");
    }

    static closeAllSelects() {
      document
        .querySelectorAll("[data-select-options]")
        .forEach((container) => {
          container.style.display = "none";
        });

      document.querySelectorAll("[data-select-trigger]").forEach((trigger) => {
        trigger.classList.remove("open");
      });
    }
  }

  // Инициализация всех типов селектов

  // Инициализация стандартных кастомных селектов
  document.querySelectorAll(".custom-select").forEach((container) => {
    new CustomSelect(container);
  });

  // Инициализация селектов формы
  document.querySelectorAll(".form-select").forEach((container) => {
    new FormSelect(container);
  });

  // Инициализация селектов с data-атрибутами
  document.querySelectorAll("[data-custom-select]").forEach((container) => {
    new AttrDataSelect(container);
  });

  // Глобальный обработчик для закрытия всех селектов
  document.addEventListener("click", () => {
    CustomSelect.closeAllSelects();
    AttrDataSelect.closeAllSelects();
  });

  /* Tabs */
  function setupTabs(tabButtonsClass, tabContentClass) {
    const tabButtons = document.querySelectorAll(tabButtonsClass);

    tabButtons.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabClicked(tab, tabButtonsClass, tabContentClass);
      });
    });
  }

  function tabClicked(tab, tabButtonsClass, tabContentClass) {
    const allTabButtons = document.querySelectorAll(tabButtonsClass);
    allTabButtons.forEach((tab) => {
      tab.classList.remove("_active");
    });
    tab.classList.add("_active");

    const contents = document.querySelectorAll(tabContentClass);
    contents.forEach((content) => {
      content.classList.remove("_active");
    });

    const contentId = tab.getAttribute("content-id");
    const contentSelected = document.getElementById(contentId);

    contentSelected.classList.add("_active");
  }

  setupTabs(".tab-btn", ".tab-content");
  setupTabs(".tab-btn-second", ".tab-content-second");
  setupTabs(".tab-btn-third", ".tab-content-third");
  setupTabs(".tab-btn-fourth", ".tab-content-fourth");

  const scrollToTop = document.querySelector(".footer-to-top");

  if (scrollToTop)
    scrollToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

  /* Swiper */
  new Swiper(".new-blog .swiper", {
    spaceBetween: 8,
    loop: true,
    navigation: {
      nextEl: ".new-blog .new-arrow-right",
      prevEl: ".new-blog .new-arrow-left",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
    },
  });
  new Swiper(".new-mobile .swiper", {
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: ".new-mobile .new-arrow-right",
      prevEl: ".new-mobile .new-arrow-left",
    },
    breakpoints: {
      0: {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 0,
      },
      1290: {
        slidesPerView: 5,
      },
    },
  });
  new Swiper(".new-refill-services .swiper", {
    spaceBetween: 15,
    loop: true,
    navigation: {
      nextEl: ".new-refill-services .new-arrow-right",
      prevEl: ".new-refill-services .new-arrow-left",
    },
    breakpoints: {
      0: {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 5,
      },
      1290: {
        slidesPerView: "auto",
        spaceBetween: 10,
      },
    },
  });
  new Swiper(".footerPaySwiper", {
    slidesPerView: 9,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 8,
      },
      1250: {
        slidesPerView: 11,
      },
    },
  });

  new Swiper(".footerBrandSwiper", {
    slidesPerView: "auto",
    spaceBetween: 40,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        loop: true,
        spaceBetween: 20,
      },
      1250: {},
    },
  });

  new Swiper(".catalog-page-slider .swiper", {
    spaceBetween: 10,
    loop: true,
    navigation: {
      nextEl: ".catalog-page-slider .new-arrow-right",
      prevEl: ".catalog-page-slider .new-arrow-left",
    },
    breakpoints: {
      0: {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 0,
      },
      1290: {
        slidesPerView: 4,
      },
    },
  });

  new Swiper(".home-blog-swiper .swiper", {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
    },
  });

  new Swiper(".catalog-slider__best .swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".catalog-slider__best .swiper-button-next",
      prevEl: ".catalog-slider__best .swiper-button-prev",
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: ".catalog-slider__best .swiper-pagination",
      clickable: true,
    },
  });

  new Swiper(".catalog-slider__sold_slider .swiper", {
    direction: "vertical",
    slidesPerView: 2,
    spaceBetween: 10,
    navigation: {
      nextEl: ".catalog-slider__sold_slider .swiper-button-next",
      prevEl: ".catalog-slider__sold_slider .swiper-button-prev",
    },
    pagination: {
      type: "fraction",
      el: ".catalog-slider__sold_slider .swiper-pagination",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      992: {
        slidesPerView: 2,
      },
    },
  });

  new Swiper(".screen-swiper .swiper", {
    slidesPerView: 3,
    grid: {
      rows: 2,
    },
    spaceBetween: 10,
    navigation: {
      nextEl: ".screen-swiper .swiper-button-next",
      prevEl: ".screen-swiper .swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
        grid: {
          rows: 1,
        },
      },
      992: {
        slidesPerView: 2,
        grid: {
          rows: 2,
        },
      },
      1200: {
        slidesPerView: 3,
        grid: {
          rows: 2,
        },
      },
    },
  });

  new Swiper(".steam-bonus .swiper", {
    loop: false,
    slidesPerView: 3,
    spaceBetween: 10,
    navigation: {
      nextEl: ".steam-bonus .swiper-button-next",
      prevEl: ".steam-bonus .swiper-button-prev",
    },

    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      980: {
        slidesPerView: 3,
      },
    },
  });

  new Swiper(".steam-slider .swiper", {
    spaceBetween: 12,
    loop: true,
    navigation: {
      nextEl: ".steam-slider .swiper-button-next",
      prevEl: ".steam-slider .swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: "auto",
        centeredSlides: true,
      },
      1290: {
        slidesPerView: 5,
      },
    },
  });

  new Swiper(".home-main-slider .swiper", {
    spaceBetween: 12,
    loop: true,
    /* effect: "fade", */
    breakpoints: {
      0: {},
    },
    pagination: {
      el: ".home-main-slider .swiper-pagination",
      clickable: true,
    },
  });

  function gameSwiper(selector) {
    return new Swiper(selector + " .swiper", {
      spaceBetween: 25,
      loop: true,
      navigation: {
        nextEl: selector + " .swiper-button-next",
        prevEl: selector + " .swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: "auto",
          centeredSlides: true,
          spaceBetween: 5,
        },
        1290: {
          slidesPerView: 5,
        },
      },
    });
  }

  gameSwiper(".game-swiper-1");
  gameSwiper(".game-swiper-2");
  gameSwiper(".game-swiper-3");
  gameSwiper(".game-swiper-4");
  gameSwiper(".game-swiper-5");
  gameSwiper(".game-swiper-6");
  gameSwiper(".game-swiper-7");
  gameSwiper(".game-swiper-8");

  let steamGiftsBottom = new Swiper(".steam-gifts-bottom", {
    spaceBetween: 8,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    direction: "vertical",
    breakpoints: {
      0: {
        direction: "horizontal",
      },
      1200: {
        direction: "vertical",
      },
    },
  });
  let steamGiftsTop = new Swiper(".steam-gifts-top", {
    spaceBetween: 10,
    thumbs: {
      swiper: steamGiftsBottom,
    },
    pagination: {
      el: ".steam-gifts-top .swiper-pagination",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });

  /* Splide */

  let homeMarkets = document.querySelector(".home-markets .splide");
  if (homeMarkets) {
    let homeMarketsSplide = new Splide(".home-markets .splide", {
      type: "loop",
      focus: "center",
      autoWidth: true,
      perPage: 4,
      gap: 50,
      breakpoints: {
        768: {
          perPage: 1,
        },
      },
      arrows: false,
      pagination: false,
      autoScroll: {
        speed: 1,
      },
    });
    homeMarketsSplide.mount(window.splide.Extensions);
  }

  let homeReviews = document.querySelector(".home-reviews .splide");
  if (homeReviews) {
    let homeReviewsSplide = new Splide(".home-reviews .splide", {
      type: "loop",
      focus: "center",
      perPage: 4,
      gap: 20,
      mediaQuery: "min",
      breakpoints: {
        0: {
          perPage: 1,
        },
        768: {
          perPage: 2,
        },
        979: {
          perPage: 3,
        },
        1200: {
          perPage: 4,
        },
      },
      arrows: false,
      pagination: false,
    });
    homeReviewsSplide.mount(window.splide.Extensions);
  }

  let homeBlog = document.querySelector(".home-blog .splide");
  if (homeBlog) {
    let homeBlogSplide = new Splide(".home-blog .splide", {
      type: "loop",
      perPage: 2,
      arrows: false,
      pagination: false,
      gap: 22,
      mediaQuery: "min",
      breakpoints: {
        0: {
          perPage: 1,
          focus: "center",
          autoWidth: true,
        },
        768: {
          focus: "center",
          perPage: 1,
          autoWidth: true,
        },
        1200: {
          focus: 1,
          perPage: 2,
          autoWidth: false,
        },
      },
    });
    homeBlogSplide.mount();
  }

  let homeStatics = document.querySelector(".home-statics .splide");
  if (homeStatics) {
    let homeStaticsSplide = new Splide(".home-statics .splide", {
      type: "loop",
      focus: "center",
      perPage: 3,
      arrows: false,
      pagination: false,
      gap: 20,
      breakpoints: {
        979: {
          perPage: 1,
          gap: -52,
        },
      },
    });
    homeStaticsSplide.mount();
  }

  let steamHistory = document.querySelector(".steam-history .splide");
  if (steamHistory) {
    let steamHistorySplide = new Splide(".steam-history .splide", {
      type: "loop",
      focus: "center",
      autoWidth: true,
      perPage: 4,
      gap: 10,
      breakpoints: {
        0: {
          perPage: 1,
        },
        768: {
          perPage: 2,
        },
        979: {
          perPage: 3,
        },
        1200: {
          perPage: 4,
        },
      },
      arrows: false,
      pagination: false,
      autoScroll: {
        speed: 1,
      },
    });
    steamHistorySplide.mount(window.splide.Extensions);
  }

  /* Steam Mobile Swipe */
  let swiperSteamInstance = null;

  function toggleSteamSlider() {
    const container = document.querySelector(".new-steam__cards");
    const isMobile = window.innerWidth <= 768;

    if (!container) return; // Проверяем, что контейнер существует
    if (isMobile && !swiperSteamInstance) {
      // Превращаем в слайдер
      container.classList.add("swiper");

      // Создаем wrapper и оборачиваем карточки
      const cards = Array.from(container.children);
      const swiperWrapper = document.createElement("div");
      swiperWrapper.className = "swiper-wrapper";

      cards.forEach((card) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.appendChild(card);
        swiperWrapper.appendChild(slide);
      });

      container.appendChild(swiperWrapper);

      // Добавляем пагинацию
      const pagination = document.createElement("div");
      pagination.className = "swiper-pagination";
      container.appendChild(pagination);

      // Инициализируем Swiper
      swiperSteamInstance = new Swiper(".new-steam__cards", {
        slidesPerView: 1,
        spaceBetween: 16,
        pagination: {
          el: ".new-steam__cards .swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".new-steam__arrows .new-arrow-right",
          prevEl: ".new-steam__arrows .new-arrow-left",
        },
        breakpoints: {
          768: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
        },
      });
    } else if (!isMobile && swiperSteamInstance) {
      // Возвращаем к гриду
      swiperSteamInstance.destroy(true, true);
      swiperSteamInstance = null;

      container.classList.remove("swiper");

      // Извлекаем карточки из слайдов и возвращаем в контейнер
      const slides = container.querySelectorAll(".swiper-slide");
      const cards = [];

      slides.forEach((slide) => {
        const card = slide.querySelector(".new-steam__card");
        if (card) {
          cards.push(card);
        }
      });

      // Очищаем контейнер и добавляем карточки обратно
      container.innerHTML = "";
      cards.forEach((card) => {
        container.appendChild(card);
      });
    }
  }

  // Инициализация при загрузке страницы

  toggleSteamSlider();

  // Переключение при изменении размера окна
  window.addEventListener("resize", function () {
    toggleSteamSlider();
  });

  /* Search Block */
  /* const searchButton = document.querySelector(".js-search-open");


if (searchButton)
  searchButton.addEventListener("click", function (event) {
    event.preventDefault(); // Предотвращаем переход по ссылке
    searchButton.classList.toggle("active"); // Добавляем или удаляем класс active на ссылку
    searchBlock.classList.toggle("active"); // Добавляем или удаляем класс active на div
  }); */
  const searchBlock = document.querySelector(".js-search-menu");
  const headerSearchBg = document.querySelector(".header-search__bg");
  const jsSearchButton = document.querySelector(".js-search-button");

  if (headerSearchBg) {
    headerSearchBg.addEventListener("click", function () {
      searchBlock.classList.remove("active");
      jsSearchButton.classList.remove("active");
    });
  }

  /* Modal */
  // Open modal
  document.querySelectorAll("[data-modal-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.querySelector(button.dataset.modalTarget);
      modal.classList.add("active");
    });
  });

  // Close modal
  document.querySelectorAll("[data-modal-close]").forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest("[data-modal]");
      modal.classList.remove("active");
    });
  });

  // Close modal when clicking outside of modal content
  window.addEventListener("click", (event) => {
    if (event.target.hasAttribute("data-modal")) {
      event.target.classList.remove("active");
    }
  });

  if (document.querySelector(".admin-tabs-open"))
    document.querySelector(".admin-tabs-open").addEventListener("click", () => {
      document.querySelector(".admin-tabs__block").classList.add("_active");
    });

  /* Partials */
  /* Basket Counter */
  const minusBtns = document.querySelectorAll(
    ".basket-page__items .basket-page__card_minus"
  );
  const plusBtns = document.querySelectorAll(
    ".basket-page__items .basket-page__card_plus"
  );
  const valueEls = document.querySelectorAll(
    ".basket-page__items .basket-page__card_value"
  );

  if (minusBtns)
    minusBtns.forEach(function (minusBtn, index) {
      minusBtn.addEventListener("click", function () {
        let count = parseInt(valueEls[index].textContent);
        if (count > 1) {
          count--;
          valueEls[index].textContent = count;
        }
      });
    });
  if (plusBtns)
    plusBtns.forEach(function (plusBtn, index) {
      plusBtn.addEventListener("click", function () {
        let count = parseInt(valueEls[index].textContent);
        count++;
        valueEls[index].textContent = count;
      });
    });

  /* Basket Delete */
  const basketDeleteBtns = document.querySelectorAll(
    ".basket-page__card_delete"
  );
  const basketOverlays = document.querySelectorAll(".basket-page__card_over");
  const basketOverlayNos = document.querySelectorAll(
    ".basket-page__card_over_no"
  );
  if (basketDeleteBtns)
    basketDeleteBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const overlay = btn
          .closest(".basket-page__card")
          .querySelector(".basket-page__card_over");
        if (overlay) {
          overlay.classList.add("_active");
        }
      });
    });
  if (basketOverlayNos)
    basketOverlayNos.forEach(function (overlayNo) {
      overlayNo.addEventListener("click", function () {
        const overlay = overlayNo
          .closest(".basket-page__card")
          .querySelector(".basket-page__card_over");
        if (overlay) {
          overlay.classList.remove("_active");
        }
      });
    });

  /* Cart Add */
  const newCards = document.querySelectorAll(".new-card");

  if (newCards)
    newCards.forEach((item) => {
      item.addEventListener("click", function (event) {
        if (event.target.closest(".new-card__btn")) {
          const button = event.target.closest(".new-card__btn");
          const parentBlock = button.closest(".new-card__btn_block");
          if (parentBlock) {
            parentBlock.classList.toggle("_active");
          }
        }
      });
    });

  class HeaderManager {
    constructor() {
      this.headerGameBtns = document.querySelectorAll(".js-header-game-open");
      this.headerAdminBtn = document.querySelector(
        ".header__actions_admin_open"
      );
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

      this.headerAdminBtn.addEventListener("click", () =>
        this.toggleAdminMenu()
      );
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
      this.positionButton = document.querySelector(
        ".js-hamburger-header-button"
      );
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

  /* Steam */
  const steamPrices = document.querySelectorAll(".steam-discount__price");
  const steamDots = document.querySelectorAll(".steam-discount__dot");
  const steamBtns = document.querySelectorAll(".steam-discount__btn");
  const lineColor = document.querySelector(".steam-discount__line_color");

  function updateButtonClasses(index) {
    steamDots.forEach((dot, i) => {
      if (i <= index) {
        dot.classList.add("_active");
      } else {
        dot.classList.remove("_active");
      }
    });

    steamBtns.forEach((btn, i) => {
      if (i <= index) {
        btn.classList.add("_active");
      } else {
        btn.classList.remove("_active");
      }
    });

    if (lineColor) {
      const newWidth = (index + 1) * 25; // Calculate new width percentage
      lineColor.style.width = `${newWidth}%`;
    }
  }

  function togglePriceClass(index) {
    steamPrices.forEach((price, i) => {
      if (i === index) {
        price.classList.add("_active");
      } else {
        price.classList.remove("_active");
      }
    });
  }

  steamBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      updateButtonClasses(index);
      togglePriceClass(index);
    });
  });

  steamDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      updateButtonClasses(index);
      togglePriceClass(index);
    });
  });

  /* Steam Slider Line */

  function updateSwiperLineWidth() {
    const swiperSlides = document.querySelectorAll(
      ".steam-bonus__slider .swiper-slide"
    );
    const swiperLine = document.querySelector(
      ".steam-bonus__slider .swiper-line"
    );

    if (swiperSlides.length > 0 && swiperLine) {
      const slideCount = swiperSlides.length;
      const baseWidth = window.innerWidth < 980 ? 2 : 3;
      const baseWidthPercentage = 100;
      const additionalWidthPercentage =
        ((slideCount - baseWidth) / baseWidth) * 100;
      const finalWidthPercentage =
        baseWidthPercentage + additionalWidthPercentage;

      swiperLine.style.width = `calc(${finalWidthPercentage}%)`;
    }
  }

  function updateSwiperLineColorWidth() {
    const cards = document.querySelectorAll(
      ".steam-bonus__slider .swiper-slide .steam-bonus__card"
    );
    const activeCards = document.querySelectorAll(
      ".steam-bonus__slider .swiper-slide .steam-bonus__card._active"
    );
    const totalCards = cards.length;
    const percentagePerCard = 100 / totalCards;
    let activePercentage = 0;

    activeCards.forEach(() => {
      activePercentage += percentagePerCard;
    });

    const swiperLineColor = document.querySelector(
      ".steam-bonus__slider .swiper-line__color"
    );
    if (swiperLineColor) {
      swiperLineColor.style.transition = "width 0.2s ease";
      swiperLineColor.style.width = `${activePercentage}%`;
    }
  }

  function updateSwiperLine() {
    updateSwiperLineWidth();
    updateSwiperLineColorWidth();
  }

  window.addEventListener("resize", updateSwiperLine);
  updateSwiperLine();

  /* Trofei Progress */
  function updateTrofeiProgressBar() {
    const trofeiColor = document.querySelector(
      ".admin-trofei__statics_progress_color"
    );
    const trofeiCurrentValue = document.querySelector(
      ".admin-trofei__statics_progress_count ._current"
    );
    const trofeiAllValue = document.querySelector(
      ".admin-trofei__statics_progress_count ._all"
    );

    if (trofeiColor && trofeiCurrentValue && trofeiAllValue) {
      const current = parseInt(trofeiCurrentValue.textContent, 10);
      const all = parseInt(trofeiAllValue.textContent, 10);

      if (!isNaN(current) && !isNaN(all) && all > 0) {
        const percentage = (current / all) * 100;
        trofeiColor.style.width = `${percentage}%`;
      }
    }
  }

  // Call the function to update the progress bar initially
  updateTrofeiProgressBar();

  function updateDoingProgressBars() {
    const cards = document.querySelectorAll(".doing-card");

    cards.forEach((card) => {
      const percentElement = card.querySelector(".doing-card__percent");
      const progressBar = card.querySelector(".doing-card__progress");

      if (percentElement && progressBar) {
        const percent = parseInt(percentElement.textContent, 10);

        if (!isNaN(percent)) {
          progressBar.style.width = `${percent}%`;
        }
      }
    });
  }

  // Call the function to update all progress bars initially
  updateDoingProgressBars();

  /* FancyBox */
  Fancybox.bind();
});
