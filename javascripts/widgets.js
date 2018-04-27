function createWidget(left, top, contentText) {
    var container = document.getElementById("container");

    var frame = document.createElement("div");
    frame.className = "widget";
    frame.style.left = left + "px";
    frame.style.top = top + "px";

    var cover = document.createElement("div");
    cover.className = "widgetCover";

    var menuBar = document.createElement("div");
    menuBar.className = "menuBar";
    var minimize = document.createElement("p");
    minimize.className = "minimizeButton";
    minimize.innerHTML = "-";

    var content = document.createElement("div");
    content.innerHTML = contentText;
    content = content.childNodes[0];

    // TODO: may not work on some browsers
    cover.style.width = content.style.width;
    cover.style.height = content.style.height;
    console.log(content.style.width);

    menuBar.appendChild(minimize);
    frame.appendChild(cover);
    frame.appendChild(menuBar);
    frame.appendChild(content);
    container.appendChild(frame);

    frame.addEventListener("mouseover", function() {
        menuBar.style.height = "25px";
        minimize.style.display = "inline";
    });
    frame.addEventListener("mouseout", function() {
        menuBar.style.height = "0";
        minimize.style.display = "none";
    });
    minimize.addEventListener("mouseover", function() {
        minimize.style.color = "#FFFFFF";
        minimize.style.backgroundColor = "#A1A1A1";
    });
    minimize.addEventListener("mouseout", function() {
        minimize.style.color = "#000000";
        minimize.style.backgroundColor = "#FFFFFF";
    });
    minimize.addEventListener("click", function() {
        frame.parentElement.removeChild(frame);
    });
}