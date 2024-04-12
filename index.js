//there are 8 ways to win this game, but how?
const GameBoard = (function () {
  let gameboard = [];

  const inputPlay = (input) => gameboard.push(input);
  const currentGameState = () => console.log(gameboard);
  const declareWinner = () => console.log('There was a winner...?')
  const playingState = (input) => {
    declareWinner();
    if (gameboard.length == 9){
      return alert("No one wins, it's a tie")
    }
    inputPlay(input);
    currentGameState();
  }

  return {playingState, currentGameState}
})();

const Gameflow = (function() {
  const {playingState} = GameBoard

  const sendPlayerInput = (input) => playingState(input);

  return { playingState, sendPlayerInput }
})();


//i may actually need two players or not...?
const Player = (function(){
  const { sendPlayerInput } = Gameflow
  
  let turnPlayer = 'X';

  const changeTurnPlayer = () => turnPlayer == 'X' ? turnPlayer = 'O' : turnPlayer = 'X';
  const getPlayerInTurn = () => turnPlayer
  const printMark = () =>{
    sendPlayerInput(turnPlayer);
    changeTurnPlayer();
  }

  return { sendPlayerInput, printMark, getPlayerInTurn}
})();

const domRender = (function(){

  let { getPlayerInTurn, printMark } = Player

  const renderPlay = window.addEventListener('click', (e) => {
    if(e.target.className == 'gameboard-square' && e.target.innerHTML == ''){
      e.target.innerHTML = getPlayerInTurn();
      printMark()
    }else{
      console.log(`Invalid input`)
    }
  })

  return {renderPlay}
})()

window.addEventListener('click', (e) => {
  // Player.printMark
});