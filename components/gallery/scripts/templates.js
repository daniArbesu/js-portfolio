export const getModalTemplate = () => `
<div id="js-modal" class="js-modal">
  <div class="modal-header">
    <h2 id="modal-title"></h2>
    <button id="modal-close">❌</button>
  </div>
  <div class="modal-body"></div>
</div>
`;

export const getContainerTemplate = () => `
<div id="js-gallery" class="js-gallery">
  <h1>Loading... ⌚</h1>
</div>
`;

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

export const getCardTemplate = ({ name, logo, score, _id }) => `
<div class="card" role="button" id="${_id}">
  <h3>${name}</h3>

  <div class="image-container">
    <img src="${logo}" alt="${name}" />
  </div>

  <div class="score-container">${setupStars(score)}</div>
</div>
`;

export const getModalBodyTemplate = (cardData) => `
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
