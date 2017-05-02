/**
 * Create a Formed layout.
 */

const layout = (() => {
  'use strict';

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
  }

  // Create a new layout, returning new object with the api attached to its
  // proto.

  function create(element) {
    const layout = Object.create(api);

    layout.element = element;

    wrapLayout.call(layout);
    cacheChildren.call(layout);

    if (layout.drawer) {
      drawerSetup.call(layout);
    }

    layout.breakpoint =
      window.matchMedia((cssInterface.breakpoint));

    screenSizeHandler.call(layout);
    bindings.call(layout);

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

  function bindings() {
    if (this.drawer) {
      this.drawerBtn
        .addEventListener('click', drawerToggleHandler.bind(this));

      this.drawerBtn
        .addEventListener('keydown', drawerToggleHandler.bind(this));

      this.drawer
        .addEventListener('keydown', keyboardHandler.bind(this));

      this.mask.addEventListener('click',
          drawerToggleHandler.bind(this));
    }

    this.breakpoint.addListener(screenSizeHandler.bind(this));

    return this;
  }

  function wrapLayout() {
    const container = document.createElement('div');
    container.classList.add('layout-absoluteViewport');

    // Capter any focused element.
    const focusedElement = document.querySelector(':focus');

    this.element.parentNode.insertBefore(container, this.element);
    this.element.parentNode.removeChild(this.element);
    container.appendChild(this.element);

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

    if (!drawerBtn) {
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
    hasActiveDrawer,
    hasDrawerFixed,
    toggleDrawer
  };

  return create;
})();

export default layout;
