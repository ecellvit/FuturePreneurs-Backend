const express = require('express');
const router = express.Router();
const roundOneQuestion = require('../../../models/RoundOneQuestion');

router.get('/', async (req, res) => {
    const questions = await roundOneQuestion.find();
    res.json(questions);
});

module.exports = router;
 
