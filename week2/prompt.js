// Sitepoint: Javascript: Novice to Ninja, 2nd Edition. Chapter 2 Quiz Ninja Project

//Chapter 2 - prompt()
const question = "What country is the 2nd biggest nickel producer in the world?"
const answer = prompt(question);

// if (answer == "Philippines" || answer =="philippines") {
//     alert(`You're correct!`);
// } else {
//     alert(`You're wrong :( Try again!`);
// }

// alert(`You're ${(answer == "Philippines" || answer =="philippines")? `correct` : `wrong`}); 

(answer === "Philippines" || answer === "philippines") ?  alert(`You're correct!`) : alert(`You're wrong :( The answer is Philippines.`);