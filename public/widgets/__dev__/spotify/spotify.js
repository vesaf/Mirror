var player;
window.addEventListener("load", function() {    
    var css = '<link rel="stylesheet" type="text/css" href="widgets/spotify/style.css">';
    var html = `<div></div>`;
    initializeWidget("spotify", html, css, startSpotify);
    setupSpotify();
    // console.log(getParameterByName('code'));
    // jQuery.ajax({
    //     type: "POST",

    // })
});
function startSpotify() {
    // Connect to the player!
    player.connect();

    // TODO: fix this dirty fix for observer firing twice
    // var first = true;
    var spotifyWidget = document.getElementById("spotifyWidget");
    var container = document.getElementById("container");
    var observer = new MutationObserver(function(mutations) {
        if (!document.contains(spotifyWidget)) {
            // first = false;
            player.disconnect();
            observer.disconnect;
        }
    });
    observer.observe(container, {attributes: false, childList: true, characterData: false, subtree: true});
}

function setupSpotify() {
    window.onSpotifyWebPlaybackSDKReady = () => {
        // Get token from: https://beta.developer.spotify.com/documentation/web-playback-sdk/quick-start/#
        const token = 'BQC0jn0Zh6_w9HwnKY9FgPtVLXy2tXDSc-N0-PXpIakP0uwbcgDo58XpqfKSWWxzEjoL9Xes4mLmbW895ZFzlX-PyEJ_OBO7yOrcGXeidvg1W7Jkau5Trv32-VVguNVhl698FBmECt0sa5jagUA8K803diBstG9-ow';
        player = new Spotify.Player({
          name: 'MirrorOS',
          getOAuthToken: cb => { cb(token); }
        });
      
        // Error handling
        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { console.error(message); });
      
        // Playback status updates
        player.addListener('player_state_changed', state => { console.log(state); });
      
        // Ready
        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
        });
      
        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });
    };
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}