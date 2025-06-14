
import Leaves from "../models/Leaves.js";
import Employee from "../models/Employee.js";

export const addleave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    if (!userId || !leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const employee = await Employee.findOne({ userId: userId });
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    const newLeave = new Leaves({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();
    res.status(200).json({ success: true, message: "Leave request added successfully" });
  } catch (error) {
    console.error("Error adding leave request:", error);
    res.status(500).json({ success: false, message: "Server error in adding leave request" });
  }
};
// leavecontroller.js
export const getLeaves = async (req, res) => {
  try {
    const { id } = req.params;

    let leaves = await Leaves.find({ employeeId: id });

    // If no leaves found using employeeId, try userId -> employee lookup
    if (!leaves || leaves.length === 0) {
      const employee = await Employee.findOne({ userId: id });
      if (employee) {
        leaves = await Leaves.find({ employeeId: employee._id });
      }
    }

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error("Error fetching leaves:", error);
    res.status(500).json({ success: false, message: "Server error in fetching leaves" });
  }
};



export const getLeave = async (req,res)=>{
  try{
    const leaves = await Leaves.find().populate({path:'employeeId',populate:[{path:'department', select:'dep_name'},{path:'userId', select:'name'}]});
    if (!leaves || leaves.length === 0) {
      return res.status(404).json({ success: false, message: "No leaves found" });
    }

    res.status(200).json({ success: true, leaves });

  }catch(e){
    console.error("Error fetching all leaves:", e);
    res.status(500).json({ success: false, message: "Server error in fetching all leaves" });
  }
};

export const getLeaveDetails = async (req, res) => {
  try{
    const { id } = req.params;

    const leave = await Leaves.findById({ _id: id }).populate({
      path: 'employeeId',
      populate: [
        { path: 'department', select: 'dep_name' },
        { path: 'userId', select: 'name profileImage' }
      ]
    });

    if (!leave) {
      return res.status(404).json({ success: false, message: "Leave not found" });
    }

    res.status(200).json({ success: true, leave });

  }catch(e){
    console.error("Error fetching leave details:", e);
    res.status(500).json({ success: false, message: "Server error in fetching leave details" });
  }
}

export const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    const leave = await Leaves.findByIdAndUpdate(id, { status }, { new: true });

    if (!leave) {
      return res.status(404).json({ success: false, message: "Leave not found" });
    }

    res.status(200).json({ success: true, message: "Leave status updated successfully", leave });
  } catch (error) {
    console.error("Error updating leave status:", error);
    res.status(500).json({ success: false, message: "Server error in updating leave status" });
  }
};