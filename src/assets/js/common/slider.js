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

new Swiper(".game-swiper-1 .swiper", {
  slidesPerView: 4,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: ".game-swiper-1 .swiper-button-next",
    prevEl: ".game-swiper-1 .swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

new Swiper(".game-swiper-2 .swiper", {
  slidesPerView: 4,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: ".game-swiper-2 .swiper-button-next",
    prevEl: ".game-swiper-2 .swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

new Swiper(".game-swiper-3 .swiper", {
  slidesPerView: 4,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: ".game-swiper-3 .swiper-button-next",
    prevEl: ".game-swiper-3 .swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
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
  spaceBetween: 20,
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

let homeMainSlider = document.querySelector(".hot-slider");
if (homeMainSlider) {
  new Splide(".hot-slider", {
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
  }).mount(window.splide.Extensions);
}

let homeMarkets = document.querySelector(".home-markets .splide");
if (homeMarkets) {
  new Splide(".home-markets .splide", {
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
  }).mount(window.splide.Extensions);
}

let homeReviews = document.querySelector(".home-reviews .splide");
if (homeReviews) {
  new Splide(".home-reviews .splide", {
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
  }).mount(window.splide.Extensions);
}

let homeBlog = document.querySelector(".home-blog .splide");
if (homeBlog) {
  new Splide(".home-blog .splide", {
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
  }).mount(window.splide.Extensions);
}

let homeStatics = document.querySelector(".home-statics .splide");
if (homeStatics) {
  new Splide(".home-statics .splide", {
    type: "loop",
    focus: "center",
    perPage: 3,
    arrows: false,
    pagination: false,
    gap: 22,
    breakpoints: {
      768: {
        perPage: 1,
        gap: -52,
      },
    },
  }).mount(window.splide.Extensions);
}

let cartAboutSwiper = document.querySelector(".screen-swiper .splide");
if (cartAboutSwiper)
  new Splide(".screen-swiper .splide", {
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
  }).mount(window.splide.Extensions);
