import { Make } from '../../util/Make.js';
import Binding from './Binding.js';
import { parseExpression } from './Parser.js';
import { bindNode } from './Bind.js';

let TemplateRepeatBinding = Make(/** @lends TemplateRepeatBinding.prototype*/{

    /**
     * @type {WeakMap<Node>}
     */
    itemNodeList : null,

    /**
     * @type {Node}
     */
    template : null,

    /**
     * @type {Node}
     */
    marker : null,

    /**
     * @type {Array}
     */
    modelBackup : null,

    /**
     * @constructs
     * @extends {Binding}
     */
    _make : function(){
        Binding._make.apply(this);

        this.itemNodeList = new WeakMap();
        this.modelBackup = [];
    },

    update : function(scope){
        let [itemName, link, expression] = this.originalNodeValue.split(' ');
        let model = parseExpression(expression, scope);
        let cursor = this.marker.nextElementSibling;

        if (link !== 'in') {
            console.log('DataBinding: invalide expression', this.originalNodeValue);
            return;
        }

        if (Array.isArray(model)) {
            model.forEach((item, index) => {
                let node = null;

                if (this.itemNodeList.has(item)) {
                    node = this.itemNodeList.get(item);
                } else {
                    /**
                     * @todo update this meta info on each recycle not only when we create a new scope.
                     */
                    let childScope = Make({
                        $first : index === 0,
                        $last : model.length-1 === index,
                        $index : index
                    }, scope).get();

                    childScope[itemName] = item;

                    node = this.template.content.cloneNode(true);
                    bindNode(node, childScope);

                    this.itemNodeList.set(item, node);
                }

                if (cursor){
                    if (node !== cursor) {
                        cursor.parentNode.insertBefore(node, cursor);
                    }
                } else {
                    this.marker.parentNode.appendChild(node);
                }

                this.modelBackup.forEach(item => {
                    if (model.indexOf(item) < 0) {
                        this.marker.parentNode.removeChild(this.itemNodeList.get(item));
                        this.itemNodeList.delete(item);
                    }
                });

                this.modelBackup = model.slice();

            });
        }
    }

}, Binding).get();

export default TemplateRepeatBinding;
