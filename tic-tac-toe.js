
/*
Constants
*/
let boardIndexDict = {
    'upper': 0,
    'middle': 1,
    'lower': 2,
    'left': 0,
    'right': 2,
}

var playerOrderCounter = 0;

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
        
            gameLogic.changeTileToOccupiedStatus(tileId);
            displayController.render();
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
    return {
        render,
    }

})();

/**
 * A module representing the players in the game
 */
const players = (() => {
    const playerOneSymbol = 'X';
    const playerTwoSymbol = 'O';

    return {
        playerOneSymbol,
        playerTwoSymbol,
    }
})();

/**
 * A module which controlls the game logic
 */
const gameLogic = (() => {
    
    const play = () => {
        boardChildren = document.getElementById('game-board').children;
        for (let i = 0; i < boardChildren.length; i++) {
            boardChildren[i].addEventListener('click', (event) => {
            gameBoard.addMarkerToBoard(event.target.id);
            });
        }

        restartButton = document.getElementById('restart');
        restartButton.addEventListener('click', gameBoard.resetGameBoard);
    }

    const changePlayer = () => {
        playerOrderCounter += 1
    }

    const checkWin = () => {
        
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
        checkWin,
        changeTileToOccupiedStatus,
        checkTileIfOccupied,
    }
})();

gameLogic.play(); // Activate the game 

