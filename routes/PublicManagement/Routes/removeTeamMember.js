const express = require('express');
const router = express.Router();
const Team = require("../../../models/TeamModel");
const Member = require("../../../models/MemberModel");

router.post('/', async (req, res) => {
  const {teamID, memberID} = req.body;
  const team = await Team.findById(teamID);
  await team.Members.remove(memberID)
  await team.save();
  const member = await Member.findById(memberID);
  await member.remove();
  res.send("removed");
});

module.exports = router;
