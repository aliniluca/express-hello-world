window.onload = function() {
  const dropdown = document.getElementById('readingTypeDropdown');
  const buttonContainer = document.getElementById('buttonContainer');
  const output = document.getElementById('output');

  // Add 30 buttons
  for (let i = 1; i <= 30; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.addEventListener('click', () => getFile(dropdown.value, i));
    buttonContainer.appendChild(button);
  }

  // Fetch a file from the server and update the textarea
  function getFile(readingType, number) {
    fetch(`https://etsyreadings.cyclic.app/get-file?readingType=${readingType}&number=${number}`)
      .then(response => response.text())
      .then(text => output.value = text)
      .catch(err => console.error(err));
  }
};
