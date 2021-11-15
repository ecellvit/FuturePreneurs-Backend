const mongoose = require("mongoose");
const ZoneModel = mongoose.Schema({
  hasElement : Boolean,
  Element : String
});

const Zone = mongoose.model("Zone", ZoneModel);
module.exports = Zone;
