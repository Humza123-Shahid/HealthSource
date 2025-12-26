const mongoose = require('mongoose');
const { Schema } = mongoose;

const LabTestSchema = new Schema({
name: { type: String, required: true },
category: String,
normalRange: String,
price: Number,
code: String,
}, { timestamps: true });

module.exports=mongoose.model('LabTest', LabTestSchema);