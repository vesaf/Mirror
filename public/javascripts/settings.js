window.addEventListener("load", () => {
    var coords = getNextIconXY();
    var container = document.getElementById("container");

    var icon = document.createElement("i");
    icon.className = "fa fa-cogs icon";
    icon.id = "settingsIcon";
    icon.style.position = "absolute";
    
    icon.style.left = coords.x + "px";
    icon.style.top = coords.y + "px";

    container.appendChild(icon);
    icon.addEventListener("click", openSettings);
});

var open = false;
// Open settings
function openSettings() {
    if (!open) {
        open = true;
        // Create opaque container
        var opaque = document.createElement("div");
        opaque.id = "opaqueLayer";
        var container = document.getElementById("container");
        // Create side menu container
        var sideMenu = document.createElement("div");
        sideMenu.id = "settingsSideMenu";
        // Create settings content container
        var settingsContent = document.createElement("div");
        settingsContent.id = "settingsContent";
        // Create close button
        var closeBtn = document.createElement("div");
        closeBtn.id = "closeBtn"
        closeBtn.addEventListener("click", closeSettings)
        // Add to page
        opaque.appendChild(sideMenu);
        opaque.appendChild(settingsContent);
        opaque.appendChild(closeBtn);
        container.appendChild(opaque);
        sideMenu.innerHTML += `
        <div class="settingsMenuItem active">
            <span class="settingsMenuItemText active">App Verbinding</span>
        </div>
        <div class="settingsMenuItem">
            <span class="settingsMenuItemText">Overig</span>
        </div>
        `;
        settingsContent.innerHTML += `
        <div id="placeHolder"></div>
        `;
        var typeNumber = 3;
        var errorCorrectionLevel = 'L';
        var qr = qrcode(typeNumber, errorCorrectionLevel);
        qr.addData("http://" + window.location.host);
        qr.make();
        document.getElementById("placeHolder").innerHTML = qr.createSvgTag();
    }
}

// Close settings
function closeSettings() {
    // Identify relevant elements
    var opaque = document.getElementById("opaqueLayer");
    var container = document.getElementById("container");
    var closeBtn = document.getElementById("closeBtn");
    // Remove click listener
    closeBtn.removeEventListener("click", closeSettings);
    // Start closing animation
    opaque.style.animationName = "downAnim";
    // When closing animation (almost) done, remove elements
    setTimeout(function () {
        container.removeChild(opaque);
        open = false;
    }, 490);
}