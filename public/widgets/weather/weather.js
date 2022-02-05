var css = '<link rel="stylesheet" type="text/css" href="widgets/weather/style.css">'
var html = '<iframe class="weatherWidget" id="weatherFrame" src="https://www.meteoblue.com/en/weather/widget/daily/prenzlauer-berg_germany_2852217?geoloc=fixed&days=3&tempunit=CELSIUS&windunit=KILOMETER_PER_HOUR&precipunit=MILLIMETER&coloured=monochrome&pictoicon=0&pictoicon=1&maxtemperature=0&maxtemperature=1&mintemperature=0&mintemperature=1&windspeed=0&windspeed=1&windgust=0&winddirection=0&winddirection=1&uv=0&humidity=0&precipitation=0&precipitation=1&precipitationprobability=0&precipitationprobability=1&spot=0&pressure=0&layout=dark"  frameborder="0" scrolling="NO" allowtransparency="true"></iframe>';
initializeWidget("weather", html, css, startWeather, stopWeather);

var weatherInterval;

// Clear widget time when widget closes
function stopWeather() {
    clearInterval(weatherInterval);
}

function startWeather() {
    // Refresh weather widget every 6 hours
    weatherFrame = document.getElementById("weatherFrame");
    weatherInterval = window.setInterval(function() {
        weatherFrame.src = weatherFrame.src;
    }, 1000*60*6)
}