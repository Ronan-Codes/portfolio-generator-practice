const fs = require('fs');

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        // location is taken from the app.js not from this file's location
        fs.writeFile('./dist/index.html', fileContent, err => {
            // if there's an error, reject the Promise and send the error to Promise's `.catch()` method
            if(err) {
                reject(err);
                // return out of the function here to make sure the Promise doesn't execute the resolve() function as well
                return;
            }

            // if if everything went well, resolve the Promise and send the succesful data to the `.then()` method
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};

// If we were to execute it, it would look like the following:
/*
    const sampleHtml = '<h1>This will be written to the file!</h1>';

    writeFile(sampleHtml)
        .then(successfulResponse => {
            // this will run when we use `resolve()`
            console.log(successfulResponse);
        })
        .catch(errorResponse => {
            // this will run when we use `reject()`
            console.log(errorResponse);
        });

*/

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile("./src/style.css", "./dist/style.css", err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'Style sheet copied succesfully!'
            })
            });
    });
};

/* same as below, using ES6
    module.exports = {
        writeFile: writeFile,
        copyFile: copyFile
    };
*/

module.exports = { writeFile, copyFile }
