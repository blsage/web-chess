
var canvasGA = document.getElementById("gameArea");
canvasGA.addEventListener( 'click', processUserInput);
var contextGA = canvasGA.getContext("2d");

var cellSize = canvasGA.width/8;

var cells = new Array(8);
for(var i = 0; i < 8; i++)
    cells[i] = new Array(8);

function setupBoard() {
    for(var r = 0; r < 8; r++) {
        for(var c = 0; c < 8; c++) {
            cells[r][c] = new Cell();
        }
    }
    cells[1][0].piece = new Pawn("white");
}

function drawBoard() {
    for(var r = 0; r < 8; r++) {
        for(var c = 0; c < 8; c++) {

        }
    }

}


function Cell() {
    this.backgroundColor = "white";
    this.piece = new EmptyPiece();
}

function EmptyPiece() {
    this.image = new Image();
    this.image.src = "piece-images/emptyPiece.png";
    this.playerColor = "none";
}

function Pawn(color) {
    this.playerColor = color;
    this.image = new Image();
    this.image.src = "piece-images/pawn-" + this.playerColor + ".png";
}


function processUserInput(event) {
    console.log("stuff was clicked: " + (event.x - canvasGA.offsetLeft));
}
