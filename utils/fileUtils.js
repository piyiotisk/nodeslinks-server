const fs = require('fs');

const read = (pathname) => {
    const text = fs.readFileSync(pathname, 'utf-8')
    return JSON.parse(text.toString());
}

const write = (data, filename) => {
    // convert JSON object to string
    const jsonData = JSON.stringify(data);

    // write JSON string to a file
    fs.writeFile(`results/${filename}`, jsonData, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
}

module.exports = { read, write };