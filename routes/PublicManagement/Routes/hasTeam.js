const express = require("express");
const Member = require('../../../models/MemberModel');
const User = require('../../../models/UserModel');
const router = express.Router();
const url = require('url');
const mongoose = require('mongoose');
router.get('/', async (req, res) => {
  const parts = url.parse(req.url, true);
  const query = parts.query;
  const userID = query.userID;
  const user = await User.findById(userID);
  const member = await Member.findOne({ User : user});
  console.log(member);
  if (member != null){
    res.send(true);
  }
  else {
    res.send(false);
  }

});

module.exports = router;
