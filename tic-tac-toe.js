
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


/**
 * A module which is repsonsible for the game-board.
 */
const gameBoard = (() => {
    const board = [[[],[],[]],[[],[],[]],[[],[],[]]];

    const logBoardToConsole = () => console.log(board);
    
    const addMarkerToBoard = (tileId) => { 
        let idConstituents = tileId.split('-'); // splits the id to get the index
        board[boardIndexDict[idConstituents[0]]][boardIndexDict[idConstituents[1]]] = 'X'; // NEED to ADD player Symbol
        displayController.render();
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
 * A factory function representing a player of the game. 
 */
const player = (playerName, playerSymbol) => {
    
    const getPlayerName = () => playerName;
    const getPlayerSymbol = () => playerSymbol;

    return {
        getPlayerName,
        getPlayerSymbol,
    }
}

/**
 * A module which controlls the game logic
 */
const gameLogic = (() => {

})();



boardChildren = document.getElementById('game-board').children;
for (let i = 0; i < boardChildren.length; i++) {
    boardChildren[i].addEventListener('click', (event) => {
        gameBoard.addMarkerToBoard(event.target.id);
    });
}

restartButton = document.getElementById('restart');
restartButton.addEventListener('click', gameBoard.resetGameBoard);
