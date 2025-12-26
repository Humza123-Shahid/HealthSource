const mongoose = require('mongoose');
const { Schema } = mongoose;

const PatientMedicalHistorySchema = new Schema({
patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
condition: String,
diagnosisDate: Date,
treatment: String,
status: { type: String, enum: ['ongoing','resolved'] },
notes: String,
}, { timestamps: true });

module.exports=mongoose.model('PatientMedicalHistory', PatientMedicalHistorySchema);