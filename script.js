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

const getRandomWord = () => {
  return wordList[Math.floor(Math.random() * wordList.length)]
}

const addLetterToCurrentRow = (letter) => {
  if (currentGuess.length < cellCount) {
    currentGuess[currentCellIndex] = letter.toUpperCase()
    updateCells()
  }
}

const removeLastLetterFromCurrentRow = () => {
  currentGuess.pop()
  if (currentCellIndex !== 0) {
    currentCellIndex--
  }
  updateCells()
}

const updateCells = () => {
  const gameboard = document.querySelectorAll('.cell')
  gameboard[currentGuess.length - 1 + banana].textContent =
    currentGuess[currentGuess.length - 1]
}
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
const handleKeyDown = (event) => {
  if (event.key === 'Backspace') {
    removeLastLetterFromCurrentRow()
  } else if (event.key.length === 1 && /[a-z]/i.test(event.key)) {
    addLetterToCurrentRow(event.key)
    currentCellIndex = (currentCellIndex + 1) % cellCount
    updateCells()
  }
}

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

const resetGame = () => {
  currentRow = 0
  currentCellIndex = 0
  currentGuess = []
  banana = 0
  guesses.length = 0
  wordToGuess = getRandomWord()
  createGameBoard()
}

const playAgainButton = document.querySelector('.play-again-button')
playAgainButton.addEventListener('click', resetGame)

wordToGuess = getRandomWord()

document.addEventListener('keydown', handleKeyDown)
document.addEventListener('keydown', handleEnterKeyPress)
