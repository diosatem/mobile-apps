/*This declares a variable called question and assigns the string 'What is Superman's real name?' to it.

Next, we need to ask the question stored in the question variable, using a prompt dialog:

A prompt dialog allows the player to type in a response, which is then stored in the variable it is assigned to, which is answer in this case.

Finally, we use an alert dialog to display the player's answer using string interpolation to insert the value of answer into the template literal that is displayed in an alert box:
*/

const question = "What is Superman's real name?"
const answer = prompt(question);
alert(`You answered ${answer}`);