function initSlider(e){if(!document.querySelector(`.${e} .splide`))return;const i=new Splide(`.${e} .splide`,{type:"loop",autoWidth:!0,focus:"center",perPage:5,gap:20,breakpoints:{768:{perPage:5,focus:"center"},1e3:{perPage:5,focus:"center"},1250:{perPage:5,focus:"center"}},arrows:!1,pagination:!1});i.mount();const r=document.querySelector(`.${e} .swiper-button-prev`);document.querySelector(`.${e} .swiper-button-next`).addEventListener("click",e=>{i.go("+1")}),r.addEventListener("click",e=>{i.go("-1")})}new Swiper(".footerPaySwiper",{slidesPerView:9,spaceBetween:20,loop:!0,autoplay:{delay:2500,disableOnInteraction:!1},breakpoints:{0:{slidesPerView:3},768:{slidesPerView:8},1250:{slidesPerView:11}}}),new Swiper(".footerBrandSwiper",{slidesPerView:"auto",spaceBetween:40,autoplay:{delay:2500,disableOnInteraction:!1},breakpoints:{0:{loop:!0,spaceBetween:20},1250:{}}}),new Swiper(".game-swiper-4 .swiper",{slidesPerView:6,spaceBetween:20,loop:!0,navigation:{nextEl:".game-swiper-4 .swiper-button-next",prevEl:".game-swiper-4 .swiper-button-prev"},breakpoints:{0:{slidesPerView:2,spaceBetween:15},768:{slidesPerView:4},1024:{slidesPerView:5}}}),new Swiper(".home-blog-swiper .swiper",{slidesPerView:2,spaceBetween:20,loop:!0,breakpoints:{0:{slidesPerView:1},768:{slidesPerView:2}}}),new Swiper(".catalog-slider__best .swiper",{slidesPerView:1,spaceBetween:20,navigation:{nextEl:".catalog-slider__best .swiper-button-next",prevEl:".catalog-slider__best .swiper-button-prev"},effect:"fade",fadeEffect:{crossFade:!0},pagination:{el:".catalog-slider__best .swiper-pagination",clickable:!0}}),new Swiper(".catalog-slider__sold_slider .swiper",{direction:"vertical",slidesPerView:2,spaceBetween:10,navigation:{nextEl:".catalog-slider__sold_slider .swiper-button-next",prevEl:".catalog-slider__sold_slider .swiper-button-prev"},pagination:{type:"fraction",el:".catalog-slider__sold_slider .swiper-pagination"}}),initSlider("game-swiper-1"),initSlider("game-swiper-2"),initSlider("game-swiper-3"),initSlider("game-swiper-4");let homeMainSlider=document.querySelector(".hot-slider");if(homeMainSlider){new Splide(".hot-slider",{type:"loop",perPage:1,gap:50,breakpoints:{768:{perPage:1}},arrows:!1,pagination:!0}).mount()}let giftSlider=document.querySelector(".gift-slider");if(giftSlider){new Splide(".gift-slider",{type:"loop",focus:"center",perPage:5,gap:10,autoWidth:!0,breakpoints:{768:{perPage:1}},arrows:!1,pagination:!0}).mount()}let topUpSlider=document.querySelector(".topup-slider");if(topUpSlider){new Splide(".topup-slider",{type:"loop",focus:"center",perPage:1,gap:-100,breakpoints:{768:{perPage:1}},arrows:!0,pagination:!1}).mount()}let homeMarkets=document.querySelector(".home-markets .splide");if(homeMarkets){new Splide(".home-markets .splide",{type:"loop",focus:"center",autoWidth:!0,perPage:4,gap:50,breakpoints:{768:{perPage:1}},arrows:!1,pagination:!1,autoScroll:{speed:1}}).mount(window.splide.Extensions)}let homeReviews=document.querySelector(".home-reviews .splide");if(homeReviews){new Splide(".home-reviews .splide",{type:"loop",focus:"center",perPage:4,breakpoints:{768:{perPage:1}},arrows:!1,pagination:!1}).mount(window.splide.Extensions)}let homeBlog=document.querySelector(".home-blog .splide");if(homeBlog){new Splide(".home-blog .splide",{type:"loop",perPage:2,arrows:!1,pagination:!1,gap:22,breakpoints:{768:{perPage:1}}}).mount()}let homeStatics=document.querySelector(".home-statics .splide");if(homeStatics){new Splide(".home-statics .splide",{type:"loop",focus:"center",perPage:3,arrows:!1,pagination:!1,gap:20,breakpoints:{768:{perPage:1,gap:-52}}}).mount()}let cartAboutSwiper=document.querySelector(".screen-swiper .splide");if(cartAboutSwiper){new Splide(".screen-swiper .splide",{type:"loop",focus:1,height:"340px",perPage:1,perMove:1,gap:10,pagination:!1,grid:{rows:2,cols:3,gap:{row:"10px",col:"10px"}},breakpoints:{1200:{perPage:1,perMove:1,grid:{rows:2,cols:2,gap:{row:"10px",col:"10px"}}},979:{perPage:1,perMove:1,height:"170px",grid:{rows:1,cols:2,gap:{row:"10px",col:"10px"}}}}}).mount()}