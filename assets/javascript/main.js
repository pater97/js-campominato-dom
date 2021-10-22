/*
Consegna
L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
*/

// DOM elements selection
const playBtnEl = document.querySelector('.controls > button');
const selectLevelEl = document.getElementById('level');
const selectGridContainerEl = document.querySelector('main > .container');
/* Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
*/
let bombs = []
console.log(bombs);
// Event listener
playBtnEl.addEventListener('click', function () {
  console.log('cliccato su play, avviare il gioco...');

  const [grid_cells, per_line] = selectLevel(selectLevelEl)
  console.log(grid_cells);
  console.log(per_line);

  console.log(grid_cells);
  console.log(per_line);

  bombs = generateBombs(grid_cells)
  // Genera la griglia 
  generateGrid(selectGridContainerEl, grid_cells, per_line)
  // Select all cells
  const cellElements = document.getElementsByClassName('cell');
  //console.log((cellElements));
  // ciclare tra le celle 
  for (let index = 0; index < cellElements.length; index++) {
    const element = cellElements[index];
    //console.log(element);
    if (is_a_bomb(Number(element.innerHTML), bombs)) {
      element.classList.add('bombs')
    }
    element.addEventListener('click', handleClick)
  }
})
/*
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve scoprire tutte le bombe e comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
show bombs
- lista delle bombe
- select all cells
- se numbero cella é bomba
- se si colora di rosso
*/
function showBombs(bombs) {
  // lista delle bombe
  console.log(bombs);
  //select all cells con classe cells
  const cells = document.getElementsByClassName('cell')
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i]
    if (bombs.includes(Number(cell.innerText))) {
      cell.style.backgroundColor = '#E56399'
    }
  }
}
//funzione game over
function gameOver() {
  // select all cells
  const elements = document.getElementsByClassName('cell')
  // [.cell, .cell]
  // for each cell remove the enven litener
  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    element.removeEventListener('click', handleClick)
  }
}
//funzione colore al click
function handleClick() {
  // prendere il contenuto della cell
  const cellNumber = parseInt(this.innerText)
  console.log(cellNumber);
  // verifica se la cella é una bomba
  if (is_a_bomb(cellNumber, bombs)) {
    // your code here
    // se é una bomba colorala di rosso
    this.style.backgroundColor = '#E56399'
    // GAME OVER
    console.log('GAME OVER');
    // mostra tutte le bombe
    showBombs(bombs)
    // disabilita tutti gli event listener
    gameOver()
  } else {
    // contiuna a giocare
    // colora la cella di azzurro
    this.style.backgroundColor = '#7FD1B9'
    console.log('Keep trying');
  }
}
/*
In seguito l'utente clicca su ogni cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
*/
// verificare se una cella é una bomba o no
function is_a_bomb(cellNumber, bombs) {
  if (bombs.includes(cellNumber)) {
    return true;
  }
  return false;
}
/**
 * Generates bombs
 * @param {number} grid_cells 
 * @returns 
 */
function generateBombs(grid_cells) {
  // creare un array vuota
  const bombs = []
  // ciclare finche la lunghezza dell'array bombs non é 16
  while (bombs.length < 16) {
    //console.log(bombs);
    // genera un numero casuale tra un min e max
    const randomNumber = getRandomNumber(1, grid_cells)
    // verifica se il numero non é giá incluso e inseriscilo tra le bombe
    if (!bombs.includes(randomNumber)) {
      console.log('Add a bomb');
      bombs.push(randomNumber)
    }
  }
  return bombs;
}
/**
 * Generates a random number between a min and a max
 * 
 */

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/* Funzioni */
/** 
 * Generate grid elements based on a range and cells per line
 * @param {object} gridContainerEl - grid DOM element
 * @param {number} cells_range - Cells range number
 * @param {number} cells_per_line - number of cells for each line of the grid
*/
function generateGrid(gridContainerEl, cells_range, cells_per_line) {
  // Pulire il contenuto del contenitore
  gridContainerEl.innerHTML = ''
  // Cliclare per inserire le celle a seconda del range  
  for (let i = 1; i <= cells_range; i++) {
    // Creare un nodo della dom per ciascuna cella
    const divEl = document.createElement('div')
    // appendere alla cella il rispettivo numero
    divEl.append(i)
    // definire misura della cella
    divEl.style.cssText = `width: calc(100% / ${cells_per_line}) ; height: calc(100% / ${cells_per_line}) ;`
    divEl.classList.add('cell')
    // Inserire le celle nel contenitore
    gridContainerEl.append(divEl)
  }
}
function selectLevel(domElement) {
  // Select the game level
  const level = domElement.value
  let cellsNumber, cells_per_line;
  // Check the level and define grid dimentions
  if (level == '1') {
    console.log('Livello Facile');
    cellsNumber = 100;
    cells_per_line = 10
  } else if (level == '2') {
    //console.log('Livello medio');
    cellsNumber = 81;
    cells_per_line = 9
  } else if (level == '3') {
    //console.log('livello difficile');
    cellsNumber = 49;
    cells_per_line = 7;
  }
  return [cellsNumber, cells_per_line];
}