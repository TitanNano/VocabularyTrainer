import { hasPrototype } from 'af/util/make.js';
import { parseExpression } from './Parser.js';
import { polyMask } from './Util.js';

let Binding = {

    /**
     * @type {string[]}
     */
    properties : null,

    /**
     * @type {string}
     */
    originalNodeValue : '',

    /**
     * @type {Node}
     */
    node : null,

    /**
     * @type {Node}
     */
    parentNode : null,

    /**
     * @type {Boolean}
     */
    singleExpression : false,

    _make : function(){
        this.properties = [];
    },

    update : function(scope){
        let text = this.originalNodeValue;
        let values = this.properties.map(key => {
            return { name : key, value : parseExpression(key, scope) };
        });

        if (this.singleExpression) {
                text = parseExpression(text, scope);
        } else {
            values.forEach(pair => {
                text = text.replace(`\{\{${pair.name}\}\}`, pair.value);
            });
        }

        if (hasPrototype(this.node, window.Attr)) {
            polyMask(this.parentNode).setAttribute(this.node.name, text);
        } else {
            this.node.textContent = text;
        }
    }
};

export default Binding;
