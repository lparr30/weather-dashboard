var APIkey = "1c337a9e8fd9a9e0a3340f2849e04fa9";
var searchBtn = document.getElementById("searchBtn");

var savedCity = localStorage.getItem('city');
var searchHistory = document.getElementById('history');
searchHistory.append(savedCity);


function performSearch () {
    var inputVal = document.getElementById("cityToSearch").value.trim();
    weatherSearch(inputVal)
    forecastSearch(inputVal)
}

function weatherSearch(city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIkey;
    fetch(queryURL)
    .then(function(result) {
        return result.json()
    })
    .then(function (data) {
        // console.log(data);
        // console.log(data.main.temp);
        var weatherIcon = document.getElementById('weather-icon');
        var dataIcon = data.weather[0].icon
        weatherIcon.src = `https://openweathermap.org/img/wn/${dataIcon}@2x.png`
        // weatherIcon.src = `https://openweathermap.org/img/wn/10d@2x.png`
        

        var cityName = document.getElementById("city-name");
        cityName.textContent = data.name;
        cityName.append(weatherIcon.src);

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

function futureWeatherSearch(cityName) {
    // var queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey;
    var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}&units=imperial`

    fetch(queryURL)
    .then(function(result) {
        return result.json()
    })
    .then(function(data) {
        console.log(data)
        var arrOfTimes = data.list; // array of 40 items
        //attempt to normalize the data to just get noon items
        var arrOfFilteredTimes = [];

        for(i=0; i< arrOfTimes.length; i++) {
            if(arrOfTimes[i].dt_txt.split(" ")[1] == "12:00:00") {
                arrOfFilteredTimes.push(arrOfTimes[i])
            }

            // if(arrOfTimes[i].dt_txt.includes("12:00:00")) {
            //     arrOfFilteredTimes.push(arrOfTimes[i])
            // }
        }

        // var superFilter = arrOfTimes.filter(date => date.dt_txt.includes("12:00:00"))

        // console.log(arrOfFilteredTimes)

        renderForecast(arrOfFilteredTimes)
        // var today = dayjs().format('MM/DD/YYYY');
        // var oneDay = dayjs().add(dayjs.duration({'days':1}));
        // document.getElementById('one-day').textContent = oneDay;
        // var latitude = data.coord.lat;
        // var longitude = data.coord.lon;
    })    
}

function renderForecast(arr) {
    for(i =0; i<arr.length; i++) {
        var givenDate = arr[i].dt_txt.split(" ")[0]
        // console.log(givenDate)
        var properDate = givenDate.split('-');
        console.log(properDate)
        document.getElementById("date-" + i).textContent = properDate[1] + "/" + properDate[2] + "/" + properDate[0]
        document.getElementById("temp-" + i).textContent = "Temp: " + arr[i].main.temp + " \u00B0F"
        document.getElementById("wind-" + i).textContent = "Wind: " + arr[i].wind.speed + " MPH"
        document.getElementById("humid-" + i).textContent = "Humidity:" + arr[i].main.humidity + "%"
    }
}