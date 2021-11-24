const express = require('express');
const Member = require('../../../models/MemberModel');
const team = require('../../../models/TeamModel');
const User = require('../../../models/UserModel');
const router = express.Router();

router.get('/', async (req, res) => {
    const memberCount = await Member.countDocuments();
    const teamCount = await team.countDocuments();
    const userCount = await User.countDocuments();
    res.json({ 'memberCount' : `${memberCount}`, 'teamCount' : `${teamCount}`, 'userCount' : `${userCount}`});
})

module.exports = router;