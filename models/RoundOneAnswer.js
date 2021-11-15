const mongoose = require('mongoose');
const RoundOneAnswerSchema = mongoose.Schema({
    index : Number,
    option : String,
}, {collection : "RoundOneAnswers"});

const RoundOneAnswer = mongoose.model('RoundOneAnswer', RoundOneAnswerSchema);

module.exports = RoundOneAnswer;
 
