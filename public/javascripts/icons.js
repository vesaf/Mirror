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