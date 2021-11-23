const mongoose = require('mongoose');

const ManagerSchema = mongoose.Schema({
    email : String,
    name : String,
    photourl : String
}, {collection : "Managers"});

const Manager = mongoose.model('Manager', ManagerSchema);
module.exports = Manager;