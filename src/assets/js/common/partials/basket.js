/* Basket Counter */
const minusBtns = document.querySelectorAll(
  ".basket-page__items .basket-page__card_minus"
);
const plusBtns = document.querySelectorAll(
  ".basket-page__items .basket-page__card_plus"
);
const valueEls = document.querySelectorAll(
  ".basket-page__items .basket-page__card_value"
);

if (minusBtns)
  minusBtns.forEach(function (minusBtn, index) {
    minusBtn.addEventListener("click", function () {
      let count = parseInt(valueEls[index].textContent);
      if (count > 1) {
        count--;
        valueEls[index].textContent = count;
      }
    });
  });
if (plusBtns)
  plusBtns.forEach(function (plusBtn, index) {
    plusBtn.addEventListener("click", function () {
      let count = parseInt(valueEls[index].textContent);
      count++;
      valueEls[index].textContent = count;
    });
  });

/* Basket Delete */
const basketDeleteBtns = document.querySelectorAll(".basket-page__card_delete");
const basketOverlays = document.querySelectorAll(".basket-page__card_over");
const basketOverlayNos = document.querySelectorAll(
  ".basket-page__card_over_no"
);
if (basketDeleteBtns)
  basketDeleteBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const overlay = btn
        .closest(".basket-page__card")
        .querySelector(".basket-page__card_over");
      if (overlay) {
        overlay.classList.add("_active");
      }
    });
  });
if (basketOverlayNos)
  basketOverlayNos.forEach(function (overlayNo) {
    overlayNo.addEventListener("click", function () {
      const overlay = overlayNo
        .closest(".basket-page__card")
        .querySelector(".basket-page__card_over");
      if (overlay) {
        overlay.classList.remove("_active");
      }
    });
  });


