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


const rule = (() => {
    const freeSpaceRule = (position) => {
        return gameBoard.getState(position) == "";
    };

    const winningRule = (position, increment) => {    // 1 (horizontal), 14 (posDiag), 15 (vertical), 16 (negDiag) for different orientations
        const piece = gameBoard.getState(position);
        let length = 0;
        let chainPosition = position;
        // Check upwards
        do {
            length += 1;
            chainPosition -= increment;     // Move the chain position
        } while ((chainPosition % 15 != 0 && increment != 15)   // Ends at left border unless checking vertical win condition
                || (((chainPosition + 1) % 15) != 0 && increment != 15)      // Ends at right border unless ... same as above
                && (chainPosition < 225) && chainPosition > 0
                && gameBoard.getState(chainPosition) == piece)

        // Check downwards    
        chainPosition = position;    
        do {
            length += 1;
            chainPosition += increment;     // Move the chain position
        } while ((chainPosition % 15 != 0 && increment != 15)   // Ends at left border unless checking vertical win condition
                || (((chainPosition + 1) % 15) != 0 && increment != 15)      // Ends at right border unless ... same as above
                && (chainPosition < 225) && chainPosition > 0
                && gameBoard.getState(chainPosition) == piece)

        return length -= 1;     // -1 to compensate for counting position twice
        };

    return {freeSpaceRule, winningRule};
})();

// Gameplay
const game = (() => {
    const player1 = Player('X');
    const player2 = Player('O');
    let currPlayer = player1;

    const playRound = (position) => {
        // Pre-move checks
        if(rule.freeSpaceRule(position)){
            gameBoard.setState(position, currPlayer.getPiece());
            currPlayer = (currPlayer == player1 ? player2 : player1);
            return true;
        } else {
            return false;
        };

        // Check win condition
        if (rule.winningRule(position, 1) ||
        rule.winningRule(position, 14) ||
        rule.winningRule(position, 15) ||
        rule.winningRule(position, 16)) {
            // TODO:Declare the winner and stop the game

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
        gameBoard.resetBoard();
        for(i = 0; i < fieldElements.length; i++){
            fieldElements[i].textContent = "";
        }
    });

    return {updateBoard};
});

displayController();