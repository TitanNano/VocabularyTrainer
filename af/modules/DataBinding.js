'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.config = exports.DataBinding = undefined;

var _Template = require('./DataBinding/Template.js');

var _Bind = require('./DataBinding/Bind.js');

/**
 * @module DataBinding
 * @version 1.0
 * @author Jovan Gerodetti
 */

//import CryptoJS from '../libs/CryptoJS-SHA-3.js';
NodeList.prototype.forEach = NamedNodeMap.prototype.forEach = Array.prototype.forEach;

/**
 * calculates the hash of an Object.
 *
 * @memberof Object.prototype
 */
/**Object.prototype.toString = function(){

    let data = Object.keys(this).map(function(key){
    	return key + '=' + this[key];
    }.bind(this)).join('&');

    let hash = CryptoJS.SHA3(data, { outputLength: 224 });

    return hash.toString(CryptoJS.enc.Base64);
};**/

var style = document.createElement('style');

style.innerHTML = '\n    [bind-display="false"] {\n        display: none !important;\n    }\n\n    [bind-visible="false"] {\n        visibility: hidden;\n    }\n';

document.head.appendChild(style);

var DataBinding = exports.DataBinding = {
    makeTemplate: _Template.makeTemplate,
    bindNode: _Bind.bindNode
};

var config = exports.config = {
    main: 'DataBinding',
    author: 'Jovan Gerodetti'
};