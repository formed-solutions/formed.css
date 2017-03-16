/**
 * Editor component
 */

const Editor = (() => {
  const cssInterface = {
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
    if (!!(element && element.nodeType !== 1)) {
      throw new TypeError('Element passed in is not a HTML node.');
    }

    this.editorEl = element;
    this.controlEl =
      this.editorEl.querySelector(`.${this.cssInterface.CONTROL}`);
    this.iconEl = this.editorEl.querySelector(`.${this.cssInterface.ICON}`);
    this.labelEl = this.editorEl.querySelector(`.${this.cssInterface.LABEL}`);

    bindings.call(this);
    setContextClasses.call(this);

    this.refreshState();

    if (this.controlEl.hasAttribute('autofocus')) {
      this.editorEl.focus();
      checkFocusState.call(this);
    }

    return this;
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
    const isDisabled = this.controlEl.hasAttribute('disabled');
    const method = isDisabled ? 'add' : 'remove';

    this.editorEl.classList[method](this.cssInterface.IS_DISABLED);
  }

  function checkFocusState() {
    const isFocused = !!this.editorEl.querySelector(':focus');
    const method = isFocused ? 'add' : 'remove';

    this.editorEl.classList[method](this.cssInterface.IS_FOCUSED);
  }

  function checkDirtyState() {
    const isDirty = this.controlEl.value && this.controlEl.value.length > 0;
    const method = isDirty ? 'add' : 'remove';

    this.editorEl.classList[method](this.cssInterface.IS_DIRTY);
  }

  function checkReadonlyState() {
    const isReadonly = this.controlEl.hasAttribute('readonly');
    const method = isReadonly ? 'add' : 'remove';

    this.editorEl.classList[method](this.cssInterface.IS_READONLY);
  }

  function checkValidState() {
    if (this.controlEl.validity) {
      const isValid = this.controlEl.validity.valid;
      const method = isValid ? 'remove' : 'add';

      this.editorEl.classList[method](this.cssInterface.IS_INVALID);
    }
  }

  function setContextClasses() {
    if (this.controlEl) {
      if (this.controlEl.hasAttribute('placeholder')) {
        this.editorEl.classList.add(this.cssInterface.HAS_PLACEHOLDER);
      }
    }
  }

  // Handlers

  function blurHandler() {
    this.editorEl.classList.remove(this.cssInterface.IS_FOCUSED);
  }

  function focusHandler() {
    this.editorEl.classList.add(this.cssInterface.IS_FOCUSED);
  }

  function inputHandler() {
    this.refreshState();
  }

  function resetHandler() {
    this.refreshState();
  }

  return {
    disable,
    enable,
    init,
    cssInterface,
    refreshState,
    destroy
  };
})();

export default Editor;
