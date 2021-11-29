const express = require('express');
const Team = require('../../../models/TeamModel');
const router = express.Router();

router.get('/', async (req, res) => {
    const countTeamWithRoundOne = await Team.where({"RoundOneAttempted" : false});
    res.json({"roundOneCompleted" : countTeamWithRoundOne});
})

module.exports = router;