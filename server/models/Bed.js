const mongoose = require('mongoose');
const { Schema } = mongoose;

const BedSchema = new Schema({
room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
bedNumber: String,
status: { type: String, enum: ['occupied','available','cleaning'], default: 'available' },
}, { timestamps: true });

module.exports=mongoose.model('Bed', BedSchema);