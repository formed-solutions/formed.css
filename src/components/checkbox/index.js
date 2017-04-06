/**
 * Checkbox component
 */

const checkbox = (() => {
  const classNames = {
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
    const METHOD = this.control.disabled
      ? 'add'
      : 'remove';

    this.element.classList[METHOD](classNames.IS_DISABLED);
  }

  function _checkCheckedState() {
    const METHOD = this.control.checked
      ? 'add'
      : 'remove';

    this.element.classList[METHOD](classNames.IS_CHECKED);
  }

  function _createBox(element, control) {
    element.classList.add(classNames.IS_CUSTOM);

    const box = document.createElement('span');
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
    const checkbox = Object.create(api);

    checkbox.element = element;
    checkbox.control = element.querySelector(`.${classNames.CONTROL}`);
    checkbox.label = element.querySelector(`.${classNames.LABEL}`);
    checkbox.box = _createBox(checkbox.element, checkbox.control);

    _bindings(checkbox);

    _updateState.call(checkbox);

    return checkbox;
  }

  const api = {
    check,
    uncheck,
    disable,
    enable
  };

  return create;
})();

export default checkbox;
