const mongoose = require('mongoose');
const { Schema } = mongoose;

const DoctorSchema = new Schema({
staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
specializations: String,
licenseNumber: String,
experienceYears: Number,
consultationFee: Number,
onCall: { type: Boolean, default: false },
signaturePath: String
}, { timestamps: true });

module.exports=mongoose.model('Doctor', DoctorSchema);