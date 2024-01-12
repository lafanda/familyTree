const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const memberSchema = new Schema({
    name: { type: String, required: true },
    attributes: {
        deceased: {type: Boolean, required: true},
        birthday: {type: String, required: false},
        dayOfDeath: {type: String, required: false},
    },
    children: [{ type: Schema.Types.ObjectId, ref: 'Member' }]
});



const memberModel = model('Member', memberSchema);
module.exports = memberModel;
