/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";
import PropTypes from "prop-types"; // Fix incorrect import
import { useNavigate } from "react-router-dom";

export const fetchDepartment = async () => {
  let departments;
  try {
    const response = await axios.get("http://localhost:3000/api/department/all", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    console.error("Error fetching departments:", error);
    if (error.response?.data?.message) {
      alert(error.response.data.message);
    }
  }
  return departments;
};

// employees for salary

export const getEmployees = async (id) => {
  let employees = [];
  try {
    const response = await axios.get(`http://localhost:3000/api/employee/department/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      employees = response.data.employees;  // Adjusted to 'employees'
    }

    console.log("Employees fetched:", response.data);
  } catch (error) {
    console.error("Error fetching employees:", error);
    if (error.response?.data?.message) {
      alert(error.response.data.message);
    }
  }
  return employees;
};




export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", gap: "2px",borderRadius:"5px" }}>
      <button className="btn" onClick={() => navigate(`/admin-dashboard/employee/${_id}`)}>View</button>
      <button className="btn" style={{ backgroundColor: "blue" }} onClick={() => navigate(`/admin-dashboard/edit-employee/${_id}`)}>Edit</button>
      <button className="btn" style={{ backgroundColor: "green" }} onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}`)}>Salary</button>
      <button className="btn" style={{ backgroundColor: "orange" }} onClick={() => navigate(`/admin-dashboard/employees/leaves/${_id}`)}>Leave</button>
    </div>
  );
};


// Prop validation
EmployeeButtons.propTypes = {
  _id: PropTypes.string.isRequired,
};


const column = [
    {
      name: "s.no",
      selector: (row) => row.sno,
      // width:"70px"
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      // width:"100px"
    },
    {
        name: "Image",
      selector: (row) => row.profileImage,
      // width:"100px"
    },
    {
      name: "Department",
      selector: (row) => row.dept_name,
      // width:"120px"
    },
    {
        name:"DOB",
        selector: (row) => row.dob,
        sortable: true,
        // width:"120px"
    },
    {
      name: "Action",
      selector: (row) => row.action,
      width:"480px"
      
    },
    
  ];
  
  export default column;