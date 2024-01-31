document.addEventListener("DOMContentLoaded", function () {
  const accordions = document.querySelectorAll(".accordion");

  const openAccordion = (accordion) => {
    const content = accordion.querySelector(".accordion__content");
    accordion.classList.add("accordion__active");
    content.style.maxHeight = content.scrollHeight + 40 + "px";
  };

  const closeAccordion = (accordion) => {
    const content = accordion.querySelector(".accordion__content");
    accordion.classList.remove("accordion__active");
    content.style.maxHeight = null;
  };

  accordions.forEach((accordion) => {
    const intro = accordion.querySelector(".accordion__intro");
    const content = accordion.querySelector(".accordion__content");

    intro.onclick = () => {
      if (content.style.maxHeight) {
        closeAccordion(accordion);
      } else {
        accordions.forEach((accordion) => closeAccordion(accordion));
        openAccordion(accordion);
      }
    };
  });

  var copyBtn = document.querySelector(".copy-js");

  copyBtn.addEventListener("click", function () {
    var textToCopy = document.querySelector(".copy-block__text");

    // Create a temporary input element
    var tempInput = document.createElement("input");
    tempInput.setAttribute("value", textToCopy.textContent);

    // Append the input to the document
    document.body.appendChild(tempInput);

    // Select the text in the input
    tempInput.select();

    // Copy the text to the clipboard
    document.execCommand("copy");

    // Remove the temporary input
    document.body.removeChild(tempInput);

    // You can add any additional feedback or actions here
    alert("Text copied: " + textToCopy.textContent);
  });

});
