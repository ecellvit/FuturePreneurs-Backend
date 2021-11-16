const express = require('express');
const router = express.Router();

router.use('/getRoundOneQuestions', require('./Routes/getQuestions'));
router.use('/createQuestion', require('./Routes/createQuestion'));


module.exports = router;
 
