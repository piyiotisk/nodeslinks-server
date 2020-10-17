const express = require('express');
const router = express.Router();
const upload = require("../middleware/upload");
const fileUtils = require("../utils/fileUtils");

router.post('/upload', upload.single('file'), (req, res, next) => {
  try {
    return res.status(201).json({
      message: 'File uploaded successfully'
    });
  } catch (error) {
    next(error)
  }
});

router.get('/visualization', (req, res, next) => {
  try {
    const inputData = fileUtils.read('./results/processedFile.json');
    const inputMetadata = fileUtils.read('./results/processedInputMetadata.json');

    const nodesWithMetadata = inputData.nodes.map((node) => {
      const metadata = inputMetadata.find((iMDnode) => iMDnode.id === node.id);
      node.startDate = metadata.startDate
      node.endDate = metadata.endDate
      return node
    })

    inputData.nodes = nodesWithMetadata

    return res.send(inputData).status(200);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
