const express = require('express');
const router = express.Router();
const {RtcTokenBuilder, RtcRole} = require('agora-access-token');
// const nocache = require('../MiddleWare/noCache');
const url = require('url');

const APP_ID = "583e53c6739745739d20fbb11ac8f0ef";
const APP_CERTIFICATE = "132098e9c70a448eb8c2083af0342985"

router.get('/', (req, res) => {
    const query = url.parse(req.url, true).query;
    const channelName = query.channel;
    const uid = query.uid;
    let role = RtcRole.SUBSCRIBER;
    if (query.role == 'publisher'){
        role = RtcRole.PUBLISHER;
    }
    let expireTime = 3600;
    const currentTime = Math.floor(Date.now()/1000);
    const previlegeExpiryTime = currentTime + expireTime;
    const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName,uid, role, previlegeExpiryTime);
    console.log(token);
    res.json({'token' : token});
})

module.exports = router;