document.addEventListener("DOMContentLoaded", function () {
  let footerPay = new Swiper(".footerPaySwiper", {
    slidesPerView: 9,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 5,
      },
      768: {
        slidesPerView: 8,
      },
      1250: {
        slidesPerView: 11,
      },
    },
  });

  let footerBrand = new Swiper(".footerBrandSwiper", {
    slidesPerView: "auto",
    spaceBetween: 40,
    /* breakpoints: {
      0: {
        centeredSlides: true,
      },
      1250: {
        centeredSlides: false,
      },
    }, */
  });
});
