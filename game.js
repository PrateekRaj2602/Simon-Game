
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var start = false;

$(document).on("keypress", function(){
  if(!start){
    nextSequence();
    start = true;
  }
});

function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

  $("h1").html("Level " + level++);

}

$(".btn").on("click", function(){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  animatePress(this.id);
  playSound(this.id);
  check();
});




function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(name){
  $("#" + name).addClass("pressed");
  setTimeout(function(){
    $("#" + name).removeClass("pressed");
  }, 100);
}


function check(){
  if(userClickedPattern[userClickedPattern.length -1] != gamePattern[userClickedPattern.length-1]){
    playSound("wrong");
    $("h1").html("Game Over, press any key to restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    userClickedPattern = [];
    gamePattern = [];
    level = 0;
    start = false;
  }else{
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);

    }
  }
}
