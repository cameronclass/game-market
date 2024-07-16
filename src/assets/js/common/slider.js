/* Swiper */
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
  breakpoints: {
    0: {},
  },
  pagination: {
    el: ".home-main-slider .swiper-pagination",
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
