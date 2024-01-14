const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const memberSchema = new Schema({
    name: { type: String, required: true },
    attributes: {
        deceased: {type: Boolean, required: true},
        birthday: {type: String, required: false},
        dayOfDeath: {type: String, required: false},
    },
    parents: []
});



const memberModel = model('Member', memberSchema);
module.exports = memberModel;
