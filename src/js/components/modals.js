import SimpleModal from '../functions/SimpleModal';

const options = {
  onInit: () => {},
  beforeOpen: () => {},
  onOpen: () => {},
  beforeClose: () => {},
  onClose: () => {},
  disableScroll: true,
  transitionDelay: 400,
  nested: true,
  overlayCloseAll: true,
};

const modals = new SimpleModal(options);

modals.init();

export default modals;

