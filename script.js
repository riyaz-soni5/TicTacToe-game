// constructor for making a player object contains sign as parameters 
const Player=((sign)=>{

  let playerWinCount = 0;


  //method to get the player sign 
  const getSign = ()=> sign;
  const playerWinCountIncrease = ()=> playerWinCount++
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

    if(Gameboard.getboard(indexValue)===''){

      Gameboard.insertInBoard(indexValue, getCurrentPlayer().getSign());
      // checks winner 

      if(checkWinner(indexValue)){
        isOver=true
      }
      else if(moves>=8){
        movesOver = true;
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


  const ValidInput = ()=>{
    let vaildInput = false;
    let playerMove;

      while(!vaildInput){
        playerMove = prompt(`Its ${GameControl.getCurrentPlayer().getSign()} turn, Place your move`);

        if(playerMove!=''){

          if(!isNaN(playerMove)){
            playerMove = parseInt(playerMove);
            if(playerMove>0 && playerMove<=9){
              vaildInput = true;
              return playerMove
            }
            else{
              console.log("\nPlease input from range 1-9\n");
             
            }
  
          }
          else{
            console.log(`\nYour input ${playerMove} is invalid, Please enter vaild input(1-9)`);
          }  

        }
        else{
          console.log("\nEmpty Input is not excepted! Please enter a vaild input (1-9)");
        }


      }
  }


  
  const getIsOver = ()=> isOver

  const getMovesOver = ()=> movesOver

  const getMoves = ()=> moves;

  const setIsOverFalse = ()=> isOver = false;
  const setMovesOverFalse = ()=> movesOver = false
  
  const getRound= ()=> round;

  const nextRound = ()=>{
    round++;
    moves=0;
  }

  const displayBoard = ()=>{
    const matrixarray = [...Gameboard.getFullBoard()];

    console.log("\n")
    for(let i=0;i<3;i++){
      console.log(matrixarray.splice(0,3))
    }

  }
  
  
  
  return {getCurrentPlayer,getIsOver,playRound,getRound,getMoves,setIsOverFalse,nextRound,displayBoard,ValidInput,getMovesOver,setMovesOverFalse}
  
  
})();


// display controller object 
const displayControl = (()=>{

  

  
  do{
    GameControl.displayBoard();
    
    if(GameControl.getIsOver()){

      GameControl.getCurrentPlayer().playerWinCountIncrease();
      
      if(GameControl.getCurrentPlayer().getPlayerWinCount()>=3){
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
    else if(GameControl.getMovesOver()){
      console.log("It's a tie");
      GameControl.nextRound();
      GameControl.setMovesOverFalse();
      Gameboard.resetboard();

      
    }
    else{
      let validPlayerMove = GameControl.ValidInput();
      GameControl.playRound(validPlayerMove-1);

    }

  }while(GameControl.getMoves()<=8)
})();