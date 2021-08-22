
// Handles page load event
document.addEventListener("DOMContentLoaded", function () {
    // Check if page loaded in proper context
    const widgetName = window.localStorage.widget;
    const localStorage = window.localStorage;
    const ip = "http://192.168.1.115:8080";
    const location = window.location.href;
    console.log(widgetName);
    console.log(ip);
    console.log(location.substr(location.length - 13));
    if (widgetName && ip && location.substr(location.length - 13) === "/control.html") {
        // Enter text into button: Close Capitalized widget widgetName
        document.getElementById("closeButton").innerHTML = "Close " + widgetName.charAt(0).toUpperCase() + widgetName.slice(1);

        // Send close message to server when close button pressed and go to main screen
        document.getElementById("closeButton").addEventListener("click", function () {
            $.ajax({
                type: "POST",
                url: ip + "/app/status",
                data: JSON.stringify({ id: 2, options: { widget: widgetName } }),
                success: function () {
                    window.open("./app.html", "_self");
                },
                error: function (err) {
                    console.log(err);
                    alert("Kon niet met de spiegel verbinden. Probeer het later nog eens.");
                }
            });
        });

        // Setup drag area
        var dragArea = document.getElementById("dragArea")
        try {
            // Calculate ratio of mirror dimensions
            const mirrorDims = JSON.parse(localStorage.mirrorDims);
            const mirrorRat = mirrorDims.width / mirrorDims.height;
            const dragAreaContainer = document.getElementById("dragAreaContainer");
            const appDims = { width: dragAreaContainer.clientWidth, height: dragAreaContainer.clientHeight };
            const appRat = appDims.width / appDims.height;

            // Calculate drag area dimensions, depens on whether mirror is in portrait or landscape
            var dragAreaDims = {};
            if (mirrorRat >= appRat) {
                dragAreaDims.width = appDims.width;
                dragAreaDims.height = appDims.width / mirrorRat;
            }
            else {
                dragAreaDims.height = appDims.height;
                dragAreaDims.width = appDims.height * mirrorRat;
            }
            // Get drag area border width (needed for offset later)
            dragAreaDims.border = parseInt(getComputedStyle(dragArea, null).getPropertyValue('border-width').slice(0, -2));

            // Set drag area dimensions in CSS
            dragArea.style.width = dragAreaDims.width + "px";
            dragArea.style.height = dragAreaDims.height + "px";
            dragArea.style.top = appDims.height / 2 - dragAreaDims.height / 2 + "px";
            
            // Start widget location check loop
            getWidgetLocation(ip, dragArea, widgetName, dragAreaDims, mirrorDims);
        }
        catch (err) {
            dragArea.style.visibility = "hidden";
            console.log(err);
        }
    }
    // If not loaded in proper context, go back to main page
    else if (location.substr(location.length - 13) === "/control.html") {
        // window.open("./app.html", "_self");
    }
}, false);

// Get widget location on mirror
function getWidgetLocation(ip, widgetName, dragArea, dragAreaDims, mirrorDims) {
    // Add indicator HTML
    dragArea.innerHTML += "<i id='locationIndicator' class='fas fa-circle'></i>";

    const locationIndicator = document.getElementById("locationIndicator");
    locationIndicator.style.transition = "all 0.4s";
    const locationInfo = {
        ip: ip,
        locationIndicator: locationIndicator,
        dragAreaDims: dragAreaDims,
        ratios: {
            width: dragAreaDims.width / mirrorDims.width,
            height: dragAreaDims.height / mirrorDims.height
        },
        intervalTime: 100
    };
    var locationInterval = startLocationInterval(locationInfo);

    setupLocationIndicator(locationIndicator, widgetName, locationInterval, locationInfo);

    // Clear interval when navigating to next page
    window.addEventListener("beforeunload", function () {
        clearInterval(locationInterval);
    });
}

function startLocationInterval(locationInfo) {
    // Clear any previous interval
    clearInterval(locationInterval);

    // Set widget location indicator every intervalTime miliseconds
    var locationInterval = setInterval(function () {
        $.ajax({
            url: locationInfo.ip + "/app/widgetlocation",
            success: function (widgetLocation) {
                locationInfo.locationIndicator.style.left = widgetLocation.x * locationInfo.ratios.width + "px";
                locationInfo.locationIndicator.style.top = widgetLocation.y * locationInfo.ratios.height + "px";
            },
            error: function (err) {
                console.log(err);
                locationInfo.locationIndicator.style.visibility = "hidden";
            }
        });
    }, locationInfo.intervalTime);
    return locationInterval;
}

function setupLocationIndicator(locationIndicator, widgetName, locationInterval, locationInfo) {
    var pos1 = 0, pos2 = 0, initDiffX = 0, initDiffY = 0;
    // Why this equations holds? No idea...
    // Border offset ensures that indicator can't go outside of drag area at bottom and on right
    const borderOffset = 21 + 2 * locationInfo.dragAreaDims.border;
    
    locationIndicator.addEventListener("touchstart", dragMouseDown);
    locationIndicator.addEventListener("mousedown", dragMouseDown);

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        locationIndicator.style.transition = "";

        // Tell mirror to stop listening for local drag actions and to start listening to app drag actions
        $.ajax({
            type: "POST",
            url: locationInfo.ip + "/app/status",
            data: JSON.stringify({ id: 3, options: { widget: widgetName } }),
            error: function (err) {
                console.log(err);
                alert("Kon niet met de spiegel verbinden. Probeer het later nog eens.");
            }
        });

        // Get current x and y positions (first check mouse, then touch)
        pos1 = e.clientX || e.touches[0].clientX;
        pos2 = e.clientY || e.touches[0].clientY;

        // Get movement relative to last iteration
        initDiffX = pos1 - locationIndicator.style.left.slice(0, -2);
        initDiffY = pos2 - locationIndicator.style.top.slice(0, -2);

        // When touch start don't let indicator correspond to mirror location anymore
        clearInterval(locationInterval);
        // Start movement and move end event listeners
        document.addEventListener("touchend", closeDragElement);
        document.addEventListener("touchmove", elementDrag);
        document.addEventListener("mouseup", closeDragElement);
        document.addEventListener("mousemove", elementDrag);
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // Calculate new cursor position
        pos1 = e.clientX || e.touches[0].clientX;
        pos2 = e.clientY || e.touches[0].clientY;

        // Set new position but make sure can't go outside drag area
        if (pos2 - initDiffY > 0 && pos2 - initDiffY < locationInfo.dragAreaDims.height - borderOffset) {
            locationIndicator.style.top = (pos2 - initDiffY) + "px";
        }
        else if (pos2 - initDiffY <= 0) {
            locationIndicator.style.top = "0px";
        }
        else {
            locationIndicator.style.top = (locationInfo.dragAreaDims.height - borderOffset) + "px";
        }
        if (pos1 - initDiffX > 0 && pos1 - initDiffX < locationInfo.dragAreaDims.width - borderOffset) {
            locationIndicator.style.left = (pos1 - initDiffX) + "px";
        }
        else if (pos1 - initDiffX <= 0) {
            locationIndicator.style.left = "0px";
        }
        else {
            locationIndicator.style.left = (locationInfo.dragAreaDims.width - borderOffset) + "px";
        }

        // Send corresponding widget location to server
        const mirrorX = Math.round(locationIndicator.style.left.slice(0, -2) / locationInfo.ratios.width);
        const mirrorY = Math.round(locationIndicator.style.top.slice(0, -2) / locationInfo.ratios.height);
        const sendObj = JSON.stringify({ x: mirrorX, y: mirrorY })
        console.log(sendObj);
        // $.ajax({
        //     type: "POST",
        //     url: locationInfo.ip + "/app/widgetlocation",
        //     data: JSON.stringify({x: mirrorX, y: mirrorY}),
        //     success: function () {

        //     },
        //     error: function (err) {
        //         console.log(err);
        //         alert("Kon niet met de spiegel verbinden. Probeer het later nog eens.");
        //     }
        // });
        jQuery.ajax({
            url: locationInfo.ip + "/app/widgetlocation",
            type: "POST",
            data: sendObj,
            error: function (jqXHR, status) {
                // TODO
            }
        });
    }

    // Stop all movement event listeners and settle in final position
    function closeDragElement() {
        $.ajax({
            type: "POST",
            url: locationInfo.ip + "/app/status",
            data: JSON.stringify({ id: 4, options: { widget: widgetName } }),
            error: function (err) {
                console.log(err);
                alert("Kon niet met de spiegel verbinden. Probeer het later nog eens.");
            }
        });
        document.removeEventListener("touchend", closeDragElement);
        document.removeEventListener("touchmove", elementDrag);
        document.removeEventListener("mouseup", closeDragElement);
        document.removeEventListener("mousemove", elementDrag);
        locationIndicator.style.transition = "all 0.4s";
        // Start listening for widget location again
        locationInterval = startLocationInterval(locationInfo);
    }
}