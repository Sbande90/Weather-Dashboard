var apiKey = "0eba92eadb45c43de1839a3398ffc1f0";
var cityName = $("#city-name");
var climat = $("#temperature");
var humidityEl = $("#humidity");
var windSpeed = $("#wind");

$(document).ready(function(){
    $("#search").click(function(event){
        event.preventDefault();
        var userInput = $("#input").val();
        var queryUrl = "http://api.openweathermap.org/data/2.5/forecast?q="+userInput+"&cnt=5&appid="+apiKey; 
        // var queryUrl = "http://api.openweathermap.org/data/2.5/forecast?q="+userInput+"&cnt=5&appid="+apiKey; 
      $.ajax(
      {
          url: queryUrl,
          method: "GET",
      success: function(result){
        console.log(result);
        cityName.text( result.city.name+" ("+result.list[0].dt_txt+")");
        
        climat.text(result.main+"("+result.list[0].main.temp+")");
        humidityEl.text(result.main+"("+result.list[0].main.humidity+")");
        windSpeed.text(result.main+"("+result.list[0].main.wind.speed+")");
      }});
    });
  });