// Handles page load event
document.addEventListener("DOMContentLoaded", function () {
    const ip = window.location.href.replace("/app/app.html", "");
    if (ip) {
        getScreendims(ip, function (dimObj) {
            window.localStorage.mirrorDims = JSON.stringify(dimObj);
            getWidgetNames(ip, function (widgetNames) {
                var row = document.getElementById("rowId");
                for (let i = 0; i < widgetNames.length; i++) {
                    const widget = widgetNames[i];
                    row.innerHTML += "<div class='col-3'><img id='" + widget + "'src='" + ip + "/widgets/" + widget + "/" + widget + ".png'></div>";
                }
                document.addEventListener("click", function (e) {
                    var widget = e.target.id;
                    if (widgetNames.indexOf(widget) !== -1) {
                        $.ajax({
                            type: "POST",
                            url: ip + "/app/status",
                            data: JSON.stringify({ id: 1, options: { widget: widget } }),
                            success: function () {
                                window.localStorage.widget = widget;
                                window.open("./control.html" , "_self");
                            },
                            error: function (err) {
                                console.log(err);
                                alert("Kon niet met de spiegel verbinden. Probeer het later nog eens.");
                            }
                        });
                    }
                });
            });
        });

        document.getElementById("menuBtn").addEventListener("click", function() {
            var dropDownMenu = document.getElementById("dropDownMenu");
            dropDownMenu.style.display = dropDownMenu.style.display == "block" ? "none" : "block";
        }, false);

        document.getElementById("toggleScreenBtn").addEventListener("click", function() {
            document.getElementById("dropDownMenu").style.display = "none";
            $.ajax({
                type: "POST",
                url: ip + "/app/status",
                data: JSON.stringify({ id: 5}),
                error: function (err) {
                    console.log(err);
                    alert("Kon niet met de spiegel verbinden. Probeer het later nog eens.");
                }
            });
        }, false);
    }
    else {
        window.open("./setup.html", "_self");
    }
}, false);

function getScreendims(ip, callback) {
    $.ajax({
        url: ip + "/app/screendims",
        success: function (dims) {
            callback(dims);
        },
        error: function () {
            alert("Kon de verhoudingen van het scherm niet ophalen. Het verplaatsen van de widgets zal niet werken. Je kunt nog wel widgets openen en sluiten. Probeer de app en de spiegel te herstarten.");
            callback(undefined);
        }
    });
}

function getWidgetNames(ip, callback) {
    $.ajax({
        url: ip + "/app/widgetnames",
        success: function (widgets) {
            var out = widgets.split(",");
            callback(out);
        },
        error: function () {
            alert("Kon de widgets niet ophalen. Sluit de app, herstart de spiegel en probeer het opnieuw.");
        }
    });
}