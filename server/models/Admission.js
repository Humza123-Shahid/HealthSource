const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdmissionSchema = new Schema({
patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
admittingDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
ward: { type: mongoose.Schema.Types.ObjectId, ref: 'Ward' },
room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
bed: { type: mongoose.Schema.Types.ObjectId, ref: 'Bed' },
admissionDate: { type: Date, default: Date.now },
dischargeDate: Date,
reason: String,
conditionOnAdmission: String,
status: { type: String, enum: ['admitted','discharged','transferred'], default: 'admitted' },
}, { timestamps: true });

module.exports=mongoose.model('Admission', AdmissionSchema);