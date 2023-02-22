var APIkey = "1c337a9e8fd9a9e0a3340f2849e04fa9";
var searchBtn = document.getElementById("searchBtn");

var savedCity = localStorage.getItem('city');
var searchHistory = document.getElementById('history');
searchHistory.append(savedCity);

function performSearch () {
    var inputVal = document.getElementById("cityToSearch").value.trim();
    weatherSearch(inputVal)
}

function weatherSearch(city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIkey;
    fetch(queryURL)
    .then(function(result) {
        return result.json()
    })
    .then(function (data) {
        console.log(data);
        console.log(data.main.temp);
        document.getElementById("city-name").textContent = data.name;
        var today = dayjs().format('MM/DD/YYYY');
        document.getElementById("current-date").textContent = today
        document.getElementById("temp").textContent = "Temp: " + data.main.temp + " \u00B0F";
        document.getElementById("wind").textContent = "Wind: " + data.wind.speed + " MPH";
        document.getElementById("humid").textContent = "Humidity: " + data.main.humidity + "%";
        localStorage.setItem('city',city);
    })
}

searchBtn.addEventListener("click", performSearch);

function forecastSearch() {
    var userInput = document.getElementById('cityToSearch').value.trim();
    futureWeatherSearch(userInput);
}

function futureWeatherSearch(lat,lon) {
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey;
    fetch(queryURL)
    .then(function(result) {
        return result.json()
    })
    .then(function(data) {
        var today = dayjs().format('MM/DD/YYYY');
        // var oneDay = dayjs().add(dayjs.duration({'days':1}));
        document.getElementById('one-day').textContent = oneDay;
        // var latitude = data.coord.lat;
        // var longitude = data.coord.lon;
    })
    

    
}


searchBtn.addEventListener('click', forecastSearch);