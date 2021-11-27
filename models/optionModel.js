const mongoose = require('mongoose');
const optionModel = mongoose.Schema({
    id : Number,
    name : String,
})

const Option = mongoose.model('Option', optionModel);
module.exports = Option;