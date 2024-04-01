const notification = document.querySelector(".notification");
const notificationsMessages = document.querySelector(".notifications-messages");
const searchMenu = document.querySelector(".search-menu");
const searchForm = document.querySelector(".search-form");
const cityNameMobile = document.querySelector(".city-name-mobile");
const currentWeather = document.querySelector(".weather-response");
const weatherTime = document.querySelector(".weather-time");
const suntime = document.querySelectorAll(".custom-background");
const highlightCities = document.querySelector(".highlight-cities");
const currentLoc = document.querySelectorAll(".current-loc");
const forecastShow = document.querySelectorAll(".forecast");
const statusGroup = document.querySelectorAll(".status-group");
const statusForecast = document.querySelectorAll(".status-forecast");
const badgeDesk = document.querySelector(".badge-desk");
const nameMobile = document.querySelector(".name-mobile");
const greetingMobile = document.querySelector(".mobile-version .weather-time");
const mobileWeatherRes = document.querySelector(".mobile-weather-response");
const mobileVersion = document.querySelector(".mobile-version");
const menuClicked = document.querySelector(".menu-clicked");
const mainMobile = document.querySelector(".main-mobile");
const mobileAir = document.querySelector(".mobile-air");
const mobileSearch = document.querySelector(".mobile-search");

// Notification (bell) feature
notification.addEventListener("click", () => {
  bell();
});

function bell() {
  notificationsMessages.classList.toggle("active");
}

badgeDesk.addEventListener("click", () => {
  reLoadPage();
});

function reLoadPage() {
  window.location.reload();
}

// Search Menu Bar clicked
searchMenu.addEventListener("click", () => {
  mobileMenu();
  menuClicked.classList.toggle("active");
});

// Showing user two options for mobile
function mobileMenu() {
  if (!menuClicked.classList.value.includes("active")) {
    mobileVersion.style.display = "none";
    mobileAir.style.display = "none";
    mobileSearch.style.display = "none";
  } else {
    mobileVersion.style.display = "block";
    mobileAir.style.display = "block";
    mobileSearch.style.display = "block";
  }
}

const moreDetails = document.querySelector(".more-details");
moreDetails.addEventListener("click", () => {
  mobileAir.style.display = "block";
  mobileVersion.style.display = "none";
  mobileSearch.style.display = "none";
  menuClicked.classList.remove("active");
});

const newSearch = document.querySelector(".new-search");
newSearch.addEventListener("click", () => {
  mobileAir.style.display = "none";
  mobileVersion.style.display = "none";
  menuClicked.classList.remove("active");
  mobileSearch.style.display = "block";

  searchForm.style.display = "block";
  searchForm.style.marginLeft = "20px";
  cityNameMobile.style.display = "none";
});

var username = "";
var checkDay;

// backgrounds
const backgrounds = [
  { path: "url(./assets/images/backgrounds/clear-night.jpg)" },

  { path: "url(./assets/images/backgrounds/clear-day.jpg)" },

  { path: "url(./assets/images/backgrounds/clouds-day.jpg)" },
  { path: "url(./assets/images/backgrounds/clouds-night.jpg)" },

  { path: "url(./assets/images/backgrounds/rain-day.jpg)" },
  { path: "url(./assets/images/backgrounds/rain-night.jpg)" },

  { path: "url(./assets/images/backgrounds/snow.jpg)" },

  { path: "url(./assets/images/backgrounds/storm-day.jpg)" },
  { path: "url(./assets/images/backgrounds/storm-night.jpg)" },

  { path: "url(./assets/images/backgrounds/mist.jpg)" },

  { path: "url(./assets/images/backgrounds/sunny.jpg)" },

  { path: "url(./assets/images/backgrounds/foggy-day.jpg)" },
  { path: "url(./assets/images/backgrounds/foggy-night.jpg)" },

  { path: "url(./assets/images/backgrounds/Smoke.jpg)" },
];

//   Week day names
const weekDayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//   month names
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// air pollution status and messages
const aqiText = {
  1: {
    level: "Good",
    message: "Air  quality is generally good.",
  },

  2: {
    level: "Fair",
    message: "Air  quality is acceptable.",
  },

  3: {
    level: "Moderate",
    message: "Moderate of sensitive groups may experience health effects.",
  },

  4: {
    level: "Poor",
    message: "Everyone may begin to experience health  effects.",
  },

  5: {
    level: "Very Poor",
    message: "health warning of emergency conditions.",
  },
};

let currentDate = new Date();
// cities locations
const searchField = document.querySelector("[data-search-field]");
const searchResult = document.querySelector("[data-search-result]");

let searchTimeout = null;
const searchTimeoutDuration = 500;
let api_key = "e0ff8bd3aeecb0b2e7a790a8585fab7e";

searchField.addEventListener("input", function () {
  searchTimeout ?? clearTimeout(searchTimeout);

  let geoApi = `http://api.openweathermap.org/geo/1.0/direct?q=${searchField.value}&limit=5`;
  fetch(`${geoApi}&appid=${api_key}`)
    .then((response) => response.json())
    .then((data) => searchCities(data))
    .catch((err) => console.log(err));
});

function searchCities(locations) {
  if (!searchField.value) {
    searchResult.classList.remove("active");
    searchResult.innerHTML = "";
    searchField.classList.remove("searching");
  } else {
    searchField.classList.add("searching");
  }

  // updateWeather()/
  if (searchField.value) {
    searchTimeout = setTimeout(() => {
      searchResult.innerHTML = `
      <ul class="view-list" data-search-list></ul>`;
      const /**{NodeList} | []*/ items = [];
      for (const { name, lat, lon, country, state } of locations) {
        const searchItem = document.createElement("li");
        searchItem.classList.add("view-item");
        searchField.classList.remove("searching");
        searchResult.classList.add("active");
        searchItem.innerHTML = `
        <div class="view-items">
          <div>
            <i class="fa fa-map-marker" aria-hidden="true"></i>
          </div>  

          <div class="city-des">
          <a href="#/weather?lat=${lat}&lon=${lon}" class="item-link has-state" aria-label="${name} weather" data-search-toggler>
          <p class="item-title">${name}</p>
          <p class="lable-2 item-subtitle">${state || ""} ${country}</p>
          </a>
          </div>

        </div>
       `;

        searchResult
          .querySelector("[data-search-list]")
          .appendChild(searchItem);
        items.push(searchItem.querySelector("[data-search-toggler]"));
        searchItem.addEventListener("click", (e) => {
          document.querySelector(".search-result").classList.remove("active");
        });
      }
    }, searchTimeoutDuration);
  }
}

// Hash and Weather response
function updateWeather(lat, lon) {
  if (window.location.hash == "#/current-location") {
    currentLocationBtn.setAttribute("disabled", "");
  } else {
    currentLocationBtn.removeAttribute("disabled");
  }

  // Current API response
  let currentApi = `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric`;

  fetch(`${currentApi}&appid=${api_key}`)
    .then((response) => response.json())
    .then((data) => {
      nameMobile.innerHTML = data.name;

      currentWeather.innerHTML = `
        <div class="header-weather">
        <div class="name-weather">
          <i class="fa fa-map-marker" aria-hidden="true"></i>
          ${data.name} / ${data.sys.country}
        </div>
        <div class="header-icon">
          <div class="circle"></div>
          <div class="circle-child2"></div>
        </div>
      </div>

      <div class="body-weather">
      <div class="weather-degree">${data.main.temp.toFixed(0)}<sup>°</sup></div>
      <div class="weather-description">${data.weather[0].description}</div>
      <div class="descriptions">
        <div class="icon-description">
        <img
        src="assets/icon/weather-icons/windy.png"
        alt="windy icon"
      />
          <span> Wind </span>
        </div>

        <div class="line-description"></div>

        <div class="km-description">
          <span> ${Math.round(data.wind.speed * 3.6)} km/h</span>
        </div>
      </div>

      <div class="descriptions">
        <div class="icon-description">
          <img
            src="assets/icon/weather-icons/humid.png"
            alt="humidity icon"
          />
          <span> Hum </span>
        </div>

        <div class="line-description"></div>

        <div class="km-description">
          <span> ${data.main.humidity}% <span id="special">//</span></span>
        </div>
      </div>

      <div class="descriptions">
        <div class="icon-description">
          <img
            src="assets/icon/weather-icons/feels.png"
            alt="feels icon"
          />
          <span> Feels </span>
        </div>

        <div class="line-description"></div>

        <div class="km-description">
          <span> ${data.main.feels_like.toFixed(
            0
          )}% <span id="special">//</span></span>
        </div>
      </div>
    </div>
    `;

      // mobile current-loc
      currentLoc[4].innerHTML = `
      <div class="divided">
      <div class="descriptions">
        <div class="icon-description">
          <img
            src="assets/icon/weather-icons/windy2.png"
            alt="windy icon"
          />
          <span> Wind </span>
        </div>

        <div>&ensp;-</div>

        <div class="km-description">
          <span> ${Math.round(data.wind.speed * 3.6)} km/h</span>
        </div>
      </div>

      <div class="descriptions">
        <div class="icon-description">
          <img
            src="assets/icon/weather-icons/humid2.png"
            alt="humidity icon"
          />
          <span> Hum </span>
        </div>

        <div>&ensp;-</div>

        <div class="km-description">
          <span> ${data.main.humidity}% <span id="special">//</span></span>
        </div>
      </div>

      <div class="descriptions">
        <div class="icon-description">
          <img
            src="assets/icon/weather-icons/feels2.png"
            alt="feels like icon"
          />
          <span> Feels </span>
        </div>

        <div>&ensp;-</div>

        <div class="km-description">
          <span> ${data.main.feels_like.toFixed(
            0
          )}% <span id="special">//</span></span>
        </div>
      </div>
    </div>

    <div class="location-name">
      <div class="weather-name">
        <i class="fa fa-map-marker" aria-hidden="true"></i> 
        ${data.name} / ${data.sys.country}
      </div>

      <div class="weather-degree">${data.main.temp.toFixed(0)}<sup>°</sup></div>
    </div>
      `;

      // getting timezone
      let intervalId;
      // Function to update local time for a specific city
      // Clear the previous interval timer (if any)
      clearInterval(intervalId);

      function updateLocalTime(data) {
        // Function to update local time and display it
        function displayLocalTime() {
          // Original timezone offset from the API response
          const originalTimezoneOffsetSeconds = data.timezone; // Provided timezone offset in seconds

          // Adjusted timezone offset (subtracting 4 hours)
          const adjustedTimezoneOffsetSeconds =
            originalTimezoneOffsetSeconds - 4 * 3600; // Subtracting 4 hours in seconds

          // Convert adjusted timezone offset from seconds to milliseconds
          const adjustedTimezoneOffsetMilliseconds =
            adjustedTimezoneOffsetSeconds * 1000;

          // Get the current UTC time in milliseconds
          const utcTimeMilliseconds = Date.now();

          // Calculate the local time by adding the adjusted timezone offset to the UTC time
          const localTimeMilliseconds =
            utcTimeMilliseconds + adjustedTimezoneOffsetMilliseconds;

          // Create a Date object representing the local time
          const localTime = new Date(localTimeMilliseconds);
          const hour = localTime.getHours();

          // Format the local time
          const formattedLocalTime = localTime.toLocaleTimeString();

          let greeting;

          // Update the HTML element with the formatted local time
          var images;
          if (hour >= 5 && hour < 12) {
            greeting = "Have a good day, ";
            checkDay = "day";
          } else if (hour >= 12 && hour < 21) {
            greeting = "Have a good day, ";
            checkDay = "day";
          } else {
            greeting = "Have a good night, ";
            checkDay = "night";
          }

          if (checkDay === "day") {
            images = `<img src="assets/icon/weather-icons/sun.png" alt="day" />`;
          } else if (checkDay === "night") {
            images = `<img src="assets/icon/weather-icons/moon.png" alt="night" />`;
          }

          weatherTime.innerHTML = "";
          weatherTime.insertAdjacentHTML(
            "beforeend",
            `
          <p class="time"> ${formattedLocalTime} </p>
          <p class="date"> ${
            weekDayNames[currentDate.getDay()] +
            ", " +
            currentDate.getDate() +
            "" +
            monthNames[currentDate.getMonth()] +
            " " +
            currentDate.getFullYear()
          } </p>
      
          <p class="name">
            ${images}
      
              <span>
                ${greeting}
                <span class="username">${username}</span>
              </span>
          </p>
        `
          );

          greetingMobile.innerHTML = "";
          greetingMobile.insertAdjacentHTML(
            "afterbegin",
            `
            <p class="name">
              ${images}
      
              <span>
                ${greeting}
                <span class="username">${username}</span>
              </span>
            </p>

            <p class="time">${formattedLocalTime}</p>
          `
          );
        }

        displayLocalTime();

        // Update the displayed time for the specific city every second
        intervalId = setInterval(displayLocalTime, 1000);
      }

      // Example usage: Replace `data` with the API response for the specific city
      const cityData = {
        timezone: data.timezone, // Example timezone offset for a specific city
      };
      updateLocalTime(cityData);

      //   icons for weather response
      let circleIcon = document.querySelector(".circle");
      circleIcon.style.backgroundImage = `url("/assets/icon/openweathermap/${data.weather[0].icon}.svg")`;

      //   backgrounds for weather response
      let background = document.querySelector(".weather-response");
      if (window.innerWidth >= 1200 && checkDay == "night") {
        background.style.color = "#fff";
        switch (data.weather[0].main) {
          case "Clear":
            background.style.backgroundImage = backgrounds[0].path;
            break;

          case "Haze":
            background.style.backgroundImage = backgrounds[0].path;
            break;

          case "Rain":
            background.style.backgroundImage = backgrounds[5].path;
            break;
          case "Clouds":
            background.style.backgroundImage = backgrounds[3].path;
            break;

          case "Storm":
            background.style.backgroundImage = backgrounds[8].path;
            break;

          case "Storm":
            background.style.backgroundImage = backgrounds[8].path;
            break;

          case "Mist":
            background.style.backgroundImage = backgrounds[9].path;
            break;

          case "Fog":
            background.style.backgroundImage = backgrounds[12].path;
            break;

          case "Smoke":
            background.style.backgroundImage = backgrounds[13].path;
            break;

          case "Dust":
            background.style.backgroundImage = backgrounds[8].path;
            break;

          case "Sunny":
            background.style.backgroundImage = backgrounds[10].path;
            break;

          case "Snow":
            background.style.backgroundImage = backgrounds[6].path;
            background.style.color = "#000";
            break;

          default:
            background.style.backgroundImage = backgrounds[1].path;
            break;
        }
      } else if (window.innerWidth >= 1200 && checkDay == "day") {
        background.style.color = "#000";

        switch (data.weather[0].main) {
          case "Clear":
            background.style.backgroundImage = backgrounds[1].path;
            break;

          case "Haze":
            background.style.backgroundImage = backgrounds[1].path;
            break;

          case "Rain":
            background.style.backgroundImage = backgrounds[4].path;
            background.style.color = "#fff";
            break;

          case "Clouds":
            background.style.backgroundImage = backgrounds[2].path;
            break;

          case "Storm":
            background.style.backgroundImage = backgrounds[7].path;
            break;

          case "Tornado":
            background.style.backgroundImage = backgrounds[7].path;
            break;

          case "Mist":
            background.style.backgroundImage = backgrounds[9].path;
            break;

          case "Fog":
            background.style.backgroundImage = backgrounds[11].path;
            break;

          case "Smoke":
            background.style.backgroundImage = backgrounds[13].path;
            break;

          case "Dust":
            background.style.backgroundImage = backgrounds[8].path;
            break;

          case "Sunny":
            background.style.backgroundImage = backgrounds[10].path;
            break;

          case "Snow":
            background.style.backgroundImage = backgrounds[6].path;
            background.style.color = "#000";
            break;

          default:
            background.style.backgroundImage = backgrounds[1].path;
            break;
        }
      }

      // Mobile weather feedback
      mobileWeatherRes.innerHTML = "";
      mobileWeatherRes.insertAdjacentHTML(
        "afterbegin",
        `
      <div class="weather-icon">
        <img src="assets/icon/openweathermap/${
          data.weather[0].icon
        }.svg" alt="weather icon" />
      </div>

    <div class="body-weather">
      <div class="weather-degree">${data.main.temp.toFixed(0)}<sup>°</sup></div>
      <div class="weather-description">${data.weather[0].description}</div>
      <div class="weather-date"> ${
        weekDayNames[currentDate.getDay()] +
        ", " +
        currentDate.getDate() +
        "" +
        monthNames[currentDate.getMonth()] +
        " " +
        currentDate.getFullYear()
      } </div>
      <div class="descriptions">
        <div class="windy-weather">
          <div class="img">
            <img src="assets/icon/weather-icons/windy.png" alt="windy" />
          </div>

          <div class="des">
            <p>Wind</p>
            <p> ${Math.round(data.wind.speed * 3.6)} km/h </p>
          </div>
        </div>

        <div class="windy-weather">
          <div class="img">
            <img src="assets/icon/weather-icons/humid.png" alt="humidity" />
          </div>

          <div class="des">
            <p>Hum</p>
            <p> ${data.main.humidity}% </p>
          </div>
        </div>

        <div class="humid-weather">
          <div class="img">
            <img src="assets/icon/weather-icons/feels.png" alt="feels like" />
          </div>

          <div class="des">
            <p>Feels</p>
            <p> ${data.main.feels_like.toFixed(0)}% </p>
          </div>
        </div>
      </div>
    </div>            
      `
      );

      // Sunset & Sunrize
      // Sunrise
      // Assuming sunrise is the Unix timestamp representing sunrise time
      const sunriseTimestamp = data.sys.sunrise;

      // Convert Unix timestamp to milliseconds
      const sunriseMilliseconds = sunriseTimestamp * 1000;

      // Create a Date object from the sunrise milliseconds
      const sunriseDate = new Date(sunriseMilliseconds);

      // Get the timezone offset of the local time in minutes
      const timezoneOffsetMinutes = sunriseDate.getTimezoneOffset();

      // Calculate the timezone offset in milliseconds
      const timezoneOffsetMilliseconds = timezoneOffsetMinutes * 60 * 1000;

      // Subtract the timezone offset and 4 hours from the sunrise time
      const adjustedSunriseMilliseconds =
        sunriseMilliseconds - timezoneOffsetMilliseconds - 4 * 60 * 60 * 1000;

      // Create a Date object representing the adjusted sunrise time
      const adjustedSunriseDate = new Date(adjustedSunriseMilliseconds);

      // Get the hour and minute components of the adjusted sunrise time
      const adjustedSunriseMinute = adjustedSunriseDate.getMinutes();

      // Sunset
      // Assuming sunset is the Unix timestamp representing sunset time
      const sunsetTimestamp = data.sys.sunset;

      // Convert Unix timestamp to milliseconds
      const sunsetMilliseconds = sunsetTimestamp * 1000;

      // Create a Date object from the sunset milliseconds
      const sunsetDate = new Date(sunsetMilliseconds);

      // Get the hour component of the sunset time
      // const sunsetHour = sunsetDate.getHours();

      // Get the minute component of the sunset time
      const sunsetMinute = sunsetDate.getMinutes();

      suntime[0].innerHTML = `
        <div class="suntime-name">
        <div class="city-name">
          <div>
            <i
              class="fa fa-map-marker custom-icon"
              aria-hidden="true"
            ></i>
            <span>${data.name}</span>
          </div>

          <div>
            <i
              class="fa fa-ellipsis-v custom-icon2"
              aria-hidden="true"
            ></i>
          </div>
        </div>
      </div>

      <div class="suntime-time">
        <div class="sunrise">
          <div>
            <img
              src="assets/icon/weather-icons/sunrise.png"
              alt="sunrise"
            />
          </div>

          <div>
            <p>Sunrise</p>
            <p class="sunrise-x"></p>
          </div>
        </div>

        <div class="sunset">
          <div>
            <img
              src="assets/icon/weather-icons/sunset.png"
              alt="sunset"
            />
          </div>
          <div>
            <p>Sunset</p>
            <p class="sunset-x"></p>
          </div>
        </div>
      </div>
        `;

      suntime[1].innerHTML = `
        <div class="suntime-name">
        <div class="city-name">
          <div>
            <i
              class="fa fa-map-marker custom-icon"
              aria-hidden="true"
            ></i>
            <span>${data.name}</span>
          </div>

          <div>
            <i
              class="fa fa-ellipsis-v custom-icon2"
              aria-hidden="true"
            ></i>
          </div>
        </div>
      </div>

      <div class="suntime-time">
        <div class="sunrise">
          <div>
            <img
              src="assets/icon/weather-icons/sunrise.png"
              alt="sunrise"
            />
          </div>

          <div>
            <p>Sunrise</p>
            <p class="sunrise-x"></p>
          </div>
        </div>

        <div class="sunset">
          <div>
            <img
              src="assets/icon/weather-icons/sunset.png"
              alt="sunset"
            />
          </div>
          <div>
            <p>Sunset</p>
            <p class="sunset-x"></p>
          </div>
        </div>
      </div>
        `;

      // check suntime in different locations
      // check suntime in different locations
      const sunriseX = document.querySelectorAll(".sunrise-x");
      const sunsetX = document.querySelectorAll(".sunset-x");
      if (data.sys.country === "US") {
        const adjustedSunriseHour = adjustedSunriseDate.getHours() - 8;
        // Get the hour component of the sunrise time
        sunriseX[0].innerHTML = `${adjustedSunriseHour}:${adjustedSunriseMinute}AM`;
        sunriseX[1].innerHTML = `${adjustedSunriseHour}:${adjustedSunriseMinute}AM`;

        // Get the hour component of the sunset time
        const sunsetHour = sunsetDate.getHours() + 4;
        sunsetX[0].innerHTML = `${sunsetHour}:${sunsetMinute}PM`;
        sunsetX[1].innerHTML = `${sunsetHour}:${sunsetMinute}PM`;
      } else if (data.sys.country === "GB") {
        // Get the hour component of the sunrise time
        const adjustedSunriseHour = adjustedSunriseDate.getHours() - 3;
        sunriseX[0].innerHTML = `${adjustedSunriseHour}:${adjustedSunriseMinute}AM`;
        sunriseX[1].innerHTML = `${adjustedSunriseHour}:${adjustedSunriseMinute}AM`;

        // Get the hour component of the sunset time
        const sunsetHour = sunsetDate.getHours() - 15;
        sunsetX[0].innerHTML = `${sunsetHour}:${sunsetMinute}PM`;
        sunsetX[1].innerHTML = `${sunsetHour}:${sunsetMinute}PM`;
      } else {
        // Get the hour component of the sunrise time
        const adjustedSunriseHour = adjustedSunriseDate.getHours();
        sunriseX[0].innerHTML = `${adjustedSunriseHour}:${adjustedSunriseMinute}AM`;
        sunriseX[1].innerHTML = `${adjustedSunriseHour}:${adjustedSunriseMinute}AM`;

        // Get the hour component of the sunset time
        const sunsetHour = sunsetDate.getHours() - 12;
        sunsetX[0].innerHTML = `${sunsetHour}:${sunsetMinute}PM`;
        sunsetX[1].innerHTML = `${sunsetHour}:${sunsetMinute}PM`;
      }

      // mobile devices after search goes back to first page
      if (menuClicked.classList.value.includes("active")) {
        mobileVersion.style.display = "none";
        mobileAir.style.display = "none";
        mobileSearch.style.display = "none";
      } else {
        mobileVersion.style.display = "block";
        mobileAir.style.display = "none";
        mobileSearch.style.display = "none";
      }
    });

  // call forecast
  getForecast(lat, lon);

  // call air pollution
  airPollution(lat, lon);
}

// dubai climate
function dubaiWather() {
  let tehranApi = `https://api.openweathermap.org/data/2.5/weather?q=dubai&units=metric`;
  fetch(`${tehranApi}&appid=${api_key}`)
    .then((response) => response.json())
    .then((data) => {
      currentLoc[0].innerHTML = `
        <div class="divided">
        <div class="descriptions distance">
          <div class="icon-description">
            <img
              src="assets/icon/weather-icons/windy2.png"
              alt="windy icon"
            />
            <span> Wind </span>
          </div>

          <div>&ensp;-</div>

          <div class="km-description">
            <span> ${Math.round(data.wind.speed * 3.6)} km/h</span>
          </div>
        </div>

        <div class="descriptions distance">
          <div class="icon-description">
            <img
              src="assets/icon/weather-icons/humid2.png"
              alt="humidity icon"
            />
            <span> Hum </span>
          </div>

          <div>&ensp;-</div>

          <div class="km-description">
            <span> ${data.main.humidity}% <span id="special">//</span></span>
          </div>
        </div>

        <div class="descriptions">
          <div class="icon-description">
            <img
              src="assets/icon/weather-icons/feels2.png"
              alt="feels like icon"
            />
            <span> Feels </span>
          </div>

          <div>&ensp;-</div>

          <div class="km-description">
            <span> ${data.main.feels_like.toFixed(
              0
            )}% <span id="special">//</span></span>
          </div>
        </div>
      </div>

      <div class="location-name">
        <div class="weather-name">
          <i class="fa fa-map-marker" aria-hidden="true"></i> 
          ${data.name} / ${data.sys.country}
        </div>

        <div class="weather-degree">${data.main.temp.toFixed(
          0
        )}<sup>°</sup></div>
      </div>
        `;

      currentLoc[2].innerHTML = `
        <div class="divided">
        <div class="descriptions distance">
          <div class="icon-description">
            <img
              src="assets/icon/weather-icons/windy2.png"
              alt="windy icon"
            />
            <span> Wind </span>
          </div>

          <div>&ensp;-</div>

          <div class="km-description">
            <span> ${Math.round(data.wind.speed * 3.6)} km/h</span>
          </div>
        </div>

        <div class="descriptions distance">
          <div class="icon-description">
            <img
              src="assets/icon/weather-icons/humid2.png"
              alt="humidity icon"
            />
            <span> Hum </span>
          </div>

          <div>&ensp;-</div>

          <div class="km-description">
            <span> ${data.main.humidity}% <span id="special">//</span></span>
          </div>
        </div>

        <div class="descriptions">
          <div class="icon-description">
            <img
              src="assets/icon/weather-icons/feels2.png"
              alt="feels like icon"
            />
            <span> Feels </span>
          </div>

          <div>&ensp;-</div>

          <div class="km-description">
            <span> ${data.main.feels_like.toFixed(
              0
            )}% <span id="special">//</span></span>
          </div>
        </div>
      </div>

      <div class="location-name">
        <div class="weather-name">
          <i class="fa fa-map-marker" aria-hidden="true"></i> 
          ${data.name} / ${data.sys.country}
        </div>

        <div class="weather-degree">${data.main.temp.toFixed(
          0
        )}<sup>°</sup></div>
      </div>
        `;

      localStorage.getItem("backgroundImage");
    });
}
dubaiWather();

// NY climate
function newYorkWather() {
  let tehranApi = `https://api.openweathermap.org/data/2.5/weather?q=New%20York&units=metric`;
  fetch(`${tehranApi}&appid=${api_key}`)
    .then((response) => response.json())
    .then((data) => {
      currentLoc[1].innerHTML = `
      <div class="divided">
      <div class="descriptions">
        <div class="icon-description">
          <img
            src="assets/icon/weather-icons/windy2.png"
            alt="windy icon"
          />
          <span> Wind </span>
        </div>

        <div>&ensp;-</div>

        <div class="km-description">
          <span> ${Math.round(data.wind.speed * 3.6)} km/h</span>
        </div>
      </div>

      <div class="descriptions">
        <div class="icon-description">
          <img
            src="assets/icon/weather-icons/humid2.png"
            alt="humidity icon"
          />
          <span> Hum </span>
        </div>

        <div>&ensp;-</div>

        <div class="km-description">
          <span> ${data.main.humidity}% <span id="special">//</span></span>
        </div>
      </div>

      <div class="descriptions">
        <div class="icon-description">
          <img
            src="assets/icon/weather-icons/feels2.png"
            alt="feels like icon"
          />
          <span> Feels </span>
        </div>

        <div>&ensp;-</div>

        <div class="km-description">
          <span> ${data.main.feels_like.toFixed(
            0
          )}% <span id="special">//</span></span>
        </div>
      </div>
    </div>

    <div class="location-name">
      <div class="weather-name">
        <i class="fa fa-map-marker" aria-hidden="true"></i> 
        ${data.name} / ${data.sys.country}
      </div>

      <div class="weather-degree">${data.main.temp.toFixed(0)}<sup>°</sup></div>
    </div>
      `;

      currentLoc[3].innerHTML = `
      <div class="divided">
      <div class="descriptions">
        <div class="icon-description">
          <img
            src="assets/icon/weather-icons/windy2.png"
            alt="windy icon"
          />
          <span> Wind </span>
        </div>

        <div>&ensp;-</div>

        <div class="km-description">
          <span> ${Math.round(data.wind.speed * 3.6)} km/h</span>
        </div>
      </div>

      <div class="descriptions">
        <div class="icon-description">
          <img
            src="assets/icon/weather-icons/humid2.png"
            alt="humidity icon"
          />
          <span> Hum </span>
        </div>

        <div>&ensp;-</div>

        <div class="km-description">
          <span> ${data.main.humidity}% <span id="special">//</span></span>
        </div>
      </div>

      <div class="descriptions">
        <div class="icon-description">
          <img
            src="assets/icon/weather-icons/feels2.png"
            alt="feels like icon"
          />
          <span> Feels </span>
        </div>

        <div>&ensp;-</div>

        <div class="km-description">
          <span> ${data.main.feels_like.toFixed(
            0
          )}% <span id="special">//</span></span>
        </div>
      </div>
    </div>

    <div class="location-name">
      <div class="weather-name">
        <i class="fa fa-map-marker" aria-hidden="true"></i> 
        ${data.name} / ${data.sys.country}
      </div>

      <div class="weather-degree">${data.main.temp.toFixed(0)}<sup>°</sup></div>
    </div>
      `;
    });
}
newYorkWather();

// Air quality
function airPollution(lat, lon) {
  let airApi = `https://api.openweathermap.org/data/2.5/air_pollution?${lat}&${lon}`;
  fetch(`${airApi}&appid=${api_key}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.list[0].main.aqi === 1) {
        level = aqiText[1].level;
        message = aqiText[1].message;
      } else if (data.list[0].main.aqi === 2) {
        level = aqiText[2].level;
        message = aqiText[2].message;
      } else if (data.list[0].main.aqi === 3) {
        level = aqiText[3].level;
        message = aqiText[3].message;
      } else if (data.list[0].main.aqi === 4) {
        level = aqiText[4].level;
        message = aqiText[4].message;
      } else if (data.list[0].main.aqi === 5) {
        level = aqiText[5].level;
        message = aqiText[5].message;
      }

      statusGroup[0].innerHTML = `
        <div>
          ${level}
          <div class="aqi-message">${message}</div>
        </div>
      `;

      statusGroup[1].innerHTML = `
          <div>
            ${level}
            <div class="aqi-message">${message}</div>
          </div>
        `;

      statusForecast[0].innerHTML = `
        <div class="status-forecast-structure">
            <h5>${data.list[0].components.co.toPrecision(3)}</h5>
            <h6>CO</h6>
          </div>
      
          <div class="status-forecast-structure">
            <h5>${data.list[0].components.nh3.toPrecision(3)}</h5>
            <h6>NH3</h6>
          </div>
      
          <div class="status-forecast-structure">
            <h5>${data.list[0].components.no.toPrecision(3)}</h5>
            <h6>NO</h6>
          </div>
      
          <div class="status-forecast-structure">
            <h5>${data.list[0].components.no2.toPrecision(3)}</h5>
            <h6>NO<sub>2</sub></h6>
          </div>
      
          <div class="status-forecast-structure">
            <h5>${data.list[0].components.o3.toPrecision(3)}</h5>
            <h6>O<sub>3</sub></h6>
          </div>
      
          <div class="status-forecast-structure">
            <h5>${data.list[0].components.pm2_5.toPrecision(3)}</h5>
            <h6>PM2</h6>
          </div>
              
          <div class="status-forecast-structure">
            <h5>${data.list[0].components.pm10.toPrecision(3)}</h5>
            <h6>PM10</h6>
          </div>
              
          <div class="status-forecast-structure">
            <h5>${data.list[0].components.so2.toPrecision(3)}</h5>
            <h6>SO<sub>2</sub></h6>
          </div>
      `;

      statusForecast[1].innerHTML = `
        <div class="status-forecast-structure">
            <h5>${data.list[0].components.co.toPrecision(3)}</h5>
            <h6>CO</h6>
          </div>
      
          <div class="status-forecast-structure">
            <h5>${data.list[0].components.nh3.toPrecision(3)}</h5>
            <h6>NH3</h6>
          </div>
      
          <div class="status-forecast-structure">
            <h5>${data.list[0].components.no.toPrecision(3)}</h5>
            <h6>NO</h6>
          </div>
      
          <div class="status-forecast-structure">
            <h5>${data.list[0].components.no2.toPrecision(3)}</h5>
            <h6>NO<sub>2</sub></h6>
          </div>
      
          <div class="status-forecast-structure">
            <h5>${data.list[0].components.o3.toPrecision(3)}</h5>
            <h6>O<sub>3</sub></h6>
          </div>
      
          <div class="status-forecast-structure">
            <h5>${data.list[0].components.pm2_5.toPrecision(3)}</h5>
            <h6>PM2</h6>
          </div>
              
          <div class="status-forecast-structure">
            <h5>${data.list[0].components.pm10.toPrecision(3)}</h5>
            <h6>PM10</h6>
          </div>
              
          <div class="status-forecast-structure">
            <h5>${data.list[0].components.so2.toPrecision(3)}</h5>
            <h6>SO<sub>2</sub></h6>
          </div>
      `;
    });
}

// forecast
function getForecast(lat, lon) {
  const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units=metric`;
  fetch(`${forecastApi}&appid=${api_key}`)
    .then((response) => response.json())
    .then((data) => {
      const dailyForecasts = data.list;
      forecastShow[0].innerHTML = "";
      forecastShow[1].innerHTML = "";
      forecastShow[2].innerHTML = "";
      forecastShow[3].innerHTML = "";
      dailyForecasts.forEach((forecast) => {
        // Extract relevant information from each daily forecast
        const date = forecast.dt_txt.split(" ")[1];
        const estimate = date.slice(0, 2);
        const estimated = estimate >= 12 ? "PM" : "AM";

        // Get the moment object for the forecast considering the timezone
        const momentForecast = window.moment(forecast.dt * 1000);

        // Format the date to display
        const formattedDate = momentForecast.format("ddd");

        // Output the daily forecast information
        forecastShow[0].insertAdjacentHTML(
          "beforeend",
          `<div class="day">
        <div class="img">
          <img src="assets/icon/openweathermap/${
            forecast.weather[0].icon
          }.svg" alt="icon" />
        </div>
        <div class="day-description">
          <div class="day-name">${formattedDate}</div>
          <div class="day-hour">${estimate}:00  ${estimated}</div>
          <div class="degree">${forecast.main.temp.toFixed(0)}<sup>°</sup></div>
        </div>
      </div>
        `
        );

        forecastShow[1].insertAdjacentHTML(
          "beforeend",
          `<div class="day">
        <div class="img">
          <img src="assets/icon/openweathermap/${
            forecast.weather[0].icon
          }.svg" alt="icon" />
        </div>
        <div class="day-description">
          <div class="day-name">${formattedDate}</div>
          <div class="day-hour">${estimate}:00  ${estimated}</div>
          <div class="degree">${forecast.main.temp.toFixed(0)}<sup>°</sup></div>
        </div>
      </div>
        `
        );

        forecastShow[2].insertAdjacentHTML(
          "beforeend",
          `<div class="day">
        <div class="img">
          <img src="assets/icon/openweathermap/${
            forecast.weather[0].icon
          }.svg" alt="icon" />
        </div>
        <div class="day-description">
          <div class="day-name">${formattedDate}</div>
          <div class="day-hour">${estimate}:00  ${estimated}</div>
          <div class="degree">${forecast.main.temp.toFixed(0)}<sup>°</sup></div>
        </div>
      </div>
        `
        );

        forecastShow[3].insertAdjacentHTML(
          "beforeend",
          `<div class="day">
        <div class="img">
          <img src="assets/icon/openweathermap/${
            forecast.weather[0].icon
          }.svg" alt="icon" />
        </div>
        <div class="day-description">
          <div class="day-name">${formattedDate}</div>
          <div class="day-hour">${estimate}:00  ${estimated}</div>
          <div class="degree">${forecast.main.temp.toFixed(0)}<sup>°</sup></div>
        </div>
      </div>
        `
        );
      });
    });
}

// Function to get sunrise and sunset times for multiple cities
function getSunriseSunset() {
  // Define cities with their names and coordinates
  const cities = [
    { name: "Dubai", latitude: 25.276987, longitude: 55.296249 },
    { name: "Tehran", latitude: 35.6892, longitude: 51.389 },
    { name: "New York", latitude: 40.7128, longitude: -74.006 },
    { name: "Windsor", latitude: 42.3149, longitude: -83.0364 },
  ];

  // Get today's date
  const date = new Date();

  // Iterate over cities and get sunrise and sunset times
  cities.forEach((city) => {
    // Get sunrise and sunset times for the specified location and date
    const sunTimes = SunCalc.getTimes(date, city.latitude, city.longitude);

    // Extract the sunrise and sunset times
    const sunrise = sunTimes.sunrise;
    const sunset = sunTimes.sunset;

    // Show the sunrise and sunset times for the city
    // Sunrise
    const dubaiSunrise = `${sunrise.getHours()}:${sunrise.getMinutes()}AM`;
    const windsorSunrise = `${
      sunrise.getHours() - 8
    }:${sunrise.getMinutes()}AM`;
    const tehranSunrise = `${sunrise.getHours()}:${sunrise.getMinutes()}AM`;
    const yorkSunrise = `${sunrise.getHours() - 8}:${sunrise.getMinutes()}AM`;

    // Sunset
    const dubaiSunset = `${sunset.getHours()}:${sunset.getMinutes()}PM`;
    const windsorSunset = `${sunset.getHours() + 4}:${sunset.getMinutes()}PM`;
    const tehranSunset = `${sunset.getHours()}:${sunset.getMinutes()}PM`;
    const yorkSunset = `${sunset.getHours() + 4}:${sunset.getMinutes()}PM`;
    highlightCities.insertAdjacentHTML(
      "beforeend",
      `
      <div class="cities">
          <div class="city-name">
            <h3>
              <i
                class="fa fa-map-marker custom-icon"
                aria-hidden="true"
              ></i>
              ${city.name}
            </h3>
          </div>
          <div class="city-sunrise">
            <p>
              <i class="fa fa-sun-o custom-icon" aria-hidden="true"></i>
              <span class="sunrise-hl">
              ${
                city.name === "Dubai"
                  ? dubaiSunrise
                  : city.name === "Windsor"
                  ? windsorSunrise
                  : city.name === "Tehran"
                  ? tehranSunrise
                  : yorkSunrise
              }
              </span>
            </p>
          </div>
          <div class="city-sunset">
            <p>
              <i
                class="fa fa-moon-o custom-icon"
                aria-hidden="true"
              ></i>
              <span class="sunset-hl">${
                city.name === "Dubai"
                  ? dubaiSunset
                  : city.name === "Windsor"
                  ? windsorSunset
                  : city.name === "Tehran"
                  ? tehranSunset
                  : yorkSunset
              }</span>
            </p>
          </div>
        </div>
   `
    );
  });
}

// All hash and href url
const defaultLocation = "#/weather?lat=51.5073219&lon=-0.1276474"; //London
const currentLocationBtn = document.querySelector("[current-location]");
currentLocationBtn.addEventListener("click", () => {
  window.location.hash = "#/current-location";
  reLoadPage();
});

const currentLocation = function () {
  window.navigator.geolocation.getCurrentPosition(
    (res) => {
      const { latitude, longitude } = res.coords;

      updateWeather(`lat=${latitude}`, `lon=${longitude}`);
      getForecast(`lat=${latitude}`, `lon=${longitude}`);
      airPollution(`lat=${latitude}`, `lon=${longitude}`);
    },
    (err) => {
      window.location.hash = defaultLocation;
    }
  );
};

const searchedLocation = (query) => {
  updateWeather(...query.split("&"));
  getForecast(...query.split("&"));
  airPollution(...query.split("&"));
};
// updateWeather("lat=51.5073219", "lon=-0.1276474");

document.addEventListener("DOMContentLoaded", () => {
  // Setting profile pic
  // Code for handling localStorage
  let profilePic = document.querySelector("#profile-picture");
  let inputFile = document.querySelector("#input-file");

  // Load the background image from localStorage if it exists
  const storedImage = localStorage.getItem("backgroundImage");
  if (storedImage) {
    profilePic.src = storedImage;
  }

  inputFile.onchange = function () {
    // Get the selected file
    const selectedFile = inputFile.files[0];

    // Convert the file to a data URL
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageUrl = event.target.result;

      // Set the background image of the profile picture
      profilePic.src = imageUrl;

      // Save the image data URL to localStorage
      localStorage.setItem("backgroundImage", imageUrl);
    };
    reader.readAsDataURL(selectedFile);
  };

  // Other initialization code can go here
});

window.addEventListener("load", function () {
  if (!window.location.hash) {
    window.location.hash = "#/current-location";
  } else {
    checkHash();
  }

  // Call the function to get sunrise and sunset times for multiple cities
  getSunriseSunset();

  // saving users name
  // Check if the user's name is already stored in localStorage
  const storedName = localStorage.getItem("username");

  // If the name is stored, display it
  if (storedName) {
    username = storedName;
  } else {
    this.setTimeout(() => {
      username = prompt("May I have your name please ?");
      if (username == null || username == "") {
        username = "Dear!";
      } else {
        localStorage.setItem("username", username);
      }
    }, 7000);
  }
});

const routes = new Map([
  ["/current-location", currentLocation],
  ["/weather", searchedLocation],
]);

const checkHash = function () {
  const requestURL = window.location.hash.slice(1);
  const [route, query] = requestURL.includes
    ? requestURL.split("?")
    : [requestURL];

  routes.get(route) ? routes.get(route)(query) : error404();
};

window.addEventListener("hashchange", checkHash);
