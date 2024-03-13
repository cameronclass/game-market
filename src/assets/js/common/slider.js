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
});

new Swiper(".game-swiper-2 .swiper", {
  slidesPerView: 4,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: ".game-swiper-2 .swiper-button-next",
    prevEl: ".game-swiper-2 .swiper-button-prev",
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
});

new Swiper(".game-swiper-4 .swiper", {
  slidesPerView: 6,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: ".game-swiper-4 .swiper-button-next",
    prevEl: ".game-swiper-4 .swiper-button-prev",
  },
});

new Swiper(".home-statics-swiper .swiper", {
  slidesPerView: 3,
  centeredSlides: true,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});

new Swiper(".home-markets-swiper .swiper", {
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 40,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});

new Swiper(".home-blog-swiper .swiper", {
  slidesPerView: 2,
  spaceBetween: 20,
  loop: true,

  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});

new Swiper(".home-reviews-swiper .swiper", {
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 40,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
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
    el: ".catalog-slider__sold_slider .swiper-pagination",
    clickable: true,
  },
});
