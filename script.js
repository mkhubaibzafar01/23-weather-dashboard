const cities = {
  lahore: {
    name: "Lahore, Pakistan",
    temperature: 32,
    condition: "Sunny",
    icon: "☀️",
    feelsLike: 34,
    humidity: 45,
    wind: 12
  },
  karachi: {
    name: "Karachi, Pakistan",
    temperature: 30,
    condition: "Partly Cloudy",
    icon: "🌤️",
    feelsLike: 33,
    humidity: 68,
    wind: 18
  },
  london: {
    name: "London, UK",
    temperature: 16,
    condition: "Cloudy",
    icon: "☁️",
    feelsLike: 15,
    humidity: 72,
    wind: 14
  },
  tokyo: {
    name: "Tokyo, Japan",
    temperature: 24,
    condition: "Light Rain",
    icon: "🌦️",
    feelsLike: 25,
    humidity: 78,
    wind: 9
  },
  islamabad: {
    name: "Islamabad, Pakistan",
    temperature: 27,
    condition: "Clear Sky",
    icon: "🌞",
    feelsLike: 28,
    humidity: 50,
    wind: 10
  }
};

const searchForm = document.querySelector("#searchForm");
const cityInput = document.querySelector("#cityInput");
const message = document.querySelector("#message");
const unitButton = document.querySelector("#unitButton");
const recentCities = document.querySelector("#recentCities");

let isCelsius = true;
let currentCity = cities.lahore;
let recent = [];

function displayWeather(city) {
  currentCity = city;

  const temperature = isCelsius
    ? city.temperature
    : Math.round((city.temperature * 9) / 5 + 32);

  const feelsLike = isCelsius
    ? city.feelsLike
    : Math.round((city.feelsLike * 9) / 5 + 32);

  document.querySelector("#cityName").textContent = city.name;
  document.querySelector("#condition").textContent = city.condition;
  document.querySelector("#weatherIcon").textContent = city.icon;
  document.querySelector("#temperature").textContent = temperature;
  document.querySelector("#unit").textContent = isCelsius ? "°C" : "°F";
  document.querySelector("#feelsLike").textContent =
    `${feelsLike}°${isCelsius ? "C" : "F"}`;
  document.querySelector("#humidity").textContent = `${city.humidity}%`;
  document.querySelector("#wind").textContent = `${city.wind} km/h`;
  unitButton.textContent = isCelsius ? "Switch to °F" : "Switch to °C";
}

function renderRecentCities() {
  recentCities.replaceChildren();

  recent.forEach((cityKey) => {
    const button = document.createElement("button");
    button.className = "recent-city";
    button.type = "button";
    button.textContent = cities[cityKey].name;

    button.addEventListener("click", () => {
      displayWeather(cities[cityKey]);
      message.textContent = "Showing sample weather data.";
    });

    recentCities.appendChild(button);
  });
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const cityKey = cityInput.value.trim().toLowerCase();

  if (!cities[cityKey]) {
    message.textContent =
      "City not found in this demo. Try Lahore, Karachi, Islamabad, London or Tokyo.";
    return;
  }

  displayWeather(cities[cityKey]);
  message.textContent = "Showing sample weather data.";

  recent = [cityKey, ...recent.filter((city) => city !== cityKey)].slice(0, 4);

  renderRecentCities();
  cityInput.value = "";
});

unitButton.addEventListener("click", () => {
  isCelsius = !isCelsius;
  displayWeather(currentCity);
});

displayWeather(currentCity);