const monitorTiming = {
    title: "Monitor Timing",
    html: `
    <div id="existingTimersContainer"></div>
    <div class="footerContainer">
        <button class="widgetSettingsBtn" id="addMonitorTimingBtn">Add Timer</button>
    </div>
    `,
    css: true,
    openScript: function () {
        // TODO: bind to button
        createTimer(1);
    },
    prepareScript: function () {
        // Load potentially necessary external scripts
    }
}

function createTimer(id) {
    // Get div that contains the timers
    const timersContainer = document.getElementById("existingTimersContainer");

    // Create div that contains new timer
    const newTimerContainer = document.createElement("div");
    timersContainer.appendChild(newTimerContainer);
    newTimerContainer.className = "timerContainer";
    newTimerContainer.id = "timerContainer" + id;

    // Create div that contains time increment buttons
    const timeUpBtnContainer = document.createElement("div");
    newTimerContainer.appendChild(timeUpBtnContainer);
    timeUpBtnContainer.className = "timeBtnContainer";

    // Create time increment buttons
    for (const magnitude of ["dec", "unit"]) {
        for (const interval of ["Hour", "Minute"]) {
            for (const state of ["On", "Off"]) {
                var arrowBtn = document.createElement("div");
                timeUpBtnContainer.appendChild(arrowBtn);
                arrowBtn.className = "arrowUp " + magnitude + interval + state + "Btn";
                arrowBtn.id = magnitude + interval + state + "Btn" + id;
            }
        }
    }

    // Create div that contains text and remove button
    const timeLabelContainer = document.createElement("div");
    newTimerContainer.appendChild(timeLabelContainer);
    timeLabelContainer.className = "timeLabelContainer";

    // Create label with monitor turn on time
    const timeOnLabel = document.createElement("p");
    timeLabelContainer.appendChild(timeOnLabel);
    timeOnLabel.className = "timeLabel";
    timeOnLabel.id = "timeOnLabel" + id;
    timeOnLabel.innerHTML = "On 10:00";
    
    // Create label with monitor turn off time
    const timeOffLabel = document.createElement("p");
    timeLabelContainer.appendChild(timeOffLabel);
    timeOffLabel.className = "timeLabel timeOffLabel";
    timeOffLabel.id = "timeOffLabel" + id;
    timeOffLabel.innerHTML = "Off 17:00";

    // Create button that removes timer
    const deleteTimerBtn = document.createElement("i");
    timeLabelContainer.appendChild(deleteTimerBtn);
    deleteTimerBtn.className = "fa fa-trash deleteTimerBtn";
    deleteTimerBtn.id = "deleteTimerBtn" + id;

    // Create div that contains time reduction buttons
    const timeDownBtnContainer = document.createElement("div");
    newTimerContainer.appendChild(timeDownBtnContainer);
    timeDownBtnContainer.className = "timeBtnContainer";

    // Create time reduction buttons
    for (const magnitude of ["dec", "unit"]) {
        for (const interval of ["Hour", "Minute"]) {
            for (const state of ["On", "Off"]) {
                var arrowBtn = document.createElement("div");
                timeDownBtnContainer.appendChild(arrowBtn);
                arrowBtn.className = "arrowDown " + magnitude + interval + state + "Btn";
                arrowBtn.id = magnitude + interval + state + "Btn" + id;
            }
        }
    }


}

var settingReadyEvent = new CustomEvent('settingReady', {detail: "monitorTiming"});
window.dispatchEvent(settingReadyEvent);