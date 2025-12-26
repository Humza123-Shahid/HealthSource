const mongoose = require('mongoose');
const { Schema } = mongoose;

const WardSchema = new Schema({
name: String,
type: { type: String, enum: ['general','ICU','NICU','CCU','maternity','VIP'] },
totalRooms: Number,
}, { timestamps: true });

module.exports=mongoose.model('Ward', WardSchema);