class ToggleClassCustomManager {
  constructor() {
    this.stateMap = new Map();
    this.buttons = document.querySelectorAll(".add-class-btn");
    this.init();
  }

  init() {
    this.buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        this.handleButtonClick(button);
      });
    });
  }

  handleButtonClick(button) {
    const targetId = button.getAttribute("data-class-target");
    const className = button.getAttribute("data-class-name");

    if (!targetId || !className) return;

    const targetElements = Array.from(
      document.querySelectorAll(`[data-class-element="${targetId}"]`)
    );

    if (targetElements.length === 0) return;

    const isActive = button.classList.contains(className);

    if (isActive) {
      this.deactivate(targetId, className);
    } else {
      this.activate(targetId, className, button, targetElements);
    }
  }

  activate(targetId, className, button, elements) {
    // Деактивировать предыдущие элементы с этим targetId
    this.deactivate(targetId, className);

    // Активировать текущие элементы
    elements.forEach((el) => el.classList.add(className));
    button.classList.add(className);

    // Сохранить состояние
    this.stateMap.set(targetId, {
      elements,
      button,
      className,
    });
  }

  deactivate(targetId, className) {
    const state = this.stateMap.get(targetId);
    if (!state) return;

    state.elements.forEach((el) => el.classList.remove(className));
    if (state.button) state.button.classList.remove(className);

    this.stateMap.delete(targetId);
  }

  deactivateAll() {
    for (const [targetId, state] of this.stateMap) {
      this.deactivate(targetId, state.className);
    }
  }
}

// Инициализация при загрузке документа
const toggleCustomManager = new ToggleClassCustomManager();
