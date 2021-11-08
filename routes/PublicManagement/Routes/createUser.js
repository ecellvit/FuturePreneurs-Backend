const express = require("express");
const User = require('../../../models/UserModel');
const router = express.Router();

router.post('/', async (req, res) => {
    const { email, name, photoURL, collegeName, yearOfGraduation } = req.body;
  var user = await User.findOne({email : email});
  if (user != null){
    res.json(user);
  }
  else {
      user = new User({email, name, photoURL, collegeName, yearOfGraduation});
    await user.save();
    res.json(user);
  }
});

module.exports = router;
