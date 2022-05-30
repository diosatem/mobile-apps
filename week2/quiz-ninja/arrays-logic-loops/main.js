const quiz = [
    ["What is Superman's real name?","Clark Kent"],
    ["What is Wonder Woman's real name?","Diana Prince"],
    ["What is Batman's real name?","Bruce Wayne"]
];

/*We'll start by creating an array called quiz that contains all the questions and answers. Each element in quiz will be a nested array that contains the question as its first element and the answer as its second element. Open up main.js and add the following code at the top:
Next, we’ll create and initialize a variable called score to keep track of how many correct answers the player has given:
Then we'll loop through the array using a for-of loop, assigning the variables question and answer to each key and value in the map.

The loop starts by asking the question using a prompt dialog that allows the player to enter an answer that is stored in a variable called response. We can then compare this to the actual answer stored as answer:
An if ... else block is then used to check if the answer is right or wrong. If it’s right, an alert dialog is shown saying it is correct and the score is incremented by 1, using score++. Otherwise, if the answer is wrong, an alert dialog informs the player and also lets them know the correct answer.

When the loop has finished iterating through each question in the array, it breaks out of the block and finishes by displaying another alert dialog to inform the player the game is over and telling them how many questions they answered correctly. This uses a template literal to display the score:

Notice at the end of this template literal, we use the ternary operator to check if the score is not equal to 1. If this is true, the letter 's' is appended to the end of the word 'point' to make it plural. This is a neat trick that can sometimes be overlooked, even on professional websites.
*/


let score = 0 // initialize score

for(const [question,answer] of quiz){
    const response = prompt(question);
    if(response === answer){
        alert('Correct!');
        score++;
    } else {
        alert(`Wrong! The correct answer was ${answer}`);
    }
}

// At the end of the game, report the player's score
alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`);