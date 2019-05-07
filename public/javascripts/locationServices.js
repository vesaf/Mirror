// Set times between intervals
var intervalTime = 100;

var connectionLostNotificationSent = false;
// Start interval at each of which status checks are performed
var statusInterval = setInterval(function () {
    if (lastAppWidget) {
        var widgetElement = document.getElementById(lastAppWidget + "Widget");
        if (widgetElement && !widgetElement.classList.contains("noTrack")) {
            // // Request status
            jQuery.ajax({
                url: "/app/widgetlocation",
                type: "POST",
                data: { x: widgetElement.style.left.slice(0, -2), y: widgetElement.style.top.slice(0, -2) },
                error: function (jqXHR, status) {
                    // TODO
                }
            });
        }

    }
}, intervalTime);

// Clear interval when navigating to next page
window.addEventListener("beforeunload", function () {
    clearInterval(statusInterval);
});

var lastAppWidget;
function setLastAppWidget(name) {
    lastAppWidget = name;
}

function resetLastAppWidget(name) {
    if (lastAppWidget === name) {
        lastAppWidget = undefined;
    }
}

var requestLocationInterval;

function requestLocation () {
    $.ajax({
        url: "/app/widgetlocation",
        success: function (widgetLocation) {
            console.log(widgetLocation);
        },
        error: function (err) {
            console.log(err);
        }
    });
}