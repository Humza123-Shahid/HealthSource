const mongoose = require('mongoose');
const { Schema } = mongoose;

const StaffDutySchema = new Schema({
staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
shift: { type: mongoose.Schema.Types.ObjectId, ref: 'StaffShift' },
dutyDate: { type: Date, required: true },
duty_type: { type: String, enum: ['ward-round','OPD','ICU','OT','reception','emergency'] },

status: { type: String, enum: ['assigned','in-progress','completed','cancelled'] },
}, { timestamps: true });

module.exports=mongoose.model('StaffDuty', StaffDutySchema);