document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = document.getElementById('game-board');
  const newGameButton = document.getElementById('new-game-button');
  const victoryMessage = document.getElementById('victory-message');
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;

  const emojis = ['🐶', '🐱', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁'];
  let cardsArray = [];

  function shuffleCards() {
    cardsArray = [...emojis, ...emojis];
    cardsArray.sort(() => Math.random() - 0.5);
  }

  function createCardElement(emoji, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;

    const frontFace = document.createElement('div');
    frontFace.classList.add('card-inner', 'front');

    const backFace = document.createElement('div');
    backFace.classList.add('card-inner', 'back');
    backFace.innerText = emoji;

    card.appendChild(frontFace);
    card.appendChild(backFace);

    card.addEventListener('click', handleCardClick);

    return card;
  }

  function handleCardClick() {
    if (lockBoard || this === firstCard || this.classList.contains('flipped')) return;

    revealCard(this);

    if (!firstCard) {
      firstCard = this;
    } else {
      secondCard = this;
      lockBoard = true;
      checkForMatch();
    }
  }

  function revealCard(card) {
    card.classList.add('flipped');
  }

  function hideCard(card) {
    setTimeout(() => {
      card.classList.remove('flipped');
    }, 300);
  }

  function checkForMatch() {
    const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetTurn();
    checkVictory();
  }

  function unflipCards() {
    setTimeout(() => {
      hideCard(firstCard);
      hideCard(secondCard);
      resetTurn();
    }, 300);
  }

  function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
  }

  function checkVictory() {
    const matchedCards = document.querySelectorAll('.card.matched');
    if (matchedCards.length === cardsArray.length) {
      victoryMessage.classList.remove('hidden');
    }
  }

  function setupBoard() {
    gameBoard.innerHTML = '';
    victoryMessage.classList.add('hidden');

    firstCard = null;
    secondCard = null;
    lockBoard = false;

    shuffleCards();

    cardsArray.forEach((emoji, index) => {
      const cardElement = createCardElement(emoji, index);
      gameBoard.appendChild(cardElement);
    });
  }

  newGameButton.addEventListener('click', setupBoard);

  setupBoard();
});
