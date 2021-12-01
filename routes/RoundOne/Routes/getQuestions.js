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
    if (questionNumber == 1 && team.RoundOneStarted == false){
        const currentTime = new Date();
        const newTime = currentTime.getTime() + 60*1000*15;
        const date = new Date(newTime);
        console.log(currentTime.toISOString());
        console.log(date.toISOString());
        team.RoundOneTimeLeft = date;
        team.RoundOneStarted = true;
        await team.save();
    }

    console.log(team.RoundOneTimeLeft);
    const question = await roundOneQuestion.find().limit(1).skip(parseInt(questionNumber) - 1);
    res.json({question : question[0],attemptsLeft : this.AttemptsLeft ,timeStamp : team.RoundOneTimeLeft});
});

module.exports = router;



// 2021-12-01T06:55:52.454Z
// 2021-12-01T06:55:52.454Z
