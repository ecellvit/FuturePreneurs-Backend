const express = require('express');
const router = express.Router();

router.use('/createRound', require('./Routes/createRound'));
router.use('/submitResponse', require('./Routes/submitAnswer'));
router.use('/updateTime', require('./Routes/updateTime'));

module.exports = router;