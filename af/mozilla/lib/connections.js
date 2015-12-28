'use strict';

// Connection v0.1 © copyright by TitanNano / Jovan Gerodetti - titannano.de

undefined.$$ = undefined;

var _$$$require = $$.require('af/core');

var $_ = _$$$require.$_;

$_('addon').hook($$);

$_('addon').modules({
    'classes': $$.require('af/classes.js'),
    'xhr': $$.require('sdk/net/xhr')
});

$_('addon').module(function () {
    var _$_ = $_('classes');

    var Promise = _$_.Promise;

    var _$_2 = $_('xhr');

    var XMLHttpRequest = _$_2.XMLHttpRequest;

    $$.console.log('works FINE!!');

    var Socket = function Socket(type, url) {
        this._type = type;
        this._url = url;
        this._lastMessage = null;
        this._open = false;
    };

    $$.exports.request = function (url) {
        var _$_3 = $_('classes');

        var Promise = _$_3.Promise;

        return new Promise(function (okay, fail) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) okay(this.responseText);else fail({ status: this.status, statusText: this.statusText });
                }
            };
            xhr.open('GET', url, true);
            xhr.send();
        });
    };

    $$.exports.require = function (url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send();
        if (xhr.status == 200) return xhr.responseText;else return null;
    };

    Socket.prototype = {
        get url() {
            return this._url;
        },

        get lastMessage() {
            return this._lastMessage;
        },

        get open() {
            return this._open;
        },

        push: function push(message) {
            var self = this;
            var xhr = new XMLHttpRequest();
            return new Promise(function (setValue, setError) {
                xhr.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        if (this.status == 200) {
                            setValue(this.responseText);
                        } else {
                            setError({ status: this.status, statusText: this.statusText });
                        }
                        self._lastMessage = this.statusText;
                    }
                };
                if (self._type == Socket.HTTP_POST) {
                    xhr.open('POST', self._url, true);
                    xhr.send(message);
                } else if (self._type == Socket.HTTP_GET) {
                    xhr.open('GET', self._url + '?' + message, true);
                    xhr.send();
                }
            });
        }
    };

    Socket.HTTP_GET = 'http_get';
    Socket.HTTP_POST = 'http_post';
    Socket.HTTP = 'http_post';

    $$.exports.Socket = Socket;
});