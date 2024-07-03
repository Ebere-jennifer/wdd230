document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const email = document.getElementById('email');
  const username = document.getElementById('username');

  form.addEventListener('submit', function(event) {
    // Reset message visibility and content
    message.textContent = '';
    message.style.visibility = 'hidden';

    // Check if passwords match
    if (password.value !== confirmPassword.value) {
      message.textContent = 'Passwords do not match!';
      message.style.visibility = 'visible';
      confirmPassword.value = '';
      confirmPassword.focus();
      event.preventDefault(); // Stop form submission
      return;
    }

    // Check if email has "@byui.edu" domain
    const emailRegex = /^[a-zA-Z0-9._%+-]+@byui\.edu$/;
    if (!emailRegex.test(email.value.trim())) { // Use trim() to remove leading/trailing whitespace
      message.textContent = 'Invalid email address! Please enter a valid @byui.edu email.';
      message.style.visibility = 'visible';
      email.focus();
      event.preventDefault(); // Stop form submission
      return;
    }
  });

  const range = document.getElementById("rating");
  const rangevalue = document.getElementById("rangevalue");

  range.addEventListener('change', displayRatingValue);
  range.addEventListener('input', displayRatingValue);

  function displayRatingValue() {
    rangevalue.innerHTML = range.value;
  }
});
