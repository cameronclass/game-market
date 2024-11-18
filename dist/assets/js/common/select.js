document.querySelectorAll("[data-custom-select]").forEach((selectElement) => {
  const trigger = selectElement.querySelector("[data-select-trigger]");
  const optionsContainer = selectElement.querySelector("[data-select-options]");
  const options = selectElement.querySelectorAll("[data-select-option]");
  const hiddenInput = selectElement.querySelector("[data-select-input]");

  trigger.addEventListener("click", () => {
    const isOpen = optionsContainer.style.display === "block";
    document
      .querySelectorAll("[data-custom-select] [data-select-options]")
      .forEach((container) => (container.style.display = "none"));
    document
      .querySelectorAll("[data-custom-select] [data-select-trigger]")
      .forEach((trg) => trg.classList.remove("open"));
    if (!isOpen) {
      optionsContainer.style.display = "block";
      trigger.classList.add("open");
    }
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.getAttribute("data-value");
      const flagSrc = option.getAttribute("data-flag");

      trigger.querySelector("img").setAttribute("src", flagSrc);
      hiddenInput.value = value;

      optionsContainer.style.display = "none";
      trigger.classList.remove("open");

      options.forEach((opt) => opt.classList.remove("active"));
      option.classList.add("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!selectElement.contains(e.target)) {
      optionsContainer.style.display = "none";
      trigger.classList.remove("open");
    }
  });

  const firstOption = options[0];
  trigger
    .querySelector("img")
    .setAttribute("src", firstOption.getAttribute("data-flag"));
  hiddenInput.value = firstOption.getAttribute("data-value");
  firstOption.classList.add("active");
});
