const mongoose = require('mongoose');
const Zone = require("./ZoneModel");

const EnvironmentModel = mongoose.Schema({
  Zones : [ Zone.schema ]
}, {collection : "Environment Setups"});


EnvironmentModel.methods.compareEnvironment = async function(environment){
    match = false;
    for(i in this.Zones){
        element1 = this.Zones[i];
        for(j in environment.Zones)
        {
            element2 = environment.Zones[j];
            if (element1.index == element2.index){
                if (element1.option === element2.option){
                    match = true;
                }
                else {
                    match = false;
                }
            }
        }
    };
    return match;
}


const Environment = mongoose.model("Environment", EnvironmentModel);
module.exports = Environment;
