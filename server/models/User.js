const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
// patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
email:{type:String,required:true,unique:true},
username: { type: String, required: true, unique: true },
password: String,
// passwordHash: String,
role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' }
// lastLogin: Date,
}, { timestamps: true });

module.exports=mongoose.model('User', UserSchema);