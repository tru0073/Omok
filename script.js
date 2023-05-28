//Player
const Player = (piece) => {
    this.piece = piece;

    const getPiece = () => {
        return piece;
    };

    return { getPiece };
};


////Gameboard - perform operations on the game board and deal with attributes about the gameboard
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
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        };
    };

    const getLastPiece = () => {
        return lastPiecePlayed;
    };

    return { setState, getState, resetBoard, getLastPiece };
})();



const rule = (() => {
    const freeSpaceRule = (position) => {
        return gameBoard.getState(position) == "";
    };

    return {freeSpaceRule};
})();


//Gameplay - operate the game and returns attributes about the game state
const game = (() => {
    const player1 = Player('X');
    const player2 = Player('O');
    let player1Score = 0;
    let player2Score = 0;
    let currPlayer = player1;
    let winnerFound = false;

    //Main function to play the round
    const playRound = (position) => {
        //Pre-move checks
        if(rule.freeSpaceRule(position) && winnerFound == false){
            gameBoard.setState(position, currPlayer.getPiece());
            //Check if won
            winnerFound = winningRule(position, 1) || winningRule(position, 14) || winningRule(position, 15) || winningRule(position, 16);
            if (winnerFound) {
                if (currPlayer == player1){
                    player1Score += 1;
                } else {
                    player2Score += 1;
                };
            };
            currPlayer = (currPlayer == player1 ? player2 : player1);
            return true;
        } else {
            return false;
        };
    };

    //Has the game been won?
    const winningRule = (position, increment) => {    // 1 (horizontal), 14 (posDiag), 15 (vertical), 16 (negDiag) for different orientations
        return (probeChain(position, increment) + probeChain(position, -increment) - 1) == 5;  // -1 to compensate for counting position twice
    };

    
    const probeChain = (position, increment) => {
        const piece = gameBoard.getState(position);
        let length = 0;
        let chainPosition = position;
        let leftCondition = true;
        let rightCondition = true;
        let bottomCondition = true;
        let topCondition = true;

        while (leftCondition && rightCondition && bottomCondition && topCondition && gameBoard.getState(chainPosition) == piece) {
            length += 1;
            chainPosition += increment;
            //// Conditions of the loop
            //Do the loop conditions still hold?
            leftCondition = (chainPosition - increment)%15 != 0    // The chain position did not over the left boundary during this loop
                                || increment == 15                      // Or it is not a vertical probe (side bounds don't matter)
                                || (increment == 1) || (increment == -14) || (increment == 16);  // Or the probe is moving rightwards

            //Has the chain position now crossed the right bound of the gameboard?
            rightCondition = (chainPosition - increment + 1)%15 != 0     // The chain position did not over the right boundary during this loop
                                || increment == 15  
                                || (increment == -1) || (increment == 14) || (increment == -16);    // The chain position is moving leftwards                    
            
            //Has the chain position now crossed the bottom bound of the gameboard?
            bottomCondition = chainPosition < 225;

            //Has the chain position now crossed the top bound of the gameboard?
            topCondition = chainPosition > -1;
        };
        return length;
    };

    const resetGame = () => {
        winnerFound = false;
        currPlayer = player1;
        gameBoard.resetBoard();
    };

    const forfeitGame = () => {
        if (currPlayer == player2){
            player1Score += 1;
        } else {
            player2Score += 1;
        };        
        resetGame();
    };

    const getCurrentPlayer = () => {
        return currPlayer;
    };

    const gameEnded = () => {
        return winnerFound;
    };

    const getWinningMessage = () => {
        const winner = (currPlayer == player1 ? player2 : player1);
        const piece = winner.getPiece();
        return `${piece} won!`
    };

    const getPlayer1Score = () => {
        return player1Score;
    }

    const getPlayer2Score = () => {
        return player2Score;
    }

    // All game functions
    return {playRound, winningRule, getCurrentPlayer, gameEnded, resetGame, forfeitGame, getWinningMessage, getPlayer1Score, getPlayer2Score};
})();


//// DOM logic
const displayController = (() => {
    const fieldElements = document.querySelectorAll(".field");  //Select all fields  
    const resetButton = document.getElementById("reset-button");
    const forfeitButton = document.getElementById("forfeit-button");
    const mainMessageBoard = document.querySelector(".message-board")
    const player1Score = document.getElementById("player1-score");
    const player2Score = document.getElementById("player2-score");
    const color1 = "#bd482d";
    const color2 = "#3886c2";
    let currColor = color1;

    // After clicking a cell ...
    fieldElements.forEach((field) =>
    field.addEventListener("click", (e) => {
        if(game.playRound(parseInt(e.target.dataset.index))){   //If a move has been played, then update the board
            e.target.textContent = gameBoard.getLastPiece();
            e.target.style.color = currColor;
            currColor = (currColor == color1 ? color2 : color1);    //Switch colours
        };
        if(game.gameEnded()){                                     //Check if game ended with a winner
            mainMessageBoard.textContent = game.getWinningMessage();
            player1Score.firstElementChild.textContent = game.getPlayer1Score();
            player2Score.firstElementChild.textContent = game.getPlayer2Score();
        };
    })
    );

    // Reset the game but not the scores
    resetButton.addEventListener("click", () => {
        game.resetGame();   // JS logic
        resetBoard();   // DOM logic
    }
    );

    // Forfeit ...
    forfeitButton.addEventListener("click", () => {
        game.forfeitGame();
        resetBoard();
        player1Score.firstElementChild.textContent = game.getPlayer1Score();
        player2Score.firstElementChild.textContent = game.getPlayer2Score();
    })

    // Reset board
    const resetBoard = () => {
        for(i = 0; i < fieldElements.length; i++){                  //Reset board
            fieldElements[i].textContent = "";
        }
        mainMessageBoard.textContent = "Play Omok!";    //Reset main message board
    };

});

displayController();
