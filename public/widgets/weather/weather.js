window.addEventListener("load", function() {
    var css = '<link rel="stylesheet" type="text/css" href="widgets/weather/style.css">'
    var html = '<iframe class="weatherWidget" src="https://www.meteoblue.com/en/weather/widget/daily?geoloc=detect&days=3&tempunit=CELSIUS&windunit=KILOMETER_PER_HOUR&precipunit=MILLIMETER&coloured=monochrome&pictoicon=0&pictoicon=1&maxtemperature=0&maxtemperature=1&mintemperature=0&mintemperature=1&windspeed=0&windspeed=1&windgust=0&winddirection=0&winddirection=1&uv=0&humidity=0&precipitation=0&precipitation=1&precipitationprobability=0&precipitationprobability=1&spot=0&pressure=0&layout=dark"  frameborder="0" scrolling="NO" allowtransparency="true"></iframe>';
    initializeWidget("weather", html, css);
});