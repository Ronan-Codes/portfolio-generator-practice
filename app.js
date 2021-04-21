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
/* not needed directly, since `const {writeFile, copyFile}` utilizes the `fs`
    const fs = require('fs');
*/

/* Destructured in the `const {writeFile, copyFile}` below
    const generateSite = require('./utils/generate-site.js');
*/
const { writeFile, copyFile } = require('./utils/generate-site.js');

const generatePage = require('./src/page-template.js');

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
        .prompt([{
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
                when: ({
                    confirmAbout
                }) => {
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
    return inquirer.prompt([{
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

            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            } else {
                return portfolioData
            }
        });
}

// Mock data for testing
const mockData = {
    name: 'Lernantino',
    github: 'lernantino',
    confirmAbout: true,
    about: 'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
    projects: [{
            name: 'Run Buddy',
            description: 'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
            languages: ['HTML', 'CSS'],
            link: 'https://github.com/lernantino/run-buddy',
            feature: true,
            confirmAddProject: true
        },
        {
            name: 'Taskinator',
            description: 'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
            languages: ['JavaScript', 'HTML', 'CSS'],
            link: 'https://github.com/lernantino/taskinator',
            feature: true,
            confirmAddProject: true
        },
        {
            name: 'Taskmaster Pro',
            description: 'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
            languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
            link: 'https://github.com/lernantino/taskmaster-pro',
            feature: false,
            confirmAddProject: true
        },
        {
            name: 'Robot Gladiators',
            description: 'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
            languages: ['JavaScript'],
            link: 'https://github.com/lernantino/robot-gladiators',
            feature: false,
            confirmAddProject: false
        }
    ]
}

/* Clean version below
        // question: did projects become a property because it was added as a ".then" to promptUser?
        // then is appended to function call since it returns a Promise
        promptUser()
            .then(promptProject)
            .then(portfolioData => {
                const pageHTML = generatePage(portfolioData);
                // uncomment if testing
                // const pageHTML = generatePage(mockData);

                fs.writeFile('./dist/index.html', pageHTML, err => {
                //   if (err) throw new Error(err); - Figure out difference of this error format
                    if (err) {
                        console.log(err);
                        return;
                    }

                    console.log('Page created! Check out index.html in this directory to see it!');

                    fs.copyFile("./src/style.css", "./dist/style.css", err => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("Style sheet copied succesfully!");
                    });
                });
            })
 */

/* Promised version of writeFile and copyFile below this
    promptUser()
        .then(promptProject)
        .then(portfolioData => {
            return generatePage(portfolioData);
        })
        .then(pageHTML => {
            return writeFile(pageHTML);
            return copyFile();
        })
        .then(copyFileResponse => {
            console.log(copyFileResponse);
        })
        .catch(err => {
            console.log(err);
        });
*/

// No more callback functions inside callback functions! Only need 1 `.catch` method
// If we need to execute a Promise's reject() function, it'll just jump right to the .catch() method.
promptUser()
    .then(promptProject)
    .then(portfolioData => {
        return generatePage(portfolioData);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err => {
        console.log(err);
    });


/* The flow of this function
  1. We start by asking the user for their information with Inquirer prompts; this returns all of the data as an object in a Promise.

  2. The promptProject() function captures the returning data from promptUser() and we recursively call promptProject() for as many projects as the user wants to add. Each project will be pushed into a projects array in the collection of portfolio information, and when we're done, the final set of data is returned to the next .then().

  3. The finished portfolio data object is returned as portfolioData and sent into the generatePage() function, which will return the finished HTML template code into pageHTML.

  4. We pass pageHTML into the newly created writeFile() function, which returns a Promise. This is why we use return here, so the Promise is returned into the next .then() method.

  5. Upon a successful file creation, we take the writeFileResponse object provided by the writeFile() function's resolve() execution to log it, and then we return copyFile().

  6. The Promise returned by copyFile() then lets us know if the CSS file was copied correctly, and if so, we're all done!
*/
