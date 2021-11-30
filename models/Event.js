const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    isRoundOneOn : Boolean,
    isRoundTwoOn : Boolean
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;