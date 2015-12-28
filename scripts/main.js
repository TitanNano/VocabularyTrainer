'use strict';

var _App = require('./App.js');

var _App2 = _interopRequireDefault(_App);

var _DataBinding = require('af/modules/DataBinding.js');

var _UiPage = require('./UiPage.js');

var _UiPage2 = _interopRequireDefault(_UiPage);

require('./MainView.js');

require('./WordManager.js');

require('./WordTrainer.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bootstrap = function bootstrap() {
    console.log('ready!');

    _UiPage2.default.init();

    _DataBinding.DataBinding.bindNode('.style-spinner-start', {
        active: false
    });
};

if (window.Polymer && window.Polymer.ImportStatus._ready) {
    Polymer.ImportStatus.whenReady(bootstrap);
} else {
    window.addEventListener('WebComponentsReady', bootstrap);
}