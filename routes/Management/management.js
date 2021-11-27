const express = require('express');
const router = express.Router();

router.use('/createManager', require('./routes/createManager'));
router.use('/getAnalytics', require('./routes/getEventStatus'));
router.use('/get', require('./routes/getManagementData'));
module.exports = router;