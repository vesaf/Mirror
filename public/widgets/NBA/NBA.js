var clockInterval
window.addEventListener("load", function() {
    var css = '<link rel="stylesheet" type="text/css" href="widgets/NBA/style.css">';
    var html = `<div id="NBAContainer">
        <h1 id="dayHeader"></h1>
    </div>`;
    initializeWidget("NBA", html, css, initializeNBA);
});

function initializeNBA() {
    document.getElementById("dayHeader").innerHTML = "Tomorrow";
    console.log("init");
    jQuery.ajax({
        url: "/app/nba",
        success: function (data, status, jqXHR) {
            alert("check");
            var schedule = JSON.parse(data);
            console.log(data);
        },
        error: function (jqXHR, status) {
            alert("error");
        }
    });
}

