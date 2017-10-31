// initialize global variables
var currentTotal = 0;
var player1;
var player2;
var currentPlayer;

function Player (name) {
  this.name = name;
  this.totals = [];
}

Player.prototype.addScore = function(currentTotal) {
  var playerScore = 0;
  this.totals.forEach(function(total) {
    playerScore += total;
  })
  return playerScore;
}

var playerSwitch = function() {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  } else {
    currentPlayer = player1;
  }
}

$(document).ready(function() {

  $("#playerNames").submit(function(event) {
    event.preventDefault();

    namePlayer1 = $("#player1").val();
    namePlayer2 = $("#player2").val();

    player1 = new Player(namePlayer1);
    player2 = new Player(namePlayer2);
    currentPlayer = player1;
    //console.log(currentPlayer);

    $("#playerNames").hide();
    $(".scores").show();
    $(".play").show();

  })

  $("#roll").click(function(event) {
    var number = Math.ceil(Math.random() * 6);
    $("#rollResult").text(number);
    if (number === 1) {
      currentTotal = 0;

      playerSwitch();
    } else {
      currentTotal += number;
    }
  })

  $("#hold").click(function(event) {

    currentPlayer.totals.push(currentTotal);
    $("#player1-score").text(player1.addScore(currentTotal));

    playerSwitch();
  })

})
