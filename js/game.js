// Those are global variables, they stay alive and reflect the state of the game
var elPreviousCard = null;
var flippedCouplesCount = 0;
var gameReset=0;
var isProcessing = false;
var gameTimeStart;
var gameTimeFinnish;
var firstCard=true;
var gameTime=0;
var lastGame=localStorage.getItem('lastGameTime');
var bestTime=0;
var bestTimeEver=localStorage.getItem('bestTimeClear');
var elBestTime=document.querySelector('.bestGame');
var elGameTime=document.querySelector('.currentGame');
// This is a constant that we dont change during the game (we mark those with CAPITAL letters)
var TOTAL_COUPLES_COUNT = 8;

// Load an audio file
var audioWin = new Audio('sound/win.mp3');
var audioWrong = new Audio('sound/wrong.mp3');
var audioRight = new Audio('sound/right.mp3');

var userName;

userNameLogin();
shuffleBoard();

userName=localStorage.getItem('userName');
var elUserName=document.querySelector('.userName');
elUserName.innerText ='Hello '+userName;

elBestTime.innerText= 'The Best time is: ' + bestTimeEver;


function userNameLogin() {
    if(localStorage.getItem('userName')==undefined||
localStorage.getItem('userName')==null|| 
localStorage.getItem('userName')==''){
localStorage.setItem('userName',  userName=prompt('Enter your name'));
}
}

// This function is called whenever the user click a card
function cardClicked(elCard) {
    if(firstCard==true){
      gameTimeStart=Date.now();
      firstCard=false;
    }

    if(isProcessing==true) return;
    

    // If the user clicked an already flipped card - do nothing and return from the function
    if (elCard.classList.contains('flipped')) {
        return;
    }

    // Flip it
    elCard.classList.add('flipped');

    // This is a first card, only keep it in the global variable
    if (elPreviousCard === null) {
        elPreviousCard = elCard;
    } else {
        // get the data-card attribute's value from both cards
        var card1 = elPreviousCard.getAttribute('data-card');
        var card2 = elCard.getAttribute('data-card');
         isProcessing=true;
      
        // No match, schedule to flip them back in 1 second
        
         
        if (card1 !== card2){
            
            setTimeout(function () {
                elCard.classList.remove('flipped');
                elPreviousCard.classList.remove('flipped');
                elPreviousCard = null;
                audioWrong.play();
                isProcessing=false;
            }, 1000 )

             

        } else {
            // Yes! a match!
            flippedCouplesCount++;
            elPreviousCard = null;
            isProcessing=false;
           if(TOTAL_COUPLES_COUNT != flippedCouplesCount){
               audioRight.play();
           }

            // All cards flipped!
           else if (TOTAL_COUPLES_COUNT === flippedCouplesCount) {
              gameTimeFinnish=Date.now();
              gameTime=gameTimeFinnish-gameTimeStart;
            toggleVisibility('playAgain');
                audioWin.play();
                firstCard=true;
                elGameTime.innerText = 'Last game time:' + gameTime;
              
                if(gameTime<bestTimeEver){
                
                   newRecord();
                }
               
                
                
            }

        

    }

    }
}

function toggleVisibility(button) {
    var visBtn = document.getElementById(button);
    if(visBtn.style.display == 'block'){
       visBtn.style.display = 'none';
       gameReset=0;
    }
    else{
       visBtn.style.display = 'block';
       gameReset=1;
    }
    
       
}

var elDivs= document.querySelectorAll('div');

function resetGame(){
   flippedCouplesCount=0;
   shuffleBoard();
   console.log(flippedCouplesCount);
   for(var i=0; i<elDivs.length; i++){
       elDivs[i].classList.remove('flipped');
   }
   if(gameReset==1){
       toggleVisibility('playAgain');
   }
}


function changeUserName(){
    localStorage.setItem('userName',  playerName=prompt('Enter your name'));
    userName=localStorage.getItem('userName');
    elUserName.innerText ='Hello '+userName;
}

function newRecord(){
bestTime=gameTime;
elBestTime.innerText= 'The Best time is: ' + bestTime;
  localStorage.setItem('bestTimeClear' , bestTime);
  
}


function shuffleBoard(){
    var board = document.querySelector('.board');
    for (var i = board.children.length; i >= 0; i--) {

    
     board.appendChild(board.children[Math.random() * i | 0]);}
}