'use strict';

var $$ = undefined;

var _$$$require = $$.require('af/core');

var $_ = _$$$require.$_;

$_('addon').hook($$);

$_('addon').modules({
    'globalPrefs': $$.require('sdk/preferences/service'),
    'self': $$.require('sdk/self')
});

$_('addon').module(function () {
    var prefName = 'extensions.' + $_('self').id + '.sdk.console.logLevel';
    this.enabled = function (value) {
        var status = value ? 'debug' : 'error';
        $_('globalPrefs').set(prefName, status);
    };
});