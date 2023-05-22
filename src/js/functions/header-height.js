import { root } from "../_vars";
import { throttle } from './throttle';

const changeHeaderHeight = () => {
  const headerHeight = document.querySelector('.header')?.offsetHeight;
  root.style.setProperty('--header-height', `${headerHeight}px`);
}

changeHeaderHeight();

window.addEventListener('resize', throttle(changeHeaderHeight));
