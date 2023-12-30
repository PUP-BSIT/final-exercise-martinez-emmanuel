// Get the DOM elements and initialize the game
const input = document.querySelector("input"),
  guess = document.querySelector(".guess"),
  guessButton = document.querySelector("button"),
  remainingChances = document.querySelector(".chances");

// Set the focus on the input field
input.focus();

let randomNum = Math.floor(Math.random() * 100);
let chance = 10;
let gameOver = false; // Track the game status

// Listen for the click event on the check button
guessButton.addEventListener("click", () => {
  if (gameOver) {
    // Reset the game if it's already over
    resetGame();
    return;
  }

  // Decrement the chance on every click
  chance--;

  // Get the value from the input field
  let inputValue = input.value;

  // Check if the input value is equal to the random number
  if (inputValue == randomNum) {
    // Update guessed number, disable input, check button text and color.
    guess.textContent = "Congratulations – you guessed the number!";
    input.disabled = true;
    guessButton.textContent = "Replay";
    guess.classList.add("congratulations");
    gameOver = true; // Set game over flag
  } else if (inputValue > randomNum && inputValue < 100) {
    // Update the guess text and remaining chances
    guess.textContent = "Your guess is high!";
    remainingChances.textContent = chance;
    guess.classList.remove("invalid", "low");
    guess.classList.add("high");
  } else if (inputValue < randomNum && inputValue > 0) {
    // Update the guessed number text and remaining chances
    guess.textContent = "Your guess is low!";
    remainingChances.textContent = chance;
    guess.classList.remove("invalid", "high");
    guess.classList.add("low");
  } else {
    // Update the guessed number text, color and remaining chances
    guess.textContent = "Your number is invalid";
    remainingChances.textContent = chance;
    guess.classList.remove("high", "low");
    guess.classList.add("invalid");
  }

  // Check if the chance is zero
  if (chance === 0) {
    // Update check button, disable input, and clear input value.
    // Update guessed number text and color to indicate user loss.
    guessButton.textContent = "Replay";
    input.disabled = true;
    input.value = "";
    guess.textContent = "You lost the game";
    guess.classList.add("lost");
    gameOver = true; // Set game over flag
  }
});

// Reset the game
function resetGame() {
  randomNum = Math.floor(Math.random() * 100);
  chance = 10;
  input.disabled = false;
  input.value = "";
  guess.textContent = "";
  remainingChances.textContent = chance;
  guessButton.textContent = "Check";
  guess.classList.remove("congratulations", "invalid", "low", "high", "lost");
  gameOver = false;
}
