var city,img,color, temp, units = true;
var apiKey = "5dd765a29b95b2e058dfd9f33a1dbd0d";

$(document).ready(function() {	
	$.getJSON("http://ip-api.com/json/?callback=?", function(json) {
	    city = json.city;
	    getWeather(city);	    
	});

	$("#weather").on("click", "#temp-unit",function() {
		units = !units;
		var temp = Number($("#temp").text());

    	if (units && $("#temp-unit").text() ===  "&degF")      temp = (temp - 32) / 9 * 5;
    	else if (!units && $("#temp-unit").text() === "\xb0C") temp = (temp * 9/5) + 32;
    	else temp = temp;
    	
    	var unit = units ? "&degC" : "&degF";
    	$("#temp").html(temp);
    	$("#temp-unit").html(unit);
    });
});

function getWeather(city) {
	$.getJSON("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric", function(data) {

    	$("#weather").append("<tr><td>City</td><td>"+ data.name +"</td></tr>");
    	$("#weather").append("<tr><td>Temperature</td><td><span id='temp'>"+ data.main.temp +"</span><span id='temp-unit'>&degC</span></td></tr>");
    	$("#weather").append("<tr><td>Wind Speed</td><td>"+ data.wind.speed +" m/s</td></tr>");
    	$("#weather").append("<tr><td>Pressure</td><td>"+ data.main.pressure +" mb</td></tr>");
    	$("#weather").append("<tr><td>Humidity</td><td>"+ data.main.humidity +" %</td></tr>");

    	if (data.weather.id < 300)	{img = "http://openweathermap.org/img/w/11d.png" ; color = "#9966ff";}
    	else if (data.weather.id < 500) {img = "http://openweathermap.org/img/w/09d.png" ; color = "#3399ff"}
    	else if (data.weather.id < 600) {img = "http://openweathermap.org/img/w/10d.png" ; color = "#66ccff"}
    	else if (data.weather.id < 700) {img = "http://openweathermap.org/img/w/13d.png" ; color = "#ccffff"}
    	else if (data.weather.id < 800) {img = "http://openweathermap.org/img/w/50d.png" ; color = "#ff8000"}
    	else {img = "http://openweathermap.org/img/w/01d.png"; color = "#ccffff"}

    	$("#weather-icon").attr("src", img);
    	$("body").css("background-color", color);
    });
}