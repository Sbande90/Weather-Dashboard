var apiKey = "0eba92eadb45c43de1839a3398ffc1f0";
var cityName = $("#city-name");
var climat = $("#temperature");
var humidityEl = $("#humidity");
var windSpeed = $("#wind");
var latLon = $("#uv-index");
var dayslist = $("#bottom-card");
var historyList = $("#list");
var clenData = $("#clear-history");

$(document).ready(function () {
  var history = JSON.parse(localStorage.getItem("cntdata"));
  if (!history) {
    history = []
  }
  historyList.empty();
  for (var i = 0; i < history.length; i++) {
    var contry = '<div class="list-item">' + history[i] + '</div>';
    historyList.append(contry);
  }

  clenData.click(function(event){
    event.preventDefault();
    historyList.empty();
    localStorage.setItem("cntdata", JSON.stringify([]));
  });
  $("#search").click(function (event) {
    event.preventDefault();
    var userInput = $("#input").val();
    history.unshift(userInput);
    localStorage.setItem("cntdata", JSON.stringify(history));
    historyList.empty();
    for (var i = 0; i < history.length; i++) {
      var contry = '<div class="list-item">' + history[i] + '</div>';
      historyList.append(contry);
    }
    var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&cnt=5&appid=" + apiKey;
    // var queryUrl = "http://api.openweathermap.org/data/2.5/forecast?q="+userInput+"&cnt=5&appid="+apiKey; 
    $.ajax(
      {
        url: queryUrl,
        method: "GET",
        success: function (result) {
          console.log(result);
          var CityVal = result.city.name + " (" + result.list[0].dt_txt.split(' ')[0].split('-').join('/') + ")";
          var icon = "<img src='https://openweathermap.org/img/wn/" + result.list[0].weather[0].icon + "@2x.png' alt='icon' >";
          cityName.html(CityVal + icon);


          climat.html("Temperature: " + result.list[0].main.temp + " &#8457; ");
          humidityEl.text("Humidity: " + result.list[0].main.humidity + " % ");
          windSpeed.text("Wind-speed: " + result.list[0].wind.speed + " MPH ");

          dayslist.empty();
          for (var i = 0; i < result.list.length; i++) {

            if (i < 5) {
              var parentDiv = '<div class="days-box">';
              var icon2 = "<img src='https://openweathermap.org/img/wn/" + result.list[i].weather[0].icon + "@2x.png' alt='icon' >";
              parentDiv += '<div class="date">' + result.list[i].dt_txt.split(' ')[0].split('-').join('/') + '</div>' + icon2;
              parentDiv += '<div class="temp">Temp: ' + result.list[i].main.temp + ' &#8457; </div>';
              parentDiv += '<div class="humidity">Humidity: ' + result.list[i].main.humidity + ' % </div>';
              parentDiv += '</div>';
              dayslist.append(parentDiv);
            }

          }

          var lat = result.city.coord.lat;
          var lon = result.city.coord.lon;
          // var queryUrl2 = "http://api.openweathermap.org/data/2.5/uvi?lat="+lat+ "&lon="+lon+"&appid="+apiKey;
          var queryUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&appid=" + apiKey;

          $.ajax(
            {
              url: queryUrl2,
              method: "GET",
              success: function (response) {
                console.log(response);
                latLon.text("UV index: " + response.current.uvi);

              }
            })
        }
      });
  });
});