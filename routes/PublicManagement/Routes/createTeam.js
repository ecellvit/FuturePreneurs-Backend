const express = require("express");
const router = express.Router();
const Team = require('../../../models/TeamModel');
const User = require('../../../models/UserModel');
const Member = require("../../../models/MemberModel");

router.post('/', async (req, res) => {
  const {teamName, creatorID} = req.body;
  var team = await Team.findOne({TeamName : teamName});
  var member = await Member.findById(creatorID);

  if (team != null){
    res.sendStatus(450);
  }
  else {
    if (member == null){
      var user = await User.findById(creatorID);
      member = new Member({User : user, isLeader : true, isApproved : true});
      team = new Team({TeamName : teamName, Leader : member});
      team.addMember(member, true);
      member.addTeam(team.id);
      var promiseOne = member.save();
      var promiseTwo = team.save();
      Promise.all([promiseOne, promiseTwo]).then(console.log("team Saved"));
      res.json(team);
    }
    else {
      res.sendStatus(400);
    }
  }
});

module.exports = router;
