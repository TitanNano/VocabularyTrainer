import App from './App.js';
import { DataBinding } from 'af/modules/DataBinding.js';
import UiPage from './UiPage.js';
import './MainView.js';
import './WordManager.js';
import './WordTrainer.js';

let bootstrap = function(){
    console.log('ready!');

    UiPage.init();

    DataBinding.bindNode('.style-spinner-start', {
        active : false
    });
};

if (window.Polymer && window.Polymer.ImportStatus._ready) {
    Polymer.ImportStatus.whenReady(bootstrap);
} else {
    window.addEventListener('WebComponentsReady', bootstrap);
}
