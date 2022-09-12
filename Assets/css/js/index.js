// target parent
console.log("hi from JS");
const recentSearchesContainer = $("#recent-searches-container");
const weatherInfoContainer = $("#weather-info-container");
const searchForm = $("#search-form");

const readFromLocalStorage = (key, defaultValue) => {
  // get from LS using key name
  const dataFromLS = localStorage.getItem(key);

  // parse data from LS
  const parsedData = JSON.parse(dataFromLS);

  if (parsedData) {
    return parsedData;
  } else {
    return defaultValue;
  }
};
const writeToLocalStorage = (key, value) => {
  // convert value to string
  const stringifiedValue = JSON.stringify(value);

  // set stringified value to LS for key name
  localStorage.setItem(key, stringifiedValue);
};
// constructing url to fetch data from api
const constructUrl = (baseUrl, params) => {
  const queryParams = new URLSearchParams(params).toString();

  return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
};

const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
// identifiying UV colour
const getUviClassName = (uvi) => {
    if (uvi >= 0 && uvi <= 2) {
      return "bg-success";
    }
  
    if (uvi > 2 && uvi <= 8) {
      return "bg-warning";
    }
    if (uvi > 8) {
      return "bg-danger";
    }
  };
  // current data cards
const renderCurrentData = (data) => {
    const currentWeatherCard = `<div class="p-3">
        <div class="text-center">
        <h2 class="my-2">${data.cityName}</h2>
        <h3 class="my-2">${moment
          .unix(data.weatherData.current.dt + data.weatherData.timezone_offset)
          .format("dddd, Do MMM, YYYY HH:mm:ss")}</h3>
          <div>
            <img
            src="http://openweathermap.org/img/w/${
              data.weatherData.current.weather[0].icon
            }.png"
              alt="weather icon"
              class="shadow-sm p-3 mt-3 bg-body rounded border"
            />
          </div>
        </div>
        <!-- weather metric div -->
        <div class="mt-4">
          <div class="row g-0">
            <div class="col-sm-12 col-md-4 p-2 border bg-light fw-bold">
              Temperature
            </div>
            <div class="col-sm-12 col-md-8 p-2 border">${
              data.weatherData.current.temp
            }&deg; C</div>
            </div>
          <div class="row g-0">
            <div class="col-sm-12 col-md-4 p-2 border bg-light fw-bold">
              Humidity
            </div>
            <div class="col-sm-12 col-md-8 p-2 border">${
              data.weatherData.current.humidity
            }&percnt;</div>
            </div>
          <div class="row g-0">
            <div class="col-sm-12 col-md-4 p-2 border bg-light fw-bold">
              Wind Speed
            </div>
            <div class="col-sm-12 col-md-8 p-2 border">${
              data.weatherData.current.wind_speed
            } MPH</div>
          </div>
          <div class="row g-0">
            <div class="col-sm-12 col-md-4 p-2 border bg-light fw-bold">
              UV Index
            </div>
            <div class="col-sm-12 col-md-8 p-2 border">
            <span class= "text-white px-3 rounded-2 ${getUviClassName(
              data.weatherData.current.uvi
            )}">${data.weatherData.current.uvi}</span>
            </div>
          </div>
        </div>
      </div>`;
  
    weatherInfoContainer.append(currentWeatherCard);
  };