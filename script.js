/**
 * OpenWeatherMap API Key
 * @type {string}
 */
const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3";

/**
 * OpenWeatherMap API URL
 * @type {string}
 */
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

/**
 * Search box input element
 * @type {HTMLInputElement}
 */
const searchBox = document.querySelector(".search input");

/**
 * Search button element
 * @type {HTMLButtonElement}
 */
const searchBtn = document.querySelector(".search button");

/**
 * Weather icon element
 * @type {HTMLImageElement}
 */
const weatherIcon = document.querySelector(".weather-icon");

/**
 * Wind speed element
 * @type {HTMLElement}
 */
const windSpeedElement = document.querySelector(".wind-speed");

/**
 * Checks the weather for a given city.
 * 
 * @param {string} city - The city to check the weather for.
 * @returns {Promise<void>}
 * @example
 * checkWeather("London");
 */
async function checkWeather(city) {
  /**
   * API response
   * @type {Response}
   */
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    /**
     * Show error message if city not found
     */
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    /**
     * API response data
     * @type {object}
     */
    var data = await response.json();

    /**
     * Update weather display
     */
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "*C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    windSpeedElement.innerHTML = `${(data.wind.speed * 3.6).toFixed(2)} km/h`;

    /**
     * Update weather icon
     */
    console.log(data.weather[0].main);
    if (data.weather[0].main == "Clouds")
      weatherIcon.src = "img/clouds.png";
    else if (data.weather[0].main == "Clear")
      weatherIcon.src = "img/clear.png";
    else if (data.weather[0].main == "Rain")
      weatherIcon.src = "img/rain.png";
    else if (data.weather[0].main == "Drizzle")
      weatherIcon.src = "img/drizzle.png";
    else if (data.weather[0].main == "Mist")
      weatherIcon.src = "img/mist.png";

    /**
     * Show weather display
     */
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

/**
 * Add event listener to search button
 */
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

/**
 * Add event listener to search box
 */
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
  }
});