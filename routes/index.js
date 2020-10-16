const express = require('express');
const router = express.Router();
const upload = require("../middleware/upload");

//Upload route
router.post('/upload', upload.single('file'), (req, res, next) => {
  try {
    return res.status(201).json({
      message: 'File uploded successfully'
    });
  } catch (error) {
    next(error)
  }
});

module.exports = router;
