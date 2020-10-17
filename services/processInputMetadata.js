const csv = require('csv-parser');
const fs = require('fs');
const fileUtils = require('./../utils/fileUtils');

const results = [];

const generateNodeMetadata = (results) => {
    return results.map((row) => {
        // modify node id to match input data
        const nodeId = parseInt(row.NodeId) - 1;
        return { id: nodeId.toString(), startDate: row.StartDate, endDate: row.EndDate };
    })
}

fs.createReadStream('uploads/inputMetadata.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        const nodesWithMetadata = generateNodeMetadata(results)
        fileUtils.write(nodesWithMetadata, 'processedInputMetadata.json')
    });