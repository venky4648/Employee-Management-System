import mongoose from 'mongoose';
import { Schema } from 'mongoose';


const EmployeeSchema = new mongoose.Schema({
    userId:{type:Schema.Types.ObjectId,ref:'User',required:true},
    employeeId:{type:String,required:true,unique:true},

  dob: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female"], required: true },
  maritalStatus: { type: String, enum: ["Single", "Married"], required: true },
  department: { type: Schema.Types.ObjectId, ref: "Department", required: true },
  designation: { type: String, required: true },
  salary: { type: Number, required: true },
  
//   image: { type: String }, // Image URL or filename
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;
