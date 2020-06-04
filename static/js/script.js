//Challenge 1

function ageInDays() {
  var YearBorn = prompt("What year were you born?");
  num_days = (2020 - YearBorn) * 365;

  var h1 = document.createElement("h1");
  var textAnswer = document.createTextNode(
    "You are " + num_days + " days old!"
  );
  h1.setAttribute("id", "ageInDays");
  h1.appendChild(textAnswer);
  document.getElementById("flex-box-results").appendChild(h1);
}

function reset() {
  document.getElementById("ageInDays").remove();
}

//Challenge 2 CAT GENERATOR

function generate_cat() {
  var image = document.createElement("img");
  var div = document.getElementById("flex-cat-gen");
  image.src = "http://thecatapi.com/api/images/get?format=src&type=gif";
  div.appendChild(image);
}

//Challenge 3 Rock, Paper, Scissors


function rpsGame(yourChoice) {
  //console.log(yourChoice.id);
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(randtoRpsInt());
  //console.log(botChoice)
  results = decideWinner(humanChoice, botChoice); //returns an array eg.[1,0]indicating winner
  //console.log(results)
  message = finalMessage(results); //returns result of game in an object format i.e {'msg':'You won','color':'green'}
  //console.log(message);
  rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randtoRpsInt() {
  return Math.floor(Math.random() * 3);
}
function numberToChoice(number) {
  return ["rock", "paper", "scissors"][number];
}
function decideWinner(yourChoice, computerChoice) {
  var rpsDB = {
    rock: { paper: 0, rock: 0.5, scissors: 1 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { paper: 1, scissors: 0.5, rock: 0 },
  };

  var yourScore = rpsDB[yourChoice][computerChoice];
  var computerScore = rpsDB[computerChoice][yourChoice];

  return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return { msg: "You Lost!", color: "red" };
  } else if (yourScore === 0.5) {
    return { msg: "You Tied!", color: "yellow" };
  } else {
    return { msg: "You Won!", color: "green" };
  }
}

function rpsFrontEnd(humanImgChoice, botImgChoice, finalMessage) {
  var imagesDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };

  //remove all images
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  /*  //dp for user
    var image = document.createElement('img');
    image.src = imagesDatabase[humanImgChoice];
    var div = document.getElementById('flex-box-rps-div');
    div.appendChild(image)

    //dp message
    var h3 = document.createElement('h3');
    var message = document.createTextNode(finalMessage['msg']);
    h3.setAttribute('id','results-message');
    h3.appendChild(message);
    document.getElementById('flex-box-rps-div').appendChild(h3);

      //dp for bot
      var image = document.createElement('img');
      image.src = imagesDatabase[botImgChoice];
      var div = document.getElementById('flex-box-rps-div');
      div.appendChild(image) */

  var userdiv = document.createElement("div");
  var botdiv = document.createElement("div");
  var msgdiv = document.createElement("div");

  userdiv.innerHTML =
    "<img src='" +
    imagesDatabase[humanImgChoice] +
    "' style='box-shadow:0px 10px 50px rgba(37,50,233,1) '>";
  botdiv.innerHTML =
    "<img src='" +
    imagesDatabase[botImgChoice] +
    "' style='box-shadow:0px 10px 50px rgba(243,10,40,1) '>";
  msgdiv.innerHTML =
    "<h1 style='color:" +
    finalMessage["color"] +
    "' >" +
    finalMessage["msg"] +
    "</h1>";

  document.getElementById("flex-box-rps-div").appendChild(userdiv);
  document.getElementById("flex-box-rps-div").appendChild(msgdiv);
  document.getElementById("flex-box-rps-div").appendChild(botdiv);
}

//Challenge 4: Change Colors

var all_buttons = document.getElementsByTagName("button");
console.log(all_buttons);

var copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}
console.log(copyAllButtons);

function buttonColorChange(selectcolor) {
  if (selectcolor.value === "red") {
    buttonRed();
  } else if (selectcolor.value === "green") {
    buttonGreen();
  } else if (selectcolor.value === "random") {
    randomColors();
  } else if (selectcolor.value === "reset") {
    resetColors();
  }
}

function buttonRed() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-danger");
  }
}

function buttonGreen() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-success");
  }
}

function resetColors() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}

/* function randomColors() {
    for(let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(shuffleColors(copyAllButtons)[i]);
    }
}

function shuffleColors(array){
    for(let i = array.length - 1; i > 0;i--){
        let j = Math.floor(Math.random()*(i+1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
} */
// console.log(copyAllButtons)
// console.log(shuffleColors(copyAllButtons))

function randomColors() {
  var choices = ["btn-primary", "btn-danger", "btn-warning", "btn-success"];
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[Math.floor(Math.random() * 4)]);
  }
}

//GHALLENGE 5: BLACKJACK GAME
let blackjackGame = {
  you: { scoreSpan: "#your-score", div: "#your-box", score: 0 },
  dealer: { scoreSpan: "#dealer-score", div: "#dealer-box", score: 0 },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "K", "A", "Q"],
  cardsValue: {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 10,
    K: 10,
    A: [1, 11],
    Q: 10,
  },
  'wins': 0,
  'losses' : 0,
  'draws' : 0,
  'isStand': false,
  'turnsOver': false,
};
const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];
const CARDS = blackjackGame["cards"];
const CARDS_VALUE = blackjackGame["cardsValue"];
const hitSound = new Audio("static/sounds/swish.m4a");
const winSound = new Audio("static/sounds/cash.mp3");
const lossSound = new Audio("static/sounds/aww.mp3");

document.querySelector("#hit-button").addEventListener("click", hitButton);
document.querySelector("#deal-button").addEventListener("click", dealButton);
document.querySelector("#stand-button").addEventListener("click", dealerLogic);
/* 
document.querySelector('#wins').textContent = blackjackGame['wins'];
document.querySelector('#losses').textContent = blackjackGame['losses'];
document.querySelector('#draws').textContent = blackjackGame['draws'];
 */
function hitButton() {
  if (blackjackGame['isStand'] === false){
  card = randomCard();
  console.log(card);
  showCard(card, YOU);
  updateScore(card, YOU);
  showScore(YOU);
  }
}

function showCard(card, activePlayer) {
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  } else {
  }
}

function randomCard() {
  card = CARDS[Math.floor(Math.random() * 13)];
  return card;
}

function updateScore(card, activePlayer) {
  if (card === "A") {
    if (activePlayer["score"] + CARDS_VALUE[card][1] <= 21) {
      activePlayer["score"] += CARDS_VALUE[card][1];
    } else {
      activePlayer["score"] += CARDS_VALUE[card][0];
    }
  } else {
    activePlayer["score"] += CARDS_VALUE[card];
  }
}

function dealButton() {
  if (blackjackGame['turnsOver'] === true){
  let yourImages = document.querySelector("#your-box").querySelectorAll("img");
  let dealerImages = document
    .querySelector("#dealer-box")
    .querySelectorAll("img");

  for (let i = 0; i < yourImages.length; i++) {
    yourImages[i].remove();
  }
  for (let i = 0; i < dealerImages.length; i++) {
    dealerImages[i].remove();
  }
  YOU["score"] = 0;
  document.querySelector(YOU["scoreSpan"]).textContent = YOU["score"];
  DEALER["score"] = 0;
  document.querySelector(DEALER["scoreSpan"]).textContent = DEALER["score"];
  document.querySelector(YOU["scoreSpan"]).style.color = "white";
  document.querySelector(DEALER["scoreSpan"]).style.color = "white";
  document.querySelector('#status').textContent = "Let's Play!";
  document.querySelector('#status').style.color = 'black';

  blackjackGame['isStand'] = false;
}
blackjackGame['turnsOver'] = false;

}

function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "Busted!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
  if(blackjackGame['turnsOver'] === false){
  while(DEALER['score'] < 16){
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }
 
    let winner = computeWinner();
    dispWinner(winner);
    blackjackGame['turnsOver'] = true;
  
}
blackjackGame['isStand'] = true;


}

function computeWinner() {
  let winner;
  if (YOU["score"] <= 21) {
    //Condition higher score than dealer or when dealer is busted and you are less than 21
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      blackjackGame['wins']++;
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"]) {
      blackjackGame['losses']++;
      winner = DEALER;
    } else if (YOU["score"] == DEALER["score"]) {
      blackjackGame['draws']++;
    }
  }
  //condition: when user busts but dealer doesn't
  else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    blackjackGame['losses']++;
    winner = DEALER;
  }
  //condition: when you and dealer busts
  else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    blackjackGame['draws']++;
  }

  console.log("Winner is", winner);
  return winner;
}

function dispWinner(winner) {
  let message, messageColor;
  if (winner === YOU) {
    message = "You Won!";
    messageColor = "green";
    winSound.play();
  } else if (winner === DEALER) {
    message = "You Lost!";
    messageColor = "red";
    lossSound.play();
  } else {
    message = "You Tied!";
    messageColor = "black";
  }

  document.querySelector("#status").textContent = message;
  document.querySelector("#status").style.color = messageColor;

  document.querySelector('#wins').textContent = blackjackGame['wins'];
  document.querySelector('#losses').textContent = blackjackGame['losses'];
  document.querySelector('#draws').textContent = blackjackGame['draws'];

}
