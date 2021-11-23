// Sets the cursor and hides it after 5 seconds of inactivity
// Also disables context menu
var cursorTimer;
window.addEventListener("load", function() {
    // TODO: turn on after making button for turning off full screen mode in raspberry pi
    // document.addEventListener('contextmenu', function(e) {
    //     e.preventDefault();
    // });
    document.body.style.cursor = "none";
    window.addEventListener("mousemove", function() {
        if (cursorTimer) {
            window.clearTimeout(cursorTimer);
        }
        if (document.body.style.cursor != "url(images/cursor.png) 8 8 , auto") {
            document.body.style.cursor = "url(images/cursor.png) 8 8 , auto";
        }
        cursorTimer = window.setTimeout(function () {
            document.body.style.cursor = "none";
        }, 5000)
        screenTimer = window.setTimeout(function() {
            $.ajax({
                type: "POST",
                url: ip + "/app/status",
                data: JSON.stringify({ id: 5, options: { toggleOn: false } }),
                success: function () {
                    window.open("./app.html", "_self");
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }, 15*60*1000);
    });
});