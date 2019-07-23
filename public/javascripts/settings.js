window.addEventListener("load", () => {
    // Get coordinates for next icon
    var coords = getNextIconXY();
    var container = document.getElementById("container");

    // Create and place icon
    var icon = document.createElement("i");
    icon.className = "fa fa-cogs icon";
    icon.id = "settingsIcon";
    icon.style.position = "absolute";
    
    icon.style.left = coords.x + "px";
    icon.style.top = coords.y + "px";

    container.appendChild(icon);
    icon.addEventListener("click", openSettings);
    var open = false;

    var settingsCategoriesStr = [];
    var settingsCategoriesUnloaded = [];
    var settingsCategories = [];

    // Set list of settings categories
    $.ajax({
        url: window.location + "settingnames",
        success: function (settings) {
            settingsCategoriesStr = settings.split(",");
            settingsCategoriesUnloaded = settingsCategoriesStr.slice(0);
            // Load js for each settings category
            for (let i = 0; i < settingsCategoriesStr.length; i++) {
                let settingsScript = document.createElement("script");
                settingsScript.setAttribute("src", "settings/" + settingsCategoriesStr[i] + ".js");
                document.head.appendChild(settingsScript);
            }


        },
        error: function () {
            alert("Kon de instellingen niet ophalen. Herstart de spiegel en probeer het opnieuw.");
        }
    });


    // When a setting has loaded
    window.addEventListener("settingReady", (e) => {
        // Run setting prepare script
        if (eval(e.detail).prepareScript) {
            eval(e.detail).prepareScript();
        }
        
        // Delete loaded setting from list of unloaded settings
        for (var i = 0; i < settingsCategoriesUnloaded.length; i++) {
            if (settingsCategoriesUnloaded[i] == e.detail) {
                settingsCategoriesUnloaded.splice(i, 1);
            }
        }

        // If this was the last setting category to be loaded, put all setting objects in settingsCategories array
        if (settingsCategoriesUnloaded.length == 0) {
          for (let i = 0; i < settingsCategoriesStr.length; i++) {
                settingsCategories.push(eval(settingsCategoriesStr[i]));
          }
        }
    });


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

            // Load side menu item for each setting
            for (let i = 0; i < settingsCategories.length; i++) {
                var activeClass = (i == 0) ? "active" : "";
                sideMenu.innerHTML += `
                    <div class="settingsMenuItem ` + activeClass + `" settingNo="` + i + `">
                        <span class="settingsMenuItemText ` + activeClass + `" settingNo="` + i + `">` + settingsCategories[i].title + `</span>
                    </div>
                    `;
            }

            sideMenu.addEventListener("click", loadSetting);

            // Load content for first setting
            settingsContent.innerHTML = settingsCategories[0].html;
            settingsCategories[0].openScript();


        }
    }

    function loadSetting(e) {
        if(!isNaN(parseInt(e.target.getAttribute("settingno")))) {
            let oldSetting = parseInt(document.getElementsByClassName("active")[0].getAttribute("settingNo"));
            if (settingsCategories[oldSetting].closeScript) {
                settingsCategories[oldSetting].closeScript();
            }
            document.getElementsByClassName("active")[0].classList.remove("active");
            document.getElementsByClassName("active")[0].classList.remove("active");

            let newSetting = parseInt(e.target.getAttribute("settingNo"));
            if (e.target.classList.contains("settingsMenuItem")) {
                e.target.classList.add("active");
                e.target.childNodes[0].classList.add("active");
            }
            else {
                e.target.classList.add("active");
                e.target.parentNode.classList.add("active");
            }
            settingsContent.innerHTML = settingsCategories[0].html;
            settingsCategories[newSetting].openScript();
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

});