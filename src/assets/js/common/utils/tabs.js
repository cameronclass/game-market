/* Tabs */
function setupTabs(tabButtonsClass, tabContentClass) {
  const tabButtons = document.querySelectorAll(tabButtonsClass);

  tabButtons.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabClicked(tab, tabButtonsClass, tabContentClass);
    });
  });
}

function tabClicked(tab, tabButtonsClass, tabContentClass) {
  const allTabButtons = document.querySelectorAll(tabButtonsClass);
  allTabButtons.forEach((tab) => {
    tab.classList.remove("_active");
  });
  tab.classList.add("_active");

  const contents = document.querySelectorAll(tabContentClass);
  contents.forEach((content) => {
    content.classList.remove("_active");
  });

  const contentId = tab.getAttribute("content-id");
  const contentSelected = document.getElementById(contentId);

  contentSelected.classList.add("_active");
}

setupTabs(".tab-btn", ".tab-content");
setupTabs(".tab-btn-second", ".tab-content-second");
setupTabs(".tab-btn-third", ".tab-content-third");
setupTabs(".tab-btn-fourth", ".tab-content-fourth");
