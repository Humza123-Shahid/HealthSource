const mongoose = require('mongoose');
const { Schema } = mongoose;

const SurgerySchema = new Schema({
patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
primarySurgeon: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
type: String,
scheduledDate: Date,
startTime: Date,
endTime: Date,
operationTheatre: { type: mongoose.Schema.Types.ObjectId, ref: 'OperationTheatre' },
notes: String,
}, { timestamps: true });

module.exports=mongoose.model('Surgery', SurgerySchema);