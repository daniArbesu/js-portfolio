import { MOCK_CARDS, TECHNOLOGIES_URL } from './constants';
import './style.css';

// SETUP
const appElement = document.querySelector('#gallery-container');

const getModalTemplate = () => `
<div id="js-modal" class="js-modal">
  <div class="modal-header">
    <h2 id="modal-title"></h2>
    <button id="modal-close">❌</button>
  </div>
  <div class="modal-body"></div>
</div>
`;

const getContainerTemplate = () => `
<div id="js-gallery" class="js-gallery">
  <h1>Loading... ⌚</h1>
</div>
`;

appElement.innerHTML += getContainerTemplate();
appElement.innerHTML += getModalTemplate();

// LOGIC
const galleryElement = document.querySelector('#js-gallery');
const loadingElement = document.querySelector('#js-gallery > h1');

const ModalElement = document.querySelector('#js-modal');
const modalTitle = document.querySelector('#modal-title');
const modalBody = document.querySelector('.modal-body');

let cards;
let currentCard;
let isFetching = false;

const handleCloseModal = () => {
  ModalElement.style.display = 'none';
};

const addModalListeners = () => {
  const closeButton = document.querySelector('#js-modal #modal-close');
  closeButton.addEventListener('click', handleCloseModal);
};

const setupStars = (score) => {
  if (!score) {
    return `<p class="no-rating">No rating</p>`;
  }

  let starContainer = [];

  for (let i = 1; i <= score; i++) {
    starContainer.push(`<span class="star">⭐</span>`);
  }

  return starContainer.join('');
};

const getCardTemplate = ({ name, logo, score, _id }) => `
<div class="card" role="button" id="${_id}">
  <h3>${name}</h3>

  <div class="image-container">
    <img src="${logo}" alt="${name}" />
  </div>

  <div class="score-container">${setupStars(score)}</div>
</div>
`;

const setupCards = () => {
  loadingElement.remove();
  galleryElement.innerHTML = '';

  cards.forEach((card) => {
    const template = getCardTemplate(card);
    galleryElement.innerHTML += template;
  });
};

const getModalBodyTemplate = (cardData) => `
<img src="${cardData.logo}" alt="${cardData.name}"/>
<h3>Scored ${cardData.score.toFixed(2)} from ${cardData.reviews} reviews</h3>
<div class="review-container">
  <button data-score="1">⭐</button>
  <button data-score="2">⭐</button>
  <button data-score="3">⭐</button>
  <button data-score="4">⭐</button>
  <button data-score="5">⭐</button>
</div>
<p>Click one of the stars to vote</p>
`;

const postReview = async (id, score) => {
  try {
    if (isFetching) {
      return;
    }

    isFetching = true;

    const res = await fetch(`${TECHNOLOGIES_URL}/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        score,
      }),
    });

    const updatedCard = await res.json();

    cards = cards.map((card) => {
      return card._id === updatedCard._id ? updatedCard : card;
    });

    setupCards();
    addCardsListeners();
    setupModalData(updatedCard);
    handleCloseModal();

    isFetching = false;
  } catch (err) {
    console.log('Error', err);
    isFetching = false;
  }
};

const handleReview = (event) => {
  const score = Number(event.target.getAttribute('data-score'));
  postReview(currentCard._id, score);
};

const addScoreButtonsListeners = () => {
  const scoreButtons = document.querySelectorAll(
    '#js-modal .review-container > button'
  );

  scoreButtons.forEach((button) => {
    button.addEventListener('click', handleReview);
  });
};

const setupModalData = (cardData) => {
  currentCard = cardData;

  modalTitle.innerText = cardData.name;
  modalBody.innerHTML = getModalBodyTemplate(cardData);
  addScoreButtonsListeners();
};

const handleOpenModal = (event) => {
  const cardId = event.target.id;

  const cardData = cards.find((card) => card._id === cardId);
  setupModalData(cardData);
  ModalElement.style.display = 'block';
};

const addCardsListeners = () => {
  const cards = document.querySelectorAll('.js-gallery .card');
  cards.forEach((card) => card.addEventListener('click', handleOpenModal));
};

const getTechnologies = async () => {
  try {
    const res = await fetch(TECHNOLOGIES_URL);
    const cardsData = await res.json();

    cards = cardsData;
    setupCards();
    addCardsListeners();
  } catch (err) {
    console.log(err);
    cards = MOCK_CARDS;
    setupCards();
    addCardsListeners();
  }
};

getTechnologies();
addModalListeners();
