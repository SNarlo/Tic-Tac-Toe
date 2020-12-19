
/*
Global Constants
*/
let boardIndexDict = {
    'upper': 0,
    'middle': 1,
    'lower': 2,
    'left': 0,
    'right': 2,
}

var playerOrderCounter = 0;
var gameOver = false;


/**
 * A module which is repsonsible for the game-board.
 */
const gameBoard = (() => {
    const board = [[[],[],[]],[[],[],[]],[[],[],[]]];

    const logBoardToConsole = () => console.log(board);
    
    const addMarkerToBoard = (tileId) => { 
        
        if (gameLogic.checkTileIfOccupied(tileId)) {
            let idConstituents = tileId.split('-'); // splits the id to get the index
            if (playerOrderCounter % 2 == 0) {
                board[boardIndexDict[idConstituents[0]]][boardIndexDict[idConstituents[1]]] = players.playerOneSymbol; 
            } 
            else if (playerOrderCounter % 2 == 1) {
                board[boardIndexDict[idConstituents[0]]][boardIndexDict[idConstituents[1]]] = players.playerTwoSymbol; 
            }
        
            // Actions to complete once marker is added to the board
            gameLogic.changeTileToOccupiedStatus(tileId);
            displayController.render();
            gameLogic.checkWinAndAlterDisplay(players.playerOneSymbol); 
            gameLogic.checkWinAndAlterDisplay(players.playerTwoSymbol);
            gameLogic.checkDraw();
            gameLogic.changePlayer();
        } 
    }

    const resetGameBoard = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                board[i][j] = []
            }
        }
        displayController.render();

        occupiedTiles = document.querySelectorAll('.occupied');
        for (let i = 0; i < occupiedTiles.length; i++) {
            occupiedTiles[i].className = 'tile';
        }
    }
    return {
        board, 
        logBoardToConsole,
        addMarkerToBoard,
        resetGameBoard,
    };
})();


/**
 * A module respoinsible for rendering the board data to the 
 * grid display. 
 */
const displayController = (() => {

    const resultWindow = document.querySelector('.result-window');
    const resultText = document.querySelector('.result');
    const lineContainer = document.querySelector('.line-container');
    const line = document.getElementsByClassName('line');
    const playerOneTurnArrow = document.getElementById("player-one-arrow");
    const playerTwoTurnArrow = document.getElementById("player-two-arrow");
    const playerOneCrown = document.getElementById("player-one-crown");
    const playerTwoCrown = document.getElementById("player-two-crown");
    
    const render = () => {
        document.getElementById('upper-left').innerHTML = gameBoard.board[boardIndexDict['upper']][boardIndexDict['left']];
        document.getElementById('upper-middle').innerHTML = gameBoard.board[boardIndexDict['upper']][boardIndexDict['middle']];
        document.getElementById('upper-right').innerHTML = gameBoard.board[boardIndexDict['upper']][boardIndexDict['right']];
        document.getElementById('middle-left').innerHTML = gameBoard.board[boardIndexDict['middle']][boardIndexDict['left']];
        document.getElementById('middle-middle').innerHTML = gameBoard.board[boardIndexDict['middle']][boardIndexDict['middle']];
        document.getElementById('middle-right').innerHTML = gameBoard.board[boardIndexDict['middle']][boardIndexDict['right']];
        document.getElementById('lower-left').innerHTML = gameBoard.board[boardIndexDict['lower']][boardIndexDict['left']];
        document.getElementById('lower-middle').innerHTML = gameBoard.board[boardIndexDict['lower']][boardIndexDict['middle']];
        document.getElementById('lower-right').innerHTML = gameBoard.board[boardIndexDict['lower']][boardIndexDict['right']];
    }

    const showGameOverScreen = (playerSymbol) => {
        resultWindow.style.display = 'flex';
        resultWindow.style.zIndex = 100;
        resultWindow.style.opacity = 0.65;

        resultText.innerHTML = `${playerSymbol}'s Win!`
    }

    const showDrawScreen = () => {
        resultWindow.style.display = 'flex';
        resultWindow.style.zIndex = 100;
        resultWindow.style.opacity = 0.65;

        resultText.innerHTML = "It's a Draw!";
    }

    const resetGameResultScreen = () => {
        resultWindow.style.display = 'none';
        resultText.innerHTML = "It's a Draw!";
        lineContainer.style.display = 'none';
        
        for (let i = 0; i < line.length; i++) {
            if (line[i].style.display != 'none') {
                line[i].style.display = 'none';
            }
        }
    }

    const displayWinLine = () => {
        lineContainer.style.display = 'block';
    }

    const showTurnArrow = () => {
        if (playerOrderCounter % 2 == 0) {
            playerOneTurnArrow.style.display = 'block';
            playerTwoTurnArrow.style.display = 'none';
        } else {
            playerOneTurnArrow.style.display = 'none';
            playerTwoTurnArrow.style.display = 'block';
        }
    }

    const displayWinnerCrownTurnOffArrows = (playerSymbol) => {
        if (playerSymbol == players.playerOneSymbol) {
            playerOneCrown.style.display = 'block';
        } else {
            playerTwoCrown.style.display = 'block';
        }
    }

    const turnOffCrowns = () => {
        playerOneCrown.style.display = 'none';
        playerTwoCrown.style.display = 'none';
    }

    return {
        lineContainer,
        render,
        showGameOverScreen,
        showDrawScreen,
        resetGameResultScreen,
        displayWinLine,
        showTurnArrow,
        displayWinnerCrownTurnOffArrows,
        turnOffCrowns,
    }  

})();

/**
 * A module representing the players in the game
 */
const players = (() => {

    const playerOneSymbol = 'X';
    const playerTwoSymbol = 'O';
    const playerOneName = 'Player One';
    const playerTwoName = 'Player Two';

    const getPlayerName = (playerSymbol) => {
        if (playerSymbol == playerOneSymbol) {
            return playerOneName;
        } else if (playerSymbol == playerTwoSymbol) {
            return playerTwoName;
        }
    }

    return {
        playerOneSymbol,
        playerTwoSymbol,
        playerOneName,
        playerTwoName,
        getPlayerName,
    }
})();

/**
 * A module which controlls the game logic
 */
const gameLogic = (() => {
    
    const play = () => {
        boardChildren = document.getElementById('game-board').children; // All the tiles in the game board
        for (let i = 0; i < boardChildren.length; i++) {
            boardChildren[i].addEventListener('click', (event) => {
            gameBoard.addMarkerToBoard(event.target.id);
            });
        }

        restartButton = document.getElementById('restart');
        restartButton.addEventListener('click', () => {
            gameBoard.resetGameBoard();
            displayController.resetGameResultScreen();
            resetTurnCounter();
            displayController.showTurnArrow(); // sets the arrow to X first
            displayController.turnOffCrowns();
        });

        displayController.showTurnArrow(); // shows the rrow on startup 
    }

    const changePlayer = () => {
        playerOrderCounter += 1
        displayController.showTurnArrow(); // changes arrow with each turn 
    }

    const resetTurnCounter = () => {
        playerOrderCounter = 0;
    }

    const checkWinAndAlterDisplay = (playerSymbol) => {
        if (gameBoard.board[0][0] == playerSymbol && gameBoard.board[0][1] == playerSymbol && gameBoard.board[0][2] == playerSymbol) {
            displayController.displayWinLine();
            document.getElementById('line-upper-horizontal').style.display = 'block';
            activeLine = 'line-upper-horizontal';
            displayController.showGameOverScreen(playerSymbol);
            displayController.displayWinnerCrownTurnOffArrows(playerSymbol);
        }
        if (gameBoard.board[1][0] == playerSymbol && gameBoard.board[1][1] == playerSymbol && gameBoard.board[1][2] == playerSymbol) {
            displayController.displayWinLine();
            document.getElementById('line-middle-horizontal').style.display = 'block';
            activeLine = 'line-middle-horizontal';
            displayController.showGameOverScreen(playerSymbol);
            displayController.displayWinnerCrownTurnOffArrows(playerSymbol);
        }
        if (gameBoard.board[2][0] == playerSymbol && gameBoard.board[2][1] == playerSymbol && gameBoard.board[2][2] == playerSymbol) {
            displayController.displayWinLine();
            document.getElementById('line-lower-horizontal').style.display = 'block';
            activeLine = 'line-lower-horizontal';
            displayController.showGameOverScreen(playerSymbol);
            displayController.displayWinnerCrownTurnOffArrows(playerSymbol);
        }
        if (gameBoard.board[0][0] == playerSymbol && gameBoard.board[1][0] == playerSymbol && gameBoard.board[2][0] == playerSymbol) {
            displayController.displayWinLine();
            document.getElementById('line-left-vertical').style.display = 'block';
            activeLine = 'line-left-vertical';
            displayController.showGameOverScreen(playerSymbol);
            displayController.displayWinnerCrownTurnOffArrows(playerSymbol);
        }
        if (gameBoard.board[0][1] == playerSymbol && gameBoard.board[1][1] == playerSymbol && gameBoard.board[2][1] == playerSymbol) {
            displayController.displayWinLine();
            document.getElementById('line-middle-vertical').style.display = 'block';
            displayController.activeLine = 'line-middle-vertical';
            displayController.showGameOverScreen(playerSymbol);
            displayController.displayWinnerCrownTurnOffArrows(playerSymbol);
        }
        if (gameBoard.board[0][2] == playerSymbol && gameBoard.board[1][2] == playerSymbol && gameBoard.board[2][2] == playerSymbol) {
            displayController.displayWinLine();
            document.getElementById('line-right-vertical').style.display = 'block';
            activeLine = 'line-right-vertical';
            displayController.showGameOverScreen(playerSymbol);
            displayController.displayWinnerCrownTurnOffArrows(playerSymbol);
        }
        if (gameBoard.board[0][0] == playerSymbol && gameBoard.board[1][1] == playerSymbol && gameBoard.board[2][2] == playerSymbol) {
            displayController.displayWinLine();
            document.getElementById('line-diagonal-left-right').style.display = 'block';
            activeLine = 'line-diagonal-left-right';
            displayController.showGameOverScreen(playerSymbol);
            displayController.displayWinnerCrownTurnOffArrows(playerSymbol);
        }
        if (gameBoard.board[2][0] == playerSymbol && gameBoard.board[1][1] == playerSymbol && gameBoard.board[0][2] == playerSymbol) {
            displayController.displayWinLine();
            document.getElementById('line-diagonal-right-left').style.display = 'block';
            activeLine = 'line-diagonal-right-left';
            displayController.showGameOverScreen(playerSymbol);
            displayController.displayWinnerCrownTurnOffArrows(playerSymbol);
        }

    }

    const checkDraw = () => {
        let occupiedTiles = 0;

        for (let i = 0; i < gameBoard.board.length; i++) {
            for (let j = 0; j < gameBoard.board[0].length; j++) {
                if (gameBoard.board[i][j] != "") {
                    occupiedTiles += 1;
                }
            }
        }
        if (occupiedTiles == 9) {
            displayController.showDrawScreen();
        }
    }

    const changeTileToOccupiedStatus = (tileId) => {
        tileToOccupy = document.getElementById(tileId);
        tileToOccupy.className = 'occupied';
    }
 
    const checkTileIfOccupied = (tileId) => {
        tileToCheck = document.getElementById(tileId);
        if(tileToCheck.className != 'occupied') {
            return true;
        } else {
            return false;
        }
    }

    return {
        changePlayer,
        play,
        checkWinAndAlterDisplay,
        checkDraw,
        resetTurnCounter,
        changeTileToOccupiedStatus,
        checkTileIfOccupied,
    }
})();

gameLogic.play(); // Activate the game 

