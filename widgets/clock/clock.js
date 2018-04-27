window.addEventListener("load", function() {
    var css = '<link rel="stylesheet" type="text/css" href="widgets/clock/style.css">'
    var html = '<p class="clockWidget" id="clock"></p>';
    initializeWidget("clock", html, css, startClock);
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