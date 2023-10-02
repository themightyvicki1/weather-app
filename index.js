let currentTime = new Date();
let date = currentTime.getDate();

// function to format date
function formatDate(currentTime) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentTime.getDay()];

  let year = currentTime.getFullYear();

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[currentTime.getMonth()];

  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  // so :01 is  not displayed as 1
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dateFormatted = `${day}, ${month} ${date}, ${year} ${hours}:${minutes}`;
  return dateFormatted;
}

// call to function to get the date
console.log(formatDate(new Date()));

// challenge 2
let h2 = document.querySelector("h2");
h2.innerHTML = formatDate(new Date());

// in here, user's input is stored and updated into the api URL so that every time user searches, the URL will update too
function citySearch(event) {
  event.preventDefault();
  let userInput = document.querySelector("#search-input");
  // access value stored inside
  console.log(userInput.value);
  let userInfo = userInput.value;
  // only update when searching
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = userInfo;

  let apiKey = "456d41832ed298b7d12fff1db0159708";
  let updatedApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInfo}&appid=${apiKey}&units=imperial`;
  // then it will call to this function to actually show the temp of the new searched city
  // axios lets us connect to an external website
  axios.get(updatedApiUrl).then(showTemperature);
}

// this is where the user enters a city name, it will add event for a submit in the form, then go to citySearch function
let searchForm = document.querySelector("#search-for-city");
searchForm.addEventListener("submit", citySearch);

// the response of the URL, store data into variables and change HTML to be these variables
function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  console.log(cityName);
  let name = document.querySelector("h1");
  name.innerHTML = cityName;
  let currentTemp = document.querySelector("#current-header");
  currentTemp.innerHTML = `${temperature}°F`;
  if (temperature > 80) {
    currentTemp.innerHTML = `<i class="fa-regular fa-sun"></i> ${temperature}°F`;
  }
  if (temperature < 60) {
    currentTemp.innerHTML = `<i class="fa-solid fa-cloud-sun"></i></i> ${temperature}°F`;
  }
  let currentDescription = document.querySelector("h3");
  currentDescription.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#hum");
  humidity.innerHTML = `${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed} mph`;
  let min = document.querySelector("#min");
  min.innerHTML = `${Math.round(response.data.main.temp_min)}°F`;
  let max = document.querySelector("#max");
  max.innerHTML = `${Math.round(response.data.main.temp_max)}°F`;
  let feelsLike = document.querySelector(".feels-like");
  feelsLike.innerHTML = ` ${Math.round(response.data.main.feels_like)}°F`;
}

// original api URL and call, starts with sacramento
let apiKey = "456d41832ed298b7d12fff1db0159708";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Sacramento&appid=${apiKey}&units=imperial`;
// axios lets us connect to an external website
axios.get(apiUrl).then(showTemperature);

// current weather button function
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
  // want to display city name based on long and lat
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  console.log(position);

  let apiUrlLongLat = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=456d41832ed298b7d12fff1db0159708&units=imperial`;

  //console.log(apiUrlLongLat);

  // just call back to same showTemp function, the response from this function's axios call will get put in that function
  axios.get(apiUrlLongLat).then(showTemperature);
}

// when the current button is clicked, show the current location based on long and lat
let currentButton = document.querySelector("#current-weather-button");
currentButton.addEventListener("click", getCurrentPosition);
