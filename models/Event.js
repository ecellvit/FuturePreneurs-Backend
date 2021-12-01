const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    isRoundOneOn : Boolean,
    isRoundTwoOn : Boolean,
    timeOfEvent : {type : Date}
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;