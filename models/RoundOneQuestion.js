const mongoose = require('mongoose');
const RoundOneQuestionSchema = mongoose.Schema({
    Instruction : String,
    BlockedZones : [Number],
    Options : [String],
    answers : [{type : mongoose.Schema.Types.ObjectId, ref : "RoundOneAnswer"}]
}, {collection : "RountOneQuestions"});

const RoundOneQuestion = mongoose.model('RoundOneQuestion', RoundOneQuestionSchema);
module.exports = RoundOneQuestion;

