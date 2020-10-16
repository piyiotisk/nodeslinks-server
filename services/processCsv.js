const csv = require('csv-parser');
const fs = require('fs');

const results = [];

const generateNodes = (results) => {
    return results.map((row, index) => {
        return { 'id': index };
    })
}

const findTargetsForRow = (row) => {
    const result = Object.values(row).map((element, index) => {
        if (element === '1') {
            return index
        }
    })

    return result.filter((el) => el != null)
}

const generateLinks = (results) => {
    const res = results.map((row, index) => {
        const targets = findTargetsForRow(row);
        return { index, targets }
    })

    return res.map((el) => {
        return el.targets.map((target) => {
            return { source: el.index, target }
        })
    })
}


fs.createReadStream('uploads/input.csv')
    .pipe(csv({ headers: false }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        const nodes = generateNodes(results)
        const links = generateLinks(results)
        console.log(links)
        console.log('CSV file successfully processed');
    });