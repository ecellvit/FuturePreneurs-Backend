const express = require('express');
const router = express.Router();
const roundOneQuestion = require('../../../models/RoundOneQuestion');
const URL = require('url');
const Team = require('../../../models/TeamModel');
// const team = require('../../../models/TeamModel');

router.get('/', async (req, res) => {
    const query = URL.parse(req.url, true).query;
    const questionNumber = query.question;
    const teamID = query.teamID;
    const team = await Team.findById(teamID);
    if (questionNumber == 1){
        const currentTime = Math.floor(Date.now()/1000) + 905;
        console.log(Date.now()/1000);
        console.log(currentTime);
        team.RoundOneTimeLeft = currentTime.toString();
        await team.save();
    }

    const question = await roundOneQuestion.find().limit(1).skip(parseInt(questionNumber) - 1);
    res.json({question : question[0], timeStamp : team.RoundOneTimeLeft});
});

module.exports = router;