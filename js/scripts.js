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

var scoreToPlayer = function (currentPlayer, currentTotal) {
  if (currentPlayer === player1) {
    $("#player1-score").text(player1.addScore(currentTotal));
  } else {
    $("#player2-score").text(player2.addScore(currentTotal));
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
    $("#currentPlayerName").text(namePlayer1);
    $("#player1-name").text(namePlayer1);
    $("#player2-name").text(namePlayer2);
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
      scoreToPlayer(currentPlayer, currentTotal);
      playerSwitch();
      $("#currentPlayerName").text(currentPlayer.name);
    } else {
      currentTotal += number;
    }
    $("#roundTotal").text(currentTotal);
  })

  $("#hold").click(function(event) {
    currentPlayer.totals.push(currentTotal);
    scoreToPlayer(currentPlayer, currentTotal);
    currentTotal = 0;
    playerSwitch();
    //console.log(currentPlayer.name);
    $("#currentPlayerName").text(currentPlayer.name);
  })

})
