const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoomSchema = new Schema({
ward: { type: mongoose.Schema.Types.ObjectId, ref: 'Ward' },
roomNumber: String,
type: { type: String, enum: ['single','shared','ICU'] },
chargesPerDay: Number,
}, { timestamps: true });

module.exports=mongoose.model('Room', RoomSchema);