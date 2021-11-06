const express = require("express");
const router = express.Router();
const Team = require('../../../models/TeamModel');
const UserSchema = require('../../../models/UserModel');
const Member = require("../../../models/MemberModel");

router.post("/", async (req, res) => {
  const {userID, teamID} = req.body;
  const team = Team.findById(teamID);
  const user = UserSchema.findById(userID);
  const member = Member.findOne({ 'User.id' : userID});
  await Promise.all([team, user, member]);

  if (team == null ){
    res.sendStatus(403);
  }
  else {
    if (member == null ){
      member = new Member({User : user, isLeader : false, isApproved : false, teamID : teamID});
      await team.addMember(member, false);
      res.json(team);
    }
    else {
      res.sendStatus(500).message("Member already exist as a part of a team");
    }
  }
})

module.exports = router;
