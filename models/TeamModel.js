const mongoose = require("mongoose");
const Environment = require("./Environment");

const TeamSchema = mongoose.Schema({
  TeamName : String,
  Leader : {type : mongoose.Schema.Types.ObjectId, ref : "Member"},
  Members : [{type : mongoose.Schema.Types.ObjectId, ref : "Member"}],
    RoundOnePoints : 0,
    RoundTwoPoints : 0,
    canAttemptRoundOne : Boolean,
    canAttemptRoundTwo : Boolean,
    RoundOneAttemptedQuestions : [{type : mongoose.Schema.Types.ObjectId, ref : "RoundOneQuestion"}],
    RoundTwoAttempted : Boolean,
    RoundOneAttempted : Boolean,
    RoundTwoResponse : Environment.schema,
    RoundOneTimeLeft : {type : Number, default : 900},
    RoundTwoTimeLeft : {type : Number, default : 900},
},  {collection : "Teams"});

TeamSchema.methods.addMember = async function(memberID, isLeader){
  if (isLeader == true){
    this.Leader = memberID;
  }
  this.Members.push(memberID);
};

TeamSchema.methods.updateRoundOneTime = async function(time){
  this.RoundOneTimeLeft = time;
}

TeamSchema.methods.updateRoundTwoTime = async function(time){
  this.RoundTwoTimeLeft = time;
}


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
