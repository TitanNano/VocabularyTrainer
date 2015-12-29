import App from './App.js';
import { DataBinding } from '../af/modules/DataBinding.js';
import { Make } from '../af/util/make.js';

let UiPage = Make(/** @lends UiPage.prototype*/{

    _elements : {},

    _active : null,

    _make : function(){

        App.on('newElement:ui-page', scope => {
            this._elements[scope.name] = scope;

            if (scope.active) {
                this._active = scope;
            }

            App.emit(`ui-page:${scope.name}`, scope);
        });
    },

    activate : function(name) {
        this._active.active = false;
        this._elements[name].active = true;
        this._active = this._elements[name];

        App.emit(`ui-page:activated`);
        App.emit(`ui-page:${name}:activated`);
        this._active.__apply__();
    },

    init : function() {
        DataBinding.makeTemplate('#ui-page', function(){
            return {
                side : 'left',

                active : false,

                isRight : function(){
                    return this.side === 'right';
                },

                isLeft : function(){
                    return this.side === 'left';
                }
            };
        }, App);
    }
})();

export default UiPage;
