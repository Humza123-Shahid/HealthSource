const mongoose = require('mongoose');
const { Schema } = mongoose;

const PrescriptionSchema = new Schema({
consultation: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultation' },
doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
issuedDate: { type: Date, default: Date.now },
notes: String,
medicines: {
medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
dosage: String,
frequency: String,
duration: String,
instructions: String,
},
}, { timestamps: true });

module.exports=mongoose.model('Prescription', PrescriptionSchema);