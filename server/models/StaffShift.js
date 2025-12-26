const mongoose = require('mongoose');
const { Schema } = mongoose;

const StaffShiftSchema = new Schema({
name: String,
startTime: Date,
endTime: Date,
breakMinutes: Number,
}, { timestamps: true });

module.exports=mongoose.model('StaffShift', StaffShiftSchema);