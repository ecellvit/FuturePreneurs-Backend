const express = require('express');
const router = express.Router();

router.use('/createManager', require('./routes/createManager'));

module.exports = router;