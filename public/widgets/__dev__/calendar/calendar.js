window.addEventListener("load", function() {
    var css = '<link rel="stylesheet" type="text/css" href="widgets/calendar/style.css">'
    var html = '<iframe class="calendarWidget" id="calendar" src="https://calendar.google.com/calendar/embed?showNav=0&amp;showPrint=0&amp;mode=AGENDA&amp;height=300&amp;wkst=2&amp;bgcolor=%23ffffff&amp;src=vesaf96%40gmail.com&amp;color=%2329527A&amp;src=cafeafdeling%40gmail.com&amp;color=%23B1440E&amp;src=fvm5lcrtq3ar1epidosvjmabhk%40group.calendar.google.com&amp;color=%232952A3&amp;src=noor2hilbers%40gmail.com&amp;color=%235229A3&amp;ctz=Europe%2FAmsterdam" frameborder="0" scrolling="no"></iframe>';
    initializeWidget("calendar", html, css);
});