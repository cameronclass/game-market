/* Select */
function createCustomSelects() {
  const customSelects = document.querySelectorAll(".custom-select");
  customSelects.forEach((customSelect) => {
    const selectElement = customSelect.querySelector("select");
    createSelectContainer(customSelect, selectElement);
    createOptionsList(customSelect, selectElement);
    addSelectEventListeners(customSelect);
  });
}

function createSelectContainer(customSelect, selectElement) {
  const selectedContainer = document.createElement("DIV");
  selectedContainer.classList.add("select-selected");
  selectedContainer.innerHTML =
    selectElement.options[selectElement.selectedIndex].innerHTML;
  customSelect.appendChild(selectedContainer);
}

function createOptionsList(customSelect, selectElement) {
  const optionsList = document.createElement("DIV");
  optionsList.classList.add("select-items", "select-hide");
  for (let i = 1; i < selectElement.length; i++) {
    const optionItem = document.createElement("DIV");
    optionItem.innerHTML = selectElement.options[i].innerHTML;
    optionItem.addEventListener("click", function (event) {
      updateSelectBox(this);
    });
    optionsList.appendChild(optionItem);
  }
  customSelect.appendChild(optionsList);
}

function updateSelectBox(selectedItem) {
  const selectBox = selectedItem.parentNode.parentNode.querySelector("select");
  const selectedContainer = selectedItem.parentNode.previousSibling;
  selectBox.selectedIndex = Array.from(selectBox.options).findIndex(
    (option) => option.innerHTML === selectedItem.innerHTML
  );
  selectedContainer.innerHTML = selectedItem.innerHTML;
  const sameAsSelected =
    selectedItem.parentNode.querySelectorAll(".same-as-selected");
  sameAsSelected.forEach((item) => item.classList.remove("same-as-selected"));
  selectedItem.classList.add("same-as-selected");
  selectedContainer.click();
}

function addSelectEventListeners(customSelect) {
  const selectedContainer = customSelect.querySelector(".select-selected");
  selectedContainer.addEventListener("click", function (event) {
    event.stopPropagation();
    closeAllSelects(this);
    const optionsList = this.nextSibling;
    optionsList.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelects(currentSelect) {
  const allOptionsLists = document.querySelectorAll(".select-items");
  const allSelectedContainers = document.querySelectorAll(".select-selected");
  allOptionsLists.forEach((optionsList) => {
    if (optionsList.previousSibling !== currentSelect) {
      optionsList.classList.add("select-hide");
    }
  });
  allSelectedContainers.forEach((selectedContainer) => {
    if (selectedContainer !== currentSelect) {
      selectedContainer.classList.remove("select-arrow-active");
    }
  });
}

document.addEventListener("click", function () {
  closeAllSelects(null);
});

createCustomSelects();


/* Form Select */
const formSelects = document.querySelectorAll(".form-select");

formSelects.forEach((formSelect) => {
  const searchInput = formSelect.querySelector(".form-input");
  const selectOptions = formSelect.querySelector(".form-select__options");
  const options = formSelect.querySelectorAll(".form-select__option");

  searchInput.addEventListener("focus", () => {
    selectOptions.style.display = "block";
  });

  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    options.forEach((option) => {
      const text = option.textContent.toLowerCase();
      if (text.includes(filter)) {
        option.classList.remove("hidden");
      } else {
        option.classList.add("hidden");
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".form-select")) {
      selectOptions.style.display = "none";
    }
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      searchInput.value = option.textContent;
      selectOptions.style.display = "none";
    });
  });

  if (options.length > 4) {
    selectOptions.style.maxHeight = "150px";
    selectOptions.style.overflowY = "scroll";
  } else {
    selectOptions.style.maxHeight = "";
    selectOptions.style.overflowY = "";
  }
});


/* Data Attr */
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
