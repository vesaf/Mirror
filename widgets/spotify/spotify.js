var player;
window.addEventListener("load", function() {    
    var css = '<link rel="stylesheet" type="text/css" href="widgets/spotify/style.css">';
    var html = `<div></div>`;
    initializeWidget("spotify", html, css, startSpotify);
    setupSpotify();
});
function startSpotify() {
    // Connect to the player!
    player.connect();

    // TODO: fix this dirty fix for observer firing twice
    var first = true;
    var spotifyWidget = document.getElementById("spotifyWidget");
    var container = document.getElementById("container");
    var observer = new MutationObserver(function(mutations) {
        if (!document.contains(spotifyWidget) && first) {
            first = false;
            player.disconnect();
            observer.disconnect;
        }
    });
    observer.observe(container, {attributes: false, childList: true, characterData: false, subtree: true});
}

function setupSpotify() {
    window.onSpotifyWebPlaybackSDKReady = () => {
        const token = 'BQCymr6EX0n3TYqv0ZdAbsCsVhIC-TwUJ4xShTI0LzQi3RuNXP650mO5qIgokzpPGaOL2xkjt3LX3ht0vlPYesT9ZcBIND-jB_qI8CU-QSXGBYpFObOqvQQ4Q0rA6S97CmH6HVn5MlrO979Y5UgR2P0ncuZrM2ZW-A';
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
