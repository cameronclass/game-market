document.addEventListener("click", function (event) {
  const copyButton = event.target.closest("[data-copy-btn]");

  if (copyButton) {
    const textElement = document.querySelector(
      copyButton.getAttribute("data-copy-text")
    );

    if (textElement) {
      const textToCopy = textElement.textContent;
      const tempInput = document.createElement("input");
      tempInput.value = textToCopy;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      alert("Текст скопирован: " + textToCopy);
    }
  }
});
