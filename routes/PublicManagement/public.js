const express = require("express");
const router = express.Router();


router.use("/createUser", require('./Routes/createUser'));



module.exports = router;
