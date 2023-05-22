import Swiper, { Autoplay } from 'swiper';
import { throttle } from '../functions/throttle';

Swiper.use([Autoplay]);

function initMobileSlider(parent, wrapper, items, breakpoint = 1024,  options, watchResize = false) {
  if (!options) {
    options = {
      spaceBetween: 30,
      slidesPerView: 3,
      autoplay: {
        delay: 3000,
      },
    };
  }

  let swiper = null;

  function init() {
    const $parent = document.querySelector(parent);
    const $wrapper = $parent.querySelector(wrapper);
    const $items = $wrapper.querySelectorAll(items);

    if (
      window.innerWidth <= breakpoint &&
      !$parent.classList.contains('swiper')
    ) {
      $parent.classList.add('swiper');
      $wrapper.classList.add('swiper-wrapper');
      $items.forEach((slide) => slide.classList.add('swiper-slide'));

      swiper = new Swiper(parent, options);
    } else if (
      window.innerWidth > breakpoint &&
      $parent.classList.contains('swiper')
    ) {
      swiper?.destroy();

      $parent.classList.remove('swiper');
      $wrapper.classList.remove('swiper-wrapper');
      $items.forEach((slide) => slide.classList.remove('swiper-slide'));
    }
  }

  init();

  if (watchResize) {
    let throttledInit = throttle(init);

    window.addEventListener('resize', throttledInit);
  }
}

// initMobileSlider('.hero__benefits', '.hero__cards', '.hero__card', 760);
