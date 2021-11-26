const express = require('express');
const router = express.Router();
const RoundTwo = require('../../../models/RoundTwoModel');
const Team = require('../../../models/TeamModel');

router.use('/', async (req, res) => {
    const { teamID ,Zones } = req.body;
    const team = await Team.findById(teamID);
    if (team.RoundTwoAttempted == true || teamID == null || Zones == null){
        res.sendStatus(400);
    }
    else {
        const roundTwo = await RoundTwo.find();
        var score = await roundTwo[0].checkSubmission(Zones);
        team.RoundTwoPoints = score;
        team.RoundTwoAttempted = true;
        await team.save();
        res.json({score});
    }
});

module.exports = router;