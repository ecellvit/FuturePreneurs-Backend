const express = require('express');
const router = express.Router();
const Member = require('../../../models/MemberModel');

router.post('/', async (req, res) => {
  const { memberID } = req.body;
  const member = await Member.findById(memberID);
  member.isApproved = true;
  await member.save();
  res.send("Approved");
})

module.exports = router;
