const mongoose = require('mongoose');
const User = require('./UserModel')
const MemberSchema = mongoose.Schema({
  User : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
  isLeader : false,
  isApproved : false,
  teamID : {type : mongoose.Schema.Types.ObjectId, ref : "Team"}
}, {collection : "Member"});

MemberSchema.methods.makeLeader = function(){
  this.isLeader = true;
  this.save();
};

MemberSchema.methods.approveMember = function(){
  this.isApproved = true;
  this.save();
};

const Member = mongoose.model("Member", MemberSchema);
module.exports = Member;
