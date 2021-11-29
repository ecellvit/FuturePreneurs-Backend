const express = require('express');
const router = express.Router();
const Team = require('./models/TeamModel');
const User = require('./models/UserModel');
const Member = require('./models/MemberModel');

router.post('/', async  (req, res) => {
    const data = req.body;

    data.forEach( async (element) => {
        const {teamName, TeamLeaderName, TeamLeaderEmail, Member1Name, Member1Email, Member2Name, Member2Email, Member3Name, Member3Email, totalPeople} = element;
        
        const team = Team({TeamName : teamName,  RoundTwoAttempted : false, RoundOneAttempted : false, Members : [], leader : {}, RoundOnePoints : 0, RoundTwoPoints : 0});
        const leader = User({email : TeamLeaderEmail, name : TeamLeaderName, photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlR3hMw_3daUL3Uhr5Y3uJh_kMaYzyqQhhPA&usqp=CAU"});
        const leaderM = Member({User : leader, isLeader : true, isApproved : true, teamID : team});
        team.addMember(leaderM, true);
        console.log(TeamLeaderName);
        await leader.save();
        await leaderM.save();
        

        for (j = 0; j < totalPeople - 1; j++){
            var memberName;
            var memberEmail;
            if (j == 0){
                memberName = Member1Name;
                memberEmail = Member1Email;
            }
            else if (j == 1){
                memberName = Member2Name;
                memberEmail = Member2Email;
            }
            else{
                memberName = Member3Name;
                memberEmail = Member3Email;
            }
            const user = User({email : memberEmail, name : memberName, photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlR3hMw_3daUL3Uhr5Y3uJh_kMaYzyqQhhPA&usqp=CAU"});
            const member = Member({User : user, isLeader : false, isApproved : true, teamID : team});
            team.addMember(member);
            await user.save();
            await member.save();
            console.log(memberName);
            console.log(" ");
        }
        await team.save();
    });
    res.json("added");
});


module.exports = router;
