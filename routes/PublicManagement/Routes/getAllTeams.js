const express = require('express');
const router = express.Router();
const Team = require('../../../models/TeamModel');

router.get('/', async (req, res) => {
  const teams = await Team.find().populate('Leader Members');
  res.json(teams);
})

module.exports = router;
