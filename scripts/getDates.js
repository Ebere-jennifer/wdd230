// Last Modified Functionality
document.addEventListener("DOMContentLoaded", () => {
  const currentYear = new Date().getFullYear();
  const currentYearElement = document.getElementById("currentYear");
  currentYearElement.textContent = currentYear;

  const lastModified = document.lastModified;
  const lastModifiedElement = document.getElementById("lastModified");
  lastModifiedElement.textContent = `Last Modification: ${lastModified}`;
});

// Mode Button Functionality
function darkmode() {
  main.style.background = "#000";
  main.style.color = "#fff";
  modeButton.textContent = "🔆";
  cards.forEach(card => {
    card.style.background = "#141414";
    card.style.color = "#fff";
  });
  headings.forEach(heading => {
    heading.style.color = "#fff";
  });
}

function lightmode() {
  main.style.background = "#fff";
  main.style.color = "#000";
  modeButton.textContent= "🕶️";
  cards.forEach(card => {
    card.style.background = "#ab99cb";
    card.style.color = "#000";
  });
  headings.forEach(heading => {
    heading.style.color = "#F6F9FC";
  });
}

const modeButton = document.querySelector("#mode");
const main = document.querySelector("main");
const cards = document.querySelectorAll(".card");
const headings = document.querySelectorAll("h2");

modeButton.addEventListener("click", () => {
  if (modeButton.innerText === "🔆") {
    lightmode();
  } else if (modeButton.innerText === "🕶️") {
    darkmode();
  }
});

// Hamburger Toggle Menu
const menuButton = document.getElementById('menu');
const navigation = document.querySelector('.navigation');

menuButton.addEventListener('click', function() {
  menuButton.classList.toggle('open');
  navigation.classList.toggle('open');
});

// Visit Count 
const visitCountElement = document.querySelector("#visitCount");
if (visitCountElement) {
	// Get the visit count from localStorage or initialize it to 0
	let visitCount = localStorage.getItem("visitCount") || 0;

	// Increment the visit count by one
	visitCount++;

	// Update the span element with the visit count
  document.getElementById("visitCount").textContent = visitCount;

  // Store the updated visit count in localStorage
  localStorage.setItem("visitCount", visitCount);
}  

// Weather Card
// Select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// Declare a const variable named "url" and assign it a valid URL string as given in the openweathermap api documentation.
const apiKey = 'c004ef00086b684a3ae3cad41a54c4b2';
const latitude = 6.63;
const longitude = 3.34;
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=6.63&lon=3.34&units=imperial&appid=c004ef00086b684a3ae3cad41a54c4b2';

// Define an asynchronous function named "apiFetch()" that uses a try block to handle errors.
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayResults(data);
    } else {
      throw Error(await response.text());
    }

  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;F`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let desc = data.weather[0].description;

  // Check if the icon URL is valid before setting it
  if (data.weather[0].icon) {
    weatherIcon.setAttribute('src', iconsrc);
  } else {
    weatherIcon.setAttribute('src', 'images/placeholder-weather-icon.webp'); // Use placeholder if no icon is provided
  }
  // weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = `${desc}`;
}

apiFetch();