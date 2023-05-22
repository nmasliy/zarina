import { throttle } from './throttle';

class Menu {
  constructor(options) {
    this.root = document.querySelector(':root');
    this.html = document.querySelector('html');
    this.isInit = false;

    const defaultOptions = {
      menu: document.querySelector('[data-menu]'),
      burger: document.querySelector('[data-burger]'),
      close: document.querySelector('[data-menu-close]'),
      overlay: document.querySelector('[data-menu-overlay]'),
      navLinks: document.querySelectorAll('[data-menu-item]'),
      burgerCaption: 'Открыть меню',
      burgerActiveCaption: 'Закрыть меню',
      transitionDelay: 400,
      breakpoint: 1024,
    };
    this.options = { ...defaultOptions, ...options };
    this._init();
  }

  async open() {
    this.options.overlay.style.display = 'block';
    this.options.menu.style.display = 'block';
    this.options.burger.setAttribute('aria-expanded', 'true');
    this.options.burger.setAttribute('aria-label', this.options.burgerActiveCaption);
    this.html.classList.add('disable-scroll');

    await waitFor(1);

    this.options.overlay.classList.add('is-active');
    this.options.menu.classList.add('is-active');
    this.options.burger.classList.add('is-active');
  }

  async close() {
    this.options.overlay.classList.remove('is-active');
    this.options.menu.classList.remove('is-active');
    this.options.burger.classList.remove('is-active');
    this.options.burger.setAttribute('aria-expanded', 'false');
    this.options.burger.setAttribute('aria-label', this.options.burgerCaption);
    this.html.classList.remove('disable-scroll');

    await waitFor(this.options.transitionDelay);

    this.options.overlay.style.display = '';
    this.options.menu.style.display = '';
  }

  toggle() {
    this.options.menu.classList.contains('is-active') ? this.close() : this.open();
  }

  _init() {
    if (!this.options.menu) return;
    this.options.burger.setAttribute('aria-label', this.options.burgerCaption);
    this._events();
  }

  _addListeners() {
    this.options.burger?.addEventListener('click', this.toggle.bind(this));
    this.options.close?.addEventListener('click', this.close.bind(this));
    this.options.overlay?.addEventListener('click', this.close.bind(this));
    this.options.navLinks?.forEach((el) => el.addEventListener('click', this.close.bind(this)));
  }

  _removeListeners() {
    this.options.burger?.removeEventListener('click', this.toggle.bind(this));
    this.options.close?.removeEventListener('click', this.close.bind(this));
    this.options.overlay?.removeEventListener('click', this.close.bind(this));
    this.options.navLinks?.forEach((el) => el.removeEventListener('click', this.close.bind(this)));
  }

  _events() {
    const initEvents = () => {
      // Enable menu on screens <= breakpoint, otherwise disable it
      if (window.innerWidth <= this.options.breakpoint) {
        if (this.isInit) return;
        this._addListeners();
        this.isInit = true;
      } else {
        if (!this.isInit) return;
        this.close();
        this._removeListeners();
        this.isInit = false;
      }
    }

    initEvents();

    window.addEventListener('resize', throttle(initEvents));
  }
}

const waitFor = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

export default Menu;
