/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./view.css";

const ViewEmployee = () => {
    const [employee, setEmployee] = useState(null);
    const [empLoading, setEmpLoading] = useState(false);
    const { id } = useParams();

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
                    console.log(response.data.employee);
                    setEmployee(response.data.employee);
                }
            } catch (error) {
                console.error("Error fetching employee:", error);
            } finally {
                setEmpLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    if (empLoading) return <p>Loading...</p>;
    if (!employee) return <p>No employee data found.</p>;

    return (
        <div className="view-employee-container">
            <h1 className="employee-heading">Employee Details</h1>
            <div className="employee-card">
                <div className="employee-profile">
                    <img src={`http://localhost:3000/${employee?.userId?.profileImage}`} alt="Employee Profile" />
                </div>
                <div className="employee-details">
                    <p><span>Name:</span> {employee?.userId?.name}</p>
                    <p><span>Employee ID:</span> {employee?.employeeId}</p>
                    <p><span>Date of Birth:</span> {new Date(employee?.dob).toLocaleDateString()}</p>
                    <p><span>Gender:</span> {employee?.gender}</p>
                    <p><span>Marital Status:</span> {employee?.maritalStatus}</p>
                    <p><span>Designation:</span> {employee?.designation}</p>
                    <p><span>Department:</span> {employee?.department?.dep_name}</p>
                </div>
            </div>
        </div>
    );
};

export default ViewEmployee;
