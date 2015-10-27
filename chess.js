
var canvasGA = document.getElementById("gameArea");
canvasGA.addEventListener( 'click', processUserInput);
var contextGA = canvasGA.getContext("2d");


var cells = new Array(8);
for(var i = 0; i < 8; i++)
    cells[i] = new Array(8);

function setupBoard() {
    for(var r = 0; r < 8; r++) {
        for(var c = 0; c < 8; c++) {
            cells[r][c] = new Cell();
        }
    }

}


function Cell() {
    this.backgroundColor = "white";
    this.piece = new EmptyPiece();
}

function EmptyPiece() {
    this.image = new Image();
    this.image.src = "emptyPiece.png";
    this.playerColor = "none";
}


function processUserInput(event) {
    console.log("stuff was clicked: " + (event.x - canvasGA.offsetLeft));
}
