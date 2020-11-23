const gameBoard = () => {
    const board = [[[],['O'],[]],[[],['X'],[]],[[],[],[]]];
    const getBoard = () => console.log(board);
    return {getBoard};
} 

const player = (name, character) => {
    const getName = () => name;
    const getChar = () => character;
}


function render() {
    gameBoard.getBoard;
}