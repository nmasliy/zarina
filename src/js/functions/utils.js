export const fadeInElement = (el) => {

  el.style.display = 'block';
  el.style.transition = `${TRANSITION / 1000}s ease-in-out`;

  setTimeout(() => {
    el.classList.remove('is-hidden');
    el.classList.add('is-showed');

    el.style.opacity = 1;
  }, TRANSITION)
}

export const fadeOutElement = (el) => {

  el.style.opacity = 0;
  el.style.transition = `${TRANSITION / 1000}s ease-in-out`;

  setTimeout(() => {
    el.classList.remove('is-showed');
    el.classList.add('is-hidden');

    el.style.display = 'none';
  }, TRANSITION)
}

export const fadeToggleElement = (el) => {
  if (el.classList.contains('is-showed')) {
    fadeOutElement(el);
  } else {
    fadeInElement(el);
  }
}
