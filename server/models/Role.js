const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoleSchema = new Schema({
name: { type: String, required: true },
permissions: { type: Schema.Types.Mixed }, // store permission JSON
}, { timestamps: true });

module.exports=mongoose.model('Role', RoleSchema);