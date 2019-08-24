const wifiIcon = `
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   width="50"
   height="90"
   viewBox="0 0 23.812499 23.8125"
   version="1.1"
   id="wifiIconSVG"
   sodipodi:docname="wifi-2.svg">
  <defs
     id="defs2" />
  <sodipodi:namedview
     id="base"
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1.0"
     inkscape:pageopacity="0.0"
     inkscape:pageshadow="2"
     inkscape:zoom="11.313709"
     inkscape:cx="14.237455"
     inkscape:cy="39.16248"
     inkscape:document-units="mm"
     inkscape:current-layer="layer1"
     showgrid="false"
     units="px"
     inkscape:window-width="2736"
     inkscape:window-height="1699"
     inkscape:window-x="2719"
     inkscape:window-y="-13"
     inkscape:window-maximized="1" />
  <metadata
     id="metadata5">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     inkscape:label="Laag 1"
     inkscape:groupmode="layer"
     id="wifiIcon"
     transform="translate(0,-273.18744)"
     fill="#ffffff">
    <circle
       style="opacity:1;fill-opacity:1"
       id="dot"
       cx="11.85625"
       cy="293.69302"
       r="2.5958333" />
    <path
        id="bar1"
       style="opacity:1;fill-opacity:1"
       d="m 6.8096415,287.92614 c 3.5043285,-1.76701 6.7740445,-1.53485 9.8741385,0 0.656046,0.32481 1.243753,0.85528 1.243753,1.91766 v 0.11693 c 0,1.06239 -0.620934,2.37211 -1.243753,1.91767 -3.983364,-2.90646 -7.0547884,-1.98261 -9.8741385,0 -0.6269133,0.44085 -1.2437531,-0.85528 -1.2437531,-1.91767 v -0.11693 c 0,-1.06238 0.5888463,-1.58743 1.2437531,-1.91766 z"
       inkscape:connector-curvature="0"
       sodipodi:nodetypes="sssssssss" />
    <path
        id="bar2"
       style="opacity:1;fill-opacity:1"
       d="m 5.0913733,283.64733 c 4.8103547,-1.76701 9.2986597,-1.53485 13.5541277,0 0.900547,0.32481 1.707287,0.85528 1.707287,1.91766 v 0.11693 c 0,1.06239 -0.85235,2.37211 -1.707287,1.91767 -5.467924,-2.90646 -9.6840346,-1.98261 -13.5541277,0 -0.8605575,0.44085 -1.7072872,-0.85528 -1.7072872,-1.91767 v -0.11693 c 0,-1.06238 0.8083033,-1.58743 1.7072872,-1.91766 z"
       inkscape:connector-curvature="0"
       sodipodi:nodetypes="sssssssss" />
    <path
        id="bar3"
       style="opacity:1;fill-opacity:1"
       d="m 3.1135581,278.94654 c 6.1893075,-1.76701 11.9642479,-1.53485 17.4396029,0 1.1587,0.32481 2.196703,0.85528 2.196703,1.91766 v 0.11693 c 0,1.06239 -1.096687,2.37211 -2.196703,1.91767 -7.035378,-2.90646 -12.4600961,-1.98261 -17.4396029,0 -1.1072478,0.44085 -2.19670384,-0.85528 -2.19670384,-1.91767 v -0.11693 c 0,-1.06238 1.04001414,-1.58743 2.19670384,-1.91766 z"
       inkscape:connector-curvature="0"
       sodipodi:nodetypes="sssssssss" />
  </g>
</svg>
`;

const closedLockIcon = '<svg aria-hidden="true" id="lockIcon" focusable="false" data-prefix="fas" data-icon="lock" class="svg-inline--fa fa-lock fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path></svg>';
const openLockIcon = '<svg aria-hidden="true" id="lockIcon" focusable="false" data-prefix="fas" data-icon="lock-open" class="svg-inline--fa fa-lock-open fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M423.5 0C339.5.3 272 69.5 272 153.5V224H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48h-48v-71.1c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v80c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-80C576 68 507.5-.3 423.5 0z"></path></svg>';

// Remove one bar for every one loss of signal from given svg string
function adaptWifiIcon(wifiIcon, signal) {
    for (let i = 0; i < 3 - signal; i++) {
        var re = new RegExp('<path\n.*id="bar' + (3 - i) + '"(\n|.)*(\/>)');
        wifiIcon = wifiIcon.replace(re, '');
    }
    return wifiIcon
}

var getWifiNetworks = function () {
    // Get network list container
    var networkListContainer = document.getElementById("networkListContainer");

    // Send Ajax request to server for wifi networks
    $.ajax({
        url: "/wifinetworks",
        success: function (wifiConnections) {
            // Parse data
            wifiConnections = JSON.parse(wifiConnections);
            // Loop through data
            for (let i = 0; i < wifiConnections.length; i++) {
                var connection = wifiConnections[i];

                // If no known strength, assume strong
                if (connection.signal === undefined) {
                    connection.signal = 3;
                }

                // Remove redundant information from network security type
                if (connection.auth.indexOf("-") >= 0) {
                    connection.auth = connection.auth.substr(0, connection.auth.indexOf("-"));
                }

                if (connection.auth == "Open") {
                    var lockIcon = openLockIcon;
                }
                else {
                    var lockIcon = closedLockIcon;
                }

                // Add html to container with correct wifi icon
                networkListContainer.innerHTML += `
                <div class="networkContainer">
                    <div class="securityIndicator">`
                        + lockIcon 
                        + `<p class="securityType">` + connection.auth + `</p>` 
                    + `</div>` 
                    + adaptWifiIcon(wifiIcon, connection.signal)
                    + `<p class="networkName">` + (connection.SSID ? connection.SSID : "Hidden Network") + `</p>
                </div>
                `;
                console.log(connection.SSID + ": " + connection.quality + " " + connection.dBm + " " + connection.auth);
            }
        },
        error: function (err) {
            console.error(err);
        }
    });
}

const wifi = {
    title: "Wifi",
    html: `
    <div id="networkListContainer">

    </div>
    `,
    css: true,
    openScript: getWifiNetworks
}



var event = new CustomEvent('settingReady', {detail: "wifi"});
window.dispatchEvent(event);