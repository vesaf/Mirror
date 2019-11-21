const toggleWidgets = {
    title: "Widgets",
    html: "<div id=widgetListContainer></div><div id=footerContainer><button id=applyWidgetToggleBtn>Show Changes</button></div>",
    css: true,
    openScript: function () {
        // Send Ajax request to server for widget names
        $.ajax({
            url: "/app/widgetnames",
            success: function (widgetNames) {
                // Get current toggle state of all widgets
                $.ajax({
                    url: "/widgets/toggle",
                    success: function(settingsObj) {
                        // Parse data
                        widgetNames = widgetNames.split(",");
                        // Loop through widgets
                        for (let i = 0; i < widgetNames.length; i++) {
                            // Determine widget toggle state
                            var widgetStatus = settingsObj[widgetNames[i]] != undefined ? settingsObj[widgetNames[i]] : true;
                            var checkedStr = widgetStatus ? "checked" : "";
                            // Format widget name for presentation
                            let widgetName = widgetNames[i][0].toUpperCase() + widgetNames[i].slice(1);
                            // Create slider
                            document.getElementById("widgetListContainer").innerHTML += `<div class="widgetOptionContainer">
                            <label class="switch">
                                <input type="checkbox" id="` + widgetNames[i] + `Checkbox"` + checkedStr + `>
                                <span class="slider round"></span>
                            </label>
                            <p class="widgetTitle">` + widgetName + `</p>
                            </div>`;
                        }
                    },
                    error: function(err) {
                        console.error("Could not get widget settings object");
                        console.error(err);
                    }
                });

            },
            error: function (err) {
                console.error(err);
            }
        });

        document.getElementById("applyWidgetToggleBtn").addEventListener("click", function() {
            location.reload();
        });
    },
    prepareScript: function () {
        // Click event when clicking checkbox
        document.addEventListener("click", function(e) {
            const idCheck =  new RegExp("(.+)(Checkbox)");
            const matchOut = e.target.id.match(idCheck);
            if (matchOut !== null) {
                // When click on slider, toggle widget
                $.ajax({
                    type: "POST",
                    url: "/widgets/toggle",
                    data: matchOut[1],
                    error: function () {
                        console.error("Could not toggle widget");
                    }
                });
            }
        });
    }
};

var event = new CustomEvent('settingReady', {detail: "toggleWidgets"});
window.dispatchEvent(event);