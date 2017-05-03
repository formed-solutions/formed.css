(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["formed-checkbox"] = factory();
	else
		root["formed-checkbox"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 52);
/******/ })
/************************************************************************/
/******/ ({

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Checkbox component
 */

var checkbox = function () {
  var classNames = {
    CHECKBOX: 'Checkbox',
    CONTROL: 'Checkbox-control',
    BOX: 'Checkbox-box',
    LABEL: 'Checkbox-label',
    IS_CHECKED: 'is-checked',
    IS_CUSTOM: 'is-custom',
    IS_DISABLED: 'is-disabled',
    IS_FOCUSED: 'is-focused'
  };

  function _onBlur(evt) {
    this.element.classList.remove(classNames.IS_FOCUSED);
  }

  function _onChange() {
    _updateState.call(this);
  }

  function _onFocus(evt) {
    this.element.classList.add(classNames.IS_FOCUSED);
  }

  function _bindings(checkbox) {
    checkbox.control.addEventListener('blur', _onBlur.bind(checkbox));
    checkbox.control.addEventListener('change', _onChange.bind(checkbox));
    checkbox.control.addEventListener('focus', _onFocus.bind(checkbox));
  }

  function _checkDisabledState() {
    var METHOD = this.control.disabled ? 'add' : 'remove';

    this.element.classList[METHOD](classNames.IS_DISABLED);
  }

  function _checkCheckedState() {
    var METHOD = this.control.checked ? 'add' : 'remove';

    this.element.classList[METHOD](classNames.IS_CHECKED);
  }

  function _createBox(element, control) {
    element.classList.add(classNames.IS_CUSTOM);

    var box = document.createElement('span');
    box.classList.add(classNames.BOX);

    element.insertBefore(box, control.nextSibling);

    return box;
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
    var checkbox = Object.create(api);

    checkbox.element = element;
    checkbox.control = element.querySelector('.' + classNames.CONTROL);
    checkbox.label = element.querySelector('.' + classNames.LABEL);
    checkbox.box = _createBox(checkbox.element, checkbox.control);

    _bindings(checkbox);

    _updateState.call(checkbox);

    return checkbox;
  }

  var api = {
    check: check,
    uncheck: uncheck,
    disable: disable,
    enable: enable
  };

  return create;
}();

exports.default = checkbox;

/***/ })

/******/ });
});
//# sourceMappingURL=checkbox.js.map