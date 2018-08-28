window.addEventListener("load", function() {
    $.ajax({
        type: "POST",
        url: "/app/screendims",
        data: {width: window.innerWidth, height: window.innerHeight},
        error: function () {
            alert("Kon de schermafmetingen niet opslaan. De smartphone app zal niet werken, probeer het later opnieuw.")
        }
    });
});