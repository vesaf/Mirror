const other = {
    title: "Overig",
    html: "",
    openScript: function () {
        
    }
}

var event = new CustomEvent('settingReady', {detail: "other"});
window.dispatchEvent(event);