function setupToggleClassButtons() {
  const addClassBtns = document.querySelectorAll(".add-class-btn");

  const stateMap = new Map(); // хранит lastElements и lastButton по targetId

  addClassBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-class-target");
      const classToAdd = button.getAttribute("data-class-name");

      const targetElements = document.querySelectorAll(
        `[data-class-element="${targetId}"]`
      );

      if (targetElements.length === 0 || !classToAdd) return;

      const isActive = Array.from(targetElements).some((el) =>
        el.classList.contains(classToAdd)
      );

      const state = stateMap.get(targetId) || {
        lastElements: [],
        lastButton: null,
      };

      if (isActive) {
        // Удалить класс у всех элементов с текущим targetId
        targetElements.forEach((el) => el.classList.remove(classToAdd));
        button.classList.remove(classToAdd);
        stateMap.set(targetId, {
          lastElements: [],
          lastButton: null,
        });
      } else {
        // Удалить с предыдущих элементов, если они есть
        state.lastElements.forEach((el) => el.classList.remove(classToAdd));
        if (state.lastButton && state.lastButton !== button) {
          state.lastButton.classList.remove(classToAdd);
        }

        // Добавить класс к текущим элементам
        targetElements.forEach((el) => el.classList.add(classToAdd));
        button.classList.add(classToAdd);

        // Обновить stateMap
        stateMap.set(targetId, {
          lastElements: Array.from(targetElements),
          lastButton: button,
        });
      }
    });
  });
}
setupToggleClassButtons();
