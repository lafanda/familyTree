const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const Member = require('./member'); // Update with correct path
const User = require('./user'); // Update with correct path

const treeSchema = new Schema({
    familyName: { type: String, required: true },
    roots: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
    admins: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Tree = model('Tree', treeSchema);
module.exports = Tree;
