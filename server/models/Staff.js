const mongoose = require('mongoose');
const { Schema } = mongoose;

const StaffSchema = new Schema({
firstName: { type: String, required: true },
lastName: String,
designation: String, // e.g., Doctor, Nurse, Admin
nationalId: String,
gender: { type: String, enum: ['male','female','other'] },
dob: Date,
address: String,
contact: String,
qualification: String,
joiningDate: Date,
employmentType: { type: String, enum: ['full-time','part-time','contract'] },
// department: { type: Types.ObjectId, ref: 'Department' },
salary: Number,
shift: { type: mongoose.Schema.Types.ObjectId, ref: 'StaffShift' },
photoPath: String,
status: { type: String, enum: ['active','on-leave','resigned','terminated'], default: 'active' },
}, { timestamps: true });

module.exports=mongoose.model('Staff', StaffSchema);