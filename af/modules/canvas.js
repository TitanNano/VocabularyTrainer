/*****************************************************************
 * Canvas.js v1.1  part of the ApplicationFrame                  *
 * © copyright by Jovan Gerodetti (TitanNano.de)                 *
 * The following Source is licensed under the Appache 2.0        *
 * License. - http://www.apache.org/licenses/LICENSE-2.0         *
 *****************************************************************/
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.config = exports.canvas = undefined;

var _make2 = require('util/make');

var _classes = require('modules/classes');

var $$ = window;

var Accessor = _classes.classes.Accessor;

var _Make = (0, _make2.Make)(Accessor)();

var attributes = _Make.attributes;

// Functions

var getZLevelMax = function getZLevelMax(element) {
    var max = 0;
    element._elements.forEach(function (item) {
        if (item.zLevel > max) max = item.zLevel;
    });
    return max;
};

var sortElements = function sortElements(element, zLevels) {
    var newOrder = [];
    var loop = function loop(item, i) {
        if (item.zLevel == i) newOrder.push(item);
    };
    for (var i = 0; i <= zLevels; i++) {
        element._elements.forEach(loop);
    }
    element._elements = newOrder;
};

var layerRender = function layerRender(context, canvas) {
    //  sortElements

    var _attributes = attributes(this);

    var closed = _attributes.closed;

    var zLevel_max = getZLevelMax(closed);
    sortElements(closed, zLevel_max);
    closed.elements.forEach(function (item) {
        return item.render(context, canvas);
    });
};

var Context = {
    yOffset: 0,
    xOffset: 0,
    available: true,

    finally: function _finally() {},

    addOffset: function addOffset(x, y) {
        this.yOffset += y;
        this.xOffset += x;
    },
    removeOffset: function removeOffset(x, y) {
        this.yOffset -= y;
        this.xOffset -= x;
    }
};

var verifyOpacity = function verifyOpacity(n) {
    if (n > 1) return 1;else if (n < 0) return 0;else return n;
};

// Classes
var Canvas = {

    cursor: 'default',
    maxFps: 60,
    fpsLock: true,
    fpsOverlay: false,

    _make: function _make(target) {
        var _attributes2 = attributes(this, {
            dom: target,
            elements: [],
            context: target.getContext('2d'),
            renderStart: 0,
            fpsOverlay: null,
            fps: 0,
            frames: 0
        });

        var open = _attributes2.open;
        var closed = _attributes2.closed;

        //  catch events
        //  mousemove / over, out, move

        closed.dom.addEventListener('mousemove', function (e) {
            var mouse = { x: e.layerX, y: e.layerY };
            var context = new Context();

            sortElements(closed, getZLevelMax(closed));
            for (var i = closed.elements.length - 1; i >= 0; i--) {
                var element = closed.elements[i].checkMouse(mouse, context);
                if (element) {
                    var style = element.cursor || open.cursor;
                    if (this.style.getPropertyValue('cursor') != style) this.style.setProperty('cursor', style);
                }
            }
            context.finally();

            if (context.available && this.style.getPropertyValue() != open.cursor) this.style.setProperty('cursor', open.cursor);
        }, false);

        //  suppress contextmenu
        closed.dom.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            return false;
        }, false);

        //  mouseclick
        closed.dom.addEventListener('click', function (e) {
            var context = new Context();
            var mouse = { x: e.layerX, y: e.layerY };

            sortElements(closed, getZLevelMax(closed));
            for (var i = closed.elements.length - 1; i >= 0; i--) {
                if (closed.elements[i].checkClick(mouse, context)) return;
            }
        }, false);

        //  create FPS overlay
        closed.fpsOverlay = new Layer(10, this._dom.height - 60, 0);
        closed.fpsOverlay.addElement(new FilledRect(0, 0, 150, 60, '#000', 0));
        closed.fpsOverlay.addElement(new TextBox('FPS: 0', 0, 0, 1));
        closed.fpsOverlay.elements(1).color = '#fff';
        closed.fpsOverlay.addElement(new TextBox('Frames: 0', 0, 15, 1));
        closed.fpsOverlay.elements(2).color = '#fff';
        closed.fpsOverlay.addElement(new TextBox('FPS Lock: off', 0, 30, 1));
        closed.fpsOverlay.elements(3).color = '#fff';
    },

    render: function render() {
        var _attributes3 = attributes(this);

        var open = _attributes3.open;
        var closed = _attributes3.closed;

        if (this.isRunning) {
            var context = (0, _make2.Make)(Context);
            var start = Date.now();

            closed.context.save();
            closed.context.clearRect(0, 0, closed.dom.width, closed.dom.height);
            closed.context.globalAlpha = 1;
            layerRender.apply(open, [context, closed.context]);

            if (this.fpsOverlay) {
                closed.fpsOverlay.elements(1).content = 'FPS: ' + Math.round(open.fps);
                closed.fpsOverlay.elements(2).content = 'Frames: ' + open.frames;
                closed.fpsOverlay.elements(3).content = 'FPS Lock: ' + (open.fpsLock ? 'on' : 'off');
                closed.fpsOverlay.render(context, closed.context);
            }

            var duration = (Date.now() - closed.renderStart) / 1000;
            var renderTime = (Date.now() - start) / 1000;
            closed.fps = 1 / duration;
            closed.frames++;
            var c = this;

            //          fps lock
            if (this.fpsLock) {
                var timeForFrame = 1 / this.maxFps;
                if (renderTime < timeForFrame) {
                    var timeOut = (timeForFrame - renderTime) * 1000;
                    this._renderStart = Date.now();
                    $$.setTimeout(function () {
                        $$.requestAnimationFrame(function () {
                            c._render();
                        });
                    }, timeOut);
                    return;
                }
            }
            closed.renderStart = Date.now();
            $$.requestAnimationFrame(function () {
                closed.render();
            });
        }
    },

    start: function start() {
        var _attributes4 = attributes(this);

        var open = _attributes4.open;
        var closed = _attributes4.closed;

        open.isRunning = true;
        $$.requestAnimationFrame(function () {
            closed.render();
        });
    },

    stop: function stop() {
        this.isRunning = false;
    },

    addElement: function addElement(element) {
        attributes(this).closed.elements.push(element);
    },

    get height() {
        return attributes(this).closed.dom.height;
    },

    get width() {
        return attributes(this).closed.dom.width;
    },

    get fps() {
        return attributes(this).closed.fps;
    },

    get frames() {
        return attributes(this).closed.frames;
    },

    measureText: function measureText(textElement) {
        var _attributes5 = attributes(this);

        var closed = _attributes5.closed;

        closed.context.font = textElement.font;
        closed.context.textAling = textElement.aling;
        closed.context.fillStyle = textElement.color;
        closed.context.textBaseline = 'top';
        return closed.context.measureText(textElement.content);
    },

    measureTextWidth: function measureTextWidth(textElement) {
        var _attributes6 = attributes(this);

        var closed = _attributes6.closed;

        var lines = textElement.content.split('\n');
        var linesWidth = [];

        closed.context.font = textElement.font;
        closed.context.textAling = textElement.aling;
        closed.context.fillStyle = textElement.color;
        closed.context.textBaseline = 'top';
        lines.forEach(function (item) {
            return linesWidth.push(closed.context.measureText(item).width);
        });
        return Math.max.apply(Math, linesWidth);
    },

    measureTextHeight: function measureTextHeight(text, lineHeight) {
        if (text !== '') return text.split('\n').length * lineHeight;else return 0;
    },

    elements: function elements(index) {
        return attributes(this).closed.elements[index];
    }
};

var Layer = {
    x: 0,
    y: 0,
    opacity: 1,
    hidden: false,

    _make: function _make(x, y, zLevel) {
        attributes(this, {
            elements: []
        });

        this.zLevel = zLevel || 0;
        this.x = x || 0;
        this.y = y || 0;

        this._make = null;
    },

    render: function render(context, canvas) {
        if (!this.hidden) {
            context.addOffset(this.x, this.y);
            canvas.save();
            canvas.globalAlpha = verifyOpacity(canvas.globalAlpha - (1 - this.opacity));
            layerRender.apply(this, [context, canvas]);
            context.removeOffset(this.x, this.y);
            canvas.restore();
        }
    },

    addElement: Canvas.addElement,

    checkMouse: function checkMouse(mouse, context) {
        var element = null;

        var _attributes7 = attributes(this);

        var closed = _attributes7.closed;

        context.addOffset(this.x, this.y);
        sortElements(this, getZLevelMax(this));
        for (var i = closed.elements.length - 1; i >= 0; i--) {
            var item = closed.elements[i].checkMouse(mouse, context);
            if (item) element = item;
        }
        context.removeOffset(this.x, this.y);
        return element;
    },

    checkClick: function checkClick(mouse, context) {
        var _attributes8 = attributes(this);

        var closed = _attributes8.closed;

        context.addOffset(this.x, this.y);
        sortElements(this, getZLevelMax(this));
        for (var i = closed.elements.length - 1; i >= 0; i--) {
            if (closed.elements[i].checkClick(mouse, context)) return true;
        }
        context.removeOffset(this.x, this.y);
    },

    clear: function clear() {
        attributes(this).closed.elements = [];
    },

    elements: Canvas.elements
};

var RectShapeElement = {
    x: 0,
    y: 0,
    zLevel: 0,
    hidden: false,
    width: 0,
    height: 0,
    opacity: 1,
    cursor: null,
    onmouseover: function onmouseover() {},
    onmouseout: function onmouseout() {},
    onmousemove: function onmousemove() {},
    onclick: function onclick() {},

    _make: function _make(x, y, zLevel, width, height) {
        attributes(this, {
            mouse: false
        });
        this.x = x || 0;
        this.y = y || 0;
        this.zLevel = zLevel || 0;
        this.width = width || 0;
        this.height = height || 0;
    },

    checkMouse: function checkMouse(mouse, context) {
        var _attributes9 = attributes(this);

        var open = _attributes9.open;
        var closed = _attributes9.closed;

        if (!open.hidden && mouse.x >= context.xOffset + this.x && mouse.x <= context.xOffset + this.x + this.width && mouse.y >= context.yOffset + this.y && mouse.y <= context.yOffset + this.y + this.height && context.available) {
            if (!closed.mouse) {
                closed.mouse = true;
                context.finally = function () {
                    open.onmouseover(mouse);
                    open.onmousemove(mouse);
                };
            } else {
                context.finally = function () {
                    open.onmousemove(mouse);
                };
            }
            context.available = false;
            return this;
        } else {
            if (closed.mouse) {
                closed.mouse = false;
                open.onmouseout(mouse);
            }
            return null;
        }
    },

    checkClick: function checkClick(mouse, context) {
        if (!this.hidden && mouse.x >= context.xOffset + this.x && mouse.x <= context.xOffset + this.x + this.width && mouse.y >= context.yOffset + this.y && mouse.y <= context.yOffset + this.y + this.height) {
            this.onclick();
            return true;
        } else {
            return false;
        }
    }
};

var FilledRect = function FilledRect(x, y, width, height, color, zLevel) {
    RectShapeElement.apply(this, [x, y, width, height, zLevel]);
    this.cursor = null;
};

FilledRect = (0, _make2.Make)({
    color: null,
    cursor: null,

    _make: function _make(x, y, width, height, color, zLevel) {
        Object.getPrototypeOf(this)._make.apply(this, [x, y, width, height, zLevel]);
        this.color = color;

        this.make = null;
    },

    render: function render(context, canvas) {
        if (!this.hidden) {
            canvas.save();
            canvas.fillStyle = this.color;
            canvas.globalAlpha = verifyOpacity(canvas.globalAlpha - (1 - this.opacity));
            canvas.fillRect(context.xOffset + this.x, context.yOffset + this.y, this.width, this.height);
            canvas.restore();
        }
    }
}, RectShapeElement);

var CImage = (0, _make2.Make)({
    crop: null,
    source: null,

    _make: function _make(source, x, y, zLevel) {
        Object.getPrototypeOf(this)._make.apply(this, [x, y, null, null, zLevel]);

        attributes(this, {
            width: null,
            height: null
        });

        this.source = source;
    },

    render: function render(context, canvas) {
        if (!this.hidden) {
            canvas.save();
            canvas.globalAlpha = verifyOpacity(canvas.globalAlpha - (1 - this.opacity));
            if (this.crop) {
                var sourceX = this.crop.left;
                var sourceY = this.crop.top;
                var sourceWidth = this.source.naturalWidth - this.crop.left - this.crop.right;
                var sourceHeight = this.source.naturalHeight - this.crop.top - this.crop.bottom;
                var targetX = context.xOffset + this.x;
                var targetY = context.yOffset + this.y;
                canvas.drawImage(this.source, sourceX, sourceY, sourceWidth, sourceHeight, targetX, targetY, this.width, this.height);
            } else {
                canvas.drawImage(this.source, context.xOffset + this.x, context.yOffset + this.y, this.width, this.height);
            }
            canvas.restore();
        }
    },

    get width() {
        return attributes(this).closed.width || this.source.naturalWidth || 0;
    },

    set width(width) {
        attributes(this).closed.width = width;
    },

    get height() {
        return attributes(this).closed.height || this.source.naturalHeight || 0;
    },

    set height(height) {
        attributes(this).closed.height = height;
    }
}, RectShapeElement);

var TextBox = {
    x: 0,
    y: 0,
    content: null,
    fontFamily: 'sans-serif',
    fontSize: 12,
    fontStyle: '',
    fontWeight: 'normal',
    color: '#000',
    aling: 'left',
    opacity: 1,
    zLevel: 0,
    cursor: null,
    textBaseLine: 'top',

    _make: function _make() {
        var content = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        var x = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var y = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
        var zLevel = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

        this.x = x;
        this.y = y;
        this.content = content;
        this.zLevel = zLevel;

        this._make = null;
    },

    _render: function _render(context, canvas) {
        if (!this.hidden) {
            canvas.globalAlpha = verifyOpacity(canvas.globalAlpha - (1 - this.opacity));
            canvas.font = this.font;
            canvas.textAling = this.aling;
            canvas.fillStyle = this.color;
            canvas.textBaseline = 'top';

            if (this.aling == 'center') {
                var t = this;
                var lines = this.content.split('\n');
                var linesWidth = [];
                lines.forEach(function (item) {
                    return linesWidth.push(canvas.measureText(item).width);
                });
                var largest = Math.max.apply(Math, linesWidth);
                lines.forEach(function (item, i) {
                    var dist = (largest - linesWidth[i]) / 2;
                    canvas.fillText(item, context.xOffset + dist + t.x, context.yOffset + t.lineHeight * i + t.y);
                });
            } else {
                canvas.fillText(this.content, context.xOffset + this.x, context.yOffset + this.y);
            }
            canvas.globalAlpha = verifyOpacity(canvas.globalAlpha + (1 - this.opacity));
        }
    },
    _checkMouse: function _checkMouse() {
        return null;
    },
    _checkClick: function _checkClick() {
        return null;
    },
    get font() {
        return this.fontStyle + ' ' + this.fontWeight + ' ' + this.fontSize + 'px/' + this.lineHeight + 'px ' + this.fontFamily;
    },
    get lineHeight() {
        return this._lineHeight ? this._lineHeight : this.fontSize + 6;
    },
    set lineHeight(value) {
        this._lineHeight = value;
    }
};

var HitArea = (0, _make2.Make)({

    _render: function _render() {}

}, RectShapeElement);

var ImageCrop = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,

    _make: function _make(top, right, bottom, left) {
        this.top = top || 0;
        this.right = right || 0;
        this.bottom = bottom || 0;
        this.left = left || 0;
    }
};

// animations
var fadeOut = function fadeOut(element, time, callback) {
    var timeOut = 20; // milliseconds
    time *= 1000; //convert to milliseconds
    var updates = Math.round(time / timeOut);
    var ammount = 1 / updates;
    var update = function update() {
        updates--;
        element.opacity -= ammount;

        if (updates > 0) $$.setTimeout(update, timeOut);else if (callback) {
            element.opacity = 0;
            callback();
        }
    };
    element.opacity = 1;
    update();
};

var fadeIn = function fadeIn(element, time, callback) {
    var timeOut = 20; // milliseconds
    time *= 1000; //convert to milliseconds
    var updates = Math.round(time / timeOut);
    var ammount = 1 / updates;
    var update = function update() {
        updates--;
        element.opacity += ammount;

        if (updates > 0) $$.setTimeout(update, timeOut);else if (callback) {
            element.opacity = 1;
            callback();
        }
    };
    element.opacity = 0;
    update();
};

var zoomIn = function zoomIn(element, target, amount, time, callback) {
    if (!(element instanceof CImage)) {
        $$.console.error('element is not a instance of CImage');
        return false;
    }
    var topAmount = Math.round(target[1] / 100 * amount);
    var leftAmount = Math.round(target[0] / 100 * amount);
    var bottomAmount = Math.round((element.height - target[1]) / 100 * amount);
    var rightAmount = Math.round((element.width - target[0]) / 100 * amount);
    time *= 1000; // to milliseconds
    var timeOut = 20;
    var updates = Math.round(time / timeOut);
    var lot = 1 / updates;
    var update = function update() {
        updates--;
        element.crop.top += topAmount * lot;
        element.crop.right += rightAmount * lot;
        element.crop.bottom += bottomAmount * lot;
        element.crop.left += leftAmount * lot;

        if (updates > 0) {
            $$.setTimeout(update, timeOut);
        } else if (callback) {
            callback();
        }
    };
    if (!element.crop) element.crop = new ImageCrop();
    update();
};

var zoomOut = function zoomOut(element, target, amount, time, callback) {
    if (!(element instanceof CImage)) {
        $$.console.error('element is not a instance of CImage');
        return false;
    }
    var topAmount = Math.round(target[1] / 100 * amount);
    var leftAmount = Math.round(target[0] / 100 * amount);
    var bottomAmount = Math.round((element.height - target[1]) / 100 * amount);
    var rightAmount = Math.round((element.width - target[0]) / 100 * amount);
    time *= 1000; // to milliseconds
    var timeOut = 20;
    var updates = Math.round(time / timeOut);
    var lot = 1 / updates;
    var update = function update() {
        updates--;
        element.crop.top -= topAmount * lot;
        element.crop.right -= rightAmount * lot;
        element.crop.bottom -= bottomAmount * lot;
        element.crop.left -= leftAmount * lot;

        if (updates > 0) {
            $$.setTimeout(update, timeOut);
        } else if (callback) {
            element.crop = null;
            callback();
        }
    };
    if (!element.crop) element.crop = new ImageCrop(topAmount, rightAmount, bottomAmount, leftAmount);
    update();
};

var canvas = exports.canvas = {
    Canvas: Canvas,
    Layer: Layer,
    FilledRect: FilledRect,
    CImage: CImage,
    TextBox: TextBox,
    HitArea: HitArea,
    ImageCrop: ImageCrop,
    fadeIn: fadeIn,
    fadeOut: fadeOut,
    zoomIn: zoomIn,
    zoomOut: zoomOut
};

var config = exports.config = {
    author: 'Jovan Gerodetti',
    main: 'canvas',
    version: '1.1'
};