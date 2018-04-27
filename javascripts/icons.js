window.addEventListener("load", function() {
    createIcon(800, 100, "images/weather.png", function () {
        createWidget(40, 40, '<iframe src="https://www.meteoblue.com/en/weather/widget/daily?geoloc=detect&days=3&tempunit=CELSIUS&windunit=KILOMETER_PER_HOUR&precipunit=MILLIMETER&coloured=monochrome&pictoicon=0&pictoicon=1&maxtemperature=0&maxtemperature=1&mintemperature=0&mintemperature=1&windspeed=0&windspeed=1&windgust=0&winddirection=0&winddirection=1&uv=0&humidity=0&precipitation=0&precipitation=1&precipitationprobability=0&precipitationprobability=1&spot=0&pressure=0&layout=dark"  frameborder="0" scrolling="NO" allowtransparency="true"  style="width: 162px;height: 320px; position: absolute; top: 0; left: 0; background-color: #000000;"></iframe>');
    });
    createIcon(800, 200, "images/calendar.png", function() {
        createWidget(40, 40, '<iframe src="https://calendar.google.com/calendar/embed?showNav=0&amp;showPrint=0&amp;mode=AGENDA&amp;height=300&amp;wkst=2&amp;bgcolor=%23ffffff&amp;src=vesaf96%40gmail.com&amp;color=%2329527A&amp;src=cafeafdeling%40gmail.com&amp;color=%23B1440E&amp;src=fvm5lcrtq3ar1epidosvjmabhk%40group.calendar.google.com&amp;color=%232952A3&amp;src=noor2hilbers%40gmail.com&amp;color=%235229A3&amp;ctz=Europe%2FAmsterdam" style="border-width:0; position: absolute; top: 0; left: 0; width: 400px; height: 300px;" frameborder="0" scrolling="no"></iframe>');
    });
});

function createIcon(left, top, imageSrc, openWidget) {
    var container = document.getElementById("container");

    var icon = document.createElement("div");
    icon.className = "icon";
    icon.style.position = "absolute";
    icon.style.left = left + "px";
    icon.style.top = top + "px";
    icon.style.zIndex = "0";

    var iconImg = document.createElement("img");
    iconImg.src = imageSrc;
    iconImg.style.width = "32px";
    iconImg.style.height = "32px";
    iconImg.style.position = "absolute";
    iconImg.style.left = "3px";
    iconImg.style.top = "3px";
    iconImg.ondragstart = function() { return false; };

    icon.appendChild(iconImg);
    container.appendChild(icon);
    icon.addEventListener("click", openWidget);
}
