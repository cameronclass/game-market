/* Search Block */
/* const searchButton = document.querySelector(".js-search-open");


if (searchButton)
  searchButton.addEventListener("click", function (event) {
    event.preventDefault(); // Предотвращаем переход по ссылке
    searchButton.classList.toggle("active"); // Добавляем или удаляем класс active на ссылку
    searchBlock.classList.toggle("active"); // Добавляем или удаляем класс active на div
  }); */
const searchBlock = document.querySelector(".js-search-menu");
const headerSearchBg = document.querySelector(".header-search__bg");
const jsSearchButton = document.querySelector(".js-search-button");

if (headerSearchBg) {
  headerSearchBg.addEventListener("click", function () {
    searchBlock.classList.remove("active");
    jsSearchButton.classList.remove("active");
  });
}
