const express = require("express");
const Member = require('../../../models/MemberModel');
const router = express.Router();
const url = require('url');

router.get('/', async (req, res) => {
  const parts = url.parse(req.url, true);
  const query = parts.query;
  const userID = query.userID;

  const member = Member.findOne({'User[_id]' : userID});

  if (member != null){
    res.send(true);
  }
  else {
    res.send(false);
  }

});

module.exports = router;
