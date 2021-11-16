const express = require('express');
const router = express.Router();
const Question = require('../../../models/RoundOneQuestion')
const Environment = require("../../../models/Environment");
const Zone = require("../../../models/ZoneModel");
const RoundOneQuestion = require("../../../models/RoundOneQuestion");

router.post('/', async( req, res) => {
    const { instruction,UnblockedZones, blockedZones,prefixEnvironment ,options, correctEnvironment } = req.body;
    const PresetEnvironment = new Environment();
    const CorrectEnvironment = new Environment();
    for (i in prefixEnvironment){
        const element = prefixEnvironment[i];
        const index = element['index'];
        const option = element['option'];
        const zone = Zone({index, option});
        PresetEnvironment.Zones.push(zone);
    };

    for (j in correctEnvironment){
        const element = correctEnvironment[j];
        const index = element['index'];
        const option = element['option'];
        const zone = Zone({index, option});
        CorrectEnvironment.Zones.push(zone);
    };
    await CorrectEnvironment.save();

    const question = new RoundOneQuestion({ 
        Instruction : instruction,
        UnblockedZones : UnblockedZones,
        BlockedZones : blockedZones,
        PrefixEnvironment : PresetEnvironment,
        Options : options,
        correctEnvironment : CorrectEnvironment
    });
    await question.save();
    res.json(question);

});


module.exports = router;
