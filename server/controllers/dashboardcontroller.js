import Employee from "../models/Employee.js";
import Department from "../models/DepartmentModel.js";
import Salary from "../models/Salary.js";
import Leave from "../models/Leaves.js";

export const getSummary = async (req, res) => {
  try {
    // Fetch total number of employees
    const totalEmployees = await Employee.countDocuments();

    // Fetch total number of departments
    const totalDepartments = await Department.countDocuments();

    // Fetch total monthly pay
    const totalMonthlyPay = await Salary.aggregate([
      { $group: { _id: null, totalPay: { $sum: "$netSalary" } } }
    ]);

    // Fetch leave details using case-insensitive regex
    const totalLeaves = await Leave.countDocuments();
    const approvedLeaves = await Leave.countDocuments({ status: { $regex: /^approved$/i } });
    const pendingLeaves = await Leave.countDocuments({ status: { $regex: /^pending$/i } });
    const deniedLeaves = await Leave.countDocuments({ status: { $regex: /^rejected$/i } });

    // Send the response
    res.status(200).json({
      success: true,
      summary: {
        totalEmployees,
        totalDepartments,
        totalMonthlyPay: totalMonthlyPay[0]?.totalPay || 0,
        totalLeaves,
        approvedLeaves,
        pendingLeaves,
        deniedLeaves
      }
    });

  } catch (err) {
    console.error("Error fetching summary:", err);
    res.status(500).json({ success: false, message: "Server error in fetching summary" });
  }
};
