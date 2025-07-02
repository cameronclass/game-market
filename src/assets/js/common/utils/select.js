class CustomSelect {
  constructor(container) {
    this.container = container;
    this.selectElement = container.querySelector("select");
    this.init();
  }

  init() {
    this.createSelectContainer();
    this.createOptionsList();
    this.addEventListeners();
  }

  createSelectContainer() {
    this.selectedContainer = document.createElement("DIV");
    this.selectedContainer.classList.add("select-selected");
    this.selectedContainer.innerHTML =
      this.selectElement.options[this.selectElement.selectedIndex].innerHTML;
    this.container.appendChild(this.selectedContainer);
  }

  createOptionsList() {
    this.optionsList = document.createElement("DIV");
    this.optionsList.classList.add("select-items", "select-hide");

    for (let i = 1; i < this.selectElement.length; i++) {
      const optionItem = document.createElement("DIV");
      optionItem.innerHTML = this.selectElement.options[i].innerHTML;
      optionItem.addEventListener("click", () => this.updateSelect(optionItem));
      this.optionsList.appendChild(optionItem);
    }

    this.container.appendChild(this.optionsList);
  }

  updateSelect(selectedItem) {
    const selectedOption = Array.from(this.selectElement.options).find(
      (option) => option.innerHTML === selectedItem.innerHTML
    );

    this.selectElement.selectedIndex = selectedOption.index;
    this.selectedContainer.innerHTML = selectedItem.innerHTML;

    const sameAsSelected =
      this.optionsList.querySelectorAll(".same-as-selected");
    sameAsSelected.forEach((item) => item.classList.remove("same-as-selected"));
    selectedItem.classList.add("same-as-selected");

    this.closeSelect();
  }

  toggleSelect() {
    CustomSelect.closeAllSelects(this);
    this.optionsList.classList.toggle("select-hide");
    this.selectedContainer.classList.toggle("select-arrow-active");
  }

  closeSelect() {
    this.optionsList.classList.add("select-hide");
    this.selectedContainer.classList.remove("select-arrow-active");
  }

  static closeAllSelects(currentSelect) {
    document.querySelectorAll(".select-items").forEach((optionsList) => {
      if (optionsList.previousSibling !== currentSelect?.selectedContainer) {
        optionsList.classList.add("select-hide");
      }
    });

    document
      .querySelectorAll(".select-selected")
      .forEach((selectedContainer) => {
        if (selectedContainer !== currentSelect?.selectedContainer) {
          selectedContainer.classList.remove("select-arrow-active");
        }
      });
  }

  addEventListeners() {
    this.selectedContainer.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleSelect();
    });
  }
}

class FormSelect {
  constructor(container) {
    this.container = container;
    this.searchInput = container.querySelector(".form-input");
    this.selectOptions = container.querySelector(".form-select__options");
    this.options = container.querySelectorAll(".form-select__option");
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.adjustOptionsHeight();
  }

  setupEventListeners() {
    this.searchInput.addEventListener("focus", () => this.openOptions());
    this.searchInput.addEventListener("input", () => this.filterOptions());

    this.options.forEach((option) => {
      option.addEventListener("click", () => this.selectOption(option));
    });

    document.addEventListener("click", (e) => {
      if (!this.container.contains(e.target)) {
        this.closeOptions();
      }
    });
  }

  filterOptions() {
    const filter = this.searchInput.value.toLowerCase();

    this.options.forEach((option) => {
      const text = option.textContent.toLowerCase();
      option.classList.toggle("hidden", !text.includes(filter));
    });
  }

  openOptions() {
    this.selectOptions.style.display = "block";
  }

  closeOptions() {
    this.selectOptions.style.display = "none";
  }

  selectOption(option) {
    this.searchInput.value = option.textContent;
    this.closeOptions();
  }

  adjustOptionsHeight() {
    if (this.options.length > 4) {
      this.selectOptions.style.maxHeight = "150px";
      this.selectOptions.style.overflowY = "scroll";
    } else {
      this.selectOptions.style.maxHeight = "";
      this.selectOptions.style.overflowY = "";
    }
  }
}

class AttrDataSelect {
  constructor(container) {
    this.container = container;
    this.trigger = container.querySelector("[data-select-trigger]");
    this.optionsContainer = container.querySelector("[data-select-options]");
    this.options = container.querySelectorAll("[data-select-option]");
    this.hiddenInput = container.querySelector("[data-select-input]");
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.selectFirstOption();
  }

  setupEventListeners() {
    // Останавливаем всплытие, чтобы не срабатывал глобальный обработчик
    this.trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleOptions();
    });

    this.options.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.stopPropagation();
        this.selectOption(option);
      });
    });

    // Используем делегирование для закрытия
    document.addEventListener("click", (e) => {
      if (!this.container.contains(e.target)) {
        this.closeOptions();
      }
    });
  }

  toggleOptions() {
    const isOpen = this.optionsContainer.style.display === "block";
    AttrDataSelect.closeAllSelects();
    if (!isOpen) {
      this.optionsContainer.style.display = "block";
      this.trigger.classList.add("open");
    }
  }

  closeOptions() {
    this.optionsContainer.style.display = "none";
    this.trigger.classList.remove("open");
  }

  selectOption(option) {
    const value = option.getAttribute("data-value");
    const flagSrc = option.getAttribute("data-flag");

    this.trigger.querySelector("img").setAttribute("src", flagSrc);
    this.hiddenInput.value = value;

    this.closeOptions();

    this.options.forEach((opt) => opt.classList.remove("active"));
    option.classList.add("active");
  }

  selectFirstOption() {
    const firstOption = this.options[0];
    this.trigger
      .querySelector("img")
      .setAttribute("src", firstOption.getAttribute("data-flag"));
    this.hiddenInput.value = firstOption.getAttribute("data-value");
    firstOption.classList.add("active");
  }

  static closeAllSelects() {
    document.querySelectorAll("[data-select-options]").forEach((container) => {
      container.style.display = "none";
    });

    document.querySelectorAll("[data-select-trigger]").forEach((trigger) => {
      trigger.classList.remove("open");
    });
  }
}

// Инициализация всех типов селектов

// Инициализация стандартных кастомных селектов
document.querySelectorAll(".custom-select").forEach((container) => {
  new CustomSelect(container);
});

// Инициализация селектов формы
document.querySelectorAll(".form-select").forEach((container) => {
  new FormSelect(container);
});

// Инициализация селектов с data-атрибутами
document.querySelectorAll("[data-custom-select]").forEach((container) => {
  new AttrDataSelect(container);
});

// Глобальный обработчик для закрытия всех селектов
document.addEventListener("click", () => {
  CustomSelect.closeAllSelects();
});
