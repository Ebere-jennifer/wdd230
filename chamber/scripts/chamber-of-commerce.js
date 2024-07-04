document.addEventListener("DOMContentLoaded", () => {
  // Set current year and last modified date
  const currentYear = new Date().getFullYear();
  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) {
    currentYearElement.textContent = currentYear;
  }

  const lastModified = document.lastModified;
  const lastModifiedElement = document.getElementById("lastModified");
  if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modification: ${lastModified}`;
  }

  // Last Visit Message
  const visitMessage = document.querySelector(".message");
  if (visitMessage) {
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
  }

  // Hamburger Toggle Menu
  const menuButton = document.getElementById('menu');
  const navigation = document.querySelector('.navigation');

  if (menuButton && navigation) {
    menuButton.addEventListener('click', function() {
      menuButton.classList.toggle('open');
      navigation.classList.toggle('open');
    });
  }

  // Add timestamp to form submission and validate required fields
  const form = document.getElementById("form");
  if (form) {
    form.addEventListener("submit", (event) => {
      const timestampInput = document.getElementById("timestamp");
      if (timestampInput) {
        timestampInput.value = new Date().toISOString();
      }

      // Validation of required fields
      const requiredFields = ["fname", "lname", "email", "phone", "title"];
      let allFieldsFilled = true;
      requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
          allFieldsFilled = false;
          alert(`Please fill out the ${field.previousElementSibling.textContent} field.`);
        }
      });

      // Validate title pattern
      const titleField = document.getElementById("title");
      if (titleField && titleField.value.trim() && !titleField.value.match(/^[A-Za-z\s-]{7,}$/)) {
        allFieldsFilled = false;
        alert("Title or Position must be at least 7 characters long and contain only letters, spaces, and hyphens.");
      }

      // Prevent form submission if not all required fields are filled
      if (!allFieldsFilled) {
        event.preventDefault();
      }
    });
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

});

