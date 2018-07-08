//noprotect

let restartGame = false;
let players = [];
let x = 0;     // will serve as count for how many times game played

do {

  // get random number function
  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

  function promptUser(response) {
    if (response == 'invalid') {
      response = 'invalid. (repeat guesses, strings, and negative numbers not permitted.)'
    }
    userGuess = prompt(`${userGuess} is ${response}, try again. ${10 - pastGuesses.length} guesses left.
    Previous guesses: ${pastGuesses.join(', ')}`);
  }


  let pastGuesses = [];
  let gameGuess = parseInt(getRandom(1, 10));
  let userGuess = prompt('Guess a number from 1 to 10. (Press cancel to exit game)');
  let difference = Math.abs(gameGuess - userGuess);

  // loop for number of guess attempts
  for (let i=0; i<10; i++) {
    
    // if user clicks cancel button game exits
    if (userGuess == null) {
      break;
    }
    
    // invalid user input: strings, repeat values, and neg numbers. game prompts for new value, no turn is lossed
    if (pastGuesses.includes(userGuess) === true || isNaN(userGuess) || userGuess < 0) {
      promptUser('invalid')
      i = i -1 ;
      continue;     // breaks this iteration of the loop and will not push into pastGuesses array
    } 
    
    // adds user's guessed number into array of past guesses
    pastGuesses.push(userGuess);


    // user input is valid but 1st guess is incorrect
    if (userGuess != gameGuess && pastGuesses.length<2) {
      promptUser('wrong');
        
    // 'hotter' or 'colder' hint given if more than 1 incorrect guess
    } else if (userGuess != gameGuess && pastGuesses.length>1) {
        if (difference > Math.abs(userGuess - gameGuess)) {
          difference = Math.abs(userGuess - gameGuess);
          promptUser('hotter');
        } else {
          difference = Math.abs(userGuess - gameGuess);
          promptUser('colder');
        }
    
    // correct guess - prompt for user initials, present the scoreboard, and ask to continue or quit game
    } else {
      initials = prompt(`Great guess! ${gameGuess} is my number you win. Enter your initials for the record books!`);
      
      players[x] = {};
      players[x].rank = '';
      players[x].score = 11000 - pastGuesses.length * 1000;
      players[x].name = initials;
      

      // sort and rank players by highest score
      players.sort(function(a, b){return b.score - a.score});
      for (let j=0; j<players.length; j++) {
        players[j].rank = j + 1;
      }
      
      // output the scoreboard to the console
      console.clear();
      console.log('--- HALL OF FAME ---')
      console.log('Rank | Score | Name');
      for (let y=0; y < players.length; y++) {
        console.log(Object.values(players[y]).join('      '));
      }
     
      x = x + 1;
      restartGame = confirm('Play again?');
      break;
    }

  }  // end for loop
} while (restartGame == true);
