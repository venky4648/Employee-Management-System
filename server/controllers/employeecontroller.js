import multer from "multer";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import path from "path";
import DepartmentModel from '../models/DepartmentModel.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage: storage });

export const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });

    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    await newEmployee.save();
    res
      .status(200)
      .json({ success: true, message: "Employee added successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Server error in adding employee" });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 }) // Ensure the field name matches
      .populate("department");
    res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Server error in fetching employee" });
  }
};

export const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    let employee = await Employee.findById(id)
      .populate("userId", { password: 0 })
      .populate("department");

    if (!employee) {
      // Try finding by userId instead of _id
      employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
    }

    if (employee) {
      return res.status(200).json({ success: true, employee });
    }

    return res
      .status(404)
      .json({ success: false, message: "Employee not found" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Server error in fetching employee" });
  }
};

export const updateEmployee = async (req,res)=>{
  try{
    const {id } = req.params;
    const {
      name,
      maritalStatus,
      designation,
      department,
      salary,
      
    } = req.body;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
    const user = await User.findById({_id:employee.userId})
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const updateUser= await User.findByIdAndUpdate({_id:employee.userId},{name})
    const updateEmployee= await Employee.findByIdAndUpdate({_id:id},{maritalStatus,designation,department,salary})
    if(!updateEmployee){
      return res.status(404).json({success:false,message:"Employee not updated"})
    }
    return res.status(200).json({success:true,message:"Employee updated successfully"})
    

  }catch(error){
    console.error(error);
    return res.status(500).json({success:false,error:"Server error in updating employee"})

  }
  

}


export const fetchEmployeesByDepId = async (req, res) => {
  const { id } = req.params;
  console.log("received departmnet ID:",id);
  try {
    const employees = await Employee.find({ department: id });

    if (employees.length > 0) {
      return res.status(200).json({ success: true, employees }); // Changed 'employee' to 'employees'
    }

    return res.status(404).json({ success: false, message: "Employee not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "get employeeDepId server error" });
  }
};
