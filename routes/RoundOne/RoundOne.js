const express = require('express');
const router = express.Router();

router.use('/submitResponse', require('./Routes/submitAnswers'));
router.use('/getQuestions', require('./Routes/getQuestions'));
router.use('/createQuestion', require('./Routes/createQuestion'));
router.use('/finishRoundOne', require('./Routes/roundOneCompleted'));


module.exports = router;
 
