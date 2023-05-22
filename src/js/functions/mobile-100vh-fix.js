import { root } from '../_vars';
import { throttle } from './throttle';

const changeHeight = () => {
  root.style.setProperty('--window-height', `${window.innerHeight}px`);
};

changeHeight();

window.addEventListener('resize', throttle(changeHeight));
