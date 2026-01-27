const mongoose = require('mongoose');
const { Schema } = mongoose;

const LabResultSchema = new Schema({
labRequest: { type: mongoose.Schema.Types.ObjectId, ref: 'LabRequest', required: true },
test: { type: mongoose.Schema.Types.ObjectId, ref: 'LabTest' },
resultValue: String,
units: String,
remarks: String,
filePath: String,
resultDate: Date
// verifiedBy: { type: Types.ObjectId, ref: 'Staff' },
}, { timestamps: true });

module.exports=mongoose.model('LabResult', LabResultSchema);