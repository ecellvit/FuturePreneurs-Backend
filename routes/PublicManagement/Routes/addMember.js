const express = require("express");
const router = express.Router();
const Team = require('../../../models/TeamModel');
const UserSchema = require('../../../models/UserModel');
const Member = require("../../../models/MemberModel");

router.post("/", async (req, res) => {
  const {userID, teamID} = req.body;
  const team = await Team.findById(teamID);
  const user = await UserSchema.findById(userID);
  var member = await Member.findOne({ 'User' : user});

  if (team == null ){
    res.sendStatus(403);
  }
  else {
    if (member == null){
      member = new Member({User : user, isLeader : false, isApproved : false, teamID : teamID});
      await team.addMember(member, false);
      await member.save();
      res.json(team);
    }
    else {
      console.log(member);
      res.sendStatus(400);
    }
  }
});
module.exports = router;
