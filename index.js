//TODO: add the remining two ways to win the game
const GameBoard = (function () {
  let gameboard = [];
  let winner = '';

  //push last play into the gameboard
  const inputPlay = (input) => gameboard.push(input);
  //return wether there has been a winner yet or not
  const checkWinner = () => winner;

  const resetGame = () => {
    gameboard = [];
    winner = '';
    alert('a new game starts')
  };

  //Every possible combination to win
  let topCombination = () => {
    return [...document.querySelectorAll('.top')].map(obj => obj.innerHTML);
  };
  let rightCombination = () => {
    return [...document.querySelectorAll('.right')].map(obj => obj.innerHTML);
  };
  let bottomCombination = () => {
    return [...document.querySelectorAll('.bot')].map(obj => obj.innerHTML);
  };
  let leftCombination = () => {
    return [...document.querySelectorAll('.left')].map(obj => obj.innerHTML);
  };
  let centerCombination = () => {
    let topSquare = document.querySelector('.top.mid');
    let middleSquare = document.querySelector('.middle.mid');
    let bottomSquare = document.querySelector('.bot.mid');

    return [topSquare.innerHTML, middleSquare.innerHTML, bottomSquare.innerHTML];
  }
  let middleCombination = () => {
    return [...document.querySelectorAll('.middle')].map(obj => obj.innerHTML);
  };
  let leftCrossCombination = () => {
    let topSquare = document.querySelector('.top.left');
    let middleSquare = document.querySelector('.middle.mid');
    let bottomSquare = document.querySelector('.bot.right');

    return [topSquare.innerHTML, middleSquare.innerHTML, bottomSquare.innerHTML];
  }
  let rightCrossCombination = () => {
    let topSquare = document.querySelector('.top.right');
    let middleSquare = document.querySelector('.middle.mid');
    let bottomSquare = document.querySelector('.bot.left');

    return [topSquare.innerHTML, middleSquare.innerHTML, bottomSquare.innerHTML];
  }

  const checkGameboardStatus = (array) => {
    if(array.every(value => value == array[0])){
      winner = `${array[0]}`
      console.log(`The winner is ${array[0]}`)
    }
  }

  const declareWinner = () => {
    if(gameboard.length < 5) return
    checkGameboardStatus(topCombination());
    checkGameboardStatus(leftCombination());
    checkGameboardStatus(rightCombination());
    checkGameboardStatus(bottomCombination());
    checkGameboardStatus(centerCombination());
    checkGameboardStatus(middleCombination());
    checkGameboardStatus(leftCrossCombination());
    checkGameboardStatus(rightCrossCombination());
  }

  //evaluate if the game is a tie
  const endGameTie = () => {
    if (gameboard.length == 9 && winner == ''){
      return alert("No one wins, it's a tie")
    }
  }

  const playingState = (input) => {
    if(winner == ''){
      inputPlay(input);
      declareWinner();
      endGameTie();
    }else{
      alert('There has already been a winner')
    }
  }

  return { playingState, checkWinner, resetGame }
})();

const Gameflow = (function() {
  const { playingState, resetGame } = GameBoard

  let turnPlayer = 'X';
  let pointAssigned = false;

  const getPointAssignedStatus = () => pointAssigned;
  const handlePointAssigned = () => pointAssigned = !pointAssigned;

  const changeTurnPlayer = () => {
    turnPlayer == 'X' ? turnPlayer = 'O' : turnPlayer = 'X'
  }
  const resetPlayer = () => turnPlayer = 'X';
  const getPlayerInTurn = () => turnPlayer

  const handleReset = () => {
    resetGame();
    resetPlayer();
    handlePointAssigned();
  };

  const sendPlayerInput = (input) => playingState(input);

  return { playingState, sendPlayerInput, handleReset, changeTurnPlayer, getPlayerInTurn, getPointAssignedStatus, handlePointAssigned }
})();

const Player = (function(){
  const { sendPlayerInput, changeTurnPlayer, getPlayerInTurn } = Gameflow

  const printMark = () =>{
    sendPlayerInput(getPlayerInTurn());
    changeTurnPlayer();
  }

  return { sendPlayerInput, printMark, getPlayerInTurn }
})();

const domRender = (function(){

  let { getPlayerInTurn, printMark } = Player;
  let { checkWinner } = GameBoard;
  const { handleReset, getPointAssignedStatus, handlePointAssigned } = Gameflow;

  const button = document.querySelector('.reset');
  const scoreX = document.querySelector('.score-X');
  const scoreO = document.querySelector('.score-O');

  const resetDomBoardHandler = () => {
    const squares = document.querySelectorAll('.gameboard-square');

    squares.forEach(square => {
      square.innerHTML = '';
    })
  }

  const increseScore = (elm) => {
    if(getPointAssignedStatus() == true) return;
    if(elm.innerHTML == ''){
      elm.innerHTML = '1'
      handlePointAssigned();
    }else{
      elm.innerHTML = Number(elm.innerHTML)+1
      handlePointAssigned();
    }
  }

  const renderScore = () => {
    if(checkWinner() != ''){
      if(checkWinner() == 'X'){
        increseScore(scoreX)
        return true
      }
      if(checkWinner() == 'O'){
        increseScore(scoreO)
        return true
      }
      return false
    }
  }

  button.addEventListener('click', () => handleReset());
  button.addEventListener('click', () => resetDomBoardHandler());

  const renderPlay = window.addEventListener('click', (e) => {
    if(renderScore()) return
    
    if(e.target.className.includes('gameboard-square') && e.target.innerHTML == ''){
      e.target.innerHTML = getPlayerInTurn();
      printMark()
      renderScore()
    }
  })

  return { renderPlay, button }
})()