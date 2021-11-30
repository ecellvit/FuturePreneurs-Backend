const express = require('express');
const router = express.Router();
const Event = require('../../../models/Event');

router.post('/', async (req, res) => {
    const id = "61a6662eed5a1cee819c3639";
    const event = Event.findById(id);
    event.isRoundTwoOn = true;
    await event.save();
    res.json(event);
});

module.exports  = router;