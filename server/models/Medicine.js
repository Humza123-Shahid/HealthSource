const mongoose = require('mongoose');
const { Schema } = mongoose;

const MedicineSchema = new Schema({
name: { type: String, required: true },
category: String,
manufacturer: String,
form: { type: String, enum: ['tablet','syrup','injection','ointment','other'] },
unitPrice: Number,
stock: Number,
expiryDate: Date,
batchNumber: String,
upc: String,
}, { timestamps: true });

module.exports=mongoose.model('Medicine', MedicineSchema);