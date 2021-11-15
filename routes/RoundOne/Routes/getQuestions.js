const express = require('express');
const router = express.Router();
const roundOneQuestion = require('../../../models/RoundOneQuestion');

router.get('/', async (req, res) => {
    const questions = await roundOneQuestions.find();
    res.json(questions);
});

module.exports = router;
