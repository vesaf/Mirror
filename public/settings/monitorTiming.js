const monitorTiming = {
    title: "Monitor Timing",
    html: `
    <div id="existingTimersContainer">
        <div class="timerContainer">
            <div class="timeBtnContainer">
                <div class="arrowUp decHourOnBtn"></div>
                <div class="arrowUp unitHourOnBtn"></div>
                <div class="arrowUp decMinuteOnBtn"></div>
                <div class="arrowUp unitMinuteOnBtn"></div>
                <div class="arrowUp decHourOffBtn"></div>
                <div class="arrowUp unitHourOffBtn"></div>
                <div class="arrowUp decMinuteOffBtn"></div>
                <div class="arrowUp unitMinuteOffBtn"></div>
            </div>
            <div class="timeLabelContainer">
                <p class="timeLabel">On 10:00</p>
                <p class="timeLabel timeOffLabel">Off 17:00</p>
                <i class="fa fa-trash deleteTimerBtn"></i>
            </div>
            <div class="timeBtnContainer">
                <div class="arrowDown decHourOnBtn"></div>
                <div class="arrowDown unitHourOnBtn"></div>
                <div class="arrowDown decMinuteOnBtn"></div>
                <div class="arrowDown unitMinuteOnBtn"></div>
                <div class="arrowDown decHourOffBtn"></div>
                <div class="arrowDown unitHourOffBtn"></div>
                <div class="arrowDown decMinuteOffBtn"></div>
                <div class="arrowDown unitMinuteOffBtn"></div>
            </div>
        </div>
    </div>
    <div class="footerContainer">
        <button class="widgetSettingsBtn" id="addMonitorTimingBtn">Add Timer</button>
    </div>
    `,
    css: true,
    openScript: function () {
        // TODO
    },
    prepareScript: function () {
        // Load potentially necessary external scripts
    }
}

var settingReadyEvent = new CustomEvent('settingReady', {detail: "monitorTiming"});
window.dispatchEvent(settingReadyEvent);