const express = require('express');
const Team = require('../../../models/TeamModel');
const router = express.Router();

router.get('/', async (req, res) => {
    const totalTeams = await Team.countDocuments();
    const countTeamWithRoundTwo = await Team.where({"RoundTwoAttempted" : true});
    const countTeamWithRoundOne = await Team.where({"RoundOneAttempted" : true});

    res.json({"totalTeams" : totalTeams, "roundOneCompleted" : countTeamWithRoundOne.length, "roundTwoCompleted" : countTeamWithRoundTwo.length});
})

module.exports = router;