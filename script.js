// Player
const Player = (piece) => {
    this.piece = piece; 

    const getPiece = () => {
        return piece;
    }

    return {getPiece};
};

//// Gameboard
const gameBoard = (() => {
    let lastPiecePlayed = "X";

    const board = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", 
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

    const setState = (position, piece) => {
        board[position] = piece;
        lastPiecePlayed = piece;
    };

    const getState = (position) => {
        return board[position];
    };

    const resetBoard = () => {
        for(let i=0; i < board.length; i++){
            board[i] = "";
        };
    };

    const getLastPiece = () => {
        return lastPiecePlayed;
    }

    return {setState, getState, resetBoard, getLastPiece};
})();

// Gameplay
const game = (() => {
    const player1 = Player('X');
    const player2 = Player('O');
    let currPlayer = player1;

    const playRound = (position) => {
        if(gameBoard.getState(position) == ""){
            gameBoard.setState(position, currPlayer.getPiece());
            currPlayer = (currPlayer == player1 ? player2 : player1);
            return true;
        } else {
            return false;
        };
    };

    // All game functions
    return {playRound};
})();



//// DOM logic
const displayController = (() => {
    const fieldElements = document.querySelectorAll(".field");  // Select all fields  
    const resetButton = document.getElementById("reset-button");
    const forfeitButton = document.getElementById("forfeit-button");

    fieldElements.forEach((field) =>
    field.addEventListener("click", (e) => {
        if(game.playRound(parseInt(e.target.dataset.index))){
            e.target.textContent = gameBoard.getLastPiece();
        };
    })
    );

    resetButton.addEventListener("click", () => {
        for(i = 0; i < fieldElements.length; i++){
            fieldElements[i].textContent = "";
        }
    });

    return {updateBoard};
});

displayController();