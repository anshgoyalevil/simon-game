
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var ind = 0;
var level = 0;
var flag = false;
var check = 0;

$(".btn").click(function() {
    check++;
  var userChosenColour = $(this).attr("id");
  
  userClickedPattern.push(userChosenColour);
  

  playSound(userChosenColour);
  animatePress(userChosenColour);
    if(check === level){
        checkAnswer();
    }
});

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  
}

//2. Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {

  //3. Take the code we used to play sound in the nextSequence() function and add it to playSound().
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(name){

    $("#" + name).addClass("pressed");

  setTimeout(function () {
    $("#" + name).removeClass("pressed");
  }, 100);

}



$(document).keypress(function (e) { 
    ind++;
    check = 0;
    if(ind === 1){
        userClickedPattern = [];
        nextSequence();
    }
});

function checkAnswer () { 

    for(var i = 0; i<level; i++){
        if(userClickedPattern[i] == gamePattern[i]){
            flag = true;
        }
        else{
            flag = false;
        }
    }
    userClickedPattern = [];

    if(flag === true){
        check = 0;
        setTimeout(function() { nextSequence(); }, 1000);
    }
    else{

        var audio = new Audio("sounds/wrong.mp3");
  audio.play();

  $("body").addClass("game-over");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title").text("Game Over, Press Any Key to Restart");
  level = 0;
  flag = false;
  ind = 0;
  check = 0;
  gamePattern = [];
  userClickedPattern = [];


    }
    

 }
