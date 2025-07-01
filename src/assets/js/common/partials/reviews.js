/* new-reviews */
(function () {
  const content = document.querySelector(".new-reviews__content");

  if (content) {
    content.addEventListener("mousedown", (e) => {
      let isDown = true;
      let startX = e.pageX - content.offsetLeft;
      let scrollLeft = content.scrollLeft;

      content.classList.add("active");

      const mouseMoveHandler = (e) => {
        if (!isDown) return; // Если мышь не нажата, выходим
        e.preventDefault();
        const x = e.pageX - content.offsetLeft;
        const walk = (x - startX) * 2; // Увеличьте или уменьшите скорость прокрутки
        content.scrollLeft = scrollLeft - walk;
      };

      const mouseUpHandler = () => {
        isDown = false;
        content.classList.remove("active");
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
      };

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    });

    content.addEventListener("mouseleave", () => {
      content.classList.remove("active");
    });
  }
})();
