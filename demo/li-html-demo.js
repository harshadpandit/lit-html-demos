/**
 * Created by hpandit on 19-9-17.
 */

import {html, render} from '../node_modules/lit-html/lib/lit-extended.js';
import {until} from '../node_modules/lit-html/lib/until.js';

export {html, render} from '../node_modules/lit-html/lib/lit-extended.js';

(function litHtmlDemo() {


    render(html`<div id="player"></div>`, document.body);

    render(html`
                  <p>
                    ${until(
        fetch("https://www.youtube.com/iframe_api", {mode: 'no-cors', credentials: 'include'}).then(function (code) {
            console.log(code);
            // render(html`<script type="application/javascript">${code}</script>`, document.body);
            onYouTubeIframeAPIReady();
        }),
        html`<span>Loading...</span>`)}
                  </p>`, document.header);


    let player;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '800',
            width: '1450',
            autoplay: 1,
            videoId: 'TDpiyrcOO30',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    };

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = true;

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 60000);
            done = true;
        }
    }

    function stopVideo() {
        player.stopVideo();
    }
})();
