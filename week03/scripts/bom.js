// Define the getChapterList function
function getChapterList() {
  return JSON.parse(localStorage.getItem('myFavBOMList'));
}

// Define the setChapterList function
function setChapterList() {
  localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

// Declare an array named chaptersArray and assign it to the results of a defined function named getChapterList and add a compound
// OR condition to assign it an empty array in case this is the user's first visit or if the localStorage item is missing.
const chaptersArray = getChapterList() || [];

// Get references to the input, button, and list elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Use a forEach on the chaptersArray to process each entry named chapter. Use an arrow function within the loop to call a new 
// defined function named displayList and pass it the argument of chapter
chaptersArray.forEach(chapter => {
  displayList(chapter);
});

// Change the button click event listener to only do the following tasks (the other tasks in that original function will be used 
// in a separate function named displayList):
// check if the input is empty, if not, then, call displayList with the input.value argument,
// push the input.value into the chaptersArray, update the localStorage with the new array by calling a function named setChapterList,
// set the input.value to nothing, and set the focus back to the input.

// Add event listener to the button
button.addEventListener('click', () => { 
  // Check if the input is not blank
  if (input.value != '') {
    // Call displayList with the input value
    displayList(input.value);

    // Push the input value into chaptersArray
    chaptersArray.push(input.value);

    // Update the localStorage with the new array
    setChapterList();

    // Clear the input and focus it
    input.value = '';
    input.focus();
  } else {
    // If input is blank, focus the input field
    input.focus();
  }
});

// Create the displayList defined function that receives one parameter named item.
// Put all the code that builds a list item from the previous button click event listener into this new displayList function and use 
// the item parameter as the input. A deleteChapter function will need to be called within the delete button click event to remove 
// the chapter from the array and localStorage.

// Define the displayList function
function displayList(item) {
  // Create list item
  const li= document.createElement('li');
  li.textContent = item;

  // Create delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '❌';
  // deletebutton.classList.add('delete'); 

  // Add click event listener to delete button
  deleteButton.addEventListener('click', () => {
    list.removeChild(li); // Corrected line
    deleteChapter(item);
    input.focus();
  });

  // Append text and delete button to list item
  li.append(deleteButton);

  // Append list item to the list
  list.append(li);
}

// Function to delete a chapter
function deleteChapter(chapter) {
  chapter = chapter.slice(0, chapter.length - 1); // Remove the last character (❌)
  const index = chaptersArray.indexOf(chapter);
  if (index > -1) {
    chaptersArray.splice(index, 1); // Modify the array directly
    setChapterList();
  }
}