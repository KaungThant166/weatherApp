const apiKey = "0736a92e87d616edcaa64378f4eacaac";
const cityInput = document.querySelector(".cityInput");
const weatherForm = document.querySelector(".weatherForm");
let card = document.querySelector(".card");

weatherForm.addEventListener("submit", async (evt) => {
  const city = cityInput.value;
  evt.preventDefault();
  if (city) {
    try {
      const data = await getWeatherData(city);
      displayWeatherInfo(data);
    } catch (error) {
      console.error(error);
      errorDisplay(error);
    }
  } else {
    displayError("please Enter a city");
  }
});

const getWeatherData = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("could not be found");
  }
  return await response.json();
};

const displayWeatherInfo = (data) => {
  const {
    name: city,
    weather: [{ id, description }],
    main: { humidity, temp },
  } = data;

  const displayCity = document.createElement("p");
  displayCity.classList.add("cityDisplay");
  displayCity.textContent = city;

  const tempDisplay = document.createElement("p");
  tempDisplay.classList.add("tempDisplay");
  tempDisplay.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(1)}°F`;

  const descDisplay = document.createElement("p");
  descDisplay.classList.add("descDisplay");
  descDisplay.textContent = description;

  const humidityDisplay = document.createElement("p");
  humidityDisplay.classList.add("humidityDisplay");
  humidityDisplay.textContent = `Humidity: ${humidity}%`;

  const weatherEmoji = document.createElement("p");
  weatherEmoji.classList.add("weatherEmoji");
  weatherEmoji.textContent = getDataEmoji(id);

  card.textContent = "";
  card.style.display = "flex";
  card.append(
    displayCity,
    tempDisplay,
    humidityDisplay,
    descDisplay,
    weatherEmoji
  );
};

const getDataEmoji = (emojiId) => {
  switch (true) {
    case emojiId >= 200 && emojiId < 300:
      return "🌩";
    case emojiId >= 300 && emojiId < 400:
      return "🌧";
    case emojiId >= 500 && emojiId < 600:
      return "❄️";
    case emojiId >= 600 && emojiId < 700:
      return "🌈";
    case emojiId === 800:
      return "☀️";
    case emojiId >= 801 && emojiId < 810:
      return "☁️";
    default:
      return "?";
  }
};

const displayError = (message) => {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
};
