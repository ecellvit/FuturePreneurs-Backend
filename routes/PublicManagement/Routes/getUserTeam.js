const express = require('express');
const router = express.Router();
const Team = require('../../../models/TeamModel');
const Member = require('../../../models/MemberModel');
const url = require('url');
const ObjectID = require('mongoose').Types.ObjectId;

router.post('/', async (req, res) => {
  const {userID} = req.body
  if (!ObjectID.isValid(userID)){
    res.sendStatus(400);
  }
  else {
    const member = await Member.findOne({ "User._id" : userID});
  console.log(member);
  if (member == null){
    console.log("Null Member");
    res.sendStatus(400);
  }
  else {
    const team = await Team.findById(member.teamID).populate('Leader Members');
    res.json(team);
  }

  }
});

module.exports = router;
