export function initTabs(triggerSelector, parentSelector) {
  const triggerNodes = document.querySelectorAll(triggerSelector);
  const parentNodes = document.querySelectorAll(parentSelector);

  if (triggerNodes.length > 0 && parentNodes.length > 0) {
    const needInit = Array.from(triggerNodes).every(
      (triggerNode) => !triggerNode.classList.contains('is-active')
    );

    if (needInit) {
      triggerNodes[0].classList.add('is-active');
      parentNodes[0].classList.add('is-active');
    }

    triggerNodes.forEach((triggerNode) => {
      triggerNode.addEventListener('click', (e) => {
        e.preventDefault();

        if (triggerNode.classList.contains('is-active')) return;

        const activeTrigger = document.querySelector(
          triggerSelector + '.is-active'
        );
        const activeParent = document.querySelector(
          parentSelector + '.is-active'
        );

        const id = triggerNode.getAttribute('data-tabs');

        activeTrigger.classList.remove('is-active');
        activeParent.classList.remove('is-active');

        triggerNode.classList.add('is-active');

        const newActiveParent = document.querySelector(
          parentSelector + '[data-tabs="' + id + '"]'
        );

        newActiveParent.classList.add('is-active');
      });
    });
  }
}
