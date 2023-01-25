export const addCardsListeners = (handler) => {
  const cards = document.querySelectorAll('.js-gallery .card');
  cards.forEach((card) => card.addEventListener('click', handler));
};

export const addModalListeners = (handler) => {
  const closeButton = document.querySelector('#js-modal #modal-close');
  closeButton.addEventListener('click', handler);
};

export const addScoreButtonsListeners = (handler) => {
  const scoreButtons = document.querySelectorAll(
    '#js-modal .review-container > button'
  );

  scoreButtons.forEach((button) => {
    button.addEventListener('click', handler);
  });
};
