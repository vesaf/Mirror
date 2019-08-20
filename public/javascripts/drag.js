
window.addEventListener("load", function() {
    var holdDown = null;
    var lastCoords = {x: undefined, y: undefined};
    var startCoords = {x: undefined, y: undefined};
    var activeItem;
    // On click, check if on widget, if so, set holdDown to widget container
    window.addEventListener('mousedown', function(e) {
        parentElementClassesContain(e.target, ["widget", "icon"], function(widget) {
            if (widget) {
                // Make sure that the last item that was dragged is on top
                if (activeItem) {
                    activeItem.classList.remove("activeWidget");
                }
                activeItem = widget;
                activeItem.classList.add("activeWidget");
                
                holdDown = widget;
                // Set last coordinates to first click location
                lastCoords.x = e.x;
                lastCoords.y = e.y;
                startCoords.x = e.x;
                startCoords.y = e.y;
            }
            else {
                holdDown = null;
            }
        });
    });
    // On click release, set holdDown to null and reset last coordinates
    window.addEventListener("mouseup", function(e) {
        holdDown = null;
        // Only open a widget if the icon hasn't moved after the mouse button has been released
        // The event is caught from the icons.js file
        if (lastCoords.x == startCoords.x & lastCoords.y == startCoords.y & activeItem.classList.contains("icon")) {
            var iconClick = new Event("iconClick");
            activeItem.dispatchEvent(iconClick);
        }
        if (activeItem.classList.contains("icon")){
            activeItem.classList.remove("activeWidget");
        }
        lastCoords.x = undefined;
        lastCoords.y = undefined;
    });
    // If an item has been selected and it is not currently being moved in the app, move it as cursor moves
    window.addEventListener("mousemove", function(e) {
        if (holdDown && !holdDown.classList.contains("noTrack")) {
            // Make sure you don't go off screen horizontally
            var xSet = false;
            if ((window.innerWidth <= holdDown.offsetLeft + holdDown.offsetWidth && e.x - lastCoords.x > 0) ||
                (0 > holdDown.offsetLeft && e.x - lastCoords.x < 0)) {
                xSet = true;
            }
            // Make sure you don't go off screen vertically
            var ySet = false;
            if ((window.innerHeight <= holdDown.offsetTop + holdDown.offsetHeight && e.y - lastCoords.y > 0) ||
                (0 > holdDown.offsetTop && e.y - lastCoords.y < 0)) {
                ySet = true;
            }
            // If not prevented my offscreen safety measures move widget
            if (!xSet) {
                holdDown.style.left = (holdDown.offsetLeft + (e.x - lastCoords.x)) + "px";
            }
            if (!ySet) {
                holdDown.style.top = (holdDown.offsetTop + (e.y - lastCoords.y)) + "px";
            }
            // Save current click location
            lastCoords.x = e.x;
            lastCoords.y = e.y;
        }
    });
});

// Helper function that asks for an object it then searches the object and all its parents for a given class name. 
// It then returns the object that has the class or null if there was none.
function parentElementClassesContain(child, classNames, callback) {
    // If the current child has the class return the child in callback
    // if (child.classList.contains(className)) {
    //     callback(child);
    // }
    if (commonListElement(child.classList,classNames)) {
        callback(child);
    }
    // Else if the child has a parent repeat for parent
    else if (child.parentElement) {
        parentElementClassesContain(child.parentElement, classNames, callback);
    }
    // Else nothing found: invoke callback with null result
    else {
        callback(null);
    }
}

function commonListElement(list1, list2) {
    for (let i = 0; i < list2.length; i++) {
        if (list1.contains(list2[i])) {
            return true;
        }
    }
    return false;
}