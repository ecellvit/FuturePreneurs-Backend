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
    const isAnswerCorrect = correctEnvironment.compareEnvironment(resonseEnvironment);
    if (isAnswerCorrect == true){
        const team = await Team.findById(teamID);
        if (attempts === 1){
            team.addPoints(10);
        }
        else if(attempts === 2){
            team.addPoints(5);
        }
        else if (attempts === 3){
            team.addPoints(1);
        }
    }
    await team.save();
    res.json({"isCorrect" : isAnswerCorrect, "currentPoints" : team.RoundOnePoints});

});

module.exports = router; 

 
