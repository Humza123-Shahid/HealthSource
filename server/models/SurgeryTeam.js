const mongoose = require('mongoose');
const { Schema } = mongoose;

const SurgeryTeamSchema = new Schema({
surgery: { type: mongoose.Schema.Types.ObjectId, ref: 'Surgery' },
staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
role: String, // surgeon, anesthetist, scrub-nurse
}, { timestamps: true });

module.exports=mongoose.model('SurgeryTeam', SurgeryTeamSchema);