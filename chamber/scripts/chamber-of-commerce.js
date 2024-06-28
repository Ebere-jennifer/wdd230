// Last Modified Functionality
document.addEventListener("DOMContentLoaded", () => {
  const currentYear = new Date().getFullYear();
  const currentYearElement = document.getElementById("currentYear");
  currentYearElement.textContent = currentYear;

  const lastModified = document.lastModified;
  const lastModifiedElement = document.getElementById("lastModified");
  lastModifiedElement.textContent = `Last Modification: ${lastModified}`;

  // Last Visit
  const visitMessage = document.querySelector(".message");
  const lastVisit = localStorage.getItem("lastVisit");
  const currentVisit = Date.now();

  if (lastVisit) {
    const timeDiff = currentVisit - lastVisit;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else {
      visitMessage.textContent = `You last visited ${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} ago.`;
    }
  } else {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  }

  localStorage.setItem("lastVisit", currentVisit);

  // Hamburger Toggle Menu
  const menuButton = document.getElementById('menu');
  const navigation = document.querySelector('.navigation');

  menuButton.addEventListener('click', function() {
    menuButton.classList.toggle('open');
    navigation.classList.toggle('open');
  });
});

