import { parse, format } from "date-fns";
import fetchAPI from "./API";


const loader = document.querySelector("#loader");



const parseDateTime = (currentLocation) => {
  const { location: { localtime } } = currentLocation;
    const parseDate = parse(localtime, "yyyy-MM-dd HH:mm", new Date());
    const formattedDate = format(parseDate, "yyyy MMMM EEEE");
    const getOnlyTime = format(parseDate, "HH:mm");
    return { formattedDate, getOnlyTime };
  };
  
  const weatherInfo = async (event) => {
    try {
      event.preventDefault();
      const inputBox = document.getElementById("getWeatherData");
      loader.style.display = "block"; // Display loader when the API call starts
      const currentLocation = await fetchAPI(inputBox.value);
  
      // Hide the loader once the API call completes (whether successful or not)
      loader.style.display = "none";
  
      if (!currentLocation) {
        alert("NO location");
      }
  
      const weatherCurrentInfo = document.querySelector(".weatherCurrentInfo");
      weatherCurrentInfo.innerHTML = "";
  
      // Format Date
      const { formattedDate, getOnlyTime } = parseDateTime(currentLocation);
      const displayWeather = `
      <h1>${currentLocation.location.country}, ${currentLocation.location.name}</h1>
      <p>${formattedDate}, ${getOnlyTime}</p>
      <div class="main-grid">
        <div class="left-box">
          <div class="top-header">
            <img src="https:${currentLocation.current.condition.icon}" alt="Weather Icon">
            <h2>${currentLocation.current.temp_c}°C</h2>
          </div>
          <h3>${currentLocation.current.condition.text}</h3>
          <p>Feels like ${currentLocation.current.feelslike_c}°C</p>
        </div>
        <div class="right-box">
          <div class="right-box-item">
            <h3>Wind Direction</h3>
            <p>${currentLocation.current.wind_dir}</p>
          </div>
          <div class="right-box-item">
            <h3>Wind</h3>
            <p>${currentLocation.current.wind_kph} KPH</p>
          </div>
          <div class="right-box-item">
            <h3>Precipitation</h3>
            <p>${currentLocation.current.precip_mm}</p>
          </div>
          <div class="right-box-item">
            <h3>Wind Degree</h3>
            <p>${currentLocation.current.wind_degree}</p>
          </div>
          <div class="right-box-item">
            <h3>UV</h3>
            <p>${currentLocation.current.uv}</p>
          </div>
          <div class="right-box-item">
            <h3>Visibility</h3>
            <p>${currentLocation.current.vis_km} km</p>
          </div>
          <div class="right-box-item">
            <h3>Humidity</h3>
            <p>${currentLocation.current.humidity}%</p>
          </div>
          <div class="right-box-item">
            <h3>Gust</h3>
            <p>${currentLocation.current.gust_kph} KPH</p>
          </div>
          <div class="right-box-item">
            <h3>Cloud</h3>
            <p>${currentLocation.current.cloud}%</p>
          </div>
        </div>
      </div>
    `;
    
  
      const templateString = document.createElement("div");
      templateString.classList.add("weatherHolder");
      templateString.innerHTML = displayWeather;
      weatherCurrentInfo.append(templateString);
  
      console.log(currentLocation);
    } catch (error) {
      console.error("Error Displaying Data", error);
      loader.style.display = "none"; // Hide loader on error as well
    }
  };

  export default weatherInfo;