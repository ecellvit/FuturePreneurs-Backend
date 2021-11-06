const express = require('express');
const router = express.Router();
const Team = require("../../../models/TeamModel");
const Member = require("../../../models/MemberModel");

router.post('/', async (req, res) => {
  const {teamID, memberID} = req.body;
  const 
})

module.exports = router;
