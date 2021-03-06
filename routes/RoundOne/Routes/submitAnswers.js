const express = require('express');
const router = express.Router();
const roundOneQuestion = require("../../../models/RoundOneQuestion");
const Environment = require("../../../models/Environment");
const Question = require("../../../models/RoundOneQuestion");
const Team = require("../../../models/TeamModel");

router.post("/", async (req, res) => {
    const { questionID, teamID,responseEnvironment }  = req.body;
    const team = await Team.findById(teamID);
    const r1AQ = team.RoundOneAttemptedQuestions
    var isAttemptedPreviously = false;
    for (i in r1AQ){
        if (r1AQ[i] == questionID){
            isAttemptedPreviously = true;
            break;
        }
    }
    if (isAttemptedPreviously == false){
        
        const question = await Question.findById(questionID);
        const corrEnvId = question.correctEnvironment;
        const correctEnvironment = await Environment.findById(corrEnvId);
        const isAnswerCorrect = await correctEnvironment.compareEnvironment(responseEnvironment);
    
        if (isAnswerCorrect == true){
            team.AttemptsDone = 0;
            if (team.RoundOneAttemptedQuestions.length == 5){
                team.RoundOneAttempted = true;
            }
            team.RoundOneAttemptedQuestions.push(questionID);
            await team.addPoints(team.AttemptsDone);
        }
        else {
            team.AttemptsDone = team.AttemptsDone + 1;
            if (team.AttemptsDone == 3){
                team.AttemptsDone = 0;
                if (team.RoundOneAttemptedQuestions.length == 5){
                    team.RoundOneAttempted = true;
                }
                team.RoundOneAttemptedQuestions.push(questionID);
            }
        }
        await team.save();
        res.json({"isCorrect" : isAnswerCorrect, "currentPoints" : team.RoundOnePoints});
    }
    else {
        res.sendStatus(400)
    }
    
    

});

module.exports = router; 

 
