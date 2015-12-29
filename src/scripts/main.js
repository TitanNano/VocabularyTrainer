import App from './App.js';
import { DataBinding } from '../af/modules/DataBinding.js';
import UiPage from './UiPage.js';
import './MainView.js';
import './WordManager.js';
import './WordTrainer.js';

let once = false;

let bootstrap = function(){
    let queue = [];

    console.log('ready!');

    [].slice.apply(document.querySelectorAll('link[rel="import-async"]')).forEach(element => {
        let node = document.createElement('link');

        node.setAttribute('rel', 'import');
        node.setAttribute('href', element.href);

        queue.push(new Promise(success => node.addEventListener('load', success)));

        element.parentNode.replaceChild(node, element);
    });

    Promise.all(queue).then(() => {
        console.log('all components loaded!');

        UiPage.init();

        setTimeout(() => {
            DataBinding.bindNode('.style-spinner-start', {
                active : false
            });
        }, 0);
    });
};

if (window.Polymer && window.Polymer.ImportStatus._ready) {
    Polymer.ImportStatus.whenReady(bootstrap);
} else {
    window.addEventListener('WebComponentsReady', bootstrap);
}
