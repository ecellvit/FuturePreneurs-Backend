const express = require("express");
const Member = require('../../../models/MemberModel');
const User = require('../../../models/UserModel');
const router = express.Router();
const url = require('url');
const mongoose = require('mongoose');
router.post('/', async (req, res) => {
  const { userID } = req.body;
  if (userID == ""){
    res.sendStatus(400);
  }
  const user = await User.findById(userID);
  const member = await Member.findOne({ User : user});
  if (member != null){
    res.send(true);
  }
  else {
    res.send(false);
  }

});

module.exports = router;
