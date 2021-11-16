const mongoose = require("mongoose");
const ZoneModel = mongoose.Schema({
    index : String,
  option : String
});

const Zone = mongoose.model("Zone", ZoneModel);
module.exports = Zone;
