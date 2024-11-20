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

/* Копия не работает пока */
let copyBtn = document.querySelector(".copy-js");

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

/* Hamburger menu */
const headerMenu = document.querySelector(".header__menu");
const hamburgerButton = document.querySelector(".js-hamburger");
const hamburgerMenu = document.querySelector(".js-hamburger-menu");
const hamburgerMenuClose = document.querySelector(".js-hamburger-close");

const logoMenuBg = document.querySelector(".logo-menu__bg");

if (logoMenuBg) {
  logoMenuBg.addEventListener("click", function () {
    hamburgerMenu.classList.remove("active");
    hamburgerButton.classList.remove("active");
    headerMenu.classList.remove("active");
  });
}
if (hamburgerMenuClose) {
  hamburgerMenuClose.addEventListener("click", function () {
    hamburgerMenu.classList.remove("active");
    hamburgerButton.classList.remove("active");
    headerMenu.classList.remove("active");
  });
}

/* Header Game */
const headerGameBtns = document.querySelectorAll(".js-header-game-open");

if (headerGameBtns)
  headerGameBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.add("remove");
    });
  });

/* Header Admin */
const headerAdminBtn = document.querySelector(".header__actions_admin_open");
const headerAdminDrop = document.querySelector(".header__actions_admin_drop");

if (headerAdminBtn) {
  headerAdminBtn.addEventListener("click", (event) => {
    headerAdminBtn.classList.toggle("_active");
    headerAdminDrop.classList.toggle("_active");
  });

  window.addEventListener("click", (event) => {
    if (
      !headerAdminBtn.contains(event.target) &&
      !headerAdminDrop.contains(event.target)
    ) {
      headerAdminBtn.classList.remove("_active");
      headerAdminDrop.classList.remove("_active");
    }
  });
}

/* Language button */
const langButton = document.querySelector(".header__lang_button");
const langDropdown = document.querySelector(".header__lang_dropdown");

if (langButton)
  langButton.addEventListener("click", function () {
    langDropdown.classList.toggle("active");
  });

// Init JS
const ReadSmore = window.readSmore;

const readMoreEls = document.querySelectorAll(".js-read-smore");

ReadSmore(readMoreEls).init();

/* Select */

function createCustomSelects() {
  const customSelects = document.querySelectorAll(".custom-select");
  customSelects.forEach((customSelect) => {
    const selectElement = customSelect.querySelector("select");
    createSelectContainer(customSelect, selectElement);
    createOptionsList(customSelect, selectElement);
    addSelectEventListeners(customSelect);
  });
}

function createSelectContainer(customSelect, selectElement) {
  const selectedContainer = document.createElement("DIV");
  selectedContainer.classList.add("select-selected");
  selectedContainer.innerHTML =
    selectElement.options[selectElement.selectedIndex].innerHTML;
  customSelect.appendChild(selectedContainer);
}

function createOptionsList(customSelect, selectElement) {
  const optionsList = document.createElement("DIV");
  optionsList.classList.add("select-items", "select-hide");
  for (let i = 1; i < selectElement.length; i++) {
    const optionItem = document.createElement("DIV");
    optionItem.innerHTML = selectElement.options[i].innerHTML;
    optionItem.addEventListener("click", function (event) {
      updateSelectBox(this);
    });
    optionsList.appendChild(optionItem);
  }
  customSelect.appendChild(optionsList);
}

function updateSelectBox(selectedItem) {
  const selectBox = selectedItem.parentNode.parentNode.querySelector("select");
  const selectedContainer = selectedItem.parentNode.previousSibling;
  selectBox.selectedIndex = Array.from(selectBox.options).findIndex(
    (option) => option.innerHTML === selectedItem.innerHTML
  );
  selectedContainer.innerHTML = selectedItem.innerHTML;
  const sameAsSelected =
    selectedItem.parentNode.querySelectorAll(".same-as-selected");
  sameAsSelected.forEach((item) => item.classList.remove("same-as-selected"));
  selectedItem.classList.add("same-as-selected");
  selectedContainer.click();
}

function addSelectEventListeners(customSelect) {
  const selectedContainer = customSelect.querySelector(".select-selected");
  selectedContainer.addEventListener("click", function (event) {
    event.stopPropagation();
    closeAllSelects(this);
    const optionsList = this.nextSibling;
    optionsList.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelects(currentSelect) {
  const allOptionsLists = document.querySelectorAll(".select-items");
  const allSelectedContainers = document.querySelectorAll(".select-selected");
  allOptionsLists.forEach((optionsList) => {
    if (optionsList.previousSibling !== currentSelect) {
      optionsList.classList.add("select-hide");
    }
  });
  allSelectedContainers.forEach((selectedContainer) => {
    if (selectedContainer !== currentSelect) {
      selectedContainer.classList.remove("select-arrow-active");
    }
  });
}

document.addEventListener("click", function () {
  closeAllSelects(null);
});

createCustomSelects();

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

window.addEventListener("scroll", function () {
  let fixedCard = document.querySelector(".fixed-card");

  if (fixedCard)
    if (window.scrollY >= 600) {
      fixedCard.classList.add("active");
    } else {
      fixedCard.classList.remove("active");
    }
});

const scrollToTop = document.querySelector(".footer-to-top");

if (scrollToTop)
  scrollToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

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
const basketDeleteBtns = document.querySelectorAll(".basket-page__card_delete");
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
/* FancyBox */
Fancybox.bind();

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

/* Form Select */
const formSelects = document.querySelectorAll(".form-select");

formSelects.forEach((formSelect) => {
  const searchInput = formSelect.querySelector(".form-input");
  const selectOptions = formSelect.querySelector(".form-select__options");
  const options = formSelect.querySelectorAll(".form-select__option");

  searchInput.addEventListener("focus", () => {
    selectOptions.style.display = "block";
  });

  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    options.forEach((option) => {
      const text = option.textContent.toLowerCase();
      if (text.includes(filter)) {
        option.classList.remove("hidden");
      } else {
        option.classList.add("hidden");
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".form-select")) {
      selectOptions.style.display = "none";
    }
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      searchInput.value = option.textContent;
      selectOptions.style.display = "none";
    });
  });

  if (options.length > 4) {
    selectOptions.style.maxHeight = "150px";
    selectOptions.style.overflowY = "scroll";
  } else {
    selectOptions.style.maxHeight = "";
    selectOptions.style.overflowY = "";
  }
});

/* Catalog */
function initializeCatalog() {
  const catalogTabWrapper = document.querySelectorAll(".catalog__tabs");
  const catalogButtons = document.querySelectorAll(".catalog__btn");
  const catalogContents = document.querySelectorAll(".catalog__tabs_content");
  const catalogBgs = document.querySelectorAll(".catalog__bg");

  catalogButtons.forEach((button, index) => {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      catalogContents[index].classList.toggle("active");
      catalogBgs[index].classList.toggle("active");
      catalogTabWrapper[index].classList.toggle("active");
    });
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".catalog__tabs")) {
      catalogContents.forEach((content) => {
        content.classList.remove("active");
      });
      catalogBgs.forEach((bg) => {
        bg.classList.remove("active");
      });
      catalogTabWrapper.forEach((wrap) => {
        wrap.classList.remove("active");
      });
    }
  });

  const catalogTabsContent = document.querySelector(".catalog__tabs_content");
  if (catalogTabsContent) {
    const catalogTabs = catalogTabsContent.querySelectorAll(".catalog__tab");
    const catalogTabReturns = catalogTabsContent.querySelectorAll(
      ".catalog__tab_drop_return"
    );

    catalogTabs.forEach((tab) => {
      const catalogTabBtn = tab.querySelector(".catalog__tab_btn");
      const catalogTabDrop = tab.querySelector(".catalog__tab_drop");

      catalogTabBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        const isActive = catalogTabBtn.classList.contains("_active");

        catalogTabWrapper.forEach((item) => {
          item.classList.add("active");
        });
        catalogBgs.forEach((item) => {
          item.classList.add("active");
        });

        catalogTabs.forEach((innerTab) => {
          innerTab.classList.remove("_active");
          innerTab
            .querySelector(".catalog__tab_btn")
            .classList.remove("_active");
          innerTab
            .querySelector(".catalog__tab_drop")
            .classList.remove("_active");
        });

        if (!isActive) {
          tab.classList.add("_active");
          catalogTabBtn.classList.add("_active");
          catalogTabDrop.classList.add("_active");
        }
      });

      catalogTabReturns.forEach((returnBtn) => {
        returnBtn.addEventListener("click", () => {
          catalogTabs.forEach((tab) => {
            tab.classList.remove("_active");
            tab.querySelector(".catalog__tab_btn").classList.remove("_active");
            tab.querySelector(".catalog__tab_drop").classList.remove("_active");
            /* catalogTabWrapper.forEach((item) => {
              item.classList.remove("active");
            });
            catalogBgs.forEach((item) => {
              item.classList.remove("active");
            }); */
          });
        });
      });
    });

    document.addEventListener("click", (event) => {
      if (!catalogTabsContent.contains(event.target)) {
        catalogTabs.forEach((tab) => {
          tab.classList.remove("_active");
          tab.querySelector(".catalog__tab_btn").classList.remove("_active");
          tab.querySelector(".catalog__tab_drop").classList.remove("_active");
        });
      }
    });
  }
}

function checkScreenSize() {
  if (window.innerWidth <= 768) {
    initializeCatalog();
  } else {
    // Здесь можно добавить код для отключения функциональности на десктопе, если это необходимо
    // Например, удалить все обработчики событий или скрыть элементы
    /* console.log("Десктопная версия, функциональность отключена."); */
  }
}

// Инициализация при загрузке страницы
checkScreenSize();

// Добавление обработчика события изменения размера окна
window.addEventListener("resize", checkScreenSize);

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

/* Reviews Buttons */
let lastElements = [];
let lastButton = null;
const addClassBtns = document.querySelectorAll(".add-class-btn");

if (addClassBtns)
  addClassBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-class-target");
      const classToAdd = button.getAttribute("data-class-name");

      // Найти все целевые элементы с data-class-element
      const targetElements = document.querySelectorAll(
        `[data-class-element="${targetId}"]`
      );

      if (targetElements.length > 0 && classToAdd) {
        const isActive = Array.from(targetElements).some((el) =>
          el.classList.contains(classToAdd)
        );

        if (isActive) {
          // Удалить класс у всех целевых элементов и кнопки
          targetElements.forEach((el) => el.classList.remove(classToAdd));
          button.classList.remove(classToAdd);
          // Очистить массив lastElements и сбросить lastButton
          lastElements = [];
          lastButton = null;
        } else {
          // Удалить класс с последних элементов и кнопки, если они были
          if (lastElements.length > 0) {
            lastElements.forEach((el) => el.classList.remove(classToAdd));
          }
          if (lastButton && lastButton !== button) {
            lastButton.classList.remove(classToAdd);
          }

          // Добавить класс у текущих целевых элементов и кнопки
          targetElements.forEach((el) => el.classList.add(classToAdd));
          button.classList.add(classToAdd);

          // Обновить последний измененный набор элементов и кнопку
          lastElements = Array.from(targetElements);
          lastButton = button;
        }
      }
    });
  });

const reviewCards = document.querySelectorAll(".home-other-reviews__card");
const aboutReviewsBlock = document.querySelector(".about-reviews__block");

let lastClickedCard = null;
if (reviewCards)
  reviewCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!aboutReviewsBlock) return;

      if (card === lastClickedCard) {
        // Если клик по тому же самому элементу, переключаем класс active
        aboutReviewsBlock.classList.toggle("active");
        lastClickedCard = null;
      } else {
        // Если клик по другому элементу, просто добавляем класс active
        aboutReviewsBlock.classList.add("active");
        lastClickedCard = card;
      }
    });
  });

document.addEventListener("click", function (event) {
  const copyButton = event.target.closest("[data-copy-btn]");

  if (copyButton) {
    const textElement = document.querySelector(
      copyButton.getAttribute("data-copy-text")
    );

    if (textElement) {
      const textToCopy = textElement.textContent;
      const tempInput = document.createElement("input");
      tempInput.value = textToCopy;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      alert("Текст скопирован: " + textToCopy);
    }
  }
});

/* clip path */

function updateClipPath() {
  const elements = document.querySelectorAll(".clip-element");

  elements.forEach((element) => {
    const clipPathValue = element.getAttribute("data-clip-path"); // Получаем значение clip-path из data-атрибута
    const fixedPoint = 40; // Фиксированное значение в пикселях
    const width = element.offsetWidth; // Получаем текущую ширину элемента
    const position = element.getAttribute("data-clip-position"); // Получаем позицию (left или right)

    let updatedClipPathValue;

    if (position === "right") {
      // Позиция от правого края
      const rightPoint = width - fixedPoint; // Позиция от правого края
      updatedClipPathValue = clipPathValue.replace(
        /(\d+)px/,
        `${rightPoint}px`
      );
    } else if (position === "left") {
      // Позиция от левого края
      const leftPoint = fixedPoint; // Позиция от левого края
      updatedClipPathValue = clipPathValue.replace(/(\d+)px/, `${leftPoint}px`);
    }

    element.style.clipPath = updatedClipPathValue;
  });
}

// Обновляем clip-path при загрузке и изменении размера окна
window.addEventListener("load", updateClipPath);
window.addEventListener("resize", updateClipPath);
