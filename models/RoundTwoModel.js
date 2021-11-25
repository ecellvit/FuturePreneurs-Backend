const mongoose = require('mongoose');
const Zone = require('./ZoneModel');
const RoundTwoSchema = mongoose.Schema({
    Zones : [Zone.schema],
}, {'collection' : 'RoundTwoData'});

RoundTwoSchema.methods.checkSubmission = async function(values){
    var sum = 0
    for(i in this.Zones){
        var element1 = this.Zones[i];
        for (j in values){
            var element2 = values[j];
            if (element1.index == element2.index){
                if (element1.option === element2.option){
                    sum = sum + 3;

                }
            }
        }
    }
    return sum;
}


const RoundTwo = mongoose.model('RoundTwo',RoundTwoSchema);
module.exports = RoundTwo;