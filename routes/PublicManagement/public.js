const express = require("express");
const router = express.Router();


router.use("/createUser", require('./Routes/createUser'));
router.use("/createTeam", require('./Routes/createTeam'));
router.use('/addMember', require('./Routes/addMember'));
router.use('/getAllTeams', require('./Routes/getAllTeams'));
router.use('/removeTeamMember', require('./Routes/removeTeamMember'));
router.use('/approveMember', require('./Routes/approveMember'));
router.use('/shiftLead', require('./Routes/shiftLeader'));


router.use('/getTeamById', require('./Routes/getTeamById'));
router.use('/getTeamByName', require('./Routes/getTeamByName'));
router.use('/getUserTeam', require('./Routes/getUserTeam'));
router.use('/hasTeam', require('./Routes/hasTeam'));


module.exports = router;
