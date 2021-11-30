const express = require('express');
const router = express.Router();
const roundOneQuestion = require('../../../models/RoundOneQuestion');
const URL = require('url');
const team = require('../../../models/TeamModel');
// const team = require('../../../models/TeamModel');

router.get('/', async (req, res) => {
    const query = URL.parse(req.url, true).query;
    const questionNumber = query.question;
    // if (questionNumber == 1){
    //     const Team = await team.find().first;
    // }
    const question = await roundOneQuestion.find().limit(1).skip(parseInt(questionNumber) - 1);
    res.json(question[0]);

});

module.exports = router;