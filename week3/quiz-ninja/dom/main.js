const quiz = [{
    name: "Superman",
    realName: "Clark Kent"
},
{
    name: "Wonder Woman",
    realName: "Diana Prince"
},
{
    name: "Batman",
    realName: "Bruce Wayne"
},
];

// View Object
const view = {
    score: document.querySelector('#score strong'),
    question: document.getElementById('question'),
    result: document.getElementById('result'),
    info: document.getElementById('info'),
    render(target,content,attributes) {
        for(const key in attributes) {
            target.setAttribute(key, attributes[key]);
        }
        target.innerHTML = content;
    }
};

/*This uses the document.querySelector() method to access the elements we require and assign them to a variable. So, for example, the div with an id of question can be accessed in the Javascript code using view.question.

We've also added a helper function called render() that can be used to update the content of an element on the page. This function has three parameters: the first is the element that displays the content, the second is for the content it’s to be updated with, and the last is an object of any HTML attributes that can be added to the element.

The function loops through any attributes provided as the third argument, and uses the setAttribute() method to update them to the values provided. It then uses the innerHTML property to update the HTML with the content provided.

Now we need to update some of the functions inside the game object to use update the HTML.

We will still need to keep using dialogs for the time being, because without them, the JavaScript won't stop running and the game would be unplayable. Don't worry though, we won't need them for much longer.

We're going to update the HTML alongside showing the information. This means that the following methods need updating:*/

// Game Object
const game = {
    start(quiz){
      this.score = 0;
      this.questions = [...quiz];
      // main game loop
      for(const question of this.questions){
        this.question = question;
        this.ask();
      }
      // end of main game loop
      this.gameOver();
    },
    ask(){
      const question = `What is ${this.question.name}'s real name?`;
      view.render(view.question,question);
      const response =  prompt(question);
      this.check(response);
    },
    check(response){
      const answer = this.question.realName;
      if(response === answer){
        view.render(view.result,'Correct!',{'class':'correct'});
        alert('Correct!');
        this.score++;
        view.render(view.score,this.score);
      } else {
        view.render(view.result,`Wrong! The correct answer was ${answer}`,{'class':'wrong'});
        alert(`Wrong! The correct answer was ${answer}`);
      }
    },
    gameOver(){
      view.render(view.info,`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
    }
  }
  
  game.start(quiz);

/*In most cases we have placed a call to view.render() wherever there is an alert() or prompt() dialog that displays the same information in the HTML. We've also used the view.render() method to update the score if a player gains any points.*/