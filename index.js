// Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const { Console } = require('console');


//      MY      Test     Team 
let eng1 = new Engineer('Bernardo', 1, 'bdibil@test.com', 'bdibil')
let man1 = new Manager('Boss', 2, 'boss@test.com', 101)
let int1 = new Intern('John', 3, 'john@test.com', "UW")
let group1 = [eng1, man1, int1]


//      User    generated     Team      Array
let manArray = []
let engArray = []
let intArray = []

let manId = 100
let engId = 200
let intId = 300


// Constructor function for questions
function Question(type, message, name, choices) {
    this.type = type;
    this.message = message;
    this.name = name;
    this.choices = choices;
}

// Array of questions for user input
const managerQs = ['Please enter the team Manager name: ', 'What is the Manager Email address? ', 'What about office number? ']
const engineerQs = ['Please enter the Engineer name: ', 'What is the Engineer Email address? ', 'What is the Engineer Github username? ']
const internQs = ['Please enter the Intern name: ', 'What is the Intern Email address? ', 'What is the Intern School? ']
const addEmployee = ['Do you want to add an Engineer, an Intern, or finish building the team? ']


// Define all questions
const employeeChoice = ['Add Engineer', 'Add Intern', 'I finished building my team']
const userEmployee = new Question('list', addEmployee, 'choice', employeeChoice )


// let test = inquirer.prompt(userEmployee)
// console.log(userEmployee)

const manName = new Question('input', managerQs[0], 'manName')
const manEmail = new Question('input', managerQs[1], 'manEmail')
const manOffice = new Question('input', managerQs[2], 'manOffice')

const engName = new Question('input', engineerQs[0], 'engName')
const engEmail = new Question('input',  engineerQs[1], 'engEmail')
const engGithub = new Question('input', engineerQs[2], 'engGithub')

const intName = new Question('input', internQs[0],  'intName')
const intEmail = new Question('input', internQs[1], 'intEmail')
const intSchool = new Question('input', internQs[2], 'intSchool')


function makeGroupCards(team) {

        // create the manager html
        const generateManager = manager => {
            return `
            <div class="card employee-card">
            <div class="card-header">
                <h2 class="card-title">${manager.getName()}</h2>
                <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${manager.getRole()}</h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item">ID: ${manager.getId()}</li>
                    <li class="list-group-item">Email: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></li>
                    <li class="list-group-item">Office number: ${manager.getOfficeNumber()}</li>
                </ul>
            </div>
        </div>
            `;
        };
    
        // create the html for engineers
        const generateEngineer = engineer => {
            return `
            <div class="card employee-card">
        <div class="card-header">
            <h2 class="card-title">${engineer.getName()}</h2>
            <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>${engineer.getRole()}</h3>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item">ID: ${engineer.getId()}</li>
                <li class="list-group-item">Email: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
                <li class="list-group-item">GitHub: <a href="https://github.com/${engineer.getGithub()}" target="_blank" rel="noopener noreferrer">${engineer.getGithub()}</a></li>
            </ul>
        </div>
    </div>
            `;
        };
    
        // create the html for interns
        const generateIntern = intern => {
            return `
            <div class="card employee-card">
        <div class="card-header">
            <h2 class="card-title">${intern.getName()}</h2>
            <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>${intern.getRole()}</h3>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item">ID: ${intern.getId()}</li>
                <li class="list-group-item">Email: <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></li>
                <li class="list-group-item">School: ${intern.getSchool()}</li>
            </ul>
        </div>
    </div>
            `;
        };
    
        const html = [];
    
        html.push(team
            .filter(employee => employee.getRole() === "Manager")
            .map(manager => generateManager(manager))
        );
        html.push(team
            .filter(employee => employee.getRole() === "Engineer")
            .map(engineer => generateEngineer(engineer))
            .join("")
        );
        html.push(team
            .filter(employee => employee.getRole() === "Intern")
            .map(intern => generateIntern(intern))
            .join("")
        );
    
        return html.join("");
}


function makeFullSite (group) {

    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>My Team</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/c502137733.js"></script>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 jumbotron mb-3 team-heading">
                <h1 class="text-center">My Team</h1>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="team-area col-12 d-flex justify-content-center">
                ${makeGroupCards(group)}
            </div>
        </div>
    </div>
</body>
</html>
    `;
}


function genHtml(group) {

    fs.writeFile('./dist/index.html', makeFullSite(group), (err) => {
        if (err) throw err
    })

}



    
// Function   to    Ask User info about their team and call     >>      genHtml

const askInfo = async () => {
    const ansZero = await inquirer.prompt([manName, manEmail, manOffice])
    let newManager = new Manager(ansZero.manName, manId, ansZero.manEmail, ansZero.manOffice)
    manArray.push(newManager)
    manId++
    let again = true;
    do { 
        const ansOne = await inquirer.prompt([userEmployee])
        // console.table(ansOne)
        let ansTwo
        let newEngineer
        let newIntern
        // console.log(ansOne.choice)
        switch (ansOne.choice) {
            case 'Add Engineer':
                ansTwo = await inquirer.prompt([engName, engEmail, engGithub])
                newEngineer = new Engineer(ansTwo.engName, engId, ansTwo.engEmail, ansTwo.engGithub)
                engArray.push(newEngineer)
                engId++
                // console.table(engArray)
                break;
        
            case 'Add Intern':
                ansTwo = await inquirer.prompt([intName, intEmail, intSchool])
                newIntern = new Intern(ansTwo.intName, intId, ansTwo.intEmail, ansTwo.intSchool)
                intArray.push(newIntern)
                intId++
                // console.table(intArray)
                break;
        
            case 'I finished building my team':
                again = false;
                break;
        
            default:
                throw new Error("Something went wrong")
        }

    } while (again == true)
    let userTeam = manArray.concat(engArray, intArray)
    // console.table(userTeam)
    genHtml(userTeam)
};


askInfo()


// genHtml(group1)

