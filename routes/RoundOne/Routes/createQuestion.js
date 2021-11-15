const express = require('express');
const router = express.Router();
const Question = require('../../../models/RoundOneQuestion');
const Answer = require("../../../models/RoundOneAnswer");

router.post('/', async( req, res) => {
    
    const { Instruction , BlockedZones, Options, AnswerArray } = req.body;
    const answers = []
    for ( i in AnswerArray){
        const element = AnswerArray[i];
        const answer = new Answer({index : element['index'], option : element['option']});
        answers.push(answer.id);
    }
    const question = new Question({Instruction, BlockedZones, Options, answers});
    await question.save();
    res.json(question);
})

module.exports = router;
