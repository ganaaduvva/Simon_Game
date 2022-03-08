const buttonColours = ["red", "blue", "green", "yellow"];  //set of all colours available to choose
let gamePattern = [];  // array for pattern of game flow
let level = 0 ;   //count the levels of game
let started = false;  //initial start of the game is done by a keypress
let name;  //color name used as a parameter
let userClickedPattern = [];  // the pattern that user clicks is stored in 
let userChoosenColor;  // the color choosen by user at a particular click is stored
var currentLevel;  // holds the level at which game is running

// Initial keypress to Start or Restart the game
$('body').keypress(function (){
  
  if(!started){
    // started is set to true for furthur keypress won't call next level
   started = true;
    // initial keypress calls nextSequence to get a random color for gamePattern to start
   nextSequence(); 
  }
  
});


function nextSequence(){

  // a random color is pushed into gamePattern
  let randomNumber = Math.floor(Math.random()*4);
  let randomChoosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChoosenColour);

  // randomChoosenColor is added an animation and sound effect
  $("#"+ randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSounds(randomChoosenColour);

  // each time nextSequence is called level is increased by 1
  level= level + 1;
  $('#level-title').text("Level " + level);

  // at each level userClickedPattern is made empty
  while(userClickedPattern.length){
    userClickedPattern.pop();
  }

}


// when a user click (choose) the color
$('.btn').click( function(){

  // user's choosen color is accessed
  userChoosenColor = $(this).attr("id");
  
  // user's choosen color is animated and played a sound
  $("#" + userChoosenColor).addClass('pressed');
 setTimeout(function(){
   $("#" + userChoosenColor).removeClass('pressed')
 }, 100); 
  playSounds(userChoosenColor);
  
  // each user choosen color is added into userClickedPattern
  userClickedPattern.push(userChoosenColor);
  
  // each user choosen color is checked against the gamePattern
  checkAnswer(userClickedPattern.length - 1);

});


// This function takes the currentLevel as input 
function checkAnswer(currentLevel){

    // it checks the recent user choosen color against the gamePattern
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

      // if its true then it checks the whole array userClickedPattern aginst gamePattern
      if(JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)){

        // if both pattern matches then nextSequence is called with a dealy of 10ms
       setTimeout(function(){
           nextSequence();
       }, 1000); 

      }

    } else { 
      // if the recent choosen answer is incorrect then "game is over"...

      // changes title to GAME OVER 
      $("#level-title").html("Game Over!!<br>Press Any Key to Restart");

      // adds an animation on wrong answer and played a sound
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      playSounds("wrong");
       
      // shows the actual pattern to user
      $('#solution').text("Answer is: " + gamePattern[gamePattern.length - 1])
      $('#solutionPattern').html("Game Pattern is: " + gamePattern.toLocaleString() );
      

      // calls startOver fuction at the end of game "GAME OVER"
      startOver();
      
    }
}

function playSounds(name){

    // this function plays a sound according to the event 
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();

}

function startOver(){

  // This function sets all the varibles to there inital values
  // And all the arrays to empty 
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;

}