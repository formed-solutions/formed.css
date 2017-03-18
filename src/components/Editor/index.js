/**
 * Editor component
 */

const editor = (() => {
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
    // Create a new object with api on __proto__.
    const editor = Object.create(api);

    if (!!(element && element.nodeType !== 1)) {
      throw new TypeError('Element passed in is not a HTML node.');
    }

    editor.editorEl = element;
    editor.controlEl =
      editor.editorEl.querySelector(`.${cssInterface.CONTROL}`);
    editor.iconEl = editor.editorEl.querySelector(`.${cssInterface.ICON}`);
    editor.labelEl = editor.editorEl.querySelector(`.${cssInterface.LABEL}`);

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
    const isDisabled = this.controlEl.hasAttribute('disabled');
    const method = isDisabled ? 'add' : 'remove';

    this.editorEl.classList[method](cssInterface.IS_DISABLED);
  }

  function checkFocusState() {
    const isFocused = !!this.editorEl.querySelector(':focus');
    const method = isFocused ? 'add' : 'remove';

    this.editorEl.classList[method](cssInterface.IS_FOCUSED);
  }

  function checkDirtyState() {
    const isDirty = this.controlEl.value && this.controlEl.value.length > 0;
    const method = isDirty ? 'add' : 'remove';

    this.editorEl.classList[method](cssInterface.IS_DIRTY);
  }

  function checkReadonlyState() {
    const isReadonly = this.controlEl.hasAttribute('readonly');
    const method = isReadonly ? 'add' : 'remove';

    this.editorEl.classList[method](cssInterface.IS_READONLY);
  }

  function checkValidState() {
    if (this.controlEl.validity) {
      const isValid = this.controlEl.validity.valid;
      const method = isValid ? 'remove' : 'add';

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

  const api = {
    disable,
    enable,
    refreshState,
    destroy
  };

  return init;
})();

export default editor;
