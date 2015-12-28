"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var prototype = {};

	for (var _len = arguments.length, types = Array(_len), _key = 0; _key < _len; _key++) {
		types[_key] = arguments[_key];
	}

	types.forEach(function (item) {
		var x = item.prototype || item;
		for (var i in x) {
			Object.defineProperty(prototype, i, Object.getOwnPropertyDescriptor(x, i));
		}
	});
	return prototype;
};