const mongoose = require('mongoose');
const { Schema } = mongoose;

const PatientSchema = new Schema({
// hospitalId: { type: String, index: true },
firstName: { type: String, required: true },
lastName: String,
email:{type:String,required:true,unique:true},
password:{type:String,required:true},
fatherName: String,
gender: { type: String, enum: ['male','female','other'] },
dateOfBirth: {type:Date,required: false},
age: Number,
nationalId: String, // CNIC / passport
contact: String,
address: String,
maritalStatus: { type: String, enum: ['single','married','other'] },
bloodGroup: String,
disabilities: String,
chronicConditions: String,
// disabilities: [String],
// chronicConditions: [String],
registrationDate: { type: Date, default: Date.now },
photoPath: String,
status: { type: String, enum: ['active','inactive','deceased'], default: 'active'},
}, { timestamps: true });

module.exports=mongoose.model('Patient', PatientSchema);