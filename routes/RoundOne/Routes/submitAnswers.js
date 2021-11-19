const express = require('express');
const router = express.Router();
const roundOneQuestion = require("../../../models/RoundOneQuestion");
const Environment = require("../../../models/Environment");
const Question = require("../../../models/RoundOneQuestion");
const Team = require("../../../models/TeamModel");

router.post("/", async (req, res) => {
    const { questionID, teamID, attempts ,responseEnvironment }  = req.body;
    const question = await Question.findById(questionID);
    const corrEnvId = question.correctEnvironment;
    const correctEnvironment = await Environment.findById(corrEnvId);
    const isAnswerCorrect = await correctEnvironment.compareEnvironment(responseEnvironment);
    const team = await Team.findById(teamID);
    if (isAnswerCorrect == true){
        await team.addPoints(attempts);
    }
    await team.save();
    res.json({"isCorrect" : isAnswerCorrect, "currentPoints" : team.RoundOnePoints});

});

module.exports = router; 

 
