
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
    const board = [[[],[],['Hello']],[[],[],[]],[[],[],[]]];
    const newBoard = [[[],[],[]],[[],[],[]],[[],[],[]]];

    const logBoardToConsole = () => console.log(board);
    
    const addMarkerToBoardAndRender = () => { 
        board[upper][left] = 'X';
        displayController.render();
    }

    const resetGameBoard = () => {
        board = newBoard;
    }
    return {
        board, 
        newBoard,
        upperLeft,
        upperMiddle,
        upperRight,
        middleLeft, 
        middleMiddle,
        middleRight,
        lowerLeft,
        lowerMiddle,
        lowerRight, 
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
        document.getElementById('upperLeft').innerHTML = gameBoard.upperLeft;
        document.getElementById('upperMiddle').innerHTML = gameBoard.upperMiddle;
        document.getElementById('upperRight').innerHTML = gameBoard.upperRight;
        document.getElementById('middleLeft').innerHTML = gameBoard.middleLeft;
        document.getElementById('middleMiddle').innerHTML = gameBoard.middleMiddle;
        document.getElementById('middleRight').innerHTML = gameBoard.middleRight;
        document.getElementById('lowerLeft').innerHTML = gameBoard.lowerLeft;
        document.getElementById('lowerMiddle').innerHTML = gameBoard.lowerMiddle;
        document.getElementById('lowerRight').innerHTML = gameBoard.lowerRight;

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
        gameBoard.addMarkerToBoardAndRender();
    });
}

