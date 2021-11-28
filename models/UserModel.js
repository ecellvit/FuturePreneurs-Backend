const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email : String,
  name : String,
    photoURL : String,
    collegeName : String,
    yearOfGraduation : String
}, {collection : "Users"});

UserSchema.methods.updatePhoto = async function(photoURL){
  this.photoURL = photoURL
}

const User = mongoose.model("User", UserSchema);
module.exports = User;
