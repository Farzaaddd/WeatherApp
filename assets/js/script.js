const notification = document.querySelector(".notification");
const notificationsMessages = document.querySelector(".notifications-messages");
const main = document.querySelector(".main-mobile");
const searchMenu = document.querySelector(".search-menu");
const searchForm = document.querySelector(".search-form");
const cityNameMobile = document.querySelector(".city-name-mobile");

// Search Menu Bar clicked
searchMenu.addEventListener("click", () => {
  mobileMenu();
});

// Showing user two options
function mobileMenu() {
  main.innerHTML = `
  <!-- Start menu clicked ! -->
  <div class="menu-clicked">
  <h3 class="more-details">More details →</h3>
  <h3 class="new-search">New search →</h3>
    <h3>
      <i class="fa fa-smile-o" aria-hidden="true"></i>
    </h3>
  </div>
  <!-- End menu clicked ! -->
    `;

  // Using first option
  const moreDetails = document.querySelector(".more-details");
  moreDetails.addEventListener("click", () => {
    main.innerHTML = `
      <!-- Start more details -->
        <section class="mobile-version">
          <div class="air-quality-title">
            <h2>Air Quality</h2>
          </div>
  
          <div class="air-quality">
            <div class="title">
              <div>
                <h3>Air Quality Index</h3>
              </div>
  
              <div class="location">
                <i class="fa fa-map-marker" aria-hidden="true"></i>
                <span>UAE/Ajman</span>
              </div>
            </div>
  
            <div class="status">
              <div>
                <img src="assets/icon/weather-icons/wind.png" alt="wind" />
              </div>
              <div class="status-group">
                <div>
                  Good
                  <div>A perfect day for a walk!</div>
                </div>
              </div>
  
              <div class="badge">
                <small>Refresh</small>
              </div>
            </div>
  
            <div class="status-forecast">
              <div class="status-forecast-structure">
                <h5>9.3</h5>
                <h6>PM2</h6>
              </div>
  
              <div class="status-forecast-structure">
                <h5>9.3</h5>
                <h6>PM2</h6>
              </div>
  
              <div class="status-forecast-structure">
                <h5>9.3</h5>
                <h6>PM2</h6>
              </div>
  
              <div class="status-forecast-structure">
                <h5>9.3</h5>
                <h6>PM2</h6>
              </div>
  
              <div class="status-forecast-structure">
                <h5>9.3</h5>
                <h6>PM2</h6>
              </div>
  
              <div class="status-forecast-structure">
                <h5>9.3</h5>
                <h6>PM2</h6>
              </div>
            </div>
          </div>
  
          <div class="current-loc">
            <div class="divided">
              <div class="descriptions second">
                <div class="icon-description">
                  <img
                    src="assets/icon/weather-icons/windy2.png"
                    alt="windy icon"
                  />
                  <span> Wind </span>
                </div>
  
                <div class="line-description"></div>
  
                <div class="km-description">
                  <span> 12km/h </span>
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
  
                <div class="line-description"></div>
  
                <div class="km-description">
                  <span> 22 % <span id="special">//</span></span>
                </div>
              </div>
            </div>
  
            <div class="location-name">
              <div class="weather-name">
                <i class="fa fa-map-marker" aria-hidden="true"></i>
                <span>Tehran / IR</span>
                -
                <span>Snowy</span>
              </div>
  
              <div class="weather-degree">27<sup>°</sup></div>
            </div>
          </div>
  
          <div class="current-loc">
            <div class="divided">
              <div class="descriptions second">
                <div class="icon-description">
                  <img
                    src="assets/icon/weather-icons/windy2.png"
                    alt="windy icon"
                  />
                  <span> Wind </span>
                </div>
  
                <div class="line-description"></div>
  
                <div class="km-description">
                  <span> 12km/h </span>
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
  
                <div class="line-description"></div>
  
                <div class="km-description">
                  <span> 22 % <span id="special">//</span></span>
                </div>
              </div>
            </div>
  
            <div class="location-name">
              <div class="weather-name">
                <i class="fa fa-map-marker" aria-hidden="true"></i>
                <span>Tehran / IR</span>
                -
                <span>Snowy</span>
              </div>
  
              <div class="weather-degree">27<sup>°</sup></div>
            </div>
          </div>
  
          <div class="forecast">
            <div class="day">
              <div class="img">
                <img src="assets/icon/openweathermap/01n.svg" alt="icon" />
              </div>
              <div class="day-name">Sun</div>
              <div class="degree">28<sup>°</sup></div>
            </div>
  
            <div class="day">
              <div class="img">
                <img src="assets/icon/openweathermap/10d.svg" alt="icon" />
              </div>
              <div class="day-name">Sun</div>
              <div class="degree">28<sup>°</sup></div>
            </div>
  
            <div class="day">
              <div class="img">
                <img src="assets/icon/openweathermap/11n.svg" alt="icon" />
              </div>
              <div class="day-name">Sun</div>
              <div class="degree">28<sup>°</sup></div>
            </div>
  
            <div class="day">
              <div class="img">
                <img src="assets/icon/openweathermap/01d.svg" alt="icon" />
              </div>
              <div class="day-name">Sun</div>
              <div class="degree">28<sup>°</sup></div>
            </div>
  
            <div class="day">
              <div class="img">
                <img src="assets/icon/openweathermap/13d.svg" alt="icon" />
              </div>
              <div class="day-name">Sun</div>
              <div class="degree">28<sup>°</sup></div>
            </div>
  
            <div class="day">
              <div class="img">
                <img src="assets/icon/openweathermap/50d.svg" alt="icon" />
              </div>
              <div class="day-name">Sun</div>
              <div class="degree">28<sup>°</sup></div>
            </div>
          </div>
  
          <footer>
            <p>
              CopyRight2024 &copy;
              <a href="https://farzadsolaimani-uk.netlify.app/"> Farzad.S </a>
            </p>
          </footer>
        </section>
        <!-- End more details -->
      `;

    searchForm.style.display = "none";
    cityNameMobile.style.display = "block";
  });

  // Using second option
  const newSearch = document.querySelector(".new-search");
  newSearch.addEventListener("click", () => {
    main.innerHTML = `
    <!-- Start new Search  -->
    <section class="mobile-version">
      <div class="current-loc-title">
        <h2>Current Loc</h2>
      </div>

      <div class="current-loc">
        <div class="divided">
          <div class="descriptions second">
            <div class="icon-description">
              <img
                src="assets/icon/weather-icons/windy2.png"
                alt="windy icon"
              />
              <span> Wind </span>
            </div>

            <div class="line-description"></div>

            <div class="km-description">
              <span> 12km/h </span>
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

            <div class="line-description"></div>

            <div class="km-description">
              <span> 22 % <span id="special">//</span></span>
            </div>
          </div>
        </div>

        <div class="location-name">
          <div class="weather-name">
            <i class="fa fa-map-marker" aria-hidden="true"></i>
            <span>Tehran / IR</span>
            -
            <span>Snowy</span>
          </div>

          <div class="weather-degree">27<sup>°</sup></div>
        </div>
      </div>

      <div class="custom-background">
        <div class="suntime-name">
          <div class="city-name">
            <div>
              <i class="fa fa-map-marker custom-icon" aria-hidden="true"></i>
              <span>Windsor</span>
            </div>

            <div class="custom-icon2">
              <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
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
              <p>4:45AM</p>
            </div>
          </div>

          <div class="sunset">
            <div>
              <img src="assets/icon/weather-icons/sunset.png" alt="sunset" />
            </div>
            <div>
              <p>Sunset</p>
              <p>6:45AM</p>
            </div>
          </div>
        </div>
      </div>

      <div class="forecast">
        <div class="day">
          <div class="img">
            <img src="assets/icon/openweathermap/01n.svg" alt="icon" />
          </div>
          <div class="day-name">Sun</div>
          <div class="degree">28<sup>°</sup></div>
        </div>

        <div class="day">
          <div class="img">
            <img src="assets/icon/openweathermap/10d.svg" alt="icon" />
          </div>
          <div class="day-name">Sun</div>
          <div class="degree">28<sup>°</sup></div>
        </div>

        <div class="day">
          <div class="img">
            <img src="assets/icon/openweathermap/11n.svg" alt="icon" />
          </div>
          <div class="day-name">Sun</div>
          <div class="degree">28<sup>°</sup></div>
        </div>

        <div class="day">
          <div class="img">
            <img src="assets/icon/openweathermap/01d.svg" alt="icon" />
          </div>
          <div class="day-name">Sun</div>
          <div class="degree">28<sup>°</sup></div>
        </div>

        <div class="day">
          <div class="img">
            <img src="assets/icon/openweathermap/13d.svg" alt="icon" />
          </div>
          <div class="day-name">Sun</div>
          <div class="degree">28<sup>°</sup></div>
        </div>

        <div class="day">
          <div class="img">
            <img src="assets/icon/openweathermap/50d.svg" alt="icon" />
          </div>
          <div class="day-name">Sun</div>
          <div class="degree">28<sup>°</sup></div>
        </div>
      </div>

      <footer>
        <p>
          CopyRight2024 &copy;
          <a href="https://farzadsolaimani-uk.netlify.app/"> Farzad.S </a>
        </p>
      </footer>
    </section>
    <!-- End new Search  -->
    `;

    searchForm.style.display = "block";
    searchForm.style.marginLeft = "20px";
    cityNameMobile.style.display = "none";
  });
}

// Notification (bell) feature
notification.addEventListener("click", () => {
  bell();
});

function bell() {
  notificationsMessages.classList.toggle("active");
}

// function changeProfile() {}
