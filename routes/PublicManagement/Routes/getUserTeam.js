const express = require('express');
const router = express.Router();
const Team = require('../../../models/TeamModel');
const Member = require('../../../models/MemberModel');
const User = require('../../../models/UserModel');
const url = require('url');

router.get('/', async (req, res) => {
  const parts = url.parse(req.url, true);
  const query = parts.query;
  const userID = query.userID;
  const user = await User.findById(userID);
  const member = await Member.findOne({ User : user });
  if (member == null){
    console.log("Null Member");
    res.json(400);
  }
  else {
    const team = await Team.findById(member.teamID).populate('Leader Members');
    res.json(team);
  }
  
})

module.exports = router;
