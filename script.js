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

 })();

////TODO: Rules factory
 const rules = () => {};

//TODO: Make normal class
//// Pre-move Rules
const preMoveRules = (() => {

    // TODO: Need to make parent to inherit from for the next 4 lines to avoid repeatable code
    const lowerBound = 0;
    const upperBound = 14;
    const piece = boardGame.getState(position);   // Get the piece at this position
    let rulesList = [];

    // Check if the move will pass 
    const checkPassesRules = (position) => {
        // Iterate through every rule
        for(rule in rulesList){
            if(rule(position)==False){ //TODO????surely can write this better
                return False;
            };
            return True;
        };
    };

    // Can't put a piece where there is already a piece
    const checkTakenRule = (position) => {
        if(piece == ""){
            return True;
        } else {
            return False
        };
    };
    rulesList.push(checkTakenRule);

    //TODO: Double-3 rule

})();

//// Winning rules
const winConditionRules = (() => {
    // TODO: Need to make parent to inherit from for the next 4 lines to avoid repeatable code
    const lowerBound = 0;
    const upperBound = 14;
    const piece = boardGame.getState(position);
    let rulesList = [];

    // Check if a win rule has been met

    // Vertical win condition
    // Horizontal win condition
    // Negative diagonal win condition
    // Positive diagonal win condition

})();

//// Game logic
const gameController = (() => {
    const player1 = Player("x");
    const player2 = Player("y");
    let currPlayer = player1;

    // Place a piece down
    const makeMove = (currPlayer, index) => {
        // Check //TODO: Is it a legitimate move?

        // Has the winning condition been met?
    };

        // 
    // New game

    // End the game

})();



//// Widget logic

// Place a piece