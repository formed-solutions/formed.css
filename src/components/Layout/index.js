/**
 * Create a Formed layout.
 */

import _assign from 'lodash/assign';

const layout = (() => {
  'use strict';

  const defaults = {
    parent: null
  };

  const cssInterface = {
    headerClass: 'Layout-header',
    drawerClass: 'Layout-drawer',
    drawerBtnClass: 'Layout-header-menu',
    mainClass: 'Layout-main',
    maskClass: 'Layout-mask',
    isDrawerActiveClass: 'is-active',
    breakpoint: '(min-width: 992px)'
  };

  const KEYCODES = {
    ENTER: 13,
    ESCAPE: 27,
    SPACE: 32
  };

  function hasActiveDrawer() {
    return this.drawer
      && this.drawer.classList.contains(cssInterface.isDrawerActiveClass);
  }

  function hasDrawerFixed() {
    return this.drawer
      && this.element.classList.contains('Layout--drawerFixed');
  }

  function destroy() {
    killEvents.call(this);
  }

  function refresh() {
    killEvents.call(this);
    cacheChildren.call(this);

    if (this.drawer) {
      drawerSetup.call(this);
    }

    this.screenSizeHandler();

    events.call(this);

    return this;
  }

  function toggleDrawer() {
    this.drawer.classList.toggle(cssInterface.isDrawerActiveClass);
    this.mask.classList.toggle(cssInterface.isDrawerActiveClass);

    // Set aria attributes
    if (this.hasActiveDrawer()) {
      this.drawer.setAttribute('aria-hidden', 'false');
      this.drawerBtn.setAttribute('aria-expanded', 'true');
    }
    else {
      this.drawer.setAttribute('aria-hidden', 'true');
      this.drawerBtn.setAttribute('aria-expanded', 'false');
    }

    return this;
  }

  // Create a new layout, returning new object with the api attached to its
  // proto.

  function create(element, options = {}) {
    const layout = Object.create(api);

    layout.config = _assign({}, defaults, options);
    layout.element = element;

    layout.drawerToggleHandler = drawerToggleHandler.bind(layout);
    layout.keyboardHandler = keyboardHandler.bind(layout);
    layout.screenSizeHandler = screenSizeHandler.bind(layout);

    wrapLayout.call(layout);
    cacheChildren.call(layout);

    if (layout.drawer) {
      drawerSetup.call(layout);
    }

    layout.breakpoint = window.matchMedia((cssInterface.breakpoint));

    layout.screenSizeHandler();
    events.call(layout);

    return layout;
  }

  // Private functions

  // Handlers

  function drawerToggleHandler(evt) {
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

  function keyboardHandler(evt) {
    if (evt.keyCode === KEYCODES.ESCAPE
        && this.hasActiveDrawer()) {
      this.toggleDrawer();
    }
  }

  function screenSizeHandler() {
    if (this.breakpoint.matches && this.drawer) {
      this.drawer
        .setAttribute('aria-hidden', (!this.hasDrawerFixed()).toString());
      this.drawerBtn.setAttribute('aria-expanded', 'false');

      this.drawer.classList.remove(cssInterface.isDrawerActiveClass);
      this.mask.classList.remove(cssInterface.isDrawerActiveClass);
    }
    else if (this.hasDrawerFixed()) {
      this.drawer.setAttribute('aria-hidden', 'true');
    }
  }

  // Helpers

  function events() {
    if (this.drawer) {
      this.drawerBtn
        .addEventListener('click', this.drawerToggleHandler);

      this.drawerBtn
        .addEventListener('keydown', this.drawerToggleHandler);

      this.drawer
        .addEventListener('keydown', this.keyboardHandler);

      this.mask
        .addEventListener('click', this.drawerToggleHandler);
    }

    this.breakpoint.addListener(this.screenSizeHandler);

    return this;
  }

  function killEvents() {
    if (this.drawer) {
      this.drawerBtn
        .removeEventListener('click', this.drawerToggleHandler);

      this.drawerBtn
        .removeEventListener('keydown', this.drawerToggleHandler);

      this.drawer
        .removeEventListener('keydown', this.keyboardHandler);

      this.mask
        .removeEventListener('click', this.drawerToggleHandler);
    }

    this.breakpoint.removeListener(screenSizeHandler);
  }

  function wrapLayout() {
    const container = !this.config.parent
      ? document.createElement('div')
      : document.querySelector(this.config.parent);

    container.classList.add('layout-absoluteViewport');

    // Capter any focused element.
    const focusedElement = document.querySelector(':focus');

    if (!this.config.parent) {
      this.element.parentNode.insertBefore(container, this.element);
      this.element.parentNode.removeChild(this.element);
      container.appendChild(this.element);
    }

    if (focusedElement) {
      focusedElement.focus();
    }

    return this;
  }

  function cacheChildren() {
    const directChildren = this.element.childNodes;
    const numChildren = directChildren.length;

    for (let i = 0; i < numChildren; i++) {
      let child = directChildren[i];

      if (child.classList
          && child.classList.contains(cssInterface.headerClass)) {
        this.header = child;
      }

      if (child.classList
          && child.classList.contains(cssInterface.drawerClass)) {
        this.drawer = child;
      }

      if (child.classList
          && child.classList.contains(cssInterface.mainClass)) {
        this.main = child;
      }
    }

    return this;
  }

  function drawerSetup() {
    this.drawerBtn =
          this.element.querySelector(`.${cssInterface.drawerBtnClass}`);

    if (!this.drawerBtn) {
      throw Error(`No ${cssInterface.drawerBtnClass} detected.`);
    }

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

  const api = {
    destroy,
    hasActiveDrawer,
    hasDrawerFixed,
    toggleDrawer,
    refresh
  };

  return create;
})();

export default layout;
