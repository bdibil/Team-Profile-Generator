// Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");

const generateHtml = require("./util/generateHtml");

// console.log(team)

let test = new Engineer('Test', 0, 'test@test.com', 'bdibil')

console.log(test)

console.log(generateHtml)
console.log(test.generateEngineer)

let me = test.generateEngineer
console.log(typeof(me))


// console.log(team)

// fs.writeFile('./dist/index.html', generateTeam, (err) => {
//     if (err) throw err
// })


//////////////     Re-used      Code        Below       /////////


// Array of questions for user input
const questions = ['What is your project Title? ', 'Briefly Describe your project: ', 'Describe how to Install the project: ', 'How do you Use your application? ', 'What are the Contribution guidelines? ', 'Describe the Tests used: ', 'What is your Github username? ', 'What is your Email address ? ', 'Please choose one of the following licenses:'];

// Constructor function for questions
function Question(type, message, name, choices) {
    this.type = type;
    this.message = message;
    this.name = name;
    this.choices = choices;
}
