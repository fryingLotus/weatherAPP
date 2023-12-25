import weatherInfo from "./module/WeatherInfo";

const displayWeather = document.getElementById("DisplayData");

displayWeather.addEventListener("click", (event) => {
    weatherInfo(event)
});
