/* Cart Add */
const newCards = document.querySelectorAll(".new-card");

if (newCards)
  newCards.forEach((item) => {
    item.addEventListener("click", function (event) {
      if (event.target.closest(".new-card__btn")) {
        const button = event.target.closest(".new-card__btn");
        const parentBlock = button.closest(".new-card__btn_block");
        if (parentBlock) {
          parentBlock.classList.toggle("_active");
        }
      }
    });
  });
