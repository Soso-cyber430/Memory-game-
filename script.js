let timer;
let timeElapsed = 0;
let isGameActive = false;
let flippedCards = [];
let matchedCards = 0;

// Start timer function
function startTimer() {
    if (!isGameActive) {
        isGameActive = true;
        timer = setInterval(() => {
            timeElapsed++;
            displayTime(timeElapsed);
        }, 1000);
    }
}

// Display time function
function displayTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    document.getElementById('time-display').textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Stop timer function
function stopTimer() {
    clearInterval(timer);
    isGameActive = false;
}

// Reset timer function (for a new game or restart)
function resetTimer() {
    clearInterval(timer);
    timeElapsed = 0;
    displayTime(timeElapsed);
    isGameActive = false;
}


document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        if (!isGameActive) {
            startTimer(); 
        }
    });
});


document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
            card.classList.add('flipped');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                // Check if cards match
                setTimeout(() => {
                    if (flippedCards[0].dataset.letter === flippedCards[1].dataset.letter) {
                        flippedCards[0].classList.add('matched');
                        flippedCards[1].classList.add('matched');
                        matchedCards++;

                        // If all pairs are matched, stop the timer and show alert
                        if (matchedCards === 8) {
                            stopTimer();
                            alert(`Congratulations! You completed the game in ${document.getElementById('time-display').textContent}`);
                        }
                    } else {
                        flippedCards[0].classList.remove('flipped');
                        flippedCards[1].classList.remove('flipped');
                    }
                    flippedCards = [];
                }, 1000);
            }
        }
    });
});


function resetGame() {
    
    resetTimer();

   
    matchedCards = 0;

   
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('flipped', 'matched');
    });

    
    shuffleCards();
}


function shuffleCards() {
    const cards = document.querySelectorAll('.card');
    const cardArray = Array.from(cards);
    cardArray.sort(() => Math.random() - 0.5); 

    
    const gameBoard = document.querySelector('.game-board');
    cardArray.forEach(card => gameBoard.appendChild(card));
}
// Generate raindrops dynamically
window.onload = function () {
    const raindropContainer = document.querySelector('.raindrops');
    const numberOfRaindrops = 100; 
    for (let i = 0; i < numberOfRaindrops; i++) {
        const raindrop = document.createElement('div');
        raindrop.classList.add('raindrop');
        
        // Randomize the position of the raindrops
        raindrop.style.left = `${Math.random() * 100}vw`; 
        raindrop.style.animationDelay = `${Math.random() * 2}s`; 

        raindropContainer.appendChild(raindrop);
    }
}
