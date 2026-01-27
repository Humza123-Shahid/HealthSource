const mongoose = require('mongoose');
const { Schema } = mongoose;

const AppointmentSchema = new Schema({
patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
// department: { type: Types.ObjectId, ref: 'Department' },
appointmentDate:{ type: Date, default: Date.now },
bookingType: { type: String, enum: ['online','walk-in'] },
status: { type: String, enum: ['booked','cancelled','completed','no-show'], default: 'booked' },
notes: String,
// createdBy: { type: Types.ObjectId, ref: 'Staff' },
}, { timestamps: true });

module.exports=mongoose.model('Appointment', AppointmentSchema);