/**
 * Radio component
 */

const radio = (() => {
  const classNames = {
    RADIO: 'Radio',
    CONTROL: 'Radio-control',
    CIRCLE: 'Radio-circle',
    LABEL: 'Radio-label',
    IS_CHECKED: 'is-checked',
    IS_CUSTOM: 'is-custom',
    IS_DISABLED: 'is-disabled',
    IS_FOCUSED: 'is-focused',
    IS_PRESSED: 'is-pressed'
  };

  function _onBlur(evt) {
    this.element.classList.remove(classNames.IS_FOCUSED);
  }

  function _onChange() {
    this.radioSet.forEach(radio => {
      const update = new Event('radio:update');

      radio.dispatchEvent(update);
    });
  }

  function _onFocus(evt) {
    this.element.classList.add(classNames.IS_FOCUSED);
  }

  function _onMousedown() {
    this.element.classList.add(classNames.IS_PRESSED);
  }

  function _onMouseup() {
    this.element.classList.remove(classNames.IS_PRESSED);
  }

  function _bindings(radio) {
    radio.control.addEventListener('blur', _onBlur.bind(radio));
    radio.control.addEventListener('change', _onChange.bind(radio));
    radio.control.addEventListener('focus', _onFocus.bind(radio));
    radio.element.addEventListener('radio:update', _updateState.bind(radio));
    radio.element.addEventListener('mousedown', _onMousedown.bind(radio));
    radio.element.addEventListener('mouseup', _onMouseup.bind(radio));
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

  function _createCircle(element, control) {
    element.classList.add(classNames.IS_CUSTOM);

    const circle = document.createElement('span');
    circle.classList.add(classNames.CIRCLE);

    element.insertBefore(circle, control.nextSibling);

    return circle;
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
    const radio = Object.create(api);

    radio.element = element;
    radio.control = element.querySelector(`.${classNames.CONTROL}`);
    radio.label = element.querySelector(`.${classNames.LABEL}`);
    radio.circle = _createCircle(radio.element, radio.control);

    // Group all other silbing radio buttons.
    radio.radioSet = Array.from(element.parentNode.getElementsByClassName(classNames.RADIO));

    _bindings(radio);

    _updateState.call(radio);

    return radio;
  }

  const api = {
    check,
    uncheck,
    disable,
    enable
  };

  return create;
})();

export default radio;
