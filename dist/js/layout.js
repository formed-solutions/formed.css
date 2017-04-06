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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Create a Formed layout.
 */

var layout = function () {
  'use strict';

  var cssInterface = {
    headerClass: 'Layout-header',
    drawerClass: 'Layout-drawer',
    drawerBtnClass: 'Layout-header-menu',
    mainClass: 'Layout-main',
    maskClass: 'Layout-mask',
    isDrawerActiveClass: 'is-active',
    breakpoint: '(min-width: 992px)'
  };

  var KEYCODES = {
    ENTER: 13,
    ESCAPE: 27,
    SPACE: 32
  };

  function hasActiveDrawer() {
    return this.drawer && this.drawer.classList.contains(cssInterface.isDrawerActiveClass);
  }

  function hasDrawerFixed() {
    return this.drawer && this.element.classList.contains('Layout--drawerFixed');
  }

  function toggleDrawer() {
    this.drawer.classList.toggle(cssInterface.isDrawerActiveClass);
    this.mask.classList.toggle(cssInterface.isDrawerActiveClass);

    // Set aria attributes
    if (this.hasActiveDrawer()) {
      this.drawer.setAttribute('aria-hidden', 'false');
      this.drawerBtn.setAttribute('aria-expanded', 'true');
    } else {
      this.drawer.setAttribute('aria-hidden', 'true');
      this.drawerBtn.setAttribute('aria-expanded', 'false');
    }
  }

  // Create a new layout, returning new object with the api attached to its
  // proto.

  function create(element) {
    var layout = Object.create(api);

    layout.element = element;

    wrapLayout.call(layout);
    cacheChildren.call(layout);

    if (layout.drawer) {
      drawerSetup.call(layout);
    }

    layout.breakpoint = window.matchMedia(cssInterface.breakpoint);

    screenSizeHandler.call(layout);
    bindings.call(layout);

    return layout;
  }

  // Private functions

  // Handlers

  function drawerToggleHandler(evt) {
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

  function keyboardHandler(evt) {
    if (evt.keyCode === KEYCODES.ESCAPE && this.hasActiveDrawer()) {
      this.toggleDrawer();
    }
  }

  function screenSizeHandler() {
    if (this.breakpoint.matches && this.drawer) {
      this.drawer.setAttribute('aria-hidden', (!this.hasDrawerFixed()).toString());
      this.drawerBtn.setAttribute('aria-expanded', 'false');

      this.drawer.classList.remove(cssInterface.isDrawerActiveClass);
      this.mask.classList.remove(cssInterface.isDrawerActiveClass);
    } else if (this.hasDrawerFixed()) {
      this.drawer.setAttribute('aria-hidden', 'true');
    }
  }

  // Helpers

  function bindings() {
    if (this.drawer) {
      this.drawerBtn.addEventListener('click', drawerToggleHandler.bind(this));

      this.drawerBtn.addEventListener('keydown', drawerToggleHandler.bind(this));

      this.drawer.addEventListener('keydown', keyboardHandler.bind(this));

      this.mask.addEventListener('click', drawerToggleHandler.bind(this));
    }

    this.breakpoint.addListener(screenSizeHandler.bind(this));

    return this;
  }

  function wrapLayout() {
    var container = document.createElement('div');
    container.classList.add('layout-absoluteViewport');

    // Capter any focused element.
    var focusedElement = document.querySelector(':focus');

    this.element.parentNode.insertBefore(container, this.element);
    this.element.parentNode.removeChild(this.element);
    container.appendChild(this.element);

    if (focusedElement) {
      focusedElement.focus();
    }

    return this;
  }

  function cacheChildren() {
    var directChildren = this.element.childNodes;
    var numChildren = directChildren.length;

    for (var i = 0; i < numChildren; i++) {
      var child = directChildren[i];

      if (child.classList && child.classList.contains(cssInterface.headerClass)) {
        this.header = child;
      }

      if (child.classList && child.classList.contains(cssInterface.drawerClass)) {
        this.drawer = child;
      }

      if (child.classList && child.classList.contains(cssInterface.mainClass)) {
        this.main = child;
      }
    }

    return this;
  }

  function drawerSetup() {
    this.drawerBtn = this.element.querySelector('.' + cssInterface.drawerBtnClass);

    // Ensure proper attributes are set.
    this.drawer.setAttribute('aria-hidden', 'true');
    this.drawerBtn.setAttribute('aria-expanded', 'false');
    this.drawerBtn.setAttribute('tabindex', '0');
    this.drawerBtn.setAttribute('type', 'button');

    // If not button add proper aria attr.
    if (this.drawerBtn.tagName.toLowerCase() !== 'button') {
      this.drawerBtn.setAttribute('role', 'button');
    }

    createLayoutMask.call(this);

    return this;
  }

  function createLayoutMask() {
    this.mask = document.createElement('div');
    this.mask.classList.add(cssInterface.maskClass);

    this.element.appendChild(this.mask);

    return this;
  }

  var api = {
    hasActiveDrawer: hasActiveDrawer,
    hasDrawerFixed: hasDrawerFixed,
    toggleDrawer: toggleDrawer
  };

  return create;
}();

exports.default = layout;

/***/ })

/******/ });
//# sourceMappingURL=layout.js.map