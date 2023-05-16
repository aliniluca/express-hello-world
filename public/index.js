window.onload = function() {
  const dropdown = document.getElementById('readingTypeDropdown');
  const buttonContainer = document.getElementById('buttonContainer');
  const output = document.getElementById('output');
  const copyButton = document.getElementById('copyButton');

  // Add 30 buttons
  for (let i = 1; i <= 30; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.addEventListener('click', () => getFile(dropdown.value, i));
    buttonContainer.appendChild(button);
  }

  // Copy text to clipboard
  copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(output.value).then(() => {
      alert('Text copied to clipboard');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  });
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
