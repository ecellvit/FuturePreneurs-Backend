const express = require("express");
const router = express.Router();


router.use("/createUser", require('./Routes/createUser'));
router.use("/createTeam", require('./Routes/createTeam'));
router.use('/addMember', require('./Routes/addMember'));

router.use('/getTeam', require('./Routes/getTeam'));
router.use('/canMakeTeam', require('./Routes/canMakeTeam'));


module.exports = router;
