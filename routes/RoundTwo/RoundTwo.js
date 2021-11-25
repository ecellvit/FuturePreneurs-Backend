const express = require('express');
const router = express.Router();

router.use('/createRound', require('./Routes/createRound'));
router.use('/submitResponse', require('./Routes/submitAnswer'));


module.exports = router;