const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConsultationSchema = new Schema({
patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
symptoms: String,
diagnosis: String,
notes: String,
followUpDate: { type: Date },
vitals: {
temperature: Number,
bloodPressure: String,
pulse: Number,
oxygenLevel: Number,
},
// createdBy: { type: Types.ObjectId, ref: 'Staff' },
}, { timestamps: true });

module.exports=mongoose.model('Consultation', ConsultationSchema);