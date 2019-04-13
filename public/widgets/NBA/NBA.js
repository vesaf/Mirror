var clockInterval
window.addEventListener("load", function() {
    var css = '<link rel="stylesheet" type="text/css" href="widgets/NBA/style.css">';
    var html = `<div id="NBAContainer">
        <h1 id="dayHeader"></h1>
        <div id="contentContainer"></div>
        <div id="pageIndicatorContainer"></div>
    </div>`;
    initializeWidget("NBA", html, css, initializeNBA);
});

function initializeNBA() {
    document.getElementById("dayHeader").innerHTML = "Tomorrow";
    jQuery.ajax({
        url: "/app/nba",
        success: function (data, status, jqXHR) {
            var schedule = JSON.parse(data);
            showGames(schedule);
        },
        error: function (jqXHR, status) {
            alert("error");
        }
    });
}

function showGames(schedule) {
    var contentContainer = document.getElementById("contentContainer");
    contentContainer.innerHTML = "";
    for (let i = 0; i < schedule["tomorrow"].length;  i++) {
        const game = schedule["tomorrow"][i];
        const gameUrlCode = game["gameUrlCode"];
        var team1 = gameUrlCode.substr(gameUrlCode.length-6, 3);
        var team2 = gameUrlCode.substr(gameUrlCode.length-3);
        var gameHeader = team1 + "@" + team2;
        if (game["playoffs"]) {
            gameHeader += " (" + game["playoffs"]["vTeam"]["seriesWin"] + "-" + game["playoffs"]["hTeam"]["seriesWin"] + ")";
        }
        var date = new Date(game["startTimeUTC"]);
        var hours = date.getHours();
        if (hours < 10) {
            hours = "0" + hours;
        }
        var minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        console.log(game);
        contentContainer.innerHTML += `<div class='gameContainer'>
            <h1>` + gameHeader + `</h1>
            <h2>` + hours + ":" + minutes + `</h2>
            </div>`;
    }
}

