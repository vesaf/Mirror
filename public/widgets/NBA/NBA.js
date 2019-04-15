var clockInterval
window.addEventListener("load", function() {
    var css = '<link rel="stylesheet" type="text/css" href="widgets/NBA/style.css">';
    var html = `<div id="NBAContainer">
        <h1 id="dayHeader"></h1>
        <div id="contentContainer"></div>
        <div id="pageIndicatorContainer"></div>
    </div>`;
    initializeWidget("NBA", html, css, initializeNBA, closeNBA);
});

// Declare timer globally such that each function may cancel it
var preSlideDelayTimer;
var slideOutTimer;
var scrollInterval;
var slideInInterval;

// Set after how many full rotations the data are refreshed
const refreshRate = 7;
const startDay = "today"

// Get NBA data and start new rotation
function initializeNBA() {    
    jQuery.ajax({
        url: "/app/nba",
        success: function (data, status, jqXHR) {
            var schedule = JSON.parse(data);
            showGames(schedule, startDay, 0);
        },
        error: function (jqXHR, status) {
            alert("error");
        }
    });
}

// Cancel all timeouts set by this widget
function closeNBA() {
    clearTimeout(preSlideDelayTimer);
    clearTimeout(slideOutTimer);
    clearInterval(scrollInterval);
    clearInterval(slideInInterval);
}

// Show all games of the given day
function showGames(schedule, day, rotation) {
    // Set the day header
    document.getElementById("dayHeader").innerHTML = day.charAt(0).toUpperCase() + day.slice(1);
    // Get the contentContainer and clear it
    var contentContainer = document.getElementById("contentContainer");
    contentContainer.innerHTML = "";
    contentContainer.scrollTo(0,0);
    
    // Loop through the games
    var gameNo = (schedule[day]) ? schedule[day].length : 0;
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

    // Adds fake game containers for testing purposes
    gameNo = insertFakeGames(0, gameNo, contentContainer);

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
    slideIn(gameNo, function () {
        // Sroll if necessary and then slide out after 7 seconds
        preSlideDelayTimer = setTimeout(function () {
            scroll(gameNo, function () {
                slideOut(schedule, day, rotation);
            });
        }, 7000);
    });


}

// Scroll down if there are too many games to show in one screen
function scroll(gameNo, callback) {
    var contentContainer = document.getElementById("contentContainer");
    const contentContainerHeight = contentContainer.clientHeight;
    var representativeGameContainer = document.getElementsByClassName("gameContainer")[0];
    const gameContainerHeight = representativeGameContainer.clientHeight;
    const totalGameHeight = (gameNo == 0) ? gameContainerHeight : gameNo * gameContainerHeight;

    if (totalGameHeight > contentContainerHeight) {
        //elapsed
        var elapsed;
        //duration in milli seconds
        var duration = 1000 * (gameNo - contentContainerHeight/gameContainerHeight);
        //start time, when the animation starts
        var startTime = (new Date()).getTime(); //start time
        //the magic
        scrollInterval = setInterval(function () {
            //calculate elapse time 
            elapsed = (new Date()).getTime() - startTime;
            //check if elapse time is less than duration
            if (elapsed < duration) {
                //animate using an easing equation
                contentContainer.scrollTo(0, ease(elapsed, contentContainerHeight, duration));
            } else {
                //animation is complete, stop interval timer
                clearInterval(scrollInterval);
                scrollInterval = null;
                preSlideDelayTimer = setTimeout(callback, 7000);
            }
        }, 4);
    }
    else {
        callback();
    }

    //Info about the letters
    //t = elapsed time 
    //c = change in comparison to begin
    //d = duration of animation
    function ease(elapsed, target, duration) {
        return Math.round(-target * Math.cos(elapsed / duration * (Math.PI / 2)) + target);
    }
}

// Adds fake game containers for testing purposes
function insertFakeGames(fakeGameNo, realGameNo, contentContainer) {
    for (let i = 0; i < fakeGameNo; i++) {
        contentContainer.innerHTML += `<div class='gameContainer'>
        <h1> No games today </h1>
        </div>`;
    }
    return fakeGameNo + realGameNo;
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
function slideIn(gameNo, callback) {
    slideInInterval = setInterval(function () {
        var games = document.getElementsByClassName("gameContainer");
        if (games.length == gameNo || (games.length == 1 && gameNo == 0)) {
            for (let i = 0; i < games.length; i++) {
                var game = games[i];
                game.style.left = "0px";
            }
            clearInterval(slideInInterval);
            callback();
        }
    }, 10);
}

// Slide all existing game containers out of view and show games for the next day
function slideOut(schedule, day, rotation) {
    // Slide out all game containers
    var games = document.getElementsByClassName("gameContainer");
    for (let i = 0; i < games.length; i++) {
        var game = games[i];
        game.style.left = "-260px";
    }

    // Wait for slide animation to end
    slideOutTimer = setTimeout(function () {
        // Set to next day
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

        // If full rotation done increase rotation counter
        if (day == startDay) {
            rotation++;
        }

        // If refreshRate reached, refresh data, otherwise start new rotation
        if (rotation >= refreshRate) {
            initializeNBA();
        }
        else {
            showGames(schedule, day, rotation);
        }
    }, 600);
}