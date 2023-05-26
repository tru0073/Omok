// Player
const Player = (piece) => {
    this.piece = piece; 

    const getPiece = () => {
        return piece;
    }

    return {getPiece};
};


//// Gameboard - perform operations on the game board and deal with attributes about the gameboard
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

// Gameplay - operate the game and returns attributes about the game state
const game = (() => {
    const player1 = Player('X');
    const player2 = Player('O');
    let currPlayer = player1;
    let winnerFound = false;

    // Main function to play the round
    const playRound = (position) => {
        // Pre-move checks
        if(rule.freeSpaceRule(position)){
            gameBoard.setState(position, currPlayer.getPiece());
            // Check if won
            currPlayer = (currPlayer == player1 ? player2 : player1);
            return true;
        } else {
            return false;
        };
    };

    const winningRule = (position, increment) => {    // 1 (horizontal), 14 (posDiag), 15 (vertical), 16 (negDiag) for different orientations
        return probeChain(position, increment) + probeChain(position, -increment) - 1;  // -1 to compensate for counting position twice
    };

    
    const probeChain = (position, increment) => {
        const piece = gameBoard.getState(position);
        let length = 0;
        let chainPosition = position;
        let leftBoundCondition = true;
        let rightBoundCondition = true;
        let bottomBoundCondition = true;
        let topBoundCondition = true;

        while (leftBoundCondition && rightBoundCondition && bottomBoundCondition && topBoundCondition) {
            length += 1;
            chainPosition += increment;
            //// Conditions of the loop
            // Do the loop conditions still hold?
            leftBoundCondition = (chainPosition - increment)%15 != 0    // The chain position did not over the left boundary during this loop
                                || increment == 15                      // Or it is not a vertical probe (side bounds don't matter)
                                || (increment == 1) || (increment == -14) || (increment == 16);  // Or the probe is moving rightwards

            // Has the chain position now crossed the right bound of the gameboard?
            rightBoundCondition = (chainPosition - increment + 1)%15 != 0     // The chain position did not over the right boundary during this loop
                                || increment == 15  
                                || (increment == -1) || (increment == 14) || (increment == -16);    // The chain position is moving leftwards                    
            
            // Has the chain position now crossed the bottom bound of the gameboard?
            bottomBoundCondition = chainPosition < 225;

            // Has the chain position now crossed the top bound of the gameboard?
            topBoundCondition = chainPosition > -1;
        };

        return length;
    };

    const getCurrentPlayer = () => {
        return currPlayer;
    };

    const gameEnded = () => {
        return winnerFound;
    };

    // All game functions
    return {playRound, winningRule, getCurrentPlayer, gameEnded, probeChain};
})();


//// DOM logic
const displayController = (() => {
    const fieldElements = document.querySelectorAll(".field");  // Select all fields  
    const resetButton = document.getElementById("reset-button");
    const forfeitButton = document.getElementById("forfeit-button");
    const mainMessageBoard = document.querySelector(".message-board")

    // After clicking a cell ...
    fieldElements.forEach((field) =>
    field.addEventListener("click", (e) => {
        if(game.playRound(parseInt(e.target.dataset.index))){   // If valid move, then update the board
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
});

displayController();
console.log(game.probeChain(14, -15));