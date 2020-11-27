const gameBoard = (() => {
    const board = [[[],[],[]],[[],[],[]],[[],[],[]]];
    // const newBoard; // resets the game board 
    return {
        board, 
        // newBoard,
    };
})();

/**
 * Game logic representing a player who playes the game
 */
const playerOne = () => {
    const role = () => "";
    // const char = setChar();

    return {
        role
    };
};

const computer = () => {
}


function render() {
    gameBoard.getBoard;
}


/**
 * This code assigns the player a character based on the selected character
 */
characterButtons = document.querySelectorAll(".character-button");
characterButtons.forEach(character => character.addEventListener('click', () => {
    if (character.id == 'naught') {
        playerOne.role = 'O';
    }
}))
// characterButtons.addEventListener('click', assignCharacterToPlayer);
// function assignCharacterToPlayer(e) {
//     console.log(e);
// }
