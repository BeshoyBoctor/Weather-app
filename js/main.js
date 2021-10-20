
let today = document.getElementById("today");
let todayDate = document.getElementById("today-date");
let cityLocation = document.getElementById("location");
let todayDegree = document.getElementById("today-degree");
let todayIcon = document.getElementById("today-icon");
let description = document.getElementById("today-description");
let humidty = document.getElementById("humidty");
let wind = document.getElementById("wind");
let compass = document.getElementById("compass");
let searchBar = document.getElementById("search-bar")
let currentCity = "Cairo";
let apiResponse;
let responseData;
let date = new Date();
let weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let monthName = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];

let nextDay = document.getElementsByClassName("nextDay");
let afterNextDay = document.getElementsByClassName("afterNextDay");
let nextDate = document.getElementsByClassName("nextDate");
let nextDayIcon = document.getElementsByClassName("nextDay-icon");
let maxDegree = document.getElementsByClassName("max-degree");
let minDegree = document.getElementsByClassName("min-degree");
let nextDayDescription = document.getElementsByClassName("nextDay-description");


async function getWeatherData() {
    apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f2c64dc76f9b414b828162157211310&q=${currentCity}&days=3&aqi=no&alerts=no`);
    responseData = await apiResponse.json();
    console.log(responseData);
    displayTodayWeather();
    displayNextDaysWeather();
};
getWeatherData();


function displayTodayWeather() {

    let dateApi = responseData.forecast.forecastday[0].date;
    let date_components = dateApi.split("-");
    let current_day = date_components[2];

    today.innerHTML = weekDays[date.getDay()];
    todayDate.innerText = `${current_day} ${monthName[date.getMonth()]}`;
    cityLocation.innerHTML = responseData.location.name;
    todayDegree.innerHTML = Math.round(responseData.current.temp_c);
    todayIcon.setAttribute("src", `https:${responseData.current.condition.icon}`);
    description.innerHTML = responseData.current.condition.text;
    humidty.innerHTML = responseData.current.humidity;
    wind.innerHTML = responseData.current.wind_kph;
    compass.innerText =responseData.current.wind_dir
};

function getNextDays(nextDateApi) {

   let day = new Date(nextDateApi);
   return day && weekDays[day.getDay()];
};

function getNextDayMonth(nextDateApi) {

    let month = new Date(nextDateApi);
    return month && monthName[month.getMonth()];
 };

function displayNextDaysWeather() {
    for(let i = 0;  i < nextDay.length; i++)
    {   
        let nextDateApi = responseData.forecast.forecastday[i+1].date;
        let nextDate_components = nextDateApi.split("-");
        let next_day = nextDate_components[2];

        nextDay[i].innerHTML = getNextDays(nextDateApi);
        nextDate[i].innerHTML = `${next_day} ${getNextDayMonth(nextDateApi)}`;
        nextDayIcon[i].setAttribute("src", `https:${responseData.forecast.forecastday[i+1].day.condition.icon}`);
        maxDegree[i].innerHTML = Math.round(responseData.forecast.forecastday[i+1].day.maxtemp_c);
        minDegree[i].innerHTML = Math.round(responseData.forecast.forecastday[i+1].day.mintemp_c);
        nextDayDescription[i].innerHTML= responseData.forecast.forecastday[i+1].day.condition.text;
        
    }
};

searchBar.addEventListener("keyup", function() {
    currentCity = searchBar.value;
    getWeatherData();
});
