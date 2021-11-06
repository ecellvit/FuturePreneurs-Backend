const express = require("express");
const Team = require("../../../models/TeamModel");
const router = express.Router();
const url = require('url');

router.get('/', async (req, res) => {
  const parts = url.parse(req.url, true);
  const query = parts.query;
  const teamID = query.teamID;
  const team = await Team.findById(teamID).populate('Leader Members');
  if (team == null){
    res.sendStatus(404);
  }
  else {
    res.json(team);
  }
});

module.exports = router;
