// constructor for making a player object contains sign as parameters 
const Player=((sign)=>{

  let PlayerSign = sign;
  let playerWinCount = 0;


  //method to get the player sign 
  const getSign = ()=> PlayerSign;


  const resetWinCount = ()=> playerWinCount = 0;



  return {getSign,playerWinCount,resetWinCount}
});

// Gameboard object
const Gameboard = (()=>{

  // gameboard array where players sign are stored 
  let gameboard = ['','','','','','','','',''];
  

  // method to place sign in the gameboard array
  const insertInBoard = (indexvalue,sign)=>{
    if(indexvalue>gameboard.length) return
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
  let player2 = Player("0");
  

  // round varible to track the rounds 
  let round=1;
  let moves=1;

  // tracks if the round is over or not
  let isOver = false;
  let GameOver = false
  
  // method to play a round where index value is taken at parameters 
  const playRound = (indexValue)=>{

    if(Gameboard.getboard(indexValue)===''){

      Gameboard.insertInBoard(indexValue, getCurrentPlayer().getSign());``
      // checks winner 

      if(checkWinner(indexValue)|| moves>=9){
        isOver=true
      }
      else{
        moves++;
      }
    

    }else{
      console.log("Place Already occupied");
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

  
  const getIsOver = ()=> isOver

  const getMoves = ()=> moves;

  const setIsOverFalse = ()=> isOver = false;
  
  const getRound= ()=> round;

  const nextRound = ()=>{
    round++;
    moves=0;
  }
  
  
  
  return {getCurrentPlayer,getIsOver,playRound,getRound,getMoves,setIsOverFalse,nextRound}
  
  
})();


// display controller object 
const displayControl = (()=>{

  const displayBoard = ()=>{

    const matrixarray = [...Gameboard.getFullBoard()];

    console.log("\n")
    for(let i=0;i<3;i++){
      console.log(matrixarray.splice(0,3))
    }

    
  }
  
  do{
    displayBoard();
    if(GameControl.getIsOver()){
      if(GameControl.getMoves()>=9){
        console.log("It's a tie");
        GameControl.nextRound();
        GameControl.setIsOverFalse();
        Gameboard.resetboard();

      }
      else{
        GameControl.getCurrentPlayer().playerWinCount++;

        if(GameControl.getCurrentPlayer().playerWinCount>=3){
          console.log(`Game Over! ${GameControl.getCurrentPlayer().getSign()} WON!`);
          break;
        }
        else{
          console.log(`${GameControl.getCurrentPlayer().getSign()} wins this round!`);
          GameControl.nextRound();
          GameControl.setIsOverFalse();
          Gameboard.resetboard();
        }
          
          
        }
      }
    else{
      let playerMove = parseInt(prompt(`Its ${GameControl.getCurrentPlayer().getSign()} turn, Place your move`));
      GameControl.playRound(playerMove);

    }

  }while(GameControl.getMoves()<=9)
})();







// task to do today 

// check winning of a player

// roundOver and GameOver are two different thing

// round is over when a player wins a round but game over is when a player wins 3 times 

//
