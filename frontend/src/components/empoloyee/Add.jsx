/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./Add.css";
import { fetchDepartment } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    designation: "",
    department: "",
    salary: "",
    password: "",
    role: "",
    image: null,
  });

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const response = await fetchDepartment();
        setDepartments(response || []);
      } catch (error) {
        setDepartments([]);
      }
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/employee/add",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employee");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      alert(error.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-grid">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" onChange={handleChange} className="input-field" placeholder="Enter Name" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" onChange={handleChange} className="input-field" placeholder="Enter Email" />
          </div>
          <div className="form-group">
            <label>Employee ID</label>
            <input type="text" name="employeeId" onChange={handleChange} className="input-field" placeholder="Employee ID" />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input type="date" name="dob" onChange={handleChange} className="input-field" />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" onChange={handleChange} className="input-field">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>Marital Status</label>
            <select name="maritalStatus" onChange={handleChange} className="input-field">
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>
          <div className="form-group">
            <label>Department</label>
            <select name="department" onChange={handleChange} className="input-field">
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Designation</label>
            <input type="text" name="designation" onChange={handleChange} className="input-field" placeholder="Designation" />
          </div>
          <div className="form-group">
            <label>Salary</label>
            <input type="number" name="salary" onChange={handleChange} className="input-field" placeholder="Salary" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" onChange={handleChange} className="input-field" placeholder="*******" />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select name="role" onChange={handleChange} className="input-field">
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <div className="form-group">
            <label>Upload Image</label>
            <input type="file" name="image" onChange={handleChange} className="input-field" />
          </div>
        </div>
        <button type="submit" className="submit-btn">Add Employee</button>
      </form>
    </div>
  );
};

export default Add;
