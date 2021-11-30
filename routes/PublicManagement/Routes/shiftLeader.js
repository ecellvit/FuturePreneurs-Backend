const express = require('express');
const router = express.Router();
const Member = require('../../../models/MemberModel');

router.post('/', async (req, res) => {
    const { email } = req.body;

    if (email == null){
        res.sendStatus(400);
    }

    const member = Member.findOne({"User.email" : email});
    if (member == null){
        res.sendStatus(404);
    }
    else {
        member.isLeader = true;
        await member.save();
        res.json(member);
    }
    
});

module.exports = router;