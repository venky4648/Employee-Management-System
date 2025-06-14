// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchDepartment, getEmployees } from '../../utils/EmployeeHelper';

const Add = () => {
  const [salary, setSalary] = useState({
    employeeId: '',
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: '',
  });

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const departmnets = await fetchDepartment();
      setDepartments(departmnets || []);
    };
    getDepartments();
  }, []);

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/api/salary/add`, salary, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        alert('Salary details added successfully');
        navigate('/admin-dashboard/employee');
      }
    } catch (error) {
      console.error("Error adding salary:", error);
      alert('Failed to add salary details');
    }
  };

  return (
    <>
      <style>{`
        .container {
          max-width: 600px;
          margin: 40px auto;
          padding: 30px 40px;
          background: rgba(255, 255, 255, 0.85);
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(6px);
          font-family: 'Segoe UI', sans-serif;
          color: #333;
          
        }

        .container h2 {
          text-align: center;
          margin-bottom: 30px;
          font-size: 2rem;
          color: #2c3e50;
          border-bottom: 2px solid #007bff;
          padding-bottom: 10px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: #333;
        }

        .input-field {
          width: 100%;
          padding: 12px 15px;
          font-size: 1rem;
          border-radius: 10px;
          border: 1px solid #ccc;
          transition: border 0.3s, box-shadow 0.3s;
          background-color: #f9f9f9;
        }

        .input-field:focus {
          border-color: #007bff;
          box-shadow: 0 0 6px rgba(0, 123, 255, 0.5);
          outline: none;
          background-color: white;
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(to right, #007bff, #0056b3);
          color: white;
          font-weight: bold;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          transition: background 0.3s, transform 0.2s;
          cursor: pointer;
          margin-top: 15px;
        }

        .submit-btn:hover {
          background: linear-gradient(to right, #0056b3, #003c7a);
          transform: translateY(-2px);
        }

        @media (max-width: 640px) {
          .container {
            padding: 20px;
            margin: 20px;
          }

          .container h2 {
            font-size: 1.6rem;
          }
        }
      `}</style>

      {empLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="container">
          <h2>Add Salary</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Department</label>
              <select
                name="department"
                onChange={handleDepartment}
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
              <label>Employee</label>
              <select
                name="employeeId"
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.employeeId}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Basic Salary</label>
              <input
                type="number"
                name="basicSalary"
                onChange={handleChange}
                className="input-field"
                placeholder="Basic Salary"
                required
              />
            </div>

            <div className="form-group">
              <label>Allowances</label>
              <input
                type="number"
                name="allowances"
                onChange={handleChange}
                className="input-field"
                placeholder="Allowances"
                required
              />
            </div>

            <div className="form-group">
              <label>Deductions</label>
              <input
                type="number"
                name="deductions"
                onChange={handleChange}
                className="input-field"
                placeholder="Deductions"
                required
              />
            </div>

            <div className="form-group">
              <label>Pay Date</label>
              <input
                type="date"
                name="payDate"
                value={salary.payDate}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <button type="submit" className="submit-btn">Add Salary</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Add;
