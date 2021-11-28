const express = require("express");
const User = require('../../../models/UserModel');
const router = express.Router();

router.post('/', async (req, res) => {
    const { email, name, photoURL, collegeName, yearOfGraduation } = req.body;
  var user = await User.findOne({email : email});
  if (user != null){
    user.updatePhoto(photoURL);
    await user.save();
    res.json(user);
  }
  else {
      res.json(300);
  }
});

module.exports = router;
