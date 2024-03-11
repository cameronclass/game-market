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
/* copyBtn.addEventListener("click", function () {
    var textToCopy = document.querySelector(".copy-block__text");

    // Create a temporary input element
    var tempInput = document.createElement("input");
    tempInput.setAttribute("value", textToCopy.textContent);

    // Append the input to the document
    document.body.appendChild(tempInput);

    // Select the text in the input
    tempInput.select();

    // Copy the text to the clipboard
    document.execCommand("copy");

    // Remove the temporary input
    document.body.removeChild(tempInput);

    // You can add any additional feedback or actions here
    alert("Text copied: " + textToCopy.textContent);
  }); */

/* Таймер */
(function () {
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
    daysContainer.innerHTML = days + '<h3 class="timer__label">Дней</h3>';
    hoursContainer.innerHTML = hours + '<h3 class="timer__label">Часов</h3>';
    minsContainer.innerHTML = mins + '<h3 class="timer__label">Минут</h3>';
    secsContainer.innerHTML = secs + '<h3 class="timer__label">Секунд</h3>';
    // what happens when countdown ends
    if (distance < 0) {
      clearInterval(timer);
      timerInfo.classList.add("is-hidden");
      messageContainer.classList.add("is-visible");
    }
  }, 1000);
})();

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

langButton.addEventListener("click", function () {
  langDropdown.classList.toggle("active");
});
