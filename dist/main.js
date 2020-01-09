/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Canvas/Canvas.ts":
/*!******************************!*\
  !*** ./src/Canvas/Canvas.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Canvas {
    constructor(htmlCanvas) {
        this.htmlCanvas = htmlCanvas;
        this.context = htmlCanvas.getContext("2d");
        this.htmlCanvas.width = 1024;
        this.htmlCanvas.height = 768;
    }
    get width() {
        return this.htmlCanvas.width;
    }
    get height() {
        return this.htmlCanvas.height;
    }
    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
    /**
     * lt - левый верхний
     * rt - правый нижний
     */
    fillRect(lt, rb, color) {
        if (color !== undefined && color != null)
            this.context.fillStyle = color.toStyle();
        this.context.fillRect(lt.x, lt.y, rb.x - lt.x, rb.y - lt.y);
    }
    drawRect(lt, rb, color) {
        if (color !== undefined && color != null)
            this.context.strokeStyle = color.toStyle();
        this.context.strokeRect(lt.x, lt.y, lt.x - rb.x, rb.y - lt.y);
    }
    drawLine(line, color) {
        if (color !== undefined && color != null)
            this.context.strokeStyle = color.toStyle();
        if (line.points && line.points.length) {
            this.context.beginPath();
        }
        for (let p of line.points) {
            this.context.lineTo(p.x, p.y);
        }
        this.context.stroke();
    }
    fillFigure(line, color) {
        if (color !== undefined && color != null)
            this.context.fillStyle = color.toStyle();
        if (line.points && line.points.length) {
            this.context.beginPath();
        }
        for (let p of line.points) {
            this.context.lineTo(p.x, p.y);
        }
        this.context.fill();
    }
}
exports.Canvas = Canvas;
class Line {
    constructor(points) {
        this.points = points;
    }
}
exports.Line = Line;
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
exports.Point = Point;


/***/ }),

/***/ "./src/Canvas/RGB.ts":
/*!***************************!*\
  !*** ./src/Canvas/RGB.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class RGB {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    toStyle() {
        return this.a === undefined ?
            `rgb(${this.r}, ${this.g}, ${this.b})` :
            `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a / 255})`;
    }
}
exports.RGB = RGB;


/***/ }),

/***/ "./src/Game/Box.ts":
/*!*************************!*\
  !*** ./src/Game/Box.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const RGB_1 = __webpack_require__(/*! ../Canvas/RGB */ "./src/Canvas/RGB.ts");
class Box {
    constructor(leftTop) {
        this.color = new RGB_1.RGB(0, 0, 255, 255);
        this.collapsed = false;
        this.leftTop = leftTop;
        this.width = 20;
        this.height = 20;
        this.collaider = new Array(this.width);
        for (let ix = 0; ix < this.width; ix++) {
            this.collaider[ix] = new Array(this.height);
            for (let iy = 0; iy < this.height; iy++) {
                this.collaider[ix][iy] = true;
            }
        }
    }
    draw(canvas) {
        canvas.drawRect(this.leftTop, { x: this.leftTop.x + this.width, y: this.leftTop.y + this.height }, this.color);
    }
    onCollapse(other, game) {
        this.color = new RGB_1.RGB(
        /* r: */ 0, 
        /* g: */ this.color.g < 255 ? this.color.g + 1 : this.color.g, 
        /* b: */ this.color.b > 0 ? this.color.b - 1 : this.color.b, 
        /* a: */ this.color.g >= 0 ? this.color.a - 1 : this.color.a);
        if (this.color.a === 0)
            game.removeObject(this);
    }
}
exports.Box = Box;


/***/ }),

/***/ "./src/Game/FPSTicker.ts":
/*!*******************************!*\
  !*** ./src/Game/FPSTicker.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ITicker_1 = __webpack_require__(/*! ./ITicker */ "./src/Game/ITicker.ts");
class FPSTicker extends ITicker_1.ITicker {
    constructor() {
        super();
        this._count = 0;
        this._time = 0;
        this._onEachTick = [];
    }
    start() {
        this._lastTick = new Date(); // TODO: Не самый надёжный способ
        window.requestAnimationFrame(() => this._tick());
    }
    get time() { return this._time; }
    get count() { return this._count; }
    _tick() {
        this._count++;
        const now = new Date();
        this._delta = this._lastTick.getTime() - now.getTime();
        this._lastTick = now;
        this._time += this.delta;
        this._onEachTick.forEach(func => {
            func();
        });
        window.requestAnimationFrame(() => this._tick());
    }
    get delta() { return this._delta; }
    set onEachTick(func) {
        this._onEachTick.push(func);
    }
}
exports.FPSTicker = FPSTicker;


/***/ }),

/***/ "./src/Game/Game.ts":
/*!**************************!*\
  !*** ./src/Game/Game.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Terrain_1 = __webpack_require__(/*! ./Terrain */ "./src/Game/Terrain.ts");
const Box_1 = __webpack_require__(/*! ./Box */ "./src/Game/Box.ts");
class Game {
    constructor(canvas, tiker) {
        this.canvas = canvas;
        this.tiker = tiker;
        this.__earth = new Terrain_1.Terrain();
        this.__nextBox = 0;
        this.__boxes = new Set();
        this.drawObjects = new Set();
        this.terrains = [];
        this.collapseObjects = new Set();
    }
    setSettings() {
    }
    __start() {
        this.terrains.push(this.__earth);
        this.drawObjects.add(this.__earth);
        this.tiker.onEachTick = () => this.boxDrop();
    }
    boxDrop() {
        if (this.tiker.time > this.__nextBox) {
            this.__boxes.add(new Box_1.Box({ x: Math.random() * this.canvas.width, y: 0 }));
        }
        const speed = 5;
        for (let box of this.__boxes) {
            if (!this._isCollapse(this.__earth, box)) {
                box.leftTop.y += speed * (this.tiker.delta / 1000);
            }
        }
    }
    _isCollapse(terr, obj) {
        let collapsed = false;
        for (let ix = 0; ix < obj.width && !collapsed; ix++) {
            for (let iy = 0; iy < obj.height && !collapsed; iy++) {
                collapsed = obj.collaider[obj.leftTop.x + ix][obj.leftTop.y + iy] &&
                    terr.collaider[obj.leftTop.x + ix][obj.leftTop.y + iy];
            }
        }
        return collapsed;
    }
    start() {
        this.__start();
        this.tiker.onEachTick = () => this.collapses();
        this.tiker.onEachTick = () => this.draw();
        this.tiker.start();
    }
    draw() {
        this.canvas.clear();
        this.drawObjects.forEach(obj => {
            obj.draw(this.canvas);
        });
    }
    collapses() {
        this.terrains.forEach(terr => {
            this.collapseObjects.forEach(obj => {
                let collapsed = this._isCollapse(terr, obj);
                if (collapsed)
                    obj.onCollapse(terr, this);
            });
        });
    }
    addObject(object) {
        if (object.draw) {
            this.drawObjects.add(object);
        }
        if (object.onCollapse) {
            this.collapseObjects.add(object);
        }
    }
    _removeObject(object) {
        this.__boxes.delete(object);
    }
    removeObject(object) {
        this._removeObject(object);
        if (object.draw) {
            this.drawObjects.delete(object);
        }
        if (object.onCollapse) {
            this.collapseObjects.delete(object);
        }
    }
}
exports.Game = Game;


/***/ }),

/***/ "./src/Game/ITicker.ts":
/*!*****************************!*\
  !*** ./src/Game/ITicker.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ITicker {
}
exports.ITicker = ITicker;


/***/ }),

/***/ "./src/Game/Terrain.ts":
/*!*****************************!*\
  !*** ./src/Game/Terrain.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const RGB_1 = __webpack_require__(/*! ../Canvas/RGB */ "./src/Canvas/RGB.ts");
class Terrain {
    draw(canvas) {
        const left = Math.ceil(canvas.width / 4);
        const right = Math.ceil(canvas.width * 3 / 4);
        const bot = Math.ceil(canvas.height); //this.height / 6;
        const top = Math.ceil(canvas.height * 3 / 4);
        this.width = right - left;
        this.height = bot - top;
        this.leftTop = { x: left, y: top };
        this.collaider = new Array(this.width);
        for (let ix = 0; ix < this.width; ix++) {
            this.collaider[ix] = new Array(this.height);
            for (let iy = 0; iy < this.height; iy++) {
                this.collaider[ix][iy] = (this.height - iy) < ((this.width - ix) / this.width * this.height);
                if (this.collaider[ix][iy]) {
                    const p = { x: this.leftTop.x + ix, y: this.leftTop.y + iy };
                    canvas.fillRect({ x: p.x - 1, y: p.y - 1 }, { x: p.x + 1, y: p.y + 1 }, new RGB_1.RGB(255, 0, 0));
                }
                else {
                    const p = { x: this.leftTop.x + ix, y: this.leftTop.y + iy };
                    canvas.fillRect({ x: p.x - 1, y: p.y - 1 }, { x: p.x + 1, y: p.y + 1 }, new RGB_1.RGB(255, 0, 0, 30));
                }
                //canvas.fillRect(p, p, { r: 255, g: 0, b: 0 })
            }
        }
    }
    onCollapse(other, game) {
        //
    }
}
exports.Terrain = Terrain;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = __webpack_require__(/*! ./Game/Game */ "./src/Game/Game.ts");
const FPSTicker_1 = __webpack_require__(/*! ./Game/FPSTicker */ "./src/Game/FPSTicker.ts");
const Canvas_1 = __webpack_require__(/*! ./Canvas/Canvas */ "./src/Canvas/Canvas.ts");
console.log('Hello from ts');
window.onload = (onloadEvent) => {
    // const - как в js
    // canvas - имя переменный
    // :HtmlCanvasElement - через двоеточие указывается тип
    // <HTMLCanvasElement> - приведение типа, по дефолту getElementById возвращает "родителя" - HtmlElement
    const canvasHtml = document.getElementById('canvas');
    const c = new Canvas_1.Canvas(canvasHtml);
    const t = new FPSTicker_1.FPSTicker();
    const g = new Game_1.Game(c, t);
    g.start();
};


/***/ })

/******/ });
//# sourceMappingURL=main.js.map