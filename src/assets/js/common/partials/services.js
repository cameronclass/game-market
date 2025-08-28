document.querySelectorAll(".service-form__tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    // Переключение активной кнопки
    document
      .querySelectorAll(".service-form__tab")
      .forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
    // Переключение контента
    const tabName = this.getAttribute("data-tab");
    document.querySelectorAll(".service-form__tab-panel").forEach((panel) => {
      panel.classList.toggle(
        "active",
        panel.getAttribute("data-tab-panel") === tabName
      );
    });
  });
});

// VPN region toggle
document
  .querySelector(".vpn-region-btn__toggle")
  .addEventListener("click", function () {
    const hiddenRow = document.querySelector(".vpn-region-select__row--hidden");
    const toogleButton = document.querySelector(
      ".vpn-region-select__toggle_text"
    );
    this.classList.toggle("active");
    if (hiddenRow.style.display === "none") {
      hiddenRow.style.display = "grid";
      toogleButton.textContent = "Скрыть";
    } else {
      hiddenRow.style.display = "none";
      toogleButton.textContent = "Больше регионов";
    }
  });
// Активная кнопка региона
document.querySelectorAll(".vpn-region-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".vpn-region-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
  });
});
