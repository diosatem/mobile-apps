const quiz = [{
    name: "Superman",
    realName: "Clark Kent"
  },
  {
    name: "Wonderwoman",
    realName: "Dianna Prince"
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
  start: document.getElementById('start'),
  response: document.querySelector('#response'), // Now we add a reference to the form in our JavaScript. Add the following line of code as a property of the view object in main.js:
  render(target, content, attributes) {
    for (const key in attributes) {
      target.setAttribute(key, attributes[key]);
    }
    target.innerHTML = content;
  },
  show(element) {
    element.style.display = 'block';
  },
  hide(element) {
    element.style.display = 'none';
  },
  resetForm() {
    this.response.answer.value = '';
    this.response.answer.focus();
  },
  setup() {
    this.show(this.question);
    this.show(this.response);
    this.show(this.result);
    this.hide(this.start);
    this.render(this.score, game.score);
    this.render(this.result, '');
    this.render(this.info, '');
    this.resetForm();
  },
  teardown() {
    this.hide(this.question);
    this.hide(this.response);
    this.show(this.start);
  }
};

/*The next task is to remove the for-of loop we've been using to loop through each question. This is because the prompt dialogs pause the execution of the program and wait until the player has entered the answer. This won’t happen if we use a form to enter the answers, so the program would just loop through each question without giving the player a chance to answer!

Instead, we’re going to use use the pop() method to remove each question, one at a time, from the this.questions array. Remove the main game loop code from the game.start() method in main.js, so it looks like this:
This sets up the quiz as it did before, but it also calls the game.ask() method, which results in the first question being asked.

Next, we need to change the game.ask() method, so it looks like the following:
This checks the length property of the this.questions array, to see if there are any questions left to ask. If there are, the pop() method is used to remove the last element of the array and assign it to this.question. We use the same method as before to render the question in the HTML.*/
const game = {
  start(quiz) {
    this.score = 0;
    this.questions = [...quiz];
    view.setup();
    this.ask();
  },
  ask(name) {
    if (this.questions.length > 0) {
      this.question = this.questions.pop();
      const question = `What is ${this.question.name}'s real name?`;
      view.render(view.question, question);
    } else {
      this.gameOver();
    }
  },
  check(event) {
    event.preventDefault();
    const response = view.response.answer.value;
    const answer = this.question.realName;
    if (response === answer) {
      view.render(view.result, 'Correct!', {
        'class': 'correct'
      });
      this.score++;
      view.render(view.score, this.score);
    } else {
      view.render(view.result, `Wrong! The correct answer was ${answer}`, {
        'class': 'wrong'
      });
    }
    view.resetForm();
    this.ask();
  },
  gameOver() {
    view.render(view.info, `Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
    view.teardown();
  }
}

view.start.addEventListener('click', () => game.start(quiz), false);
view.response.addEventListener('submit', (event) => game.check(event), false); //Next, we need to add an event handler that fires when the form is submitted. Add the following line of code to the bottom of main.js:
view.hide(view.response);

/*This will call the game.check() method that’s used to check if the answer submitted by the player is correct. We need to update this method so it has an event object as a parameter. We can then use the event.preventDefault() method to stop the form from actually being submitted:*/