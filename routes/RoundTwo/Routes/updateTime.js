const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId
const Team = require('../../../models/TeamModel');
const URL = require('url');

router.get('/', async(req, res) => {
    const query = URL.parse(req.url, true).query;
    const teamID = query.teamID;
    

    if (!ObjectID.isValid(teamID)){
        res.sendStatus(400);
    }
    else{
        const team = await Team.findById(teamID);
        if (team.RoundTwoStarted == false || team.RoundTwoStarted == null){
            const currentTime = new Date();
            const newTime = currentTime.getTime() + 60*1000*15;
            const date = new Date(newTime);
            team.RoundTwoTimeLeft = date;
            team.RoundTwoStarted = true;
            await team.save();
        }
        res.json({timeStamp : team.RoundTwoTimeLeft})
    }
});

module.exports = router;