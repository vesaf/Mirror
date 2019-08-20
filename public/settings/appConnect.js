const appConnect = {
    title: "App Connection",
    html: "<div id='placeHolder'></div>",
    openScript: function () {
        var typeNumber = 3;
        var errorCorrectionLevel = 'L';
        var qr = qrcode(typeNumber, errorCorrectionLevel);
        qr.addData("http://" + window.location.host);
        qr.make();
        document.getElementById("placeHolder").innerHTML = qr.createSvgTag();
    },
    prepareScript: function () {
        let settingsScript = document.createElement("script");
        settingsScript.setAttribute("src", "javascripts/qrcode.js");
        document.head.appendChild(settingsScript);
    }
}

var event = new CustomEvent('settingReady', {detail: "appConnect"});
window.dispatchEvent(event);