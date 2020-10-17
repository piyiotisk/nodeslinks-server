const csv = require('csv-parser');
const fs = require('fs');
const fileUtils = require('./../utils/fileUtils');

const results = [];
let data = {};

const generateNodes = (results) => {
    return results.map((row, index) => {
        return { 'id': index.toString() };
    })
}

const findTargetNodes = (row) => {
    const result = Object.values(row).map((element, index) => {
        if (element === '1') {
            return index.toString()
        }
    })

    return result.filter((el) => el != null)
}

const generateLinks = (results) => {
    const sourceNodes = results.map((row, index) => {
        const targets = findTargetNodes(row);
        return { index, targets }
    })

    return sourceNodes.map((el) => {
        return el.targets.map((target) => {
            return { source: el.index.toString(), target }
        })
    }).flat()
}


fs.createReadStream('uploads/input.csv')
    .pipe(csv({ headers: false }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        const nodes = generateNodes(results)
        const links = generateLinks(results)
        data = { nodes, links }
        fileUtils.write(data, 'processedFile.json')
    });