const cells = document.querySelectorAll('.cell')
let currentCellIndex = 0
let currentWord = ''
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
let wordToGuess = wordList[Math.floor(Math.random() * wordList.length)]
//Adds the letters to board when they are typed.
const addLetterToWord = (letter) => {
  if (currentWord.length < 5) {
    currentWord += letter
    updateCells()
  }
}
//Used to delete letters from a row.
const removeLastLetterFromWord = () => {
  currentWord = currentWord.slice(0, -1)
  updateCells()
}
//Updates the visuals of the board each time something happens.
const updateCells = () => {
  cells.forEach((cell, index) => {
    if (index === currentCellIndex) {
      cell.classList.add('current')
    } else {
      cell.classList.remove('current')
    }
    cell.textContent = currentWord[index] || ''
  })
}
//This portion below handles the input from a keyboard.
const handleKeyDown = (event) => {
  if (event.key === 'Backspace') {
    removeLastLetterFromWord()
  } else if (event.key.length === 1 && /[a-z]/i.test(event.key)) {
    addLetterToWord(event.key.toUpperCase())
  }
}

document.addEventListener('keydown', handleKeyDown)

updateCells()
