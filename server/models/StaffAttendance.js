const mongoose = require('mongoose');
const { Schema } = mongoose;

const StaffAttendanceSchema = new Schema({
staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
date: { type: Date, required: true },
checkIn: Date,
checkOut: Date,
shift: { type: mongoose.Schema.Types.ObjectId, ref: 'StaffShift' },
status: { type: String, enum: ['present','absent','leave'] },
}, { timestamps: true });

module.exports=mongoose.model('StaffAttendance', StaffAttendanceSchema);