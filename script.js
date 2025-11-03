const wordList = [
  "computer",
  "hangman",
  "programming",
  "science",
  "keyboard",
  "artificial",
  "intelligence"
];

let selectedWord, guessedLetters, attemptsLeft;

const wordDisplay = document.getElementById("wordDisplay");
const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");
const restartBtn = document.getElementById("restartBtn");

function startGame() {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  guessedLetters = [];
  attemptsLeft = 6;
  message.textContent = "";
  updateWordDisplay();
  attemptsText.textContent = attemptsLeft;
  document.body.focus();
}

function updateWordDisplay() {
  let display = "";
  for (let letter of selectedWord) {
    display += guessedLetters.includes(letter) ? letter + " " : "_ ";
  }
  wordDisplay.textContent = display.trim();
}

function handleGuess(letter) {
  letter = letter.toLowerCase();

  // Ignore non-letter input or repeated guesses
  if (!/[a-z]/.test(letter) || guessedLetters.includes(letter)) {
    return;
  }

  guessedLetters.push(letter);

  if (selectedWord.includes(letter)) {
    updateWordDisplay();

    // Check if all letters guessed
    if (selectedWord.split("").every(l => guessedLetters.includes(l))) {
      message.textContent = "🎉 You Win!";
      document.removeEventListener("keydown", keyListener);
    }
  } else {
    attemptsLeft--;
    attemptsText.textContent = attemptsLeft;
    if (attemptsLeft === 0) {
      message.textContent = `💀 Game Over! Word was: ${selectedWord}`;
      document.removeEventListener("keydown", keyListener);
    }
  }
}

// Listen for keyboard input
function keyListener(event) {
  handleGuess(event.key);
}

restartBtn.addEventListener("click", () => {
  document.addEventListener("keydown", keyListener);
  startGame();
});

document.addEventListener("keydown", keyListener);

// Start game initially
startGame();
