/* Language button */
const langButton = document.querySelector(".header__lang_button");
const langDropdown = document.querySelector(".header__lang_dropdown");

if (langButton)
  langButton.addEventListener("click", function () {
    langDropdown.classList.toggle("active");
  });

/* Catalog */
function initializeCatalog() {
  const catalogTabWrapper = document.querySelectorAll(".catalog__tabs");
  const catalogButtons = document.querySelectorAll(".catalog__btn");
  const catalogContents = document.querySelectorAll(".catalog__tabs_content");
  const catalogBgs = document.querySelectorAll(".catalog__bg");

  catalogButtons.forEach((button, index) => {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      catalogContents[index].classList.toggle("active");
      catalogBgs[index].classList.toggle("active");
      catalogTabWrapper[index].classList.toggle("active");
    });
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".catalog__tabs")) {
      catalogContents.forEach((content) => {
        content.classList.remove("active");
      });
      catalogBgs.forEach((bg) => {
        bg.classList.remove("active");
      });
      catalogTabWrapper.forEach((wrap) => {
        wrap.classList.remove("active");
      });
    }
  });

  const catalogTabsContent = document.querySelector(".catalog__tabs_content");
  if (catalogTabsContent) {
    const catalogTabs = catalogTabsContent.querySelectorAll(".catalog__tab");
    const catalogTabReturns = catalogTabsContent.querySelectorAll(
      ".catalog__tab_drop_return"
    );

    catalogTabs.forEach((tab) => {
      const catalogTabBtn = tab.querySelector(".catalog__tab_btn");
      const catalogTabDrop = tab.querySelector(".catalog__tab_drop");

      catalogTabBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        const isActive = catalogTabBtn.classList.contains("_active");

        catalogTabWrapper.forEach((item) => {
          item.classList.add("active");
        });
        catalogBgs.forEach((item) => {
          item.classList.add("active");
        });

        catalogTabs.forEach((innerTab) => {
          innerTab.classList.remove("_active");
          innerTab
            .querySelector(".catalog__tab_btn")
            .classList.remove("_active");
          innerTab
            .querySelector(".catalog__tab_drop")
            .classList.remove("_active");
        });

        if (!isActive) {
          tab.classList.add("_active");
          catalogTabBtn.classList.add("_active");
          catalogTabDrop.classList.add("_active");
        }
      });

      catalogTabReturns.forEach((returnBtn) => {
        returnBtn.addEventListener("click", () => {
          catalogTabs.forEach((tab) => {
            tab.classList.remove("_active");
            tab.querySelector(".catalog__tab_btn").classList.remove("_active");
            tab.querySelector(".catalog__tab_drop").classList.remove("_active");
            /* catalogTabWrapper.forEach((item) => {
                item.classList.remove("active");
              });
              catalogBgs.forEach((item) => {
                item.classList.remove("active");
              }); */
          });
        });
      });
    });

    document.addEventListener("click", (event) => {
      if (!catalogTabsContent.contains(event.target)) {
        catalogTabs.forEach((tab) => {
          tab.classList.remove("_active");
          tab.querySelector(".catalog__tab_btn").classList.remove("_active");
          tab.querySelector(".catalog__tab_drop").classList.remove("_active");
        });
      }
    });
  }
}

function checkScreenSize() {
  if (window.innerWidth <= 768) {
    initializeCatalog();
  } else {
    // Здесь можно добавить код для отключения функциональности на десктопе, если это необходимо
    // Например, удалить все обработчики событий или скрыть элементы
    /* console.log("Десктопная версия, функциональность отключена."); */
  }
}

// Инициализация при загрузке страницы
checkScreenSize();

// Добавление обработчика события изменения размера окна
window.addEventListener("resize", checkScreenSize);

/* Reviews */
const reviewCards = document.querySelectorAll(".home-other-reviews__card");
const aboutReviewsBlock = document.querySelector(".about-reviews__block");

let lastClickedCard = null;
if (reviewCards)
  reviewCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!aboutReviewsBlock) return;

      if (card === lastClickedCard) {
        // Если клик по тому же самому элементу, переключаем класс active
        aboutReviewsBlock.classList.toggle("active");
        lastClickedCard = null;
      } else {
        // Если клик по другому элементу, просто добавляем класс active
        aboutReviewsBlock.classList.add("active");
        lastClickedCard = card;
      }
    });
  });

/* clip path */
function updateClipPath() {
  const elements = document.querySelectorAll(".clip-element");

  elements.forEach((element) => {
    const clipPathValue = element.getAttribute("data-clip-path"); // Получаем значение clip-path из data-атрибута
    const fixedPoint = 40; // Фиксированное значение в пикселях
    const width = element.offsetWidth; // Получаем текущую ширину элемента
    const position = element.getAttribute("data-clip-position"); // Получаем позицию (left или right)

    let updatedClipPathValue;

    if (position === "right") {
      // Позиция от правого края
      const rightPoint = width - fixedPoint; // Позиция от правого края
      updatedClipPathValue = clipPathValue.replace(
        /(\d+)px/,
        `${rightPoint}px`
      );
    } else if (position === "left") {
      // Позиция от левого края
      const leftPoint = fixedPoint; // Позиция от левого края
      updatedClipPathValue = clipPathValue.replace(/(\d+)px/, `${leftPoint}px`);
    }

    element.style.clipPath = updatedClipPathValue;
  });
}

// Обновляем clip-path при загрузке и изменении размера окна
window.addEventListener("load", updateClipPath);
window.addEventListener("resize", updateClipPath);
