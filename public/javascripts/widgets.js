function createWidget(name, left, top, contentText, cssText, callback) {
    var container = document.getElementById("container");

    // Create outer frame for widget
    var frame = document.createElement("div");
    frame.className = "widget";
    frame.id = name + "Widget";
    frame.style.left = left + "px";
    frame.style.top = top + "px";
    container.appendChild(frame);

    // Create cover over widget to avoid clicking and to ensure dragging
    var cover = document.createElement("div");
    cover.className = "widgetCover";

    // Create menu bar and minimize button
    var menuBar = document.createElement("div");
    menuBar.className = "menuBar";
    var minimize = document.createElement("p");
    minimize.className = "minimizeButton";
    minimize.innerHTML = "-";
    menuBar.appendChild(minimize);
    frame.appendChild(menuBar);

    // Create widget content
    var content = document.createElement("div");
    content.innerHTML = contentText;
    content = content.childNodes[0];
    
    // Call callback once content loaded
    if (callback) {
        // TODO: fix this dirty fix for observer firing twice
        // TODO: is cover always last to load?
        var first = true;
        var observer = new MutationObserver(function(mutations) {
            if (document.contains(cover) && first) {
                callback();
                first = false;
                observer.disconnect;
            }
        });
        observer.observe(container, {attributes: false, childList: true, characterData: false, subtree: true});
    }

    frame.appendChild(content);


    // TODO: fix so that width and height no longer need to be set
    // Set css if any
    if (cssText) {
        var css = document.createElement("div");
        css.innerHTML = cssText;
        css = css.childNodes[0]
        document.getElementsByTagName('head')[0].appendChild(css);
        css.addEventListener("load", function() {
            cover.style.width = content.style.width || content.offsetWidth + "px";
            cover.style.height = content.style.height || content.offsetHeight + "px";
            frame.appendChild(cover);
        });
    }
    // Set cover width and height if no css
    else {
        cover.style.width = content.style.width || content.offsetWidth + "px";
        cover.style.height = content.style.height || content.offsetHeight + "px";
        frame.appendChild(cover);  
    }
 

    // Make menu bar appear and disappear
    frame.addEventListener("mouseover", function() {
        menuBar.style.height = "25px";
        minimize.style.display = "inline";
    });
    frame.addEventListener("mouseout", function() {
        menuBar.style.height = "0";
        minimize.style.display = "none";
    });

    // Make minimize button highlight and clickable
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
        initializedWidgets[name].open = false;
    });
}

var iconX = 30;
var iconY = 90;
// TODO: next column if full
var initializedWidgets = {};
function initializeWidget(name, content, css, callback) {
    initializedWidgets[name] = {open: false};
    createIcon(iconX, iconY, "widgets/" + name + "/" + name + ".png", function () {
        if (initializedWidgets[name].open == false) {
            createWidget(name, iconX, iconY, content, css, callback);
            initializedWidgets[name].open = true;
        }
        
    });
    iconY += 60;
}

function getNextIconXY() {
    return {x: iconX, y: iconY - 60};
}