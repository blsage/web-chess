
var canvasGA = document.getElementById("gameArea");
canvasGA.addEventListener( 'click', processUserInput);
var contextGA = canvasGA.getContext("2d");

var cellSize = canvasGA.width/8;

var pieceHasBeenSelected = false;
var selectedCell = null;
var selectedPiece = null;

// % by 2, 0 is white, 1 is black
var currentPlayer = 0;

var cells = new Array(8);
for(var i = 0; i < 8; i++)
    cells[i] = new Array(8);

setupBoard();
setTimeout( drawBoard, 100);


function setupBoard() {
    for(var r = 0; r < 8; r++) {
        for(var c = 0; c < 8; c++) {
            cells[r][c] = new Cell();
            //////////////////////////Alternate colors for the squares
            if( (r + c)%2 == 0)
                cells[r][c].backgroundColor = "blue";

        }
    }

    for(var blah = 0; blah < 8; blah++) {
        cells[1][blah].piece = new Pawn("black");
        cells[6][blah].piece = new Pawn("white");
    }
}

function drawBoard() {
    for(var r = 0; r < 8; r++) {
        for(var c = 0; c < 8; c++) {
            //draw the cell's background color and the piece (image)
            if(cells[r][c].isSelected == true)
                contextGA.fillStyle = cells[r][c].selectedColor;
            else if(cells[r][c].isPossMove == true)
                contextGA.fillStyle = cells[r][c].possMoveColor;
            else
                contextGA.fillStyle = cells[r][c].backgroundColor;
            contextGA.fillRect(c*cellSize, r*cellSize, cellSize, cellSize);
            contextGA.drawImage(cells[r][c].piece.image, c*cellSize, r*cellSize, cellSize, cellSize);
        }
    }
}


function Cell() {
    this.backgroundColor = "white";
    this.piece = new EmptyPiece();
    this.isSelected = false;
    this.selectedColor = "#FFFF00";
    this.isPossMove = false;
    this.possMoveColor = "#000055";
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
    var relX = event.x - canvasGA.offsetLeft;
    var relY = event.y - canvasGA.offsetTop;

    var row = Math.trunc(relY/cellSize);
    var col = Math.trunc(relX/cellSize);

    var currPiece = cells[row][col].piece;
    var currCell = cells[row][col];

//if "white"
    if(currentPlayer%2 == 0 ) {
        if(  pieceHasBeenSelected == false && currPiece.playerColor == "white") {
            currCell.isSelected = true;
            pieceHasBeenSelected = true;
            selectedCell = currCell;
            selectedPiece = currPiece;
        } else {
                cells[row][col].piece = selectedPiece;
                selectedCell.piece = new EmptyPiece();
                currentPlayer++;
                pieceHasBeenSelected = false;
                selectedCell.isSelected = false;
                selectedPiece = null;
                selectedCell = null;
        }
    }
    // else if()


    drawBoard();
    // console.log("row: col is " + row + ":" + col);

}
