const monitorTiming = {
    title: "Monitor Timing",
    html: `
    <div id='existingTimersContainer'></div>
    <div>
    <div class=footerContainer>
        <button class=widgetSettingsBtn id=addMonitorTimingBtn>Add Timer</button>
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