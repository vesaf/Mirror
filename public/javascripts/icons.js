function createIcon(left, top, imageSrc, name, openWidget) {
    var container = document.getElementById("container");

    var icon = document.createElement("div");
    icon.className = "icon";
    icon.id = name;
    icon.style.left = left + "px";
    icon.style.top = top + "px";

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
    // Listen for the icon click event dispatched from the drag.js file
    // Settings event listener from settings.js file
    icon.addEventListener("iconClick", openWidget);
}
