const mongoose = require('mongoose');
const User = require('./UserModel')
const MemberSchema = mongoose.Schema({
  User : User.schema,
  isLeader : false,
  isApproved : false,
  teamID : {type : mongoose.Schema.Types.ObjectId, ref : "Team"}
}, {collection : "Member"});

MemberSchema.methods.makeLeader = async function(){
  this.isLeader = true;
  await this.save();
};

MemberSchema.methods.approveMember = async function(){
  this.isApproved = true;
  await this.save();
};

MemberSchema.methods.addTeam = async function(teamID){
  this.teamID = teamID;
}

const Member = mongoose.model("Member", MemberSchema);

module.exports = Member;
