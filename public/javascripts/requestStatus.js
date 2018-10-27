// Set times between intervals
var intervalTime = 500;

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
            if (options.widget && document.getElementById(options.widget)) {
                document.getElementById(options.widget).click();
                setLastAppWidget(options.widget);
            }
            break;
        case 2:
            if (options.widget && document.getElementById(options.widget + "Minimize")) {
                // resetLastAppWidget(options.widget);
                document.getElementById(options.widget + "Minimize").click();
            }
        default:
            console.error("The server wants to tell you something but it doesn't know how to.")
    }
}