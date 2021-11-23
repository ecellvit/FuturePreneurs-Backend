const express = require('express');
const router = express.Router();
const Manager = require('../../../models/Manager');

router.post('/', async (req, res) => {
    const {email, name, photourl} = req.body;
    var manager = await Manager.findOne({email});

    if (manager == null){
        manager = new Manager({ email, name, photourl });
        await manager.save();
        res.send(manager);
    }
    res.send(manager);
})

module.exports = router;