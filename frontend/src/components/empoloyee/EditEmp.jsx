/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmp = () => {
  const [employee, setEmployee] = useState({
    name: '',
    maritalStatus: '',
    department: '',
    designation: '',
    salary: '',
    
  });

  const [departments, setDepartments] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch employee details
  useEffect(() => {
    const fetchEmployee = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/employee/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          const fetchedEmp = response.data.employee;
          setEmployee({
            name: fetchedEmp.userId?.name || '',
            maritalStatus: fetchedEmp.maritalStatus || '',
            department: fetchedEmp.department?._id || '',  // ✅ Just the department ID
            designation: fetchedEmp.designation || '',
            salary: fetchedEmp.salary || '',
            
          });
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  // Fetch departments
  useEffect(() => {
    fetchDepartments();
}, []);

const fetchDepartments = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/department/all", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (response.data.success) {
            setDepartments(response.data.departments);
        }
    } catch (error) {
        console.error("Error fetching departments:", error);
        if (error.response?.data?.message) {
            alert(error.response.data.message);
        }
    }
   

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/employee/${id}`, employee, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        alert('Employee updated successfully');
        navigate('/admin-dashboard/employee');
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      alert('Failed to update employee');
    }
  };

  return (
    <>
      {empLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="container">
          <h2>Edit Employee</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-grid">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Marital Status</label>
                <select
                  name="maritalStatus"
                  value={employee.maritalStatus}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
              </div>
              <div className="form-group">
                <label>Department</label>
                <select
                  name="department"
                  value={employee.department}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
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
                <input
                  type="text"
                  name="designation"
                  value={employee.designation}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Designation"
                  required
                />
              </div>
              <div className="form-group">
                <label>Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={employee.salary}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Salary"
                  required
                />
              </div>
              
            </div>
            <button type="submit" className="submit-btn">Edit Employee</button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditEmp;
