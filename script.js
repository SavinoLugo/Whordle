const cellCount = 5
const rowCount = 6
const cellsPerRow = cellCount * rowCount
const wordList = [
  'apple',
  'beach',
  'crisp',
  'dance',
  'eager',
  'flute',
  'graze',
  'house',
  'irate',
  'jolly',
  'knead',
  'laser',
  'music',
  'noble',
  'olive',
  'piano',
  'quiet',
  'roast',
  'spoon',
  'trick',
  'uncle',
  'vital',
  'wedge',
  'xenon',
  'yield',
  'zebra'
]
const guesses = []
let currentRow = 0
let currentCellIndex = 0
let wordToGuess
let currentGuess = []
let banana = 0
//This function selects a random word from the wordList array and returns it.
const getRandomWord = () => {
  return wordList[Math.floor(Math.random() * wordList.length)]
}
//This function is called when a letter is typed in the game. It then calls the updateCells function to update the game board display.
const addLetterToCurrentRow = (letter) => {
  if (currentGuess.length < cellCount) {
    currentGuess[currentCellIndex] = letter.toUpperCase()
    updateCells()
  }
}
//This function is called when the Backspace key is pressed. It removes the last letter from the currentGuess array.
const removeLastLetterFromCurrentRow = () => {
  currentGuess.pop()
  if (currentCellIndex !== 0) {
    currentCellIndex--
  }
  updateCells()
}
//This function updates the displayed letters on the game board.
const updateCells = () => {
  const gameboard = document.querySelectorAll('.cell')
  gameboard[currentGuess.length - 1 + banana].textContent =
    currentGuess[currentGuess.length - 1]
}
//This function checks if the current guess matches the word to be guessed
const checkWin = () => {
  const newArr = wordToGuess.split('')
  const gameboard = document.querySelectorAll('.cell')
  newArr.forEach((word, idx) => {
    const fWord = word.toUpperCase()
    if (gameboard[idx + banana].textContent === fWord) {
      gameboard[idx + banana].style.background = 'green'
    }
  })
}
//This function generates the initial game board HTML structure.
const createGameBoard = () => {
  const gameboard = document.querySelector('.gameboard')
  gameboard.innerHTML = ''
  for (let i = 0; i < cellsPerRow; i++) {
    const cell = document.createElement('div')
    const rowIndex = Math.floor(i / cellCount)
    const guess = rowIndex === currentRow ? currentGuess[i % cellCount] : ''
    cell.classList = 'cell'
    cell.classList.toggle(
      'current',
      rowIndex === currentRow && i % cellCount === currentCellIndex
    )
    cell.textContent = guess || ''
    gameboard.appendChild(cell)
  }
}
createGameBoard()
//Enables the ability to use a keyboard to type.
const handleKeyDown = (event) => {
  if (event.key === 'Backspace') {
    removeLastLetterFromCurrentRow()
  } else if (event.key.length === 1 && /[a-z]/i.test(event.key)) {
    addLetterToCurrentRow(event.key)
    currentCellIndex = (currentCellIndex + 1) % cellCount
    updateCells()
  }
}
//This function happens when the Enter key is pressed to move to the next row in the game. It pushes the current guess to the guesses array,
const moveToNextRow = () => {
  guesses.push(currentGuess)
  const isWin = checkIfCorrect()
  if (isWin) currentCellIndex = 0
  currentRow++
  banana += 5
  if (currentRow >= rowCount) {
    currentRow = 0
  }
  currentGuess = []
}
//Enables the enter key
const handleEnterKeyPress = (event) => {
  if (event.key === 'Enter') {
    moveToNextRow()
  }
}

const checkIfCorrect = () => {
  checkWin()
  const guess = currentGuess.join('').toLowerCase()
  return guess === wordToGuess
}
//This function resets the game.
const resetGame = () => {
  currentRow = 0
  currentCellIndex = 0
  currentGuess = []
  banana = 0
  guesses.length = 0
  wordToGuess = getRandomWord()
  createGameBoard()
}
//Button to reset the game.
const playAgainButton = document.querySelector('.play-again-button')
playAgainButton.addEventListener('click', resetGame)

wordToGuess = getRandomWord()

document.addEventListener('keydown', handleKeyDown)
document.addEventListener('keydown', handleEnterKeyPress)
