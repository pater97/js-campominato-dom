//CONSEGNA
/*
L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata,
in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
*/

//definire variabile di inserimento 
const stampSquare = document.querySelector(".container")
const playGame = document.querySelector('.controls > button')
const gameDifficult = document.getElementById(`level`)
const bombs = []
//utilizzo di un condizionale per assegnare il numero di caselle in base al livello e ne stabilisco la grandezza
function playTheGame(domElement){
    const level = domElement.value
    var numCaselle = 0
    if(level == `1`){
        var numCaselle = 100
    }else if(level == `2`){
        var numCaselle = 81
    }else if(level == `3`){
        var numCaselle = 49
    }else{
        alert(`!ATTENZIONE! il livello indicato non è disponibile`)
    }
    console.log(numCaselle);
    cycle(numCaselle)
    while (bombs.length < 16){
        //genero un numero casuale attraverso la funzione 
        const randomNumber = getRandomNumber(1,100)
        //se il numero non si ripeto lo pusho nell'array
        if(!bombs.includes(randomNumber)) {
            bombs.push(randomNumber)
        }
    }
    const cellElements = document.getElementsByClassName('square');
    for (let index = 0; index < cellElements.length; index++) {
        const element = cellElements[index];
    
        element.addEventListener('click', function () {
          // prendere il contenuto della cell
          const cellNumber = parseInt(this.innerText)
          console.log(cellNumber);
          // verifica se la cella é una bomba
          is_a_bomb(cellNumber, bombs)
        })
    
      }
    
}
//utilizzare una funzione con ciclo for per stampare i quadrati
function cycle (numero){
    stampSquare.innerHTML = (``)
    for (let i = 1; i <= numero;i++){
        //creare un nuovo div
        const square = document.createElement(`div`);
        //creare variabile per inserimento testo
        const text = document.createTextNode(i);
        //inserire testo nel div
        square.appendChild(text)
        //aggiungere le classi da utilizzare
        square.className=`square class_${numero}`
        //stampare il quadrato
        stampSquare.append(square)
        //al click aggiungere il background azzurro
        square.addEventListener(`click`,function(){
        square.style.backgroundColor="#85FFC7"
    })
    console.log(square);
    }
}

//funzione per capire se la cella è una bomba
function is_a_bomb(cellNumber, bombs) {
    if (bombs.includes(cellNumber)) {
      console.log('is a bomb! Game over');
    } else {
      console.log('keep trying');
    }
  }
//funzione per generare numeri casuali 
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//funzione per generare i numeri bomba e inserirli nell'array
function generateBomb(numeroCelle){
    //creazione di un array vuoto
    const bombs = []
    //ciclo fino a ragiungere le 16 cife di cui ho bisogno
    while (bombs.length < 16){
        //genero un numero casuale attraverso la funzione 
        const randomNumber = getRandomNumber(1,numeroCelle)
        //se il numero non si ripeto lo pusho nell'array
        if(!bombs.includes(randomNumber)) {
            bombs.push(randomNumber)
        }
    }
}
//avvio del gioco al click
playGame.addEventListener(`click`,function(){
    playTheGame(gameDifficult)
})