/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import column, { EmployeeButtons } from "../../utils/EmployeeHelper"; // Correct import
import DataTable from "react-data-table-component";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(true);
  const [filteredEmployee, setFilteredEmployee] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployee(records);
  };

  const fetchEmployees = async () => {
    setEmpLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/employee/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const baseUrl = "http://localhost:3000";
        const data = response.data.employees.map((emp) => ({
          _id: emp._id,
          sno: sno++,
          dept_name: emp.department?.dep_name || "N/A", // ✅ Safe access with fallback
          name: emp.userId?.name || "N/A",
          dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : "N/A",
          profileImage: (
            <img
              src={`${baseUrl}/${emp.userId?.profileImage || "default.jpg"}`}
              alt="Employee Profile"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/50";
              }}
            />
          ),
          action: <EmployeeButtons _id={emp._id} />,
        }));

        setEmployees(data);
        setFilteredEmployee(data);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      }
    } finally {
      setEmpLoading(false);
    }
  };

  return (
    <>
      <div className="text-center">
        <h2 className="text-2xl font-bold">Manage Employee</h2>
      </div>
      <div className="search-add">
        <input
          type="search"
          placeholder="Search Employee Name"
          className="search"
          onChange={handleFilter}
        />
        <button className="btn">
          <Link to="/admin-dashboard/add-employee" className="add-dept">
            Add New Employee
          </Link>
        </button>
      </div>
      <div>
        {empLoading ? (
          <div>Loading...</div>
        ) : (
          <DataTable
            title="Employee List"
            columns={column}
            data={filteredEmployee}
            pagination
          />
        )}
      </div>
    </>
  );
};

export default List;
