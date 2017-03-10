/**
 * Layout.js
 */

const layout = (() => {
  'use strict';

  const KEYCODES = {
    ENTER: 13,
    ESCAPE: 27,
    SPACE: 32
  };

  class Layout {
    constructor(element, options = {}) {
      this._element = element;
      this.config = Object.assign({}, this.defaults, options);

      this.init();
    }

    init() {
      cacheChildren.call(this);

      if (this._drawer) {
        drawerSetup.call(this);
      }

      this.breakpoint =
        window.matchMedia((this.config.breakpoint));

      this.screenSizeHandler();

      this.bindings();
    }

    bindings() {
      if (this._drawer) {
        this._drawerBtn
          .addEventListener('click', this.drawerToggleHandler.bind(this));

        this._drawerBtn
          .addEventListener('keydown', this.drawerToggleHandler.bind(this));

        this._drawer
          .addEventListener('keydown', this.keyboardHandler.bind(this));

        this._mask.addEventListener('click',
            this.drawerToggleHandler.bind(this));
      }

      this.breakpoint.addListener(this.screenSizeHandler.bind(this));

      return this;
    }

    drawerToggleHandler(evt) {
      const { SPACE, ENTER } = KEYCODES;

      if (evt && (evt.type === 'keydown')) {
        if (evt.keyCode === SPACE || evt.keyCode === ENTER) {
          evt.preventDefault();
        }
        else {
          return;
        }
      }

      this.toggleDrawer();
    }

    hasActiveDrawer() {
      return this._drawer
        && this._drawer.classList.contains(this.config.isDrawerActiveClass);
    }

    hasDrawerFixed() {
      return this._drawer
        && this._element.classList.contains('Layout--drawerFixed');
    }

    keyboardHandler(evt) {
      if (evt.keyCode === KEYCODES.ESCAPE
          && this.hasActiveDrawer()) {
        this.toggleDrawer();
      }
    }

    screenSizeHandler() {
      if (this.breakpoint.matches && this._drawer) {
        if (this.hasDrawerFixed()) {
          this._drawer.setAttribute('aria-hidden', 'false');
          this._drawerBtn.setAttribute('aria-expanded', 'false');
        }

        this._drawer.classList.remove(this.config.isDrawerActiveClass);
        this._mask.classList.remove(this.config.isDrawerActiveClass);
      }
      else if (this.hasDrawerFixed()) {
        this._drawer.setAttribute('aria-hidden', 'true');
      }
    }

    toggleDrawer() {
      this._drawer.classList.toggle(this.config.isDrawerActiveClass);
      this._mask.classList.toggle(this.config.isDrawerActiveClass);

      // Set aria attributes
      if (this.hasActiveDrawer()) {
        this._drawer.setAttribute('aria-hidden', 'false');
        this._drawerBtn.setAttribute('aria-expanded', 'true');
      }
      else {
        this._drawer.setAttribute('aria-hidden', 'true');
        this._drawerBtn.setAttribute('aria-expanded', 'false');
      }
    }
  }

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
    const { config } = this;
    const directChildren = this._element.childNodes;
    const numChildren = directChildren.length;

    for (let i = 0; i < numChildren; i++) {
      let child = directChildren[i];

      if (child.classList
          && child.classList.contains(config.headerClass)) {
        this._header = child;
      }

      if (child.classList
          && child.classList.contains(config.drawerClass)) {
        this._drawer = child;
      }

      if (child.classList
          && child.classList.contains(config.mainClass)) {
        this._main = child;
      }
    }

    return this;
  }

  function drawerSetup() {
    // NOTE: should create this dynamically.
    this._drawerBtn =
          this._element.querySelector(`.${this.config.drawerBtnClass}`);
    this._drawerBtn.setAttribute('aria-expanded', 'false');
    this._drawerBtn.setAttribute('role', 'button');
    this._drawerBtn.setAttribute('tabindex', '0');

    this._drawer.setAttribute('aria-hidden', 'true');

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
})();

export default layout;
