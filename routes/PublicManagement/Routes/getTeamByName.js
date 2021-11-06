const express = require('express');
const Team = require('../../../models/TeamModel');
const router = express.Router();
const url = require('url');

router.get('/', async (req, res) => {

  const parts = url.parse(req.url, true);
  const query = parts.query;
  const teamName = query.teamName;
  const team = await Team.findOne({'TeamName' : teamName}).populate("Leader Members");
  res.json(team);
})

module.exports = router;
