import fs from 'fs';
function writeToJson(file, data) {
    fs.writeFile(file, JSON.stringify(data), 'utf8', (err) => {
        console.log(err);
    });
}
