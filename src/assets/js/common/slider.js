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

new Swiper(".home-swiper-main", {
  navigation: {
    nextEl: ".home-swiper-main .swiper-button-next",
    prevEl: ".home-swiper-main .swiper-button-prev",
  },
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
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

/* new Swiper(".home-statics-swiper .swiper", {
  slidesPerView: 3,
  centeredSlides: true,
  spaceBetween: 20,
  loop: true,

  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: -60,
    },
    768: {
      slidesPerView: 3,
    },
  },
}); */

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
});

/* Splide */
let homeMarkets = new Splide(".home-markets .splide", {
  type: "loop",
  focus: "center",
  perPage: 4,
  gap: 20,
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

homeMarkets.mount(window.splide.Extensions);

let homeReviews = new Splide(".home-reviews .splide", {
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
  autoScroll: {
    speed: 1,
  },
});

homeReviews.mount(window.splide.Extensions);

let homeBlog = new Splide(".home-blog .splide", {
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

homeBlog.mount();

let homeStatics = new Splide(".home-statics .splide", {
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
});

homeStatics.mount();
