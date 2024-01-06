const mongoose = require("mongoose")
const {Schema, model} = mongoose;

const familySchema = new Schema({
    user: {type: String, required: true},
    members: {type: String, required: true}
})

const familyModel = model('Tree', familySchema);

module.exports = familyModel

