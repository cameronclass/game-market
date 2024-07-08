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
const countDownDate = new Date(2025, 0, 1, 10).getTime();
const timerInfo = document.querySelector(".timer__info");
const daysContainer = document.querySelector(".timer__day");
const hoursContainer = document.querySelector(".timer__hours");
const minsContainer = document.querySelector(".timer__minutes");
const secsContainer = document.querySelector(".timer__seconds");
const messageContainer = document.querySelector(".timer__message");

const formatNumber = (number) => {
  return `<div class="timer__wrapper">${number
    .toString()
    .split("")
    .map(
      (digit) =>
        `<span class="timer__digit"><span class="timer__digit_num"> ${digit} </span></span>`
    )
    .join("")}</div>`;
};

const updateTimer = () => {
  const now = new Date().getTime();
  const distance = countDownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((distance % (1000 * 60)) / 1000);

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
    clearInterval(timer);
    if (timerInfo) timerInfo.classList.add("is-hidden");
    if (messageContainer) messageContainer.classList.add("is-visible");
  }
};

const timer = setInterval(updateTimer, 1000);

updateTimer();

/* Hamburger menu */
const headerMenu = document.querySelector(".header__menu");
const hamburgerButton = document.querySelector(".js-hamburger");
const hamburgerMenu = document.querySelector(".js-hamburger-menu");
const hamburgerMenuClose = document.querySelector(".js-hamburger-close");

if (hamburgerButton)
  hamburgerButton.addEventListener("click", function () {
    this.classList.toggle("_active");
    hamburgerMenu.classList.toggle("active");
    headerMenu.classList.toggle("active");
  });

if (hamburgerMenuClose)
  hamburgerMenuClose.addEventListener("click", function () {
    hamburgerMenu.classList.remove("active");
    hamburgerButton.classList.remove("_active");
    headerMenu.classList.remove("active");
  });

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

if (headerAdminBtn)
  headerAdminBtn.addEventListener("click", () => {
    headerAdminBtn.classList.toggle("_active");
    headerAdminDrop.classList.toggle("_active");
  });

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

/* catalog mobile */
const catalogButtons = document.querySelectorAll(".catalog__btn");
const catalogContents = document.querySelectorAll(".catalog__tabs_content");
const catalogBgs = document.querySelectorAll(".catalog__bg");

// Добавляем обработчик события для каждой кнопки в коллекции
catalogButtons.forEach((button, index) => {
  button.addEventListener("click", function (event) {
    event.stopPropagation(); // Предотвращаем распространение события на родительские элементы
    catalogContents[index].classList.add("active");
    catalogBgs[index].classList.add("active");
  });
});

document.addEventListener("click", function (event) {
  // Перебираем все контенты и фоны и убираем класс active
  catalogContents.forEach((content) => {
    content.classList.remove("active");
  });
  catalogBgs.forEach((bg) => {
    bg.classList.remove("active");
  });
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
const searchButton = document.querySelector(".js-search-open");
const searchBlock = document.querySelector(".js-search-menu");

if (searchButton)
  searchButton.addEventListener("click", function (event) {
    event.preventDefault(); // Предотвращаем переход по ссылке
    searchButton.classList.toggle("active"); // Добавляем или удаляем класс active на ссылку
    searchBlock.classList.toggle("active"); // Добавляем или удаляем класс active на div
  });

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

const mainLogin = document.querySelector(".main-login");
const closeButton = document.querySelector(".main-login__close");
const exitButton = document.querySelector(".header__actions_admin_item_exit");

if (mainLogin && closeButton) {
  closeButton.addEventListener("click", () => {
    mainLogin.classList.remove("_active");
  });
}

if (mainLogin && exitButton) {
  exitButton.addEventListener("click", () => {
    mainLogin.classList.add("_active");
  });
}

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

const catalogTabsContent = document.querySelector(".catalog__tabs_content");
const catalogTabs = catalogTabsContent.querySelectorAll(".catalog__tab");

if (catalogTabs)
  catalogTabs.forEach((tab) => {
    const catalogTabBtn = tab.querySelector(".catalog__tab_btn");
    const catalogTabDrop = tab.querySelector(".catalog__tab_drop");

    catalogTabBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      const isActive = catalogTabBtn.classList.contains("_active");

      catalogTabs.forEach((innerTab) => {
        innerTab.querySelector(".catalog__tab_btn").classList.remove("_active");
        innerTab
          .querySelector(".catalog__tab_drop")
          .classList.remove("_active");
      });

      if (!isActive) {
        catalogTabBtn.classList.add("_active");
        catalogTabDrop.classList.add("_active");
      }
    });
  });

if (catalogTabsContent)
  document.addEventListener("click", (event) => {
    if (!catalogTabsContent.contains(event.target)) {
      catalogTabs.forEach((tab) => {
        tab.querySelector(".catalog__tab_btn").classList.remove("_active");
        tab.querySelector(".catalog__tab_drop").classList.remove("_active");
      });
    }
  });
