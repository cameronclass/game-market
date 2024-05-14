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

new Swiper(".game-swiper-4 .swiper", {
  slidesPerView: 6,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: ".game-swiper-4 .swiper-button-next",
    prevEl: ".game-swiper-4 .swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 5,
    },
  },
});

new Swiper(".home-blog-swiper .swiper", {
  slidesPerView: 2,
  spaceBetween: 20,
  loop: true,

  /* autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  }, */

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
});

/* Splide */
function initSlider(sliderClass) {
  const gameSwiper = document.querySelector(`.${sliderClass} .splide`);
  if (!gameSwiper) return;

  const gameSlider = new Splide(`.${sliderClass} .splide`, {
    type: "loop",
    autoWidth: true,
    focus: "center",
    perPage: 5,
    gap: 20,
    breakpoints: {
      768: {
        perPage: 2,
        focus: "center",
      },
      1000: {
        perPage: 3,
        focus: "center",
      },
      1250: {
        perPage: 4,
        focus: "center",
      },
    },
    arrows: false,
    pagination: false,
  });
  gameSlider.mount();

  const btnPrev = document.querySelector(`.${sliderClass} .swiper-button-prev`);
  const btnNext = document.querySelector(`.${sliderClass} .swiper-button-next`);

  btnNext.addEventListener("click", (e) => {
    gameSlider.go("+1");
  });

  btnPrev.addEventListener("click", (e) => {
    gameSlider.go("-1");
  });
}

initSlider("game-swiper-1");
initSlider("game-swiper-2");
initSlider("game-swiper-3");
initSlider("game-swiper-4");


let homeMainSlider = document.querySelector(".hot-slider");
if (homeMainSlider) {
  let homeMainSplide = new Splide(".hot-slider", {
    type: "loop",
    perPage: 1,
    gap: 50,
    breakpoints: {
      768: {
        perPage: 1,
      },
    },
    arrows: false,
    pagination: true,
  });
  homeMainSplide.mount();
}

let giftSlider = document.querySelector(".gift-slider");
if (giftSlider) {
  let giftSplide = new Splide(".gift-slider", {
    type: "loop",
    focus: "center",
    perPage: 5,
    gap: 10,
    autoWidth: true,
    breakpoints: {
      768: {
        perPage: 1,
      },
    },
    arrows: false,
    pagination: true,
  });
  giftSplide.mount();
}

let topUpSlider = document.querySelector(".topup-slider");
if (topUpSlider) {
  let topUpSplide = new Splide(".topup-slider", {
    type: "loop",
    focus: "center",
    perPage: 1,
    gap: -100,
    breakpoints: {
      768: {
        perPage: 1,
      },
    },
    arrows: true,
    pagination: false,
  });
  topUpSplide.mount();
}

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
    breakpoints: {
      768: {
        perPage: 1,
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
    breakpoints: {
      768: {
        perPage: 1,
      },
    },
  });
  homeBlogSplide.mount();
}

let homeStatics = document.querySelector(".home-statics .splide");
if (homeStatics) {
  let homeStatics = new Splide(".home-statics .splide", {
    type: "loop",
    focus: "center",
    perPage: 3,
    arrows: false,
    pagination: false,
    gap: 20,
    breakpoints: {
      768: {
        perPage: 1,
        gap: -52,
      },
    },
  });
  homeStatics.mount();
}

let cartAboutSwiper = document.querySelector(".screen-swiper .splide");
if (cartAboutSwiper) {
  let cartAboutSplide = new Splide(".screen-swiper .splide", {
    type: "loop",
    focus: 1,
    height: "340px",
    perPage: 1,
    perMove: 1,
    gap: 10,
    pagination: false,
    grid: {
      rows: 2,
      cols: 3,
      gap: {
        row: "10px",
        col: "10px",
      },
    },
    breakpoints: {
      1200: {
        perPage: 1,
        perMove: 1,
        grid: {
          rows: 2,
          cols: 2,
          gap: {
            row: "10px",
            col: "10px",
          },
        },
      },
      979: {
        perPage: 1,
        perMove: 1,
        height: "170px",
        grid: {
          rows: 1,
          cols: 2,
          gap: {
            row: "10px",
            col: "10px",
          },
        },
      },
    },
  });
  cartAboutSplide.mount();
}
