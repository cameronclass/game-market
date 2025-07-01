/* Modal */
// Open modal
document.querySelectorAll("[data-modal-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    modal.classList.add("active");
  });
});

// Close modal
document.querySelectorAll("[data-modal-close]").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest("[data-modal]");
    modal.classList.remove("active");
  });
});

// Close modal when clicking outside of modal content
window.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-modal")) {
    event.target.classList.remove("active");
  }
});

if (document.querySelector(".admin-tabs-open"))
  document.querySelector(".admin-tabs-open").addEventListener("click", () => {
    document.querySelector(".admin-tabs__block").classList.add("_active");
  });
