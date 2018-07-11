
let userGuess = '';
let pastGuesses = [];
let x = 0;
let players = [];
let difference = [];
let gameGuess = parseInt(getRandom(1, 10));


function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function printMessage(response) {
  document.querySelector('#message').innerHTML = `${userGuess} is ${response}, try again. ${10 - pastGuesses.length} guesses left.<br>
    Previous guesses: ${pastGuesses.join(', ')}`
}


function printScoreBoard(initials) {
  // create player object
  players[x] = {};
  players[x].rank = '';
  players[x].score = 11000 - pastGuesses.length * 1000;
  players[x].name = initials;

  // sort and rank players by highest score
  players.sort(function(a, b){return b.score - a.score});
  for (let j=0; j<players.length; j++) {
    players[j].rank = j + 1;
  }
      
  // output the scoreboard to html page
  let hall = document.querySelector('#hall');
  let rankScoreName = document.querySelector('#rankScoreName');
  let scoreOutput = document.querySelector('#scoreOutput');

  scoreOutput.innerHTML = ""; // this line prevents the duplicate outputs. the html ouput using document.write loops 1 time more than console.
  hall.innerHTML = "--- HALL OF FAME ---";
  rankScoreName.innerHTML= "Rank &nbsp;| &nbsp;  Score  &nbsp; | &nbsp; Name"

  for(let z=0; z < players.length; z++) {
    let {rank: r, score: s, name: n} = players[z];
    scoreOutput.innerHTML += `${r} &emsp;&emsp;&ensp; ${s} &emsp;&emsp;&ensp; ${n} <br>`;
  } 
}


function handleGuess() {

  userGuess = document.getElementById("myInput").value;
  if (pastGuesses.includes(userGuess) === true || isNaN(userGuess) || !userGuess) {
    alert(`${userGuess} is invalid  please try again`)
    return;
  } 

  pastGuesses.push(document.getElementById("myInput").value);
  difference.push(Math.abs(gameGuess - userGuess));
  document.querySelector('#myInput').value = '';


  // valid but incorrect guess
  if (userGuess != gameGuess && pastGuesses.length < 2) {
    printMessage('wrong');
    } else if (userGuess != gameGuess && pastGuesses.length > 1) {
      if (difference[pastGuesses.length-1] < difference[pastGuesses.length-2]) {
        printMessage('hotter');
      } else {
        printMessage('colder');
      }       
      
  // correct guess
    } else {
      let initials = prompt('Congratulations you win! Please give us your intitials for the record books')
      let restartGame = confirm('Would you like to play again?');
    
      // replay game
      if (restartGame === true) {
        printScoreBoard(initials);
        x += 1;   // increment the game count
        
      // reset values for new game
      gameGuess = parseInt(getRandom(1, 10));
      pastGuesses = [];
      difference = [];
      document.querySelector('#message').innerHTML = '';
        
        
      } else {
        // Exit game say goodbye, print scoreboard and disable buttons
        printScoreBoard(initials);
        document.querySelector('#message').innerHTML = 'Game Over';
        document.querySelector('#myBtn').disabled = true;
        document.querySelector('#myInput').disabled = true;
      }
  }  
}

// textbox, button event handlers and instructions message.
document.querySelector('#header').style.backgroundColor = '#CFF9C4';
document.querySelector('#instructions').innerHTML = "Guess a number between 1 and 10.<br><i><font size ='2'> Repeat guesses and non-numbers are invalid</font></i>"
document.querySelector('#myBtn').addEventListener('click', handleGuess);
document.getElementById("myInput").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("myBtn").click();
    }
});