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
