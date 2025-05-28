// let esay = document.getElementById("esay")
// let medium = document.getElementById("medium")
// let Harder = document.getElementById("Harder")
// let Harder1 = document.getElementById("Harder1")
// let esay1 = document.getElementById("esay1")
// let medium1 = document.getElementById("medium1")
// let div = document.getElementById("div")
// let card = document.getElementsByClassName("card-back")
// let img = document.querySelectorAll(".image")





//     esay.addEventListener("click", () => {
//         funcesay()
    
//     })
//     medium.addEventListener("click", () => {
//         funcmedium()
    
//     })
//     Harder.addEventListener("click", () => {
//         funceharder()
    
//     })
// const funcesay = () => {
//     if (div.style.display = "none") {
//         esay1.style.display = "block"
       
//        img.forEach((image) => {
//         let test =image.cloneNode(true)
//         image.parentNode.appendChild(test)
//        });
//      }

// }
// const funcmedium = () => {
//     if (div.style.display = "none") {
//         medium1.style.display = "block"
//     }

// }
// const funceharder = () => {
//     if (div.style.display = "none") {
//         Harder1.style.display = "block"
//     }

// }











// // document.addEventListener('DOMContentLoaded', function() {
// //     const cardImages = ['image1.png', 'image2.png', 'image3.png', 'image4.png'];
// //     let cards = [];
// //     let hasFlippedCard = false;
// //     let firstCard, secondCard;
// //     let moves = 0;

// //     function createBoard() {
// //         for (let i = 0; i < cardImages.length * 2; i++) {
// //             const card = document.createElement('div');
// //             card.classList.add('card');
// //             card.dataset.image = cardImages[Math.floor(i / 2)];
// //             card.addEventListener('click', flipCard);
// //             document.getElementById('game-board').appendChild(card);
// //         }
// //     }

// //     function flipCard() {
// //         if (this === firstCard) return;
// //         this.classList.add('flip');

// //         if (!hasFlippedCard) {
// //             hasFlippedCard = true;
// //             firstCard = this;
// //             return;
// //         }

// //         secondCard = this;
// //         moves++;

// //         checkForMatch();
// //     }

// //     function checkForMatch() {
// //         if (firstCard.dataset.image === secondCard.dataset.image) {
// //             firstCard.removeEventListener('click', flipCard);
// //             secondCard.removeEventListener('click', flipCard);
// //         } else {
// //             setTimeout(() => {
// //                 firstCard.classList.remove('flip');
// //                 secondCard.classList.remove('flip');
// //             }, 1000);
// //         }

// //         hasFlippedCard = false;
// //         firstCard = null;
// //         secondCard = null;
// //     }

// //     createBoard();
// // });





document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const startScreen = document.getElementById('start-screen');
    const easyGame = document.getElementById('easy-game')
    const mediumGame = document.getElementById('medium-game')
    const hardGame = document.getElementById('hard-game')
    const resultsScreen = document.getElementById('results-screen')
    
    const easyBtn = document.getElementById('easy')
    const mediumBtn = document.getElementById('medium')
    const hardBtn = document.getElementById('hard')
    const playAgainBtn = document.getElementById('play-again')
    
    const playerNameInput = document.getElementById('player-name')
    const resultName = document.getElementById('result-name')
    const resultTime = document.getElementById('result-time')
    const resultMoves = document.getElementById('result-moves')
    
    // Containers
    const easyContainer = document.getElementById('easy-container')
    const mediumContainer = document.getElementById('medium-container')
    const hardContainer = document.getElementById('hard-container')
    
    // Stats elements
    const easyTimer = document.getElementById('easy-timer')
    const mediumTimer = document.getElementById('medium-timer')
    const hardTimer = document.getElementById('hard-timer')
    const easyMoves = document.getElementById('easy-moves')
    const mediumMoves = document.getElementById('medium-moves')
    const hardMoves = document.getElementById('hard-moves')
    
    // Game state
    let currentLevel = ''
    let hasFlippedCard = false
    let lockBoard = false
    let firstCard, secondCard
    let moves = 0
    let matches = 0
    let totalPairs = 0
    let timer = 0
    let timerInterval
    
    // Image paths for cards
    const imagePaths = [
        'public/images/image_1.png',
        'public/images/image_4.png',
        'public/images/image_3.png',
        'public/images/image_2.png',
        'public/images/image_5.png',
       'public/images/image_6.png',
       'public/images/image_7.png',
       'public/images/image_8.png'
    ]
  
    easyBtn.addEventListener('click', () => startGame('easy', 2))
    mediumBtn.addEventListener('click', () => startGame('medium', 4))
    hardBtn.addEventListener('click', () => startGame('hard', 8))
    playAgainBtn.addEventListener('click', resetToStart)
    
   
    function startGame(level, numPairs) {
        currentLevel = level;
        totalPairs = numPairs;
        matches = 0;
        moves = 0;
        timer = 0;
        
        // Hide start screen
        startScreen.style.display = 'none';
        
        // Update player name
        const playerName = playerNameInput.value.trim() || 'Player';
        resultName.textContent = playerName;
        
        // Reset stats
        updateMoves();
        updateTimer();
        
        // Show appropriate game screen
        if (level === 'easy') {
            easyGame.style.display = 'flex';
            createCards(easyContainer, numPairs);
        } else if (level === 'medium') {
            mediumGame.style.display = 'flex';
            createCards(mediumContainer, numPairs);
        } else {
            hardGame.style.display = 'flex';
            createCards(hardContainer, numPairs);
        }
        
        // Start timer
        startTimer();
    }
    
    // Create card elements for the game
    function createCards(container, numPairs) {
        // Clear container
        container.innerHTML = '';
        
        // Create pairs of cards
        const cardPairs = [];
        for (let i = 0; i < numPairs; i++) {
            cardPairs.push(i);
            cardPairs.push(i);
        }
        
        // Shuffle the cards
        shuffle(cardPairs);
        
        // Create card elements
        cardPairs.forEach((value, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.value = value;
            
            const cardInner = document.createElement('div');
            cardInner.className = 'card-inner';
            
            const cardFront = document.createElement('div');
            cardFront.className = 'card-front';
            
            const cardImg = document.createElement('img');
            cardImg.src = imagePaths[value];
            cardImg.alt = 'Card ' + value;
            
            const cardBack = document.createElement('div');
            cardBack.className = 'card-back';
            
            cardFront.appendChild(cardImg);
            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);
            
            card.addEventListener('click', flipCard);
            container.appendChild(card);
        });
    }
    
    // Timer functions
    function startTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timer++;
            updateTimer();
        }, 1000);
    }
    
    function stopTimer() {
        clearInterval(timerInterval);
    }
    
    function updateTimer() {
        if (currentLevel === 'easy') {
            easyTimer.textContent = timer;
        } else if (currentLevel === 'medium') {
            mediumTimer.textContent = timer;
        } else {
            hardTimer.textContent = timer;
        }
    }
    
    // Update moves counter
    function updateMoves() {
        if (currentLevel === 'easy') {
            easyMoves.textContent = moves;
        } else if (currentLevel === 'medium') {
            mediumMoves.textContent = moves;
        } else {
            hardMoves.textContent = moves;
        }
    }
    
    // Card flip functionality
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        
        this.classList.add('flipped');
        
        if (!hasFlippedCard) {
            // First card flipped
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
        
        // Second card flipped
        secondCard = this;
        moves++;
        updateMoves();
        
        checkForMatch();
    }
    
    // Check if the two flipped cards match
    function checkForMatch() {
        const isMatch = firstCard.dataset.value === secondCard.dataset.value;
        
        if (isMatch) {
            disableCards();
            matches++;
            
            // Check if game is complete
            if (matches === totalPairs) {
                setTimeout(() => {
                    endGame();
                }, 1000);
            }
        } else {
            unflipCards();
        }
    }
    
    // Disable matched cards
    function disableCards() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        
        resetBoard();
    }
    
    // Unflip non-matching cards
    function unflipCards() {
        lockBoard = true;
        
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            
            resetBoard();
        }, 1000);
    }
    
    // Reset board state for next turn
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }
    
    // End game and show results
    function endGame() {
        stopTimer();
        
        // Hide game screens
        easyGame.style.display = 'none';
        mediumGame.style.display = 'none';
        hardGame.style.display = 'none';
        
        // Show results
        resultTime.textContent = timer;
        resultMoves.textContent = moves;
        resultsScreen.style.display = 'flex';
    }
    
    // Reset game to start screen
    function resetToStart() {
        resultsScreen.style.display = 'none';
        startScreen.style.display = 'flex';
        
        // Reset all game state
        resetBoard();
        stopTimer();
    }
    
    // Shuffle array (Fisher-Yates algorithm)
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});