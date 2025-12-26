const mongoose = require('mongoose');
const { Schema } = mongoose;

const OperationTheatreSchema = new Schema({
name: String,
equipment: String,
status: { type: String, enum: ['available','maintenance','unavailable'] },
}, { timestamps: true });

module.exports=mongoose.model('OperationTheatre', OperationTheatreSchema);