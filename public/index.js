window.onload = function() {
  const dropdown = document.getElementById('readingTypeDropdown');
  const buttonContainer = document.getElementById('buttonContainer');
  const output = document.getElementById('output');
  const copyButton = document.getElementById('copyButton');
  const editAndSaveButton = document.getElementById('editAndSaveButton');
  
  let currentNumber = null;

  // Add 30 buttons
  for (let i = 1; i <= 30; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.addEventListener('click', () => {
      currentNumber = i;
      getFile(dropdown.value, i)
    });
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

  editAndSaveButton.addEventListener('click', () => {
    if (currentNumber !== null) {
      editAndSaveFile(dropdown.value, currentNumber, output.value);
    } else {
      alert('Please select a number');
    }
  });

  // Fetch a file from the server and update the textarea
  function getFile(readingType, number) {
    fetch(`https://etsyreadings.cyclic.app/get-file?readingType=${readingType}&number=${number}`)
      .then(response => response.text())
      .then(text => output.value = text)
      .catch(err => console.error(err));
  }
  
  function editAndSaveFile(readingType, number, newText) {
    fetch(`https://etsyreadings.cyclic.app/edit-and-save-file`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ readingType, number, newText }),
    })
    .then(response => response.text())
    .catch(err => console.error(err));
  }
};
