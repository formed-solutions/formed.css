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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Radio component
 */

var radio = function () {
  var classNames = {
    RADIO: 'Radio',
    CONTROL: 'Radio-control',
    CIRCLE: 'Radio-circle',
    LABEL: 'Radio-label',
    IS_CHECKED: 'is-checked',
    IS_CUSTOM: 'is-custom',
    IS_DISABLED: 'is-disabled',
    IS_FOCUSED: 'is-focused',
    IS_PRESSED: 'is-pressed'
  };

  function _onBlur(evt) {
    this.element.classList.remove(classNames.IS_FOCUSED);
  }

  function _onChange() {
    this.radioSet.forEach(function (radio) {
      var update = new Event('radio:update');

      radio.dispatchEvent(update);
    });
  }

  function _onFocus(evt) {
    this.element.classList.add(classNames.IS_FOCUSED);
  }

  function _onMousedown() {
    this.element.classList.add(classNames.IS_PRESSED);
  }

  function _onMouseup() {
    this.element.classList.remove(classNames.IS_PRESSED);
  }

  function _bindings(radio) {
    radio.control.addEventListener('blur', _onBlur.bind(radio));
    radio.control.addEventListener('change', _onChange.bind(radio));
    radio.control.addEventListener('focus', _onFocus.bind(radio));
    radio.element.addEventListener('radio:update', _updateState.bind(radio));
    radio.element.addEventListener('mousedown', _onMousedown.bind(radio));
    radio.element.addEventListener('mouseup', _onMouseup.bind(radio));
  }

  function _checkDisabledState() {
    var METHOD = this.control.disabled ? 'add' : 'remove';

    this.element.classList[METHOD](classNames.IS_DISABLED);
  }

  function _checkCheckedState() {
    var METHOD = this.control.checked ? 'add' : 'remove';

    this.element.classList[METHOD](classNames.IS_CHECKED);
  }

  function _createCircle(element, control) {
    element.classList.add(classNames.IS_CUSTOM);

    var circle = document.createElement('span');
    circle.classList.add(classNames.CIRCLE);

    element.insertBefore(circle, control.nextSibling);

    return circle;
  }

  function _updateState() {
    _checkDisabledState.call(this);
    _checkCheckedState.call(this);
  }

  function check() {
    this.control.checked = true;
    _updateState();
  }

  function uncheck() {
    this.control.checked = false;
    _updateState();
  }

  function disable() {
    this.control.disabled = true;
    _updateState();
  }

  function enable() {
    this.control.disabled = false;
    _updateState();
  }

  function create(element) {
    if (!!(element && element.nodeType !== 1)) {
      throw new TypeError('Element passed in is not a HTML node.');
    }

    // Create a new object with api on __proto__.
    var radio = Object.create(api);

    radio.element = element;
    radio.control = element.querySelector('.' + classNames.CONTROL);
    radio.label = element.querySelector('.' + classNames.LABEL);
    radio.circle = _createCircle(radio.element, radio.control);

    // Group all other silbing radio buttons.
    radio.radioSet = Array.from(element.parentNode.getElementsByClassName(classNames.RADIO));

    _bindings(radio);

    _updateState.call(radio);

    return radio;
  }

  var api = {
    check: check,
    uncheck: uncheck,
    disable: disable,
    enable: enable
  };

  return create;
}();

exports.default = radio;

/***/ })

/******/ });
//# sourceMappingURL=radio.js.map