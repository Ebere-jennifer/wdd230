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
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-4.27&lon=15.28&units=imperial&appid=318b0a0b3e15694b7c687be6b0bcd797';

async function apiFetch(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayWeather(data) {
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const weatherInfo = document.getElementById('weatherInfo');

    const figure = document.createElement('div');

    let wDescription = document.createElement('p');
    const weatherIcon = document.createElement('img');
    wDescription.textContent = `${temp}ºF - ${description}`;

    weatherIcon.src = `https://openweathermap.org/img/w/${icon}.png`;
    weatherIcon.alt = "Weather Icon";

    figure.appendChild(weatherIcon);
    figure.appendChild(wDescription);

    weatherInfo.appendChild(figure);
}

// Fetch the weather data
apiFetch(url);
