const express = require('express');
const Team = require('../../../models/TeamModel');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

router.post('/', async (req, res) => {
    const { teamID } = req.body;

    if (ObjectId.isValid(teamID)){
        const team = await Team.findById(teamID);
        team.RoundOneAttempted = true;
        await team.save();
        res.sendStatus(200);
    }
    else {
        res.sendStatus(400);
    }

    
})


module.exports = router;