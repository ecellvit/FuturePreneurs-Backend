const mongoose = require("mongoose");

const TeamSchema = mongoose.Schema({
  TeamName : String,
  Leader : {type : mongoose.Schema.Types.ObjectId, ref : "Member"},
  Members : [{type : mongoose.Schema.Types.ObjectId, ref : "Member"}],
    RoundOnePoints : 0,
    RoundTwoPoints : 0,
    canAttemptRoundOne : Boolean,
    canAttemptRoundTwo : Boolean,
},  {collection : "Teams"});

TeamSchema.methods.addMember = async function(memberID, isLeader){
  if (isLeader == true){
    this.Leader = memberID;
  }
  this.Members.push(memberID);
  await this.save();
};

const team = mongoose.model("Team", TeamSchema);
module.exports = team; 
