var lat,lon,img,color, temp, units = true;
var apiKey = "fd41276d1d494f6b585b555327a912d0";

$(document).ready(function() {	
	/*if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(JSON.stringify(position));
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            getWeather(lat,lon);
        });
    }*/

    $.getJSON("http://ip-api.com/json/?callback=?", function(json) {
	    lat = json.lat;
        lon = json.lon;
	    getWeather(lat,lon);	    
	});

	$("#weather").on("click", "#temp-unit",function() {
		units = !units;
		var temp = Number($("#temp").text());
        var str;

    	if (units && $("#temp-unit").text() ===  "\xb0F") {
            temp = (temp - 32) / 9 * 5;
            str = "Click to change to Fahreinheit"
        }
    	else if (!units && $("#temp-unit").text() === "\xb0C") {
            temp = (temp * 9/5) + 32;
            str = "Click to change to Celsius"
        }
    	else temp = temp;
        temp = Math.round(temp, 2);
    	
    	var unit = units ? "&degC" : "&degF";
    	$("#temp").html(temp);
    	$("#temp-unit").html(unit);
        $("#temp-unit").attr("title", str);
    });
});

function getWeather(city) {
	$.getJSON("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+apiKey+"&units=metric", function(data) {

    	$("#weather").append("<tr><td>City</td><td>"+ data.name +"</td></tr>");
    	$("#weather").append("<tr><td>Temperature</td><td><span id='temp'>"+ data.main.temp +"</span><span id='temp-unit' title='Click to change to Fahreinheit'>&degC</span></td></tr>");
    	$("#weather").append("<tr><td>Wind Speed</td><td>"+ data.wind.speed +" m/s</td></tr>");
    	$("#weather").append("<tr><td>Pressure</td><td>"+ data.main.pressure +" mb</td></tr>");
    	$("#weather").append("<tr><td>Humidity</td><td>"+ data.main.humidity +" %</td></tr>");

    	if (data.weather.id < 300)	{img = "https://openweathermap.org/img/w/11d.png" ; color = "#9966ff";}
    	else if (data.weather.id < 500) {img = "https://openweathermap.org/img/w/09d.png" ; color = "#3399ff"}
    	else if (data.weather.id < 600) {img = "https://openweathermap.org/img/w/10d.png" ; color = "#66ccff"}
    	else if (data.weather.id < 700) {img = "https://openweathermap.org/img/w/13d.png" ; color = "#ccffff"}
    	else if (data.weather.id < 800) {img = "https://openweathermap.org/img/w/50d.png" ; color = "#ff8000"}
    	else {img = "https://openweathermap.org/img/w/01d.png"; color = "#ccffff"}

    	$("#weather-icon").attr("src", img);
    	$("body").css("background-color", color);
    });
}