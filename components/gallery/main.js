import { MOCK_CARDS } from './constants';
import { getTechnologies, postReview } from './scripts/api';
import {
  addCardsListeners,
  addModalListeners,
  addScoreButtonsListeners,
} from './scripts/listeners';
import {
  getCardTemplate,
  getContainerTemplate,
  getModalBodyTemplate,
  getModalTemplate,
} from './scripts/templates';
import './style.css';

// SETUP
const appElement = document.querySelector('#gallery-container');

/* getModalTemplate();
getContainerTemplate(); */

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

const handleCloseModal = () => {
  ModalElement.style.display = 'none';
};

const handleReview = (event) => {
  const score = Number(event.target.getAttribute('data-score'));
  postReview(currentCard._id, score, setupGlobalCardsAndRerender);
};

const setupCards = () => {
  loadingElement.remove();
  galleryElement.innerHTML = '';

  cards.forEach((card) => {
    const template = getCardTemplate(card);
    galleryElement.innerHTML += template;
  });
};

const setupModalData = (cardData) => {
  currentCard = cardData;

  modalTitle.innerText = cardData.name;
  modalBody.innerHTML = getModalBodyTemplate(cardData);
  addScoreButtonsListeners(handleReview);
};

const handleOpenModal = (event) => {
  const cardId = event.target.id;

  const cardData = cards.find((card) => card._id === cardId);
  setupModalData(cardData);
  ModalElement.style.display = 'block';
};

const setupGlobalCardsAndRerender = (updatedCard) => {
  cards = cards.map((card) => {
    return card._id === updatedCard._id ? updatedCard : card;
  });

  setupCards();
  addCardsListeners(handleOpenModal);
  setupModalData(updatedCard);
  handleCloseModal();
};

const setGlobalCardsFromAPI = (cardData) => {
  cards = cardsData;
  setupCards();
  addCardsListeners(handleOpenModal);
};

const setErrorMessageAPI = (error) => {
  console.log(error);
  cards = MOCK_CARDS;
  setupCards();
  addCardsListeners(handleOpenModal);
};

getTechnologies(setGlobalCardsFromAPI, setErrorMessageAPI);
addModalListeners(handleCloseModal);
