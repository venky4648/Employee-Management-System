import DepartmentModel from '../models/DepartmentModel.js';


const getDepartments = async (req, res) => {
    try {
        const departments = await DepartmentModel.find({});
        res.status(200).json({ success: true, departments });
    } catch (error) {
        console.error("Error fetching departments:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const addDepartment = async (req, res) => {
    try {
        console.log("Received Request Body:", req.body); // Debugging step

        const { dept_name, description } = req.body;

        if (!dept_name || !description) {
            return res.status(400).json({ error: "Both dept_name and description are required" });
        }

        const newDepartment = new DepartmentModel({ dep_name: dept_name, description });
        await newDepartment.save();

        res.status(201).json({ success: true, message: "Department added successfully", department: newDepartment });
    } catch (error) {
        console.error("Error adding department:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getDepartment = async (req,res)=>{
    try{
        const {id}=req.params;
        const department = await DepartmentModel.findById(id);
        if(!department){
            return res.status(404).json({ success: false, message: "Department not found" });
        }
        return res.status(200).json({ success: true, department: department });

    }catch (error) {{
        console.error("Error editing department:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}};


const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { dep_name, description } = req.body; // Ensure this matches frontend input names

        const updatedDepartment = await DepartmentModel.findByIdAndUpdate(
            id, 
            { dep_name, description }, // Updated field names
            { new: true } // Ensures MongoDB returns the updated document
        );

        if (!updatedDepartment) {
            return res.status(404).json({ success: false, message: "Department not found" });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Department updated successfully", 
            department: updatedDepartment 
        });
    } catch (e) {
        console.error("Error updating department:", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDepartment = await DepartmentModel.findById({_id:id});
        await deletedDepartment.deleteOne();
        if (!deletedDepartment) {
            return res.status(404).json({ success: false, message: "Department not found" });
        }
        return res.status(200).json({ success: true, message: "Department deleted successfully" });
        } catch (error) {
        console.error("Error deleting department:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
export  {addDepartment,getDepartments,updateDepartment,getDepartment,deleteDepartment};
