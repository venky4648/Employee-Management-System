
import mongoose from "mongoose";
const { Schema } = mongoose;

const salarySchema = new Schema({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  basicSalary: {
    type: Number,
    required: true,
  },
  allowances: {
    type: Number,
    default: 0,
  },
  deductions: {
    type: Number,
    default: 0,
  },
  netSalary: {
    type: Number,
  },
  payDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

const Salary = mongoose.models.Salary || mongoose.model("Salary", salarySchema);
export default Salary;
