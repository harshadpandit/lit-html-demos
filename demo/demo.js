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


    render(html`
                  <p>
                    ${until(
                        loadImage('http://68.media.tumblr.com/293dbe0bf167e4b1f3800ce0c7303049/tumblr_mydd4ignud1qzy1ddo1_1280.jpg', {
                            'cross-origin': true, 'credentials': 'omit', "cache": false
                        }).then(function (image) {
                                    console.log("Second", image);
                                    render(html`${image}`, document.body);
                                }),
                        html`<span>Loading...</span>`)}
                  </p>`, document.body);


})();
