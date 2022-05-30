/*The first part of this code remains the same ― we create a map of questions and answers and store it in the quiz variable.

Next we create a function called start(). This is the main game function that contains all the steps of playing the game. This function also contains a number of functions that help to describe how the game runs. It starts by initializing a variable called score to 0.

After this, it iterates over the quiz array and invokes the ask() function for each question. We then, invoke the check() function to check if the player's response is correct. After we have looped through every question in the quiz array, the game is over, so the gameOver() function is invoked.

This shows how code can be simplified by abstracting it into separate functions that are descriptively named. Another benefit is that it allows us to change the content of the functions at a later time. If we decide that the way to check a question will change, for example, all we need to do is edit the check() function.

The ask(), check() and gameOver() functions are defined at the end of the body of the start() function. They need to be placed inside the start() function as nested functions, as this gives them access to any variables defined inside the start() function's scope. Because they are defined using function declarations, they are hoisted, so they can be defined after they are invoked.

The ask() function accepts a question parameter. This combination of function name and parameter name is used to make the code very descriptive ― it reads almost like an English sentence: 'Ask the question'. It uses a prompt dialog and returns the text entered by the player, which is then saved in a variable called answer.

The check() function is written after the ask() function and has two parameters: response and answer. This combination of function name and parameter name again make the code read more like an English sentence. Naming functions in this way means we don't need to use comments to explain what the code does ― it's self-explanatory.

This function uses the same logic we used in the last chapter to check if the answer entered by the player is the same as the answer stored in the map. If it is, then we increase the score by 1 and if it isn't, we show an alert dialog to tell them what the answer should have been.

When all the questions have been asked, and all the answers have been checked, the loop terminates and the gameOver() function is invoked. This uses an alert dialog to give some feedback about how many questions were answered correctly, using the same code that we used in the previous chapter.

*/

const quiz = [
    ["What is Superman's real name?","Clark Kent"],
    ["What is Wonder Woman's real name?","Diana Prince"],
    ["What is Batman's real name?","Bruce Wayne"]
];

function start(quiz){
    let score = 0;

    // main game loop
    for(const [question,answer] of quiz){
        const response = ask(question);
        check(response,answer);
    }
    // end of main game loop

    gameOver();

    // function declarations
    function ask(question){
        return prompt(question);
    }

    function check(response,answer){
        if(response === answer){
        alert('Correct!');
        score++;
        } else {
        alert(`Wrong! The correct answer was ${answer}`);
        }
    }

    function gameOver(){
        alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`);
    }
}
start(quiz);

/*
There is an important line at the end of the file. This invokes the start() function with the quiz variable passed to it as an argument. This is required to actually start the quiz!
*/