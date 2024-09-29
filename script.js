const apiConfig = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/",
  units: "metric"
};

const searchBox = document.querySelector('.search-box');
const locationElement = document.querySelector('.location');
const currentWeatherElement = document.querySelector('.current');

searchBox.addEventListener('keypress', handleKeyPress);

function handleKeyPress(event) {
  if (event.keyCode === 13) {
    const query = searchBox.value.trim();
    if (query) {
      getWeatherResults(query);
    }
  }
}

function getWeatherResults(query) {
  const url = `${apiConfig.base}weather?q=${query}&units=${apiConfig.units}&APPID=${apiConfig.key}`;
  fetch(url)
    .then(response => response.json())
    .then(displayWeatherResults)
    .catch(error => console.error(error));
}

function displayWeatherResults(weatherData) {
  const city = weatherData.name;
  const country = weatherData.sys.country;
  const temperature = Math.round(weatherData.main.temp);
  const weatherDescription = weatherData.weather[0].main;
  const highTemperature = Math.round(weatherData.main.temp_max);
  const lowTemperature = Math.round(weatherData.main.temp_min);

  locationElement.innerHTML = `
    <div class="city">${city}, ${country}</div>
    <div class="date">${getDate()}</div>
  `;

  currentWeatherElement.innerHTML = `
    <div class="temp">${temperature}<span>°c</span></div>
    <div class="weather">${weatherDescription}</div>
    <div class="hi-low">${lowTemperature}°c / ${highTemperature}°c</div>
  `;
}

function getDate() {
  const date = new Date();
  const day = date.toLocaleString('en-US', { weekday: 'long' });
  const month = date.toLocaleString('en-US', { month: 'long' });
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();

  return `${day} ${dayOfMonth} ${month} ${year}`;
}
