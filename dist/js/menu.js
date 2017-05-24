(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["formed-menu"] = factory();
	else
		root["formed-menu"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 55);
/******/ })
/************************************************************************/
/******/ ({

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function atoa(a) {
  return Array.prototype.slice.call(a);
}

var menu = function () {
  'use strict';

  var TRANSITION_DURATION_SECOND = 0.3;
  var TRANSITION_DURATION_FRACTION = 0.8;

  var keycodes = {
    ENTER: 13,
    ESCAPE: 27,
    SPACE: 32,
    UP_ARROW: 38,
    DOWN_ARROW: 40
  };

  var classNames = {
    WRAPPER: '_MenuWrapper',
    SHADOW: '_MenuShadow',
    ITEM: 'Menu-item',
    // State
    IS_ACTIVE: 'is-active',
    IS_ANIMATING: 'is-animating',
    // Alignment modifiers
    BOTTOM_LEFT: 'Menu--bottomLeft',
    BOTTOM_RIGHT: 'Menu--bottomRight',
    TOP_LEFT: 'Menu--topLeft',
    TOP_RIGHT: 'Menu--topRight',
    AUTO: 'Menu--auto'
  };

  // Private

  function buildDOM(menu) {
    // Create the wrapper.
    menu.wrapper = document.createElement('div');
    menu.wrapper.classList.add(classNames.WRAPPER);
    menu.element.parentElement.insertBefore(menu.wrapper, menu.element);
    menu.element.parentElement.removeChild(menu.element);
    menu.wrapper.appendChild(menu.element);

    // Create the shadow element.
    menu.shadow = document.createElement('div');
    menu.shadow.classList.add(classNames.SHADOW);
    menu.wrapper.insertBefore(menu.shadow, menu.element);
  }

  function cloneClasses(menu) {
    [classNames.AUTO, classNames.BOTTOM_LEFT, classNames.BOTTOM_RIGHT, classNames.TOP_LEFT, classNames.TOP_RIGHT].forEach(function (modifier) {
      if (menu.element.classList.contains(modifier)) {
        menu.shadow.classList.add(modifier);
      }
    });
  }

  function setTrigger(triggerId, menu) {
    var trigger = document.getElementById(triggerId);

    if (trigger) {
      // Set aria on trigger and menu.
      trigger.setAttribute('aria-haspopup', true);
      trigger.setAttribute('aria-expanded', false);
      menu.wrapper.setAttribute('aria-labelledby', triggerId);

      // Bind events and set to menu object.
      menu._onTriggerClick = onTriggerClick.bind(menu);
      menu._onTriggerKeyboardEvent = onTriggerKeyboardEvent.bind(menu);

      trigger.addEventListener('click', menu._onTriggerClick);
      trigger.addEventListener('keydown', menu._onTriggerKeyboardEvent);

      menu.trigger = trigger;
    }
  }

  function getItems(menu) {
    return atoa(menu.element.querySelectorAll('.' + classNames.ITEM));
  }

  function transitionEndListeners() {
    var element = this.element;


    function removeTransitionState(evt) {
      evt.target.classList.remove(classNames.IS_ANIMATING);
    }

    element.addEventListener('transitionend', removeTransitionState);
    element.addEventListener('webkitTransitionend', removeTransitionState);
  }

  /**
   * Captures the trigger click, will position and toggle menu.
   */

  function onTriggerClick(evt) {
    if (!this.trigger) return;

    var rect = this.trigger.getBoundingClientRect();
    var parentRect = this.trigger.parentElement.getBoundingClientRect();

    if (this.element.classList.contains(classNames.BOTTOM_RIGHT)) {
      this.wrapper.style.right = parentRect.right - rect.right + 'px';
      this.wrapper.style.top = this.trigger.offsetTop + this.trigger.offsetHeight + 'px';
    } else if (this.element.classList.contains(classNames.TOP_LEFT)) {
      this.wrapper.style.left = this.trigger.offsetLeft + 'px';
      this.wrapper.style.bottom = parentRect.bottom - rect.top + 'px';
    } else if (this.element.classList.contains(classNames.TOP_RIGHT)) {
      this.wrapper.style.right = parentRect.right - rect.right + 'px';
      this.wrapper.style.bottom = parentRect.bottom - rect.top + 'px';
    } else {
      this.wrapper.style.left = this.trigger.offsetLeft + 'px';
      this.wrapper.style.top = this.trigger.offsetTop + this.trigger.offsetHeight + 'px';
    }

    this.toggle(evt);
  }

  /**
   * Captures keyboard events on the trigger.
   */

  function onTriggerKeyboardEvent(evt) {
    var items = this.element.querySelectorAll('.' + classNames.ITEM + ':not([disabled])');

    var isActive = this.wrapper.classList.contains(classNames.IS_ACTIVE);

    if (items && items.length && isActive && evt.which) {
      evt.preventDefault();

      if (evt.keyCode === keycodes.UP_ARROW) {
        items[items.length - 1].focus();
      } else if (evt.keyCode === keycodes.DOWN_ARROW) {
        items[0].focus();
      }
    }
  }

  /**
   * Capture clicks on a menu item.
   */

  function onItemClick(evt) {
    if (evt.target.hasAttribute('disabled')) {
      evt.stopPropagation();
    } else {
      this.hide();
    }
  }

  /**
   * Capture keyboard event on a menu item.
   */

  function onItemKeyboardEvent(evt) {
    var selector = '.' + classNames.ITEM + ':not([disabled])';
    var items = this.element.querySelectorAll(selector);
    var isActive = this.wrapper.classList.contains(classNames.IS_ACTIVE);

    if (items && items.length && isActive) {
      var currentIdx = Array.prototype.slice.call(items).indexOf(evt.target);

      if (evt.which) evt.preventDefault();

      if (evt.keyCode === keycodes.UP_ARROW) {
        currentIdx > 0 ? items[currentIdx - 1].focus() : items[items.length - 1].focus();
      } else if (evt.keyCode === keycodes.DOWN_ARROW) {
        items.length > currentIdx + 1 ? items[currentIdx + 1].focus() : items[0].focus();
      } else if (evt.keyCode === keycodes.ESCAPE) {
        this.hide();
      }
    }
  }

  // Public api.

  function destroy() {
    var _this = this;

    // Remove evnets on menu items.
    getItems(this).forEach(function (item) {
      item.removeEventListener('click', _this._onItemClick);
      item.removeEventListener('keydown', _this._onItemKeyboardEvent);
    });

    // Remove events on trigger if it exists.
    if (this.trigger) {
      this.trigger.removeEventListener('click', this._onTriggerClick);
      this.trigger.removeEventListener('keydown', this.onTriggerKeyboardEvent);
    }

    return this;
  }

  function hide() {
    getItems(this).forEach(function (item) {
      item.style.removeProperty('transition-delay');
    });

    this.element.classList.add(classNames.IS_ANIMATING);
    this.wrapper.classList.remove(classNames.IS_ACTIVE);

    if (this.trigger) {
      this.trigger.setAttribute('aria-expanded', false);
    }

    transitionEndListeners.call(this);
  }

  function show(evt) {
    var _this2 = this;

    var _element$getBoundingC = this.element.getBoundingClientRect(),
        height = _element$getBoundingC.height,
        width = _element$getBoundingC.width;

    this.wrapper.style.width = width + 'px';
    this.wrapper.style.height = height + 'px';
    this.shadow.style.width = width + 'px';
    this.shadow.style.height = height + 'px';

    var transitionDuration = TRANSITION_DURATION_SECOND * TRANSITION_DURATION_FRACTION;

    getItems(this).forEach(function (item) {
      var itemDelay = null;

      if (_this2.element.classList.contains(classNames.TOP_LEFT) || _this2.element.classList.contains(classNames.TOP_RIGHT)) {
        itemDelay = (height - item.offsetTop - item.offsetHeight) / height * transitionDuration + 's';
      } else {
        itemDelay = item.offsetTop / height * transitionDuration + 's';
      }

      item.style.transitionDelay = itemDelay;
    });

    var frameCb = function frameCb() {
      _this2.element.classList.add(classNames.IS_ANIMATING);
      _this2.wrapper.classList.add(classNames.IS_ACTIVE);
      _this2.trigger.setAttribute('aria-expanded', true);
      window.cancelAnimationFrame(frameCb);
    };

    window.requestAnimationFrame(frameCb);

    transitionEndListeners.call(this);

    var cb = function cb(e) {
      if (e !== evt && e.target.parentNode !== _this2.element) {
        document.removeEventListener('click', cb);
        _this2.hide();
      }
    };

    document.addEventListener('click', cb);
  }

  function toggle(evt) {
    this.wrapper.classList.contains(classNames.IS_ACTIVE) ? this.hide() : this.show(evt);
  }

  function create(element) {
    if (!!(element && element.nodeType !== 1)) {
      throw new TypeError('Element passed in is not a HTML node.');
    }

    var menu = Object.create(api);
    menu.element = element;

    buildDOM(menu);

    // Get the trigger.
    var triggerId = menu.element.dataset.trigger;

    triggerId && setTrigger(triggerId, menu);

    // Bind event handlers and set to menu.
    menu._onItemClick = onItemClick.bind(menu);
    menu._onItemKeyboardEvent = onItemKeyboardEvent.bind(menu);

    getItems(menu).forEach(function (item) {
      item.tabIndex = '-1';
      item.addEventListener('click', menu._onItemClick);
      item.addEventListener('keydown', menu._onItemKeyboardEvent);
    });

    cloneClasses(menu);

    return menu;
  }

  var api = {
    destroy: destroy,
    hide: hide,
    show: show,
    toggle: toggle
  };

  return create;
}();

exports.default = menu;

/***/ })

/******/ });
});
//# sourceMappingURL=menu.js.map