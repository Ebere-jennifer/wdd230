// Last Modified Functionality
document.addEventListener("DOMContentLoaded", () => {
  const currentYear = new Date().getFullYear();
  const currentYearElement = document.getElementById("currentYear");
  currentYearElement.textContent = currentYear;

  const lastModified = document.lastModified;
  const lastModifiedElement = document.getElementById("lastModified");
  lastModifiedElement.textContent = `Last Modification: ${lastModified}`;

  // Hamburger Toggle Menu
  const menuButton = document.getElementById('menu');
  const navigation = document.querySelector('.navigation');

  menuButton.addEventListener('click', function() {
    menuButton.classList.toggle('open');
    navigation.classList.toggle('open');
  });
});

