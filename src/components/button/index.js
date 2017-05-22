/**
 * Formed Button component.
 */

const button = (() => {
  const classNames = {
    IS_ACTIVE: 'is-active'
  };

  function onBlur(evt) {
    evt && this.element.blur();
  }

  function bindings(button) {
    button._onBlur = onBlur.bind(button);

    button.element.addEventListener('mouseup', button._onBlur);
    button.element.addEventListener('mouseleave', button._onBlur);
  }

  // Public methods.

  function destroy() {
    this.element.removeEventListener('mouseup', this._onBlur);
    this.element.removeEventListener('mouseleave', this._onBlur);
  }

  function disable() {
    this.element.disabled = true;
    return this;
  }

  function enable() {
    this.element.disabled = false;
    return this;
  }

  function toggle() {
    if (this.element.classList.contains(classNames.IS_ACTIVE)) {
      this.element.classList.remove(classNames.IS_ACTIVE);
    }
    else {
      this.element.classList.add(classNames.IS_ACTIVE);
    }

    return this;
  }

  function create(element) {
    const button = Object.create(api);

    button.element = element;
    bindings(button);

    return button;
  }

  const api = {
    destroy,
    disable,
    enable,
    toggle
  };

  return create;
})();

export default button;
