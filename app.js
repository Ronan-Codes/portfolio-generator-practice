const profileDataArgs = process.argv.slice(2, process.argv.length);

// Notice the lack of parentheses around the `profileDataArr` parameter?
const printProfileDate = profileDataArr => {
    // This...
    for (let i = 0; i < profileDataArr.length; i++) {
        console.log(profileDataArr[i]);
    }

    console.log("================");

    // is the same as this...
    profileDataArr.forEach((profileItem) => {
        console.log(profileItem)
    });
        // can clean it up even further
        // profileDataArr.forEach(profileItem => console.log(profileItem));

};

printProfileDate(profileDataArgs)
