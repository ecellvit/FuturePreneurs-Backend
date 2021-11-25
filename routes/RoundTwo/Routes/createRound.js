const express = require('express');
const router = express.Router();
const RoundTwo = require('../../../models/RoundTwoModel');

router.post('/', async (req, res) => {
    const {Zones} = req.body;
    const roundTwo = RoundTwo({Zones});
    await roundTwo.save();
    res.send(roundTwo);
});

module.exports = router;