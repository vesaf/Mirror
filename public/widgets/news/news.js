(function() {
    var css = '<link rel="stylesheet" type="text/css" href="widgets/news/style.css">';
    var html = `<div id="newsContainer">
        <h1 id="sourceHeader"></h1>
        <div id="headlineListContainer"></div>
        <div id="newsPageIndicatorContainer"></div>
    </div>`;
    initializeWidget("news", html, css, initializeNews, closeNews);

    // Declare timer globally such that each function may cancel it
    var preSlideDelayTimer;
    var slideOutTimer;
    var scrollInterval;
    var slideInInterval;

    // Set after how many full rotations the data are refreshed
    const refreshRate = 7;



    // Get news headlines and start new rotation
    function initializeNews() {    
        jQuery.ajax({
            url: "/app/news",
            success: function (data, status, jqXHR) {
                var news = JSON.parse(data);
                const sources = Object.keys(news);
                showHeadlines(news);
            },
            error: function (jqXHR, status) {
                alert("error");
            }
        });
    }

    // Cancel all timeouts set by this widget
    function closeNews() {
        clearTimeout(preSlideDelayTimer);
        clearTimeout(slideOutTimer);
        clearInterval(scrollInterval);
        clearInterval(slideInInterval);
    }

    // Show all games of the given day
    function showHeadlines(news, sourceCounter=0, rotation=0) {
        // Get the source name and accompanying headlines
        var source = Object.keys(news)[sourceCounter];
        var headlines = news[source];
        // Set the day header
        document.getElementById("sourceHeader").innerHTML = source;
        // Get the headlineListContainer and clear it
        var headlineListContainer = document.getElementById("headlineListContainer");
        headlineListContainer.innerHTML = "";
        headlineListContainer.scrollTop = 0;
        
        // Loop through the headlines
        var headlineNo = headlines.length;
        for (let i = 0; i < headlineNo;  i++) {
            // Generate headers
            const header = headlines[i];
            
            // Generate div
            headlineListContainer.innerHTML += `<div class='headlineContainer'>
                <h1>` + header + `</h1>
                </div>`;
        }

        // Display message if there is no news (RSS feed broken)
        if (headlineNo == 0) {
            headlineListContainer.innerHTML += `<div class='headlineContainer'>
            <h1> RSS feed broken </h1>
            </div>`;
        }

        // Adds fake game containers for testing purposes
        // gameNo = insertFakeGames(0, gameNo, headlineListContainer);

        // Add page indicators
        dotsHTML = "";
        for (let i = 0; i < Object.keys(news).length; i++) {
            dotsHTML += '<div id="newsDot'.concat(i, '" class="dot open"></div>');
        }
        document.getElementById("newsPageIndicatorContainer").innerHTML = dotsHTML;

        // Indicate correct indicator
        document.getElementById("newsDot".concat(sourceCounter)).classList = "dot";

        // Slide all divs in
        slideIn(headlineNo, function () {
            // Sroll if necessary and then slide out after 7 seconds
            preSlideDelayTimer = setTimeout(function () {
                scroll(headlineNo, function () {
                    slideOut(news, sourceCounter, rotation);
                });
            }, 3000);
        });
    }

    // Scroll down if there are too many games to show in one screen
    function scroll(headlineNo, callback) {
        var headlineListContainer = document.getElementById("headlineListContainer");
        const headlineListContainerHeight = headlineListContainer.offsetHeight;
        // TODO: Assumes all containers have the same height, might need revision
        var representativeGameContainer = document.getElementsByClassName("headlineContainer")[0];
        const headlineContainerHeight = representativeGameContainer.clientHeight;
        const totalGameHeight = (headlineNo == 0) ? headlineContainerHeight : headlineNo * headlineContainerHeight;

        // If height of headlines is more than the height of the window within the widget
        if (totalGameHeight > headlineListContainerHeight) {
            //elapsed
            var elapsed;
            //duration in milli seconds
            var duration = 5000 * (headlineNo - headlineListContainerHeight/headlineContainerHeight);
            //start time, when the animation starts
            var startTime = (new Date()).getTime(); //start time
            //the magic
            scrollInterval = setInterval(function () {
                //calculate elapse time 
                elapsed = (new Date()).getTime() - startTime;
                //check if elapse time is less than duration
                if (elapsed < duration) {
                    //animate using an easing equation
                    headlineListContainer.scrollTop = ease(elapsed, headlineNo * headlineContainerHeight, duration);
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
    // function insertFakeGames(fakeGameNo, realGameNo, headlineListContainer) {
    //     for (let i = 0; i < fakeGameNo; i++) {
    //         headlineListContainer.innerHTML += `<div class='headlineContainer'>
    //         <h1> No games today </h1>
    //         </div>`;
    //     }
    //     return fakeGameNo + realGameNo;
    // }

    // Once the headlineContainers have loaded set their left position to 0, to slide them into view
    function slideIn(headlineNo, callback) {
        slideInInterval = setInterval(function () {
            var games = document.getElementsByClassName("headlineContainer");
            if (games.length == headlineNo || (games.length == 1 && headlineNo == 0)) {
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
    function slideOut(news, sourceCounter, rotation) {
        // Slide out all game containers
        var games = document.getElementsByClassName("headlineContainer");
        for (let i = 0; i < games.length; i++) {
            var game = games[i];
            game.style.left = "-260px";
        }

        // Wait for slide animation to end
        slideOutTimer = setTimeout(function () {
            // Set to next source
            sourceCounter =  (sourceCounter < Object.keys(news).length-1) ? sourceCounter + 1 : 0;

            // If full rotation done increase rotation counter
            if (sourceCounter == 0) {
                rotation++;
            }

            // If refreshRate reached, refresh data, otherwise start new rotation
            if (rotation >= refreshRate) {
                initializeNews();
            }
            else {
                showHeadlines(news, sourceCounter, rotation);
            }
        }, 601);
    }
}());