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
const fs = require('fs');
const generatePage = require('./src/page-template.js');

// normally, it would be (lengt-1)
const profileDataArgs = process.argv.slice(2, process.argv.length);
// same as below
// const name = profileDataArgs[0];
// const github = profileDataArgs[1];
const [name, github] = profileDataArgs;

// 1st argument is file name, 2nd is data being written, 3rd is callback function that will handle any errors/success message
fs.writeFile('index.html', generatePage(name, github), err => {
    // throw err creates an exception and stops the execution of the code
    if (err) throw err;

    console.log("Porfolio complete! Check out index.html to see the output!");

    // insert fs.open?
});
