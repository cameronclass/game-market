const scrollToTop = document.querySelector(".footer-to-top");

if (scrollToTop)
  scrollToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
