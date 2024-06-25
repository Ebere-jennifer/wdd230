document.addEventListener("DOMContentLoaded", () => {
  const currentYear = new Date().getFullYear();
  const currentYearElement = document.getElementById("currentYear");
  currentYearElement.textContent = currentYear;

  const lastModified = document.lastModified;
  const lastModifiedElement = document.getElementById("lastModified");
  lastModifiedElement.textContent = `Last Modification: ${lastModified}`;

});