const mongoose = require('mongoose');
const { Schema } = mongoose;

const NurseSchema = new Schema({
staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
qualification: String,
licenseNumber: String,
assignedWard: { type: Types.ObjectId, ref: 'Ward' },
}, { timestamps: true });

module.exports=mongoose.model('Nurse', NurseSchema);