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

  // Wayfinding functionality
  const links = document.querySelectorAll(".navigation a");
  const currentPage = window.location.pathname.split("/").pop();
  console.log("Current Page:", currentPage); // Debugging line

  links.forEach(link => {
    console.log("Checking link:", link.getAttribute("href")); // Debugging line
    if (link.getAttribute("href") === currentPage) {
      console.log("Match found:", link); // Debugging line
      link.classList.add("active");
    }
  });

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

  // Function to generate random number within a range
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Function to load spotlight advertisements
  async function loadAdvertisements() {
    const adContainer = document.getElementById("ad-container");
    if (!adContainer) {
      console.error("Ad container not found");
      return;
    }

    try {
      // Fetch the members data from the JSON file
      const response = await fetch("data/members.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched data:", data); // Debugging line

      let qualifiedMembers = data.members.filter(member =>
        member.membershipLevel === "Silver" || member.membershipLevel === "Gold"
      );
      console.log("Qualified members:", qualifiedMembers); // Debugging line

      // Randomly select 3 qualified members
      const numberOfAds = 3;
      for (let i = 0; i < numberOfAds; i++) {
        if (qualifiedMembers.length === 0) break; // Break if no more qualified members

        let randomIndex = getRandomNumber(0, qualifiedMembers.length - 1);
        const member = qualifiedMembers[randomIndex];

        // Create ad element
        const ad = document.createElement("div");
        ad.className = "ad";
        ad.innerHTML = `
          <img src="${member.image}" alt="${member.name} Logo" class="ad-image">
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        adContainer.appendChild(ad);

        // Remove the selected member from the list to avoid duplicates
        qualifiedMembers.splice(randomIndex, 1);
      }
    } catch (error) {
      console.error("Failed to load members data:", error);
    }
  }

  // Load advertisements on page load if ad container exists
  if (document.getElementById("ad-container")) {
    loadAdvertisements();
  }

  // Function to display the banner on specific days
  function displayBanner() {
    const banner = document.getElementById("banner");
    const closeBanner = document.getElementById("close-banner");

    // Check if the banner element exists
    if (banner && closeBanner) {
      const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

      if (today === 1 || today === 2 || today === 3) { // Monday, Tuesday, Wednesday
        banner.style.display = "block";
      }

      closeBanner.addEventListener("click", () => {
        banner.style.display = "none";
      });
    } 
  }

  // Display the banner on page load
  displayBanner();

  // Weather Card
  // Select HTML elements in the document
  const currentTemp = document.querySelector('#current-temp');
  const weatherIcon = document.querySelector('#weather-icon');
  const captionDesc = document.querySelector('figcaption');
  const forecastContainer = document.querySelector('#forecast-container');

  if (currentTemp || weatherIcon || captionDesc || forecastContainer) {
    const apiKey = 'c004ef00086b684a3ae3cad41a54c4b2';
    const latitude = 6.63;
    const longitude = 3.34;

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

    async function fetchWeatherData(url) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          return await response.json();
        } else {
          throw Error(await response.text());
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
      }
    }

    async function displayWeatherData() {
      const currentWeatherData = await fetchWeatherData(currentWeatherUrl);
      if (currentWeatherData) {
        displayCurrentWeather(currentWeatherData);
      }

      const forecastData = await fetchWeatherData(forecastUrl);
      if (forecastData) {
        displayForecast(forecastData);
      }
    }

    function displayCurrentWeather(data) {
      if (currentTemp && weatherIcon && captionDesc) {
        currentTemp.innerHTML = `${data.main.temp}&deg;F`;
        const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        let desc = data.weather[0].description;

        if (data.weather[0].icon) {
          weatherIcon.setAttribute('src', iconsrc);
        } else {
          weatherIcon.setAttribute('src', 'images/placeholder-weather-icon.webp');
        }
        weatherIcon.setAttribute('alt', desc);
        captionDesc.textContent = `${desc}`;
      }
    }

    function displayForecast(data) {
      if (forecastContainer) {
        forecastContainer.innerHTML = '';
        const forecasts = data.list.filter((item, index) => index % 8 === 0);
        forecasts.slice(0, 3).forEach(forecast => {
          const date = new Date(forecast.dt * 1000);
          const day = date.toLocaleDateString('en-US', { weekday: 'short' });
          const temp = forecast.main.temp.toFixed(0);
          const icon = forecast.weather[0].icon;
          const desc = forecast.weather[0].description;

          const forecastElement = document.createElement('div');
          forecastElement.classList.add('forecast-item');
          forecastElement.innerHTML = `
            <strong>${day}</strong> : 
            <img src="https://openweathermap.org/img/w/${icon}.png" alt="${desc}" style="vertical-align: middle;">
            - ${temp}&deg;F - ${desc}
          `;
          forecastContainer.appendChild(forecastElement);
        });
      }
    }

    displayWeatherData();
  }
});