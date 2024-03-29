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
    timerInfo.classList.add("is-hidden");
    messageContainer.classList.add("is-visible");
  }
}, 1000);

/* Hamburger menu */
const hamburgerButton = document.querySelector(".js-hamburger");
const hamburgerMenu = document.querySelector(".js-hamburger-menu");
hamburgerButton.addEventListener("click", function () {
  this.classList.toggle("is-active");
  hamburgerMenu.classList.toggle("active");
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

function createCustomSelects() {
  const customSelects = document.querySelectorAll(".custom-select");
  customSelects.forEach((customSelect) => {
    const selectElement = customSelect.querySelector("select");
    createSelectContainer(customSelect, selectElement);
    createOptionsList(customSelect, selectElement);
    addSelectEventListeners(customSelect);
  });
}

// Функция для создания контейнера выбранного элемента
function createSelectContainer(customSelect, selectElement) {
  const selectedContainer = document.createElement("DIV");
  selectedContainer.classList.add("select-selected");
  selectedContainer.innerHTML =
    selectElement.options[selectElement.selectedIndex].innerHTML;
  customSelect.appendChild(selectedContainer);
}

// Функция для создания списка опций
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

// Функция для обновления выбранного элемента и селекта
function updateSelectBox(selectedItem) {
  const selectBox = selectedItem.parentNode.parentNode.querySelector("select");
  const selectedContainer = selectedItem.parentNode.previousSibling;
  selectBox.selectedIndex = Array.from(selectedBox.options).findIndex(
    (option) => option.innerHTML === selectedItem.innerHTML
  );
  selectedContainer.innerHTML = selectedItem.innerHTML;
  const sameAsSelected =
    selectedItem.parentNode.querySelectorAll(".same-as-selected");
  sameAsSelected.forEach((item) => item.classList.remove("same-as-selected"));
  selectedItem.classList.add("same-as-selected");
  selectedContainer.click();
}

// Функция для добавления обработчиков событий
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

// Функция для закрытия всех селектов
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

// Добавляем обработчик события для закрытия всех селектов при клике в любом месте документа
document.addEventListener("click", function () {
  closeAllSelects(null);
});

createCustomSelects();

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

/* Accordion */
const accordionItem = document.getElementsByClassName("accordion-js__item");
const accordionBtn = document.getElementsByClassName("accordion-js__head");

for (let i = 0; i < accordionBtn.length; i++) {
  accordionBtn[i].addEventListener("click", function () {
    accordionItem[i].classList.toggle("active");
  });
}
