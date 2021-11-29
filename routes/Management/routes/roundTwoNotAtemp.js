const express = require('express');
const Team = require('../../../models/TeamModel');
const router = express.Router();

router.get('/', async (req, res) => {
    const countTeamWithRoundTwo = await Team.where({"RoundTwoAttempted" : false});

    res.json({"roundTwoCompleted" : countTeamWithRoundTwo});
})

module.exports = router;