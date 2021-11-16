const mongoose = require('mongoose');
const Environment = require('./Environment');
const RoundOneQuestionSchema = mongoose.Schema({
    Instruction : String,
    UnblockedZones : [String],
    BlockedZones : [String],
    PrefixEnvironment : Environment.schema,
    Options : [String],
    correctEnvironment : {type : mongoose.Schema.Types.ObjectId, ref : "Environment"}
}, {collection : "RountOneQuestions"});

const RoundOneQuestion = mongoose.model('RoundOneQuestion', RoundOneQuestionSchema);
 module.exports = RoundOneQuestion;
