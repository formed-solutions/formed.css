
function atoa(a) {
  return Array.prototype.slice.call(a);
}

const menu = (() => {
  'use strict';

  const TRANSITION_DURATION_SECOND = 0.3;
  const TRANSITION_DURATION_FRACTION = 0.8;

  const keycodes = {
    ENTER: 13,
    ESCAPE: 27,
    SPACE: 32,
    UP_ARROW: 38,
    DOWN_ARROW: 40
  };

  const classNames = {
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
    [
      classNames.AUTO,
      classNames.BOTTOM_LEFT,
      classNames.BOTTOM_RIGHT,
      classNames.TOP_LEFT,
      classNames.TOP_RIGHT
    ].forEach(modifier => {
        if (menu.element.classList.contains(modifier)) {
          menu.shadow.classList.add(modifier);
        }
      });
  }

  function setTrigger(triggerId, menu) {
    const trigger = document.getElementById(triggerId);

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
    return atoa(menu.element.querySelectorAll(`.${classNames.ITEM}`));
  }

  function transitionEndListeners() {
    const { element } = this;

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

    const rect = this.trigger.getBoundingClientRect();
    const parentRect = this.trigger.parentElement.getBoundingClientRect();

    if (this.element.classList.contains(classNames.BOTTOM_RIGHT)) {
      this.wrapper.style.right = `${(parentRect.right - rect.right)}px`;
      this.wrapper.style.top =
        `${(this.trigger.offsetTop + this.trigger.offsetHeight)}px`;
    }
    else if (this.element.classList.contains(classNames.TOP_LEFT)) {
      this.wrapper.style.left = `${this.trigger.offsetLeft}px`;
      this.wrapper.style.bottom = `${(parentRect.bottom - rect.top)}px`;
    }
    else if (this.element.classList.contains(classNames.TOP_RIGHT)) {
      this.wrapper.style.right = `${(parentRect.right - rect.right)}px`;
      this.wrapper.style.bottom = `${(parentRect.bottom - rect.top)}px`;
    }
    else {
      this.wrapper.style.left = `${this.trigger.offsetLeft}px`;
      this.wrapper.style.top =
        `${this.trigger.offsetTop + this.trigger.offsetHeight}px`;
    }

    this.toggle(evt);
  }

  /**
   * Captures keyboard events on the trigger.
   */

  function onTriggerKeyboardEvent(evt) {
    const items =
      this.element.querySelectorAll(`.${classNames.ITEM}:not([disabled])`);

    const isActive = this.wrapper.classList.contains(classNames.IS_ACTIVE);

    if (items && items.length && isActive && evt.which) {
      evt.preventDefault();

      if (evt.keyCode === keycodes.UP_ARROW) {
        items[items.length - 1].focus();
      }
      else if (evt.keyCode === keycodes.DOWN_ARROW) {
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
    }
    else {
      this.hide();
    }
  }

  /**
   * Capture keyboard event on a menu item.
   */

  function onItemKeyboardEvent(evt) {
    const selector = `.${classNames.ITEM}:not([disabled])`;
    const items = this.element.querySelectorAll(selector);
    const isActive = this.wrapper.classList.contains(classNames.IS_ACTIVE);

    if (items && items.length && isActive) {
      const currentIdx = Array.prototype.slice.call(items).indexOf(evt.target);

      if (evt.which) evt.preventDefault();

      if (evt.keyCode === keycodes.UP_ARROW) {
        currentIdx > 0
          ? items[currentIdx - 1].focus()
          : items[items.length - 1].focus();
      }
      else if (evt.keyCode === keycodes.DOWN_ARROW) {
        items.length > currentIdx + 1
          ? items[currentIdx + 1].focus()
          : items[0].focus();
      }
      else if (evt.keyCode === keycodes.ESCAPE) {
        this.hide();
      }
    }
  }

  // Public api.

  function destroy() {
    // Remove evnets on menu items.
    getItems(this).forEach(item => {
      item.removeEventListener('click', this._onItemClick);
      item.removeEventListener('keydown', this._onItemKeyboardEvent);
    });

    // Remove events on trigger if it exists.
    if (this.trigger) {
      this.trigger.removeEventListener('click', this._onTriggerClick);
      this.trigger.removeEventListener('keydown', this.onTriggerKeyboardEvent);
    }

    return this;
  }

  function hide() {
    getItems(this).forEach(item => {
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
    const { height, width } = this.element.getBoundingClientRect();

    this.wrapper.style.width = `${width}px`;
    this.wrapper.style.height = `${height}px`;
    this.shadow.style.width = `${width}px`;
    this.shadow.style.height = `${height}px`;

    const transitionDuration =
      TRANSITION_DURATION_SECOND * TRANSITION_DURATION_FRACTION;

    getItems(this).forEach(item => {
      let itemDelay = null;

      if (this.element.classList.contains(classNames.TOP_LEFT) ||
          this.element.classList.contains(classNames.TOP_RIGHT)) {
        itemDelay = `${((height - item.offsetTop - item.offsetHeight) /
            height * transitionDuration)}s`;
      }
      else {
        itemDelay = `${(item.offsetTop / height * transitionDuration)}s`;
      }

      item.style.transitionDelay = itemDelay;
    });

    const frameCb = () => {
      this.element.classList.add(classNames.IS_ANIMATING);
      this.wrapper.classList.add(classNames.IS_ACTIVE);
      this.trigger.setAttribute('aria-expanded', true);
      window.cancelAnimationFrame(frameCb);
    };

    window.requestAnimationFrame(frameCb);

    transitionEndListeners.call(this);

    const cb = e => {
      if (e !== evt && e.target.parentNode !== this.element) {
        document.removeEventListener('click', cb);
        this.hide();
      }
    }

    document.addEventListener('click', cb);
  }

  function toggle(evt) {
    this.wrapper.classList.contains(classNames.IS_ACTIVE)
      ? this.hide()
      : this.show(evt);
  }

  function create(element) {
    if (!!(element && element.nodeType !== 1)) {
      throw new TypeError('Element passed in is not a HTML node.');
    }

    const menu = Object.create(api);
    menu.element = element;

    buildDOM(menu);

    // Get the trigger.
    const triggerId = menu.element.dataset.trigger;

    triggerId && setTrigger(triggerId, menu);

    // Bind event handlers and set to menu.
    menu._onItemClick = onItemClick.bind(menu);
    menu._onItemKeyboardEvent = onItemKeyboardEvent.bind(menu);

    getItems(menu).forEach(item => {
      item.tabIndex = '-1';
      item.addEventListener('click', menu._onItemClick);
      item.addEventListener('keydown', menu._onItemKeyboardEvent);
    });

    cloneClasses(menu);

    return menu;
  }

  const api = {
    destroy,
    hide,
    show,
    toggle
  };

  return create
})();

export default menu;
