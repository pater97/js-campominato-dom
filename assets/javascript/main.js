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

//utilizzo di un condizionale per assegnare il numero di caselle in base al livello e ne stabilisco la grandezza
function selectLevel(domElement){
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
//funzione di selezione livello

playGame.addEventListener(`click`,function(){
    selectLevel(gameDifficult)
})