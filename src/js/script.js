const gameBoard = document.getElementById('gameBoard');
const restartBtn = document.getElementById('restartBtn');

let cards = [];
let flippedCards = [];
let matchedPairs = 0;

// Inicializando o jogo
function startGame() {
    matchedPairs = 0;
    cards = generateCards();
    gameBoard.innerHTML = '';
    cards.forEach(card => {
        gameBoard.appendChild(card);
    });
}

// Gerando as cartas
function generateCards() {
    const cardValues = ['&', '¨¨', '!', '$', '*', '+', '%', '='];
    const shuffledValues = [...cardValues, ...cardValues].sort(() => Math.random() - 0.5);
    
    return shuffledValues.map(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        return card;
    });
}

// Virando a carta
function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped')) return;

    this.textContent = this.dataset.value;
    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Verificando se as cartas são iguais
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === 8) {
            setTimeout(() => alert('Você ganhou!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

// Reiniciar o jogo
restartBtn.addEventListener('click', startGame);

// Iniciar o jogo
startGame();
