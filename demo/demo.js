/**
 * Created by hpandit on 19-9-17.
 */

import {html, render} from '../node_modules/lit-html/lib/lit-extended.js';
import {until} from '../node_modules/lit-html/lib/until.js';
import loadImage from '../node_modules/image-promise/dist/image-promise.es-modules.js';

export {html, render} from '../node_modules/lit-html/lib/lit-extended.js';


/**
 * Adapted from the Ractive.js clock example: http://www.ractivejs.org/examples/clock/
 */
(function test() {

    const helloTemplate = (name) => html`<div>Hello ${name}!</div>`;
    // renders <div>Hello Steve!</div> to the document body
    render(helloTemplate('Steve'), document.body);

    // updates to <div>Hello Kevin!</div>, but only updates the ${name} part
    render(helloTemplate('Harshad'), document.body);

    // render(html`
    //               <p>
    //                 ${until(
    //                     fetch('http://68.media.tumblr.com/293dbe0bf167e4b1f3800ce0c7303049/tumblr_mydd4ignud1qzy1ddo1_1280.jpg', {'cross-origin': true, 'credentials': 'omit'
    //                     }).then(function(val) {
    //                         console.log("First", val);
    //                         render(html`<img src="http://68.media.tumblr.com/293dbe0bf167e4b1f3800ce0c7303049/tumblr_mydd4ignud1qzy1ddo1_1280.jpg"/>`, document.body);
    //                     }),
    //                     html`<span>Loading...</span>`)}
    //               </p>
    //             `, document.body);


    // render(html`
    //               <p>
    //                 ${until(
    //                     loadImage('http://68.media.tumblr.com/293dbe0bf167e4b1f3800ce0c7303049/tumblr_mydd4ignud1qzy1ddo1_1280.jpg', {
    //                         'cross-origin': true, 'credentials': 'omit', "cache": false
    //                     }).then(function (image) {
    //                                 // console.log("Second", image);
    //                                 render(html`${image}`, document.body);
    //                             }),
    //                     html`<span>Loading...</span>`)}
    //               </p>`, document.body);


    const images = ['./images/Polymer_1.png', './images/Polymer_2.jpeg', './images/Polymer_3.jpeg', './images/Polymer_4.jpeg', './images/Polymer_5.jpeg'];
    // render(html`
    //               <p>
    //                 ${until(
    //                     loadImage('http://68.media.tumblr.com/293dbe0bf167e4b1f3800ce0c7303049/tumblr_mydd4ignud1qzy1ddo1_1280.jpg', {
    //                         'cross-origin': true, 'credentials': 'omit', "cache": false
    //                     }).then(function (image) {
    //                         render(html`${image}`, document.body);
    //                 }), html`<span>Loading...</span>`)
    //                 }
    //               </p>`, document.body);

    render(html`<div id="player"></div>`, document.body);

    render(html`
                  <p>
                    ${until(
                        fetch("https://www.youtube.com/iframe_api", {mode: 'no-cors', credentials: 'include' }).then(function (code) {
                                    console.log("code", code);
                            console.log("code sring", code.toString());
                                    render(html`<script>${code}</script>`, document.body);
                                    // onYouTubeIframeAPIReady();
                                }),
                        html`<span>Loading...</span>`)}
                  </p>`, document.body);



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
