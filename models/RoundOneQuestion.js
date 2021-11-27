const mongoose = require('mongoose');
const Environment = require('./Environment');
const Option = require('./optionModel');
const RoundOneQuestionSchema = mongoose.Schema({
    Instruction : String,
    UnblockedZones : [String],
    BlockedZones : [String],
    PrefixEnvironment : Environment.schema,
    Options : [Option.schema],
    correctEnvironment : {type : mongoose.Schema.Types.ObjectId, ref : "Environment"}
}, {collection : "RountOneQuestions"});

const RoundOneQuestion = mongoose.model('RoundOneQuestion', RoundOneQuestionSchema);
 module.exports = RoundOneQuestion;
