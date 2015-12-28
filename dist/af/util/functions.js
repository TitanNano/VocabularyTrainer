'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var objectExtend = exports.objectExtend = function objectExtend(update) {
	var _this = this;

	Object.keys(update).forEach(function (item) {
		if (_typeof(update[item]) == 'object' && !Array.isArray(update[item]) && update[item] !== null) objectExtend.apply(_this[item], [update[item]]);else _this[item] = update[item];
	});
};

var cloneObject = exports.cloneObject = function cloneObject(object) {
	return JSON.parse(JSON.stringify(object));
};

// this function creates a new unique id
var createUniqueId = exports.createUniqueId = function createUniqueId() {
	var time = Date.now();
	while (time == Date.now()) {}
	return Date.now();
};