
/*
Constants
*/
upper = 0;
middle = 1;
lower = 2;
left = 0;
right = 2;

/**
 * A module which is repsonsible for the game-board.
 */
const gameBoard = (() => {
    const board = [[[],[],[]],[[],[],[]],[[],[],[]]];
    const newBoard = [[[],[],[]],[[],[],[]],[[],[],[]]];


    const logBoardToConsole = () => console.log(board);
    
    const addMarkerToBoardAndRender = (tileId) => { 
        let idConstituents = tileId.split('-'); // splits the id to get the index
        board[idConstituents[0]][idConstituents[1]] = 'X'; // NEED to ADD player Symbol
        displayController.render();
    }

    const resetGameBoard = () => {
        board = newBoard;
    }
    return {
        board, 
        newBoard, 
        logBoardToConsole,
        addMarkerToBoardAndRender,
        resetGameBoard,
    };
})();

/**
 * A module respoinsible for rendering the board data to the 
 * grid display. 
 */
const displayController = (() => {
    const render = () => {
        document.getElementById('upper-left').innerHTML = gameBoard.board[upper][left];
        document.getElementById('upper-middle').innerHTML = gameBoard.board[upper][middle];
        document.getElementById('upper-right').innerHTML = gameBoard.board[upper][right];
        document.getElementById('middle-left').innerHTML = gameBoard.board[middle][left];
        document.getElementById('middle-middle').innerHTML = gameBoard.board[middle][middle];
        document.getElementById('middle-right').innerHTML = gameBoard.board[middle][right];
        document.getElementById('lower-left').innerHTML = gameBoard.board[lower][left];
        document.getElementById('lower-middle').innerHTML = gameBoard.board[lower][middle];
        document.getElementById('lower-right').innerHTML = gameBoard.board[lower][right];

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
// const gameLogic = (() => {

//     const tileClickEvent = () => {
        
//     }

//     return {
//         tileClickEvent,
//     }

// })();

boardChildren = document.getElementById('game-board').children;
for (let i = 0; i < boardChildren.length; i++) {
    boardChildren[i].addEventListener('click', (event) => {
        gameBoard.addMarkerToBoardAndRender(event.target.id);
    });
}

