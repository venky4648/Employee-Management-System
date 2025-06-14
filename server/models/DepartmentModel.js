import mongoose, { Query } from 'mongoose';
import Leave from'./Leaves.js'
import Employee from './Employee.js';
import salary from './Salary.js'; // Assuming you have a Salary model

const departmentSchema = mongoose.Schema({
    dep_name: { type: String, required: true },
    description: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// Middleware to update `updated_at` before saving
departmentSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});


departmentSchema.pre("deleteOne",{document: true,query:false}, async function (next) {
    try{
        const employees = await Employee.find({ department: this._id });
        const empIds = employees.map(emp => emp._id);
        await Employee.deleteMany({ _id: { $in: empIds } });
        await Leave.deleteMany({ employee: { $in: empIds } });
        await salary.deleteMany({ employee: { $in: empIds } });
        next();

    } catch (error) {
        next(error);
    }
});

const DepartmentModel = mongoose.model('Department', departmentSchema);
export default DepartmentModel;
