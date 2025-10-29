const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const departmentSchema = new mongoose.Schema({
    _id: Number,
    name: String
});
const Department = mongoose.model('Department', departmentSchema);

const employeeSchema = new mongoose.Schema({
    _id: Number,
    firstName: String,
    lastName: String,
    departmentId: { type: Number, ref: 'Department' } // Number, ref
});

employeeSchema.plugin(AutoIncrement, { inc_field: '_id' });
const Employees = mongoose.model('Employees', employeeSchema);


module.exports = { Employees, Department };