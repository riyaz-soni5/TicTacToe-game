// constructor for making a player object contains sign as parameters 
const Player=((sign)=>{

  let playerWinCount = 0;


  //method to get the player sign 
  const getSign = ()=> sign;
  const playerWinCountIncrease = ()=> playerWinCount+=1;
  const getPlayerWinCount = ()=> playerWinCount;


  const resetWinCount = ()=> playerWinCount = 0;



  return {getSign,playerWinCount,resetWinCount,playerWinCountIncrease,getPlayerWinCount}
});

// Gameboard object
const Gameboard = (()=>{

  // gameboard array where players sign are stored 
  let gameboard = ['','','','','','','','',''];
  

  // method to place sign in the gameboard array
  const insertInBoard = (indexvalue,sign)=>{
    if(indexvalue>=gameboard.length) return
    gameboard[indexvalue] = sign;
  }

  // method to get the specific index value from the gameboard array
  const getboard = (indexvalue)=>{
    return gameboard[indexvalue];
  }

  // method to get the gameboard array
  const getFullBoard = () =>{
    return gameboard;
  }


  // method to reset the gameboard 
  const resetboard = ()=>{
    for(let i=0; i<gameboard.length;i++){
      gameboard[i]='';
    }
  }


  return {insertInBoard,getboard,resetboard,getFullBoard}

})();


// GameControl object for controlling the game
const GameControl = (()=>{

  // creating two players: player1 and player 2 using Player constructor 
  let player1 = Player("X");
  let player2 = Player("O");

  

  // round varible to track the rounds 
  let round=1;
  let moves=0;

  // tracks if the round is over or not
  let isOver = false;
  let movesOver = false;
  
  // method to play a round where index value is taken at parameters 
  const playRound = (indexValue)=>{

    Gameboard.insertInBoard(indexValue,getCurrentPlayer().getSign());

    if(checkWinner(indexValue)){
      getCurrentPlayer().playerWinCountIncrease();
      isOver=true;
    }
    else if(moves>=8){
      movesOver = true;
    }
    else{
      moves++;
    }
  }
  
  // method to get current player sign 
  const getCurrentPlayer = ()=>{
    return (moves%2 === 0)? player1: player2;
  }
  

  // checks winner by looking at the winner possibilties
  const checkWinner = (indexValue)=>{
    
    const winnerConditions = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
      
    ]
    
    return winnerConditions.filter((condtions)=> condtions.includes(indexValue)).some((condtionsPossibility)=> condtionsPossibility.every((index)=> Gameboard.getboard(index) === getCurrentPlayer().getSign()));
    
  }



  
  const getIsOver = ()=> isOver;

  const getMovesOver = ()=> movesOver

  const getMoves = ()=> moves;
  
  const getRound= ()=> round;

  let boardGui = document.querySelectorAll('.board-item');


  const resetGuiBoard = ()=>{
    boardGui.forEach((item)=>{
      item.innerText = '';
    })
  }



  const resetGame = (nextGame = false)=>{
    Gameboard.resetboard();
    resetGuiBoard();
    if(nextGame){
      round =1;
      player1.resetWinCount();
      player2.resetWinCount();

    }
    else{
      round++;

    }
    moves=0;
    isOver = false;
    movesOver = false;
    
  }

  
  
  return {player1,player2,getCurrentPlayer,getIsOver,playRound,getRound,getMoves,resetGame,getMovesOver,boardGui}
  
  
})();


// display controller object 
const displayControl = (()=>{


  let player1signDisplay = document.querySelector('#player-1-marker');
  let player2signDisplay = document.querySelector("#player-2-marker");

  player1signDisplay.innerText = GameControl.player1.getSign();
  player2signDisplay.innerText = GameControl.player2.getSign();

  let player1winCount = document.querySelector("#player1-win-count");
  let player2winCount = document.querySelector('#player2-win-count');
  let tieCounter = document.querySelector('#tie-count');

  let tie =0;

  let closeBtn = document.querySelector('#close-button');
  
  closeBtn.addEventListener('click',()=>{
    GameControl.resetGame(true);
    player1winCount.innerText = '0';
    player2winCount.innerText = '0';
    tieCounter.innerText ='0';
    roundOverModal.close();

  })

  let roundOverModal = document.querySelector('dialog');
  let winner = document.querySelector('#winner');

  let winnerBoard = document.querySelector('#win-board');


  const displayUpdatedWinCount = ()=>{
    player1winCount.innerText = String(GameControl.player1.getPlayerWinCount());
    player2winCount.innerText = String(GameControl.player2.getPlayerWinCount());
  }


  const displayRoundWinner = ()=>{
    winnerBoard.innerText = `${GameControl.getCurrentPlayer().getSign()} WINS!`;
    winnerBoard.style.visibility = "visible";
  }

  GameControl.boardGui.forEach((item,index) => {
    item.addEventListener('click',(e)=>{
      if(e.target.innerText == ''){

        e.target.innerText = GameControl.getCurrentPlayer().getSign();
        GameControl.playRound(index);


        if(GameControl.getIsOver()){
          if(GameControl.getCurrentPlayer().getPlayerWinCount()>=3){
            winnerBoard.innerText = '';
            winner.innerText = `${GameControl.getCurrentPlayer().getSign()} is the Winner!`;
            roundOverModal.showModal();
          }
          else{
            displayRoundWinner();
            displayUpdatedWinCount();
            GameControl.resetGame();
          }
        }
        else if(GameControl.getMovesOver()){
            tie+=1
            tieCounter.innerText = `${tie}`;
            winnerBoard.innerText = 'TIE!';
            winnerBoard.style.visibility = "visible";
            GameControl.resetGame();
        }

      }

    })
    
  });


})();