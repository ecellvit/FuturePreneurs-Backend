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

TeamSchema.methods.addPoints = async function(numberOfAttempts){
    if (numberOfAttempts == 1){
        this.RoundOnePoints = this.RoundOnePoints + 10;
    }
    else if (numberOfAttempts == 2){
        this.RoundOnePoints = this.RoundOnePoints + 5;
    }
    else if (numberOfAttempts == 3){
        this.RoundOnePoints = this.RoundOnePoints + 1;
    }
}

const team = mongoose.model("Team", TeamSchema);
module.exports = team; 
