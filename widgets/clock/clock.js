window.addEventListener("load", function() {
    var css = '<link rel="stylesheet" type="text/css" href="widgets/clock/style.css">'
    var html = `<div class="pie">
        <div class="clip1">
            <div class="slice1"></div>
        </div>
        <div class="clip2">
            <div class="slice2"></div>
        </div>
        <div class="status"></div>
    </div>`;//'<p class="clockWidget" id="clock"></p>';
    initializeWidget("clock", html, css, function() {
        let currentdate = new Date();
        let min = currentdate.getMinutes();
        let hrs = currentdate.getHours();
        if (hrs > 12) {
            hrs -= 12;
        }
        progressBarUpdate(hrs + min/60, 12);
    });
});

function startClock() {
    var clock = document.getElementById("clock");
    var clockInterval = window.setInterval(function() {
        if (document.getElementById("clock")) {
            var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "/"
                            + ("0" + (currentdate.getMonth()+1)).slice(-2)  + "/" 
                            + ("0" + currentdate.getFullYear()).slice(-2) + " "  
                            + ("0" + currentdate.getHours()).slice(-2) + ":"  
                            + ("0" + currentdate.getMinutes()).slice(-2) + ":" 
                            + ("0" + currentdate.getSeconds()).slice(-2);
            clock.innerHTML=datetime;
        }
        else {
            clearInterval(clockInterval);
        }
    }, 1000);
}

function rotate(element, degree) {
    // element.css({
    //     '-webkit-transform': 'rotate(' + degree + 'deg)',
    //         '-moz-transform': 'rotate(' + degree + 'deg)',
    //         '-ms-transform': 'rotate(' + degree + 'deg)',
    //         '-o-transform': 'rotate(' + degree + 'deg)',
    //         'transform': 'rotate(' + degree + 'deg)',
    //         'zoom': 1
    // });
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
    //rotate($(".slice1"), firstHalfAngle);
    //rotate($(".slice2"), secondHalfAngle);

    // set the values on the text
    //$(".status").html(x + " of " + outOf);
    document.getElementsByClassName("status")[0].innerHTML = x + " of " + outOf;
}