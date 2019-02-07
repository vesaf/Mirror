window.addEventListener("load", () => {
    var coords = getNextIconXY();
    var container = document.getElementById("container");

    var icon = document.createElement("i");
    icon.className = "fa fa-cogs icon";
    icon.id = "settingsIcon";
    icon.style.position = "absolute";
    
    icon.style.left = coords.x + "px";
    icon.style.top = coords.y + "px";

    container.appendChild(icon);
    icon.addEventListener("click", openSettings);
});

var open = false;
function openSettings() {
    if (!open) {
        open = true;
        var opaque = document.createElement("div");
        opaque.id = "opaqueLayer";
        var container = document.getElementById("container");
        var sideMenu = document.createElement("div");
        sideMenu.id = "settingsSideMenu";
        opaque.appendChild(sideMenu);
        container.appendChild(opaque);
    }
}