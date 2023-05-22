class AnimateElement {
  async show(el,  to = { opacity: 1 }, duration = 1) {
    if (!isElement(el)) el = document.querySelector(el);
    if (el.classList.contains('is-visible')) return;

    const translate = { x: to.x, y: to.y, z: to.z };
    let rotate = to.rotate;
    let height = 0;

    if (to.height) {
      await prepareHeight(el);
    }

    el.style.transition = `all ${duration}s ease-in-out`;
    el.style.display = 'block';
    el.classList.add('is-animating');

    await waitFor(1);

    this._parseProperties(to, el, { translate, height, rotate });
    el.style.willChange = 'transform, height';
    setTransform();
    setClasses();

    await waitFor(duration * 1000);

    el.classList.remove('is-animating');

    async function prepareHeight(el) {
      if (el.offsetHeight === 0) {
        el.style.height = 'auto';
      }
      el.style.transition = 'none';
      el.style.display = 'block';
      el.style.position = 'absolute';
      el.style.zIndex = '-1';
      el.style.opacity = '0';

      height = el.offsetHeight + 'px';

      await waitFor(1);

      el.style.transition = '';
      el.style.display = '';
      el.style.position = '';
      el.style.zIndex = '';
      el.style.opacity = '';
      el.style.height = '';
    }

    function setTransform() {
      const isTranslate = translate.x || translate.y || translate.z;
      const translateValue = `translate3d(${translate.x || 0}, ${translate.y || 0}, ${translate.z || 0})`;
      const rotateValue = ` rotate(${rotate})`;

      el.style.transform = (isTranslate ? translateValue : '') + (rotate ? rotateValue : '');
    }

    function setClasses() {
      el.classList.add('is-visible');
      el.classList.remove('is-hidden');
    }
  }

  async hide(el,  to = { opacity: 0 }, duration = 1) {
    if (!isElement(el)) el = document.querySelector(el);
    if (el.classList.contains('is-hidden')) return;

    const translate = { x: 0, y: 0, z: 0 };
    let rotate = to.rotate;
    let height = el.offsetHeight;

    el.style.transition = `all ${duration}s ease-in-out`;
    el.classList.add('is-animating');

    this._parseProperties(to, el, { translate, height, rotate });
    el.style.willChange = 'transform, height';
    setTransform();
    setClasses();

    await waitFor(duration * 1000);

    el.style.display = 'none';
    el.classList.remove('is-animating');

    function setTransform() {
      const isTranslate = translate.x || translate.y || translate.z;
      const translateValue = `translate3d(${translate.x || 0}, ${translate.y || 0}, ${translate.z || 0})`;
      const rotateValue = ` rotate(${rotate})`;

      el.style.transform = (isTranslate ? translateValue : '') + (rotate ? rotateValue : '');
    }

    function setClasses() {
      el.classList.remove('is-visible');
      el.classList.add('is-hidden');
    }
  }

  async toggle(el, from, to, duration) {
    if (el.classList.contains('is-animating')) return;

    if (el.classList.contains('is-visible')) {
      await this.hide(el, from, duration);
    } else {
      await this.show(el, to, duration);
    }
  }

  _parseProperties(arr, el, { translate, height, rotate }) {
    for (const [key, value] of Object.entries(arr)) {
      switch(key.toString()) {
        case 'x':
          translate.x = value;
          break;
        case 'y':
          translate.y = value;
          break;
        case 'z':
          translate.z = value;
          break;
        case 'rotate':
          rotate = value;
        case 'height':
          if (value === 'auto') {
            el.style[key] = height;
          } else {
            el.style[key] = value;
          }
          break;
        default:
          el.style[key] = value;
      }
    }
  }
}

const waitFor = (delay) => new Promise(resolve => setTimeout(resolve, delay));
const isElement = (element) => element instanceof Element;

export default new AnimateElement();
