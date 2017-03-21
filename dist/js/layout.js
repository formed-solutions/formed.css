/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Layout.js
 */

var layout = function () {
  'use strict';

  var KEYCODES = {
    ENTER: 13,
    ESCAPE: 27,
    SPACE: 32
  };

  var Layout = function () {
    function Layout(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Layout);

      if (!!(element && element.nodeType !== 1)) {
        throw new TypeError('Element passed in is not a HTML node.');
      }

      this._element = element;
      this.config = Object.assign({}, this.defaults, options);

      this.init();
    }

    _createClass(Layout, [{
      key: 'init',
      value: function init() {
        this.wrapLayout();
        cacheChildren.call(this);

        if (this._drawer) {
          drawerSetup.call(this);
        }

        this.breakpoint = window.matchMedia(this.config.breakpoint);

        this.screenSizeHandler();

        this.bindings();
      }
    }, {
      key: 'bindings',
      value: function bindings() {
        if (this._drawer) {
          this._drawerBtn.addEventListener('click', this.drawerToggleHandler.bind(this));

          this._drawerBtn.addEventListener('keydown', this.drawerToggleHandler.bind(this));

          this._drawer.addEventListener('keydown', this.keyboardHandler.bind(this));

          this._mask.addEventListener('click', this.drawerToggleHandler.bind(this));
        }

        this.breakpoint.addListener(this.screenSizeHandler.bind(this));

        return this;
      }
    }, {
      key: 'drawerToggleHandler',
      value: function drawerToggleHandler(evt) {
        var SPACE = KEYCODES.SPACE,
            ENTER = KEYCODES.ENTER;


        if (evt && evt.type === 'keydown') {
          if (evt.keyCode === SPACE || evt.keyCode === ENTER) {
            evt.preventDefault();
          } else {
            return;
          }
        }

        this.toggleDrawer();
      }
    }, {
      key: 'hasActiveDrawer',
      value: function hasActiveDrawer() {
        return this._drawer && this._drawer.classList.contains(this.config.isDrawerActiveClass);
      }
    }, {
      key: 'hasDrawerFixed',
      value: function hasDrawerFixed() {
        return this._drawer && this._element.classList.contains('Layout--drawerFixed');
      }
    }, {
      key: 'keyboardHandler',
      value: function keyboardHandler(evt) {
        if (evt.keyCode === KEYCODES.ESCAPE && this.hasActiveDrawer()) {
          this.toggleDrawer();
        }
      }
    }, {
      key: 'screenSizeHandler',
      value: function screenSizeHandler() {
        if (this.breakpoint.matches && this._drawer) {
          this._drawer.setAttribute('aria-hidden', (!this.hasDrawerFixed()).toString());
          this._drawerBtn.setAttribute('aria-expanded', 'false');

          this._drawer.classList.remove(this.config.isDrawerActiveClass);
          this._mask.classList.remove(this.config.isDrawerActiveClass);
        } else if (this.hasDrawerFixed()) {
          this._drawer.setAttribute('aria-hidden', 'true');
        }
      }
    }, {
      key: 'toggleDrawer',
      value: function toggleDrawer() {
        this._drawer.classList.toggle(this.config.isDrawerActiveClass);
        this._mask.classList.toggle(this.config.isDrawerActiveClass);

        // Set aria attributes
        if (this.hasActiveDrawer()) {
          this._drawer.setAttribute('aria-hidden', 'false');
          this._drawerBtn.setAttribute('aria-expanded', 'true');
        } else {
          this._drawer.setAttribute('aria-hidden', 'true');
          this._drawerBtn.setAttribute('aria-expanded', 'false');
        }
      }
    }, {
      key: 'wrapLayout',
      value: function wrapLayout() {
        var container = document.createElement('div');
        container.classList.add('layout-absoluteViewport');

        // Capter any focused element.
        var focusedElement = document.querySelector(':focus');

        this._element.parentNode.insertBefore(container, this._element);
        this._element.parentNode.removeChild(this._element);
        container.appendChild(this._element);

        if (focusedElement) {
          focusedElement.focus();
        }

        return this;
      }
    }]);

    return Layout;
  }();

  Layout.prototype.defaults = {
    headerClass: 'Layout-header',
    drawerClass: 'Layout-drawer',
    drawerBtnClass: 'Layout-header-menu',
    mainClass: 'Layout-main',
    maskClass: 'Layout-mask',
    isDrawerActiveClass: 'is-active',
    breakpoint: '(min-width: 992px)'
  };

  function cacheChildren() {
    var config = this.config;

    var directChildren = this._element.childNodes;
    var numChildren = directChildren.length;

    for (var i = 0; i < numChildren; i++) {
      var child = directChildren[i];

      if (child.classList && child.classList.contains(config.headerClass)) {
        this._header = child;
      }

      if (child.classList && child.classList.contains(config.drawerClass)) {
        this._drawer = child;
      }

      if (child.classList && child.classList.contains(config.mainClass)) {
        this._main = child;
      }
    }

    return this;
  }

  function drawerSetup() {
    this._drawerBtn = this._element.querySelector('.' + this.config.drawerBtnClass);

    // Ensure proper attributes are set.
    this._drawer.setAttribute('aria-hidden', 'true');
    this._drawerBtn.setAttribute('aria-expanded', 'false');
    this._drawerBtn.setAttribute('tabindex', '0');
    this._drawerBtn.setAttribute('type', 'button');

    // If not button add proper aria attr.
    if (this._drawerBtn.tagName.toLowerCase() !== 'button') {
      this._drawerBtn.setAttribute('role', 'button');
    }

    createLayoutMask.call(this);

    return this;
  }

  function createLayoutMask() {
    this._mask = document.createElement('div');
    this._mask.classList.add(this.config.maskClass);

    this._element.appendChild(this._mask);

    return this;
  }

  return Layout;
}();

exports.default = layout;

/***/ })
/******/ ]);
//# sourceMappingURL=layout.js.map