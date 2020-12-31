// Set times between intervals
var intervalTime = 500;

// TODO: connection lost notification
var connectionLostNotificationSent = false;
// Start interval at each of which status checks are performed
var statusInterval = setInterval(function () {
    // Request status
    jQuery.ajax({
        url: "/app/status",
        success: function (data, status, jqXHR) {
            // If status id is not 0 perform function call
            if (data.id !== 0) {
                console.log(data);
                functionCalls(data.id, data.options);
            }
        },
        error: function (jqXHR, status) {
            // TODO
        }
    });
}, intervalTime);

// Clear interval when navigating to next page
window.addEventListener("beforeunload", function () {
    clearInterval(statusInterval);
});

// Call a function depending on requested status
function functionCalls(id, options) {
    switch (id) {
        case 1:
            if (options.widget) {
                // triggerEvent(document.getElementById(options.widget), "iconClick");
                console.log(options.widget);
                window.dispatchEvent(new CustomEvent("openWidget", {detail:{calledName: options.widget}}));
                setLastAppWidget(options.widget);
                // console.log(document.getElementsByClassName("activeWidget"));
                // if (document.getElementsByClassName("activeWidget").length > 0){
                //     document.getElementsByClassName("activeWidget")[0].classList.remove("activeWidget");
                // }
                // document.getElementById(options.widget).className += "activeWidget";
            }
            break;
        case 2:
            if (options.widget && document.getElementById(options.widget + "Minimize")) {
                // resetLastAppWidget(options.widget);
                document.getElementById(options.widget + "Minimize").click();
            }
            break;
        case 3:
            // Stop tracking on mirror movement by adding class to widget
            if (options.widget && document.getElementById(options.widget + "Minimize")) {
                const widget = document.getElementById(options.widget + "Widget");
                widget.classList.add("noTrack");
                requestLocationInterval = setInterval(function () {
                    requestLocation(widget);
                }, intervalTime);
            }
            break;
        case 4:
            // Start tracking on mirror movements again
            if (options.widget && document.getElementById(options.widget + "Minimize")) {
                document.getElementById(options.widget + "Widget").classList.remove("noTrack");
                clearInterval(requestLocationInterval);
            }
            break;
        default:
            console.error("The server wants to tell you something but it doesn't know how to.");
            console.log(id);
            console.log(options);
    }
}

// Helper function to trigger event
function triggerEvent(el, type){
    if ('createEvent' in document) {
         // modern browsers, IE9+
         var e = document.createEvent('HTMLEvents');
         e.initEvent(type, false, true);
         el.dispatchEvent(e);
     } else {
         // IE 8
         var e = document.createEventObject();
         e.eventType = type;
         el.fireEvent('on'+e.eventType, e);
     }
 }