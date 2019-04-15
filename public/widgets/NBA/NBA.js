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

// Declare timer globally such that each function may cancel it
var preSlideDelayTimer;

// Get NBA data
function initializeNBA() {
    // Cancel any pre-existing slide timers
    clearTimeout(preSlideDelayTimer);
    
    jQuery.ajax({
        url: "/app/nba",
        success: function (data, status, jqXHR) {
            var schedule = JSON.parse(data);
            console.log(schedule);
            showGames(schedule, "today");
        },
        error: function (jqXHR, status) {
            alert("error");
        }
    });
}

// Show all games of the given day
function showGames(schedule, day) {
    // Set the day header
    document.getElementById("dayHeader").innerHTML = day.charAt(0).toUpperCase() + day.slice(1);
    // Get the contentContainer and clear it
    var contentContainer = document.getElementById("contentContainer");
    contentContainer.innerHTML = "";
    
    // Loop through the games
    const gameNo = (schedule[day]) ? schedule[day].length : 0;
    for (let i = 0; i < gameNo;  i++) {
        // Generate headers
        const headers = generateHeaders(schedule[day][i]);
        
        // Generate div
        contentContainer.innerHTML += `<div class='gameContainer'>
            <h1>` + headers["gameHeader"] + `</h1>
            <h2>` + headers["subHeaderText"] + `</h2>
            </div>`;
    }

    // Display message if there are no games that day
    if (gameNo == 0) {
        contentContainer.innerHTML += `<div class='gameContainer'>
        <h1> No games today </h1>
        </div>`;
    }

    // Add page indicators
    document.getElementById("pageIndicatorContainer").innerHTML = `
    <div id="dot1" class="dot open"></div> <div id="dot2" class="dot open"></div> <div id="dot3" class="dot open"></div>
    `;

    // Indicate correct indicator
    var dotId;
    switch(day) {
        case "yesterday":
            dotId = "dot1";
            break;
        case "today":
            dotId = "dot2";
            break;
        default:
            dotId = "dot3";
    }
    document.getElementById(dotId).classList = "dot";

    // Slide all divs in
    slideIn(gameNo);

    // Slide out after 7 seconds
    preSlideDelayTimer = setTimeout(function () {
        slideOut(schedule, day);
    }, 7000);
}

// Generate texts to show in game divs using the set structure of the given data
function generateHeaders(game) {
    // Get teams from gameUrlCode and compile gameHeader
    const gameUrlCode = game["gameUrlCode"];
    var team1 = gameUrlCode.substr(gameUrlCode.length-6, 3);
    var team2 = gameUrlCode.substr(gameUrlCode.length-3);
    var gameHeader = team1 + "@" + team2;

    // If in playoffs show current round results
    if (game["playoffs"]) {
        gameHeader += " (" + game["playoffs"]["vTeam"]["seriesWin"] + "-" + game["playoffs"]["hTeam"]["seriesWin"] + ")";
    }

    // If game has been played show score, otherwise show time
    var subHeaderText
    if (game["hTeam"]["score"] && game["vTeam"]["score"]) {
        subHeaderText = game["vTeam"]["score"] + "-" + game["hTeam"]["score"];
    }
    else {
        var date = new Date(game["startTimeUTC"]);
        var hours = date.getHours();
        if (hours < 10) {
            hours = "0" + hours;
        }
        var minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        subHeaderText = hours + ":" + minutes;
    }
    return {gameHeader: gameHeader, subHeaderText: subHeaderText}
}

// Once the gameContainers have loaded set their left position to 0, to slide them into view
function slideIn(gameNo) {
    var interval = setInterval(function () {
        var games = document.getElementsByClassName("gameContainer");
        if (games.length == gameNo || (games.length == 1 & gameNo == 0)) {
            for (let i = 0; i < games.length; i++) {
                var game = games[i];
                game.style.left = "0px";
            }
            clearInterval(interval);
        }
    }, 10);
}

// Slide all existing game containers out of view and show games for the next day
function slideOut(schedule, day) {
    var games = document.getElementsByClassName("gameContainer");
    for (let i = 0; i < games.length; i++) {
        var game = games[i];
        game.style.left = "260px";
    }
    setTimeout(function () {
        switch(day) {
            case "yesterday":
                day = "today";
                break;
            case "today":
                day = "tomorrow";
                break;
            default:
                day = "yesterday"
        }
        // if (day == "yesterday") {
        //     day = "today";
        // }
        // else if (day == "today") {
        //     day = "tomorrow";
        // }
        // else {
        //     day = "yesterday";
        // }
        showGames(schedule, day);
    }, 600);
}