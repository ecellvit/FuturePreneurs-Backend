const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId
const Team = require('../../../models/TeamModel');

router.post('/', async(req, res) => {
    const { teamID, time } = req.body;
    if (!ObjectID.isValid(teamID)){
        res.sendStatus(400);
    }
    else {
        if (time <= 900){
            const team = await Team.findById(teamID);
            team.updateRoundTwoTime(time);
            await team.save();
            res.sendStatus(200);
        }
        else {
            res.sendStatus(400);
        }
    }
});

module.exports = router;