const toggleWidgets = {
    title: "Widgets",
    html: "<div id=widgetListContainer></div>",
    css: true,
    openScript: function () {
        console.log("open");
        // Send Ajax request to server for wifi networks
        $.ajax({
            url: "/app/widgetnames",
            success: function (wifiConnections) {
                console.log(wifiConnections);
                // Parse data
                wifiConnections = wifiConnections.split(",");
                console.log(wifiConnections);
                // Loop through data
                for (let i = 0; i < wifiConnections.length; i++) {
                    let widgetName = wifiConnections[i][0].toUpperCase() + wifiConnections[i].slice(1);
                    document.getElementById("widgetListContainer").innerHTML += `<div class="widgetOptionContainer">
                    <label class="switch">
                        <input type="checkbox">
                        <span class="slider round"></span>
                    </label>
                    <p class="widgetTitle">` + widgetName + `</p>
                    </div>`;
                }
            },
            error: function (err) {
                console.error(err);
            }
        });
    },
    prepareScript: function () {
        console.log("prepare");
    }
};

var event = new CustomEvent('settingReady', {detail: "toggleWidgets"});
window.dispatchEvent(event);