/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddDepartment.css";

const AddDepartment = () => {
  const navigate = useNavigate(); // Correcting the Navigate function

  const [department, setDepartment] = useState({
    dept_name: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("sending data",department);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/department/add",
        department,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/department"); // Fixed navigation issue
      }
    } catch (error) {
      console.error("Error adding department:", error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error); // Fixed error handling
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="add-department-container">
      <div className="add-department-box">
        <h3>Add New Department</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="dept_name">Department Name:</label>
            <input
              type="text"
              name="dept_name"
              placeholder="Department Name"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              id="description"
              onChange={handleInputChange}
              cols="30"
              rows="5"
            ></textarea>
          </div>
          <button type="submit">Add Department</button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
