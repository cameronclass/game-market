document.addEventListener("DOMContentLoaded", function () {
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

  let galleryThumbs = new Swiper(".home-swiper-thumbs", {
    centeredSlides: false,
    centeredSlidesBounds: false,
    slidesPerView: 3,
    watchOverflow: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    direction: "vertical",
  });

  let galleryMain = new Swiper(".home-swiper-main", {
    watchOverflow: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    preventInteractionOnTransition: true,
    navigation: {
      nextEl: ".home-swiper-main .swiper-button-next",
      prevEl: ".home-swiper-main .swiper-button-prev",
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    thumbs: {
      swiper: galleryThumbs,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  galleryMain.on("slideChangeTransitionStart", function () {
    galleryThumbs.slideTo(galleryMain.activeIndex);
  });

  galleryThumbs.on("transitionStart", function () {
    galleryMain.slideTo(galleryThumbs.activeIndex);
  });
});
