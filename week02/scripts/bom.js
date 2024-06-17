// Get references to the input, button, and list elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Add event listener to the button
button.addEventListener('click', () => { 

  // Check if the input is not blank
  if (input.value != '') {
    // Create a new list item
    const li = document.createElement('li');

    // Populate the li elements textContent or innerHTML with the input value
    li.textContent = input.value;

    // Create a delete button
    const deleteButton = document.createElement('button');

    //Populate the button textContent with a ❌
    deleteButton.textContent = '❌';

    // Append the li element with the delete button
    li.append(deleteButton);

    // Append the li element to the unordered list in your HTML
    list.append(li);

    // Add an event listener to the delete button that removes the li element when clicked
    deleteButton.addEventListener('click', () => {
      list.removeChild(li);
      input.focus();
    });

     // Clear the input and focus it
     input.value = '';
     input.focus();
  } else {
    // If input is blank, focus the input field
    input.focus();
  }
});