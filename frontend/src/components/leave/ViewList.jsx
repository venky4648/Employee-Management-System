/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../empoloyee/view.css"; // Assuming you have a CSS file for styling
import { useNavigate } from "react-router-dom";
const ViewList = () => {
    const [leave, setLeave] = useState(null);
    const [leaveLoading, setLeaveLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeave = async () => {
            setLeaveLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/api/leave/details/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.data.success) {
                    console.log(response.data.leave);
                    setLeave(response.data.leave);
                }
            } catch (error) {
                console.error("Error fetching leave:", error);
            } finally {
                setLeaveLoading(false);
            }
        };

        fetchLeave();
    }, [id]);

    const changeStatus = async (id,status)=>{
        try {
            const response = await axios.put(`http://localhost:3000/api/leave/status/${id}`, { status }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                alert("Leave status updated successfully");
                navigate("/admin-dashboard/leave");
                // setLeave((prevLeave) => ({
                //     ...prevLeave,
                //     status: response.data.leave.status, // Update the status in the current leave state
                // }));
            }
        } catch (error) {
            console.error("Error updating leave status:", error);
            alert("Error updating leave status. Please check console.");
        }
    }

    if (leaveLoading) return <p>Loading...</p>;
    if (!leave) return <p>No leave data found.</p>;

    return (
        <div className="view-employee-container">
            <h1 className="employee-heading">Leave Details</h1>
            <div className="employee-card">
                <div className="employee-profile">
                    <img src={`http://localhost:3000/${leave?.employeeId?.userId?.profileImage}`} alt="Employee Profile" />
                </div>
                <div className="employee-details">
                    <p><span>Name:</span> {leave?.employeeId?.userId?.name}</p>
                    <p><span>Employee ID:</span> {leave?.employeeId?.employeeId}</p>
                    <p><span>Leave Type:</span> {leave?.leaveType}</p>
                    <p><span>Reason:</span> {leave?.reason}</p>
                    <p><span>Department:</span> {leave?.employeeId?.department?.dep_name}</p>
                    <p><span>startDate:</span> {new Date(leave?.startDate).toLocaleDateString()}</p>
                    <p><span>endDate:</span> {new Date(leave?.endDate).toLocaleDateString()}</p>
                    <div>
                        <p>
                            {leave.status ==="Pending" ? "Action:" :<span>Status:</span>}
                        </p>{leave.status === "Pending" ? (<div className="flex space-x-2">
                            <button className="btn btn-success" onClick={()=>changeStatus(leave._id,"Approved")}>Approve</button>
                            <button className="btn btn-danger" onClick={()=>changeStatus(leave._id,"Rejected")}>Reject</button>
                        </div>) : (
                            <p><span></span> {leave?.status}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewList;
