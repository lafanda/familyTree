const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const memberSchema = new Schema({
    name: { type: String, required: true },
    deceased: { type: Boolean, required: true },
    birthday: { type: Date, required: false },
    dayOfDeath: { type: Date, required: false },
    spouse: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
    children: [{ type: Schema.Types.ObjectId, ref: 'Member' }]
});

const memberModel = model('Member', memberSchema);
module.exports = memberModel;
