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

// future date for the countdown
const countDownDate = new Date(2024, 3, 24, 10).getTime();
const timerInfo = document.querySelector(".timer__info");
const daysContainer = document.querySelector(".timer__day");
const hoursContainer = document.querySelector(".timer__hours");
const minsContainer = document.querySelector(".timer__minutes");
const secsContainer = document.querySelector(".timer__seconds");
const messageContainer = document.querySelector(".timer__message");

// updating the countdown
const timer = setInterval(() => {
  // today date and time
  const now = new Date().getTime();
  // distance between now an the count down date
  const distance = countDownDate - now;
  // calculate days, hours, mins, and secs
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((distance % (1000 * 60)) / 1000);
  // insert the datetime data
  if (daysContainer)
    daysContainer.innerHTML = days + '<h3 class="timer__label">Дней</h3>';
  if (hoursContainer)
    hoursContainer.innerHTML = hours + '<h3 class="timer__label">Часов</h3>';
  if (minsContainer)
    minsContainer.innerHTML = mins + '<h3 class="timer__label">Минут</h3>';
  if (secsContainer)
    secsContainer.innerHTML = secs + '<h3 class="timer__label">Секунд</h3>';
  // what happens when countdown ends
  if (distance < 0) {
    clearInterval(timer);
    if (timerInfo) timerInfo.classList.add("is-hidden");
    if (messageContainer) messageContainer.classList.add("is-visible");
  }
}, 1000);

/* Hamburger menu */
const hamburgerButton = document.querySelector(".js-hamburger");
const hamburgerMenu = document.querySelector(".js-hamburger-menu");

if (hamburgerButton)
  hamburgerButton.addEventListener("click", function () {
    this.classList.toggle("_active");
    hamburgerMenu.classList.toggle("active");
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
const headerAdminBtn = document.querySelector(".header__actions_admin");
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
