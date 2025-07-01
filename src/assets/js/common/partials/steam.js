

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
