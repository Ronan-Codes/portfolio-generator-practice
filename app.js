// // Notice the lack of parentheses around the `profileDataArr` parameter?
// const printProfileDate = profileDataArr => {
//     // This...
//     for (let i = 0; i < profileDataArr.length; i++) {
//         console.log(profileDataArr[i]);
//     }

//     console.log("================");

//     // is the same as this...
//     profileDataArr.forEach((profileItem) => {
//         console.log(profileItem)
//     });
//         // can clean it up even further
//         // profileDataArr.forEach(profileItem => console.log(profileItem));

// };

// printProfileDate(profileDataArgs)

// ==========================================================

const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);

// // 1st argument is file name, 2nd is data being written, 3rd is callback function that will handle any errors/success message
// fs.writeFile('index.html', generatePage(name, github), err => {
//     // throw err creates an exception and stops the execution of the code
//     if (err) throw err;

//     console.log("Porfolio complete! Check out index.html to see the output!");

//     // insert fs.open?
// });

// Function that returns result of inquirer, which is a Promise
const promptUser = () => {
    // array of object known as question object
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is your name? (Required)',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log('Please enter your name!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'github',
                message: 'Enter your GitHub Username',
                validate: githubInput => {
                    if (githubInput) {
                        return true;
                    } else {
                        console.log('Please enter your GitHub Username!');
                        return false;
                    }
                }
            },
            {
                type: 'confirm',
                name: 'confirmAbout',
                message: 'Would you like to enter some information about yourself for an "About" section?',
                default: true
            },
            {
                type: 'input',
                name: 'about',
                message: 'Provide some information about yourself:',
                // inquirer passes object with user's answers allowing for conditional code based on answers 
                when: ({ confirmAbout }) => {
                    if (confirmAbout) {
                        return true;
                    } else {
                        return false
                    }
                }
            }
        ]);
};

const promptProject = portfolioData => {
    // If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = []
    }

    console.log(`
=================
Add a New Project
=================
`);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: projectName => {
                if (projectName) {
                    return true;
                } else {
                    console.log('Please enter the project name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please provide a description of the project!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log('Please enter the GitHub link to your project!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);

        if(projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData
        }
    });
}

// then is appended to function call since it returns a Promise
promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData)
    })
