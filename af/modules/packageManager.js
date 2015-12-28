/*****************************************************************
 * Packages Manager v0.1  part of the ApplicationFrame           *
 * © copyright by Jovan Gerodetti (TitanNano.de)                 *
 * The following Source is licensed under the Appache 2.0        *
 * License. - http://www.apache.org/licenses/LICENSE-2.0         *
 *****************************************************************/

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.config = exports.packages = undefined;

var _make2 = require('util/make');

var _base = require('modules/base64');

var _classes = require('modules/classes');

var _fileSystem = require('modules/fileSystem');

var Prototype = _classes.classes.Prototype;
var EventManager = _classes.classes.EventManager;
var Accessor = _classes.classes.Accessor;
var TNFile = _fileSystem.fileSystem.TNFile;

var accessor = (0, _make2.Make)(Accessor)();

var setPackageReady = function setPackageReady(p) {
    p.ready = true;
    var event = new CustomEvent('ready');
    p.dispatchEvent(event);
};

var setPackageWorking = function setPackageWorking(p) {
    p.ready = false;
    var event = new CustomEvent('working');
    p.dispatchEvent(event);
};

var loop = function loop() {
    setWorking();
    var item = queue.shift();
    if (typeof item.object === "string") {
        var block = {
            path: this.path,
            content: btoa(object),
            type: "text/plain",
            length: btoa(object).length
        };
        object.files.push(block);
        if (queue.length > 0) {
            loop();
        } else {
            setReady();
        }
    } else if (item.object instanceof Blob) {
        var reader = new FileReader();
        reader.onloadend = function (event) {
            var content = event.target.result.substring(event.target.result.indexOf(',') + 1);
            var block = {
                path: item.path,
                content: content,
                type: event.target.result.substring(event.target.result.indexOf(':') + 1, event.target.result.indexOf(';') - 1),
                length: content.length
            };
            object.files.push(block);
            if (queue.length > 0) {
                loop();
            } else {
                setReady();
            }
        };
        reader.readAsDataURL(item.object);
    }
};

var packages = exports.packages = {
    unpack: function unpack(pack) {
        pack.files.forEach(function (item, index) {
            if (item.content.length === item.length) {
                var buffer = _base.b64.decode(item.content);
                var blob = new Blob([buffer], { type: item.type });
                var file = new TNFile(item.path.substring(item.path.lastIndexOf('/') + 1, item.path.indexOf('.')), item.path.substr(item.path.indexOf('.') + 1), blob);
                file.saveTo({ path: 'packages/' + pack.name + item.path.substring(0, item.path.lastIndexOf('/') + 1) });
            } else {
                throw 'Failed to unpack "' + pack.name + '": wrong length for item ' + index + '!!';
            }
        });
    },

    Package: (0, _make2.Make)({
        name: '',
        files: null,
        fileCount: 0,
        ready: false,

        _make: function _make(name) {
            this.name = name;
            this.files = [];
            this.ready = true;

            this._make = null;
        },

        push: function push(object, path) {
            queue.push({ object: object, path: path });
            if (this.ready) {
                loop();
            }
        }
    }),

    pack: function pack(_pack) {
        if (_pack.ready) {
            delete _pack.ready;
            delete _pack.progress;
            delete _pack.onready;
            delete _pack.onprogress;
            _pack.fileCount = _pack.files.length;
            return JSON.stringify(_pack, null, '  ');
        } else {
            console.warn("Package \"" + _pack.name + "\" is not read!!");
        }
    },

    get: function get(pack, relativePath, callback) {
        _fileSystem.fileSystem.getStaticFilePointerFromPath({ path: 'packages/' + pack + relativePath }, callback);
    },

    download: function download(path) {
        var request = new XMLHttpRequest();
        request.open('GET', path, true);
        var manager = this;
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                var pack = JSON.parse(request.responseText);
                manager.unpack(pack);
            }
        };
        request.send();
    }
};

var config = exports.config = {
    author: 'Jovan Gerodetti',
    main: 'packages',
    version: 'v1.0',
    name: 'Packages Manager Module'
};

/*
example package

{
	name : "example",
	files : [{
				path : "/example/icon.png",
				content : base64String,
				type : "image/png",
				length : 12
			},
			{
				path : "/scripts/main.js",
				content : base64String,
				type : "text/javascript",
				length 212
			}],
	fileCount : 2
	
}

*/