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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Editor component
 */

var editor = function () {
  var cssInterface = {
    CONTROL: 'Editor-control',
    LABEL: 'Editor-label',
    ICON: 'Editor-icon',
    HAS_ICON: 'has-icon',
    HAS_PLACEHOLDER: 'has-placeholder',
    IS_DIRTY: 'is-dirty',
    IS_DISABLED: 'is-disabled',
    IS_FOCUSED: 'is-focused',
    IS_INVALID: 'is-invalid',
    IS_READONLY: 'is-readonly'
  };

  // Public methods

  function disable() {
    this.controlEl.disabled = true;
    return this.refreshState();
  }

  function enable() {
    this.controlEl.disabled = false;
    return this.refreshState();
  }

  function init(element) {
    // Create a new object with api on __proto__.
    var editor = Object.create(api);

    if (!!(element && element.nodeType !== 1)) {
      throw new TypeError('Element passed in is not a HTML node.');
    }

    editor.editorEl = element;
    editor.controlEl = editor.editorEl.querySelector('.' + cssInterface.CONTROL);
    editor.iconEl = editor.editorEl.querySelector('.' + cssInterface.ICON);
    editor.labelEl = editor.editorEl.querySelector('.' + cssInterface.LABEL);

    bindings.call(editor);
    setContextClasses.call(editor);

    editor.refreshState();

    if (editor.controlEl.hasAttribute('autofocus')) {
      editor.editorEl.focus();
      checkFocusState.call(editor);
    }

    return editor;
  }

  function destroy() {
    this.controlEl.removeEventListener('blur', blurHandler.bind(this));
    this.controlEl.removeEventListener('focus', focusHandler.bind(this));
    this.controlEl.removeEventListener('input', inputHandler.bind(this));
    this.controlEl.removeEventListener('reset', resetHandler.bind(this));
  }

  function refreshState() {
    checkDirtyState.call(this);
    checkDisabledState.call(this);
    checkFocusState.call(this);
    checkReadonlyState.call(this);
    checkValidState.call(this);

    return this;
  }

  // Private

  function bindings() {
    this.controlEl.addEventListener('blur', blurHandler.bind(this));
    this.controlEl.addEventListener('focus', focusHandler.bind(this));
    this.controlEl.addEventListener('input', inputHandler.bind(this));
    this.controlEl.addEventListener('reset', resetHandler.bind(this));
  }

  function checkDisabledState() {
    var isDisabled = this.controlEl.hasAttribute('disabled');
    var method = isDisabled ? 'add' : 'remove';

    this.editorEl.classList[method](cssInterface.IS_DISABLED);
  }

  function checkFocusState() {
    var isFocused = !!this.editorEl.querySelector(':focus');
    var method = isFocused ? 'add' : 'remove';

    this.editorEl.classList[method](cssInterface.IS_FOCUSED);
  }

  function checkDirtyState() {
    var isDirty = this.controlEl.value && this.controlEl.value.length > 0;
    var method = isDirty ? 'add' : 'remove';

    this.editorEl.classList[method](cssInterface.IS_DIRTY);
  }

  function checkReadonlyState() {
    var isReadonly = this.controlEl.hasAttribute('readonly');
    var method = isReadonly ? 'add' : 'remove';

    this.editorEl.classList[method](cssInterface.IS_READONLY);
  }

  function checkValidState() {
    if (this.controlEl.validity) {
      var isValid = this.controlEl.validity.valid;
      var method = isValid ? 'remove' : 'add';

      this.editorEl.classList[method](cssInterface.IS_INVALID);
    }
  }

  function setContextClasses() {
    if (this.controlEl) {
      if (this.controlEl.hasAttribute('placeholder')) {
        this.editorEl.classList.add(cssInterface.HAS_PLACEHOLDER);
      }
    }
  }

  // Handlers

  function blurHandler() {
    this.editorEl.classList.remove(cssInterface.IS_FOCUSED);
  }

  function focusHandler() {
    this.editorEl.classList.add(cssInterface.IS_FOCUSED);
  }

  function inputHandler() {
    this.refreshState();
  }

  function resetHandler() {
    this.refreshState();
  }

  var api = {
    disable: disable,
    enable: enable,
    refreshState: refreshState,
    destroy: destroy
  };

  return init;
}();

exports.default = editor;

/***/ })
/******/ ]);
//# sourceMappingURL=editor.js.map