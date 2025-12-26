const mongoose = require('mongoose');
const { Schema } = mongoose;

const LabRequestSchema = new Schema({
patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
test: { type: mongoose.Schema.Types.ObjectId, ref: 'LabTest' },
requestDate: { type: Date, default: Date.now },
priority: { type: String, enum: ['routine','urgent','stat'], default: 'routine' },
status: { type: String, enum: ['pending','processing','completed','cancelled'], default: 'pending' },
notes: String,
}, { timestamps: true });

module.exports=mongoose.model('LabRequest', LabRequestSchema);