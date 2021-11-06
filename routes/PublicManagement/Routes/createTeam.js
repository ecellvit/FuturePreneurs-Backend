const express = require("express");
const router = express.Router();
const Team = require('../../../models/TeamModel');
const User = require('../../../models/UserModel');
const Member = require("../../../models/MemberModel");

router.post('/', async (req, res) => {
  const {teamName, creatorID} = req.body;
  var team = await Team.findOne({TeamName : teamName});

  if (team != null){
    res.sendStatus(450);
  }
  else {
    var user = await User.findById(creatorID);
    const Leader = new Member({User : user, isLeader : true, isApproved : true});

    team = new Team({TeamName : teamName, Leader : Leader});
    team.addMember(Leader, true);
    var promiseOne = Leader.save();
    var promiseTwo = team.save();
    Promise.all([promiseOne, promiseTwo]).then(console.log("team Saved"));
    res.json(team);
  }
});

module.exports = router;
