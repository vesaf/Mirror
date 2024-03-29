// Set css file and html content
var css = '<link rel="stylesheet" type="text/css" href="widgets/clock/style.css">';
var html = `<div class="pie">
    <div class="clip1">
        <div class="slice1"></div>
    </div>
    <div class="clip2">
        <div class="slice2"></div>
    </div>
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Space%20Mono">
    <div class="status">
        
        <p id="statusTime"></p>
    </div>
</div>`;
// Start widget
initializeWidget("clock", html, css, startClock, stopClock);

var secondInterval;
function stopClock() {
    clearInterval(secondInterval);
}

function startClock() {
    document.getElementsByClassName("widgetCover")[document.getElementsByClassName("widgetCover").length-1].style.position = "absolute";
    setIntervalAndExecute(function() {
        let currentdate = new Date();
        let min = currentdate.getMinutes();
        let hrs = currentdate.getHours();
        let sec = currentdate.getSeconds();
        if (hrs > 12 || (hrs == 12 && min > 0)) {
            progressBarUpdate(hrs - 12 + min / 60, 12);
        }
        else {
            progressBarUpdate(hrs + min/60, 12);
        }

        // Get day
        let dayNo = currentdate.getDay();
        var day;
        switch(dayNo) {
            case 0:
                day = "Sunday";
                break;
            case 1:
                day = "Monday";
                break;
            case 2:
                day = "Tuesday";
                break;
            case 3:
                day = "Wednesday";
                break;
            case 4:
                day = "Thursday";
                break;
            case 5:
                day = "Friday";
                break;
            default:
                day = "Saturday";
        }

        document.getElementById("statusTime").innerHTML = "<span id='statusDay'>" + day + "</span><br>" 
                                                        + ("0" + hrs).slice(-2) + ":" + ("0" + min).slice(-2) + "<span id='statusSeconds'> " + ("0" + sec).slice(-2) + "</span><br>"
                                                        + "<span id='statusDate'>" + ("0" + currentdate.getDate()).slice(-2) + "/" 
                                                        + ("0" + (currentdate.getMonth()+1)).slice(-2)  + "/"  
                                                        + ("0" + currentdate.getFullYear()).slice(-2) + "</span>";
    }, 1000)
}

function rotate(element, degree) {
    element.style.transform = "rotate(" + degree + "deg)";
    element.style.zoom = 1;
}

function progressBarUpdate(x, outOf) {
    var firstHalfAngle = 180;
    var secondHalfAngle = 0;

    // caluclate the angle
    var drawAngle = x / outOf * 360;

    // calculate the angle to be displayed if each half
    if (drawAngle <= 180) {
        firstHalfAngle = drawAngle;
    } else {
        secondHalfAngle = drawAngle - 180;
    }

    // set the transition
    rotate(document.getElementsByClassName("slice1")[0], firstHalfAngle);
    rotate(document.getElementsByClassName("slice2")[0], secondHalfAngle);
}

// Helper function
function setIntervalAndExecute(fn, t) {
    fn();
    secondInterval = window.setInterval(fn, t);
}
