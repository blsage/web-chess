
var canvasGA = document.getElementById("gameArea");
canvasGA.addEventListener( 'click', processUserInput);
var contextGA = canvasGA.getContext("2d");

var cellSize = canvasGA.width/8;

var pieceHasBeenSelected = false;
var selectedCell = null;
var selectedPiece = null;
var selectedRow = null;
var selectedCol = null;

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
            if( (r + c)%2 == 0) {
                cells[r][c].backgroundColor = "#f2d9b9";
            } else {
                cells[r][c].backgroundColor = "#b78868";
            }

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



function processUserInput(event) {
    var relX = event.x - canvasGA.offsetLeft;
    var relY = event.y - canvasGA.offsetTop;

    var row = Math.trunc(relY/cellSize);
    var col = Math.trunc(relX/cellSize);

    //what the user just clicked on
    var currPiece = cells[row][col].piece;
    var currCell = cells[row][col];

//if "white"
    if(currentPlayer%2 == 0 ) {
        if(  pieceHasBeenSelected == false && currPiece.playerColor == "white") {
            selectPiece(currCell);
            selectedRow = row;
            selectedCol = col;

        } else if(pieceHasBeenSelected == true) {

                //if clicked on another white piece, then change selection
                if(currCell.piece.playerColor == "white") {
                    var same = (selectedCell == currCell);
                    selectedCell.isSelected = false;
                    if(same == false) {
                        selectPiece(currCell);
                        selectedRow = row;
                        selectedCol = col;
                    }
                } else {

                    //else, if not a white piece, then check to see if it's a legal move
                    var isItAllGood = selectedPiece.isLegalMove(selectedRow, selectedCol, row, col);

                    if(isItAllGood == false) {
                        return;
                    }


                    cells[row][col].piece = selectedPiece;
                    selectedCell.piece = new EmptyPiece();
                    currentPlayer++;
                    pieceHasBeenSelected = false;
                    selectedCell.isSelected = false;
                    selectedPiece = null;
                    selectedCell = null;
                }
        }
    }
    //if black
    else{
        if(  pieceHasBeenSelected == false && currPiece.playerColor == "black") {
            selectPiece(currCell);
            selectedRow = row;
            selectedCol = col;

        } else if(pieceHasBeenSelected == true) {

                //if clicked on another black piece, then change selection
                if(currCell.piece.playerColor == "black") {
                    var same = (selectedCell == currCell);
                    selectedCell.isSelected = false;
                    if(same == false) {
                        selectPiece(currCell);
                        selectedRow = row;
                        selectedCol = col;
                    }
                } else {

                    //else, if not a black piece, then check to see if it's a legal move
                    var isItAllGood = selectedPiece.isLegalMove(selectedRow, selectedCol, row, col);

                    if(isItAllGood == false) {
                        return;
                    }


                    cells[row][col].piece = selectedPiece;
                    selectedCell.piece = new EmptyPiece();
                    currentPlayer++;
                    pieceHasBeenSelected = false;
                    selectedCell.isSelected = false;
                    selectedPiece = null;
                    selectedCell = null;
                }
        }

    }


    drawBoard();
    // console.log("row: col is " + row + ":" + col);

}

function selectPiece(cell) {
    cell.isSelected = true;
    pieceHasBeenSelected = true;
    selectedCell = cell;
    selectedPiece = cell.piece;
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

    this.isLegalMove = function(originRow, originCol, destRow, destCol) {
            if(this.playerColor == "white") {
                console.log("rows o and d: " + originRow + ", " + destRow);
                if(originCol == destCol && originRow == destRow + 1)
                    return true;
                else
                    return false;
            }
            //else if black
            else {
                if(originCol == destCol && originRow == destRow - 1)
                    return true;
                else
                    return false;
            }
    };
}
