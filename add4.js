const express = require('express');
const router = express.Router();
const Team = require('./models/TeamModel');
const User = require('./models/UserModel');
const Member = require('./models/MemberModel');

router.post('/', async  (req, res) => {

    const {teamName, TeamLeaderName, TeamLeaderEmail, Member1Name, Member1Email, Member2Name, Member2Email, Member3Name, Member3Email} = req.body;
    const leader = User({email : TeamLeaderEmail, name : TeamLeaderName, photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlR3hMw_3daUL3Uhr5Y3uJh_kMaYzyqQhhPA&usqp=CAU"});
    const Member1 = User({email : Member1Email, name : Member1Name, photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlR3hMw_3daUL3Uhr5Y3uJh_kMaYzyqQhhPA&usqp=CAU"});
    const Member2 = User({email : Member2Email, name : Member2Name, photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlR3hMw_3daUL3Uhr5Y3uJh_kMaYzyqQhhPA&usqp=CAU"})
    await leader.save();
    await Member1.save();
    await Member2.save();
  
    const team = Team({TeamName : teamName,  RoundTwoAttempted : false, RoundOneAttempted : false, Members : [], leader : {}, RoundOnePoints : 0, RoundTwoPoints : 0});
    const leaderM = Member({User : leader, isLeader : true, isApproved : true, teamID : team});
    team.addMember(leaderM, true);
    const member1 = Member({User : Member1, isLeader : false, isApproved : true, teamID : team});
    team.addMember(member1);
    const member2 = Member({User : Member2, isLeader : false, isApproved : true, teamID : team});
    team.addMember(member2);

    await leaderM.save();
    await member1.save();
    await member2.save();

    await team.save();
    res.json(team);
})

module.exports = router;
