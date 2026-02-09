const mongoose = require('mongoose');
const { Schema } = mongoose;

const DepartmentSchema = new Schema({
name: { type: String, required: true },
code: String,
description: String,
headOfDepartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
}, { timestamps: true });

module.exports=mongoose.model('Department', DepartmentSchema);
