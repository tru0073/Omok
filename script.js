// Construct global variables 
var boardSize = 15;

//// Player
const Player = (piece) => {
    this.piece = piece;

    const getPiece = () => {
        return this.piece;
    }
    return getPiece();
};

//// Gameboard
// These are functions related to the gameboard
 const gameBoard = (() => {

    let board = ["", "", "", "", "", "", "", "", "", "","", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

    // Create an empty game board in the event of a new game
    const createNewBoard = () => {
         board = ["", "", "", "", "", "", "", "", "", "","", "", "", "", "",
         "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
         "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
         "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
         "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
         "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
         "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
         "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
         "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
         "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
         "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
         "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
         "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
         "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
         "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
    };

    // Get the state of a position on the board
    const getState = (index) => {
        return board[index];
    };

    // Change the state of a position on the board
    const setState = (index, piece) => {
        board[index] = piece;
    };

    return {getState, setState};

 })();

//// Rules factory
const rules = ((position, piece) => {
    const lowerBound = 0;
    const upperBound = boardSize*boardSize - 1;

    const state = boardGame.getState(position);   // Get the piece at this position

    // Can't put a piece where there is already a piece
    const freeSpaceRule = (position, piece) => {
            if(state == ""){
                return True;
            } else {
                return False
            };
        };

    //TODO: Double-3 rule

    //// Winning condition! 5 in a row - no less and no more
    // Vertical win condition

    return {freeSpaceRule};

})();

//TODO: Lots of repeated code here ....
//// Winning rules
const winConditionRules = ((position, piece) => {

    // Check if a win rule has been met for a piece x and at position y

    // Vertical win condition
    const verticalWin = () => {

        // Check upwards (-15)
        let chainPosition = position;
        let chainLength = 0;
        let currentPiece = piece;
        while (chainPosition > 0 && gameBoard.getState(chainPosition) == piece){
            chainLength += 1
            chainPosition -= 15;
        };

        // Check downwards (+15)
        chainPosition = position;   // Reset variables
        currentPiece = piece;
        while (chainPosition < boardSize * boardSize - 1 && gameBoard.getState(chainPosition) == piece) {
            chainLength += 1
            chainPosition += 15;
        };

        return chainLength - 1;         // -1 to compensate for counting the last-placed piece twice
    };

    // Horizontal win condition
    const horizontalWin = () => {
        let chainPosition = position;
        let chainLength = 0;

        // Check left (-1)
        while (chainPosition < 225 && chainPosition % 15 != 0 && gameBoard.getState(chainPosition) == piece){
            chainLength += 1;
            chainPosition -= 1;
        };

        // Check right (+1)
        chainPosition = position;
        currentPiece = piece;
        while (chainPosition < 225 && (chainPosition + 1) % 15 != 0 && currentPiece == piece){
            chainLength += 1;
            chainPosition -= 1;
            currentPiece = gameBoard.getState(chainPosition);
        };
    };

    // Negative diagonal win condition
    const negDiagWin = () => {
        let chainPosition = position;
        let chainLength = 0;

        // Check upwards (-16)
        while (chainPosition > 0 && (chainPosition) % 15 != 0 && gameBoard.getState(chainPosition) == piece){
            chainLength += 1;
            chainPosition -= 16;
        };

        // Check downwards (+16)
        chainPosition = position;
        currentPiece = piece;
        while (chainPosition < 225 && (chainPosition + 1) % 15 != 0 && currentPiece == piece){
            chainLength += 1;
            chainPosition -= 16;
            currentPiece = gameBoard.getState(chainPosition);
        };
    };

    // Positive diagonal win condition
    const posDiagWin = () => {
        let chainPosition = position;
        let chainLength = 0;

        // Check upwards (-14)
        while (chainPosition > 0 && (chainPosition) % 15 != 0 && gameBoard.getState(chainPosition) == piece){
            chainLength += 1;
            chainPosition -= 14;
        };

        // Check downwards (+14)
        chainPosition = position;
        currentPiece = piece;
        while (chainPosition < 225 && (chainPosition + 1) % 15 != 0 && currentPiece == piece){
            chainLength += 1;
            chainPosition -= 14;
            currentPiece = gameBoard.getState(chainPosition);
        };
    };

    return {horizontalWin, posDiagWin, negDiagWin, verticalWin};

})();

//// Game logic
const gameController = (() => {
    const player1 = Player("x");
    const player2 = Player("y");
    let currPlayer = player1;
    let lastMove = None;

    // Place a piece down
    const makeMove = (currPlayer, index) => {
        // Check //TODO: Is it a legitimate move?
        if(rules.freeSpaceRule(index, currPlayer.getPiece())){
            gameBoard.setState(index, currPlayer.getPiece());
        }
        lastMove = index;
        if (currPlayer == player1){
            
        };
    };

    const checkWin = (index)

    // New game

    // End the game

})();



//// Widget logic

// Place a piece