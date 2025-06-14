// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Add = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      userId: user._id,
      leaveType,
      startDate: fromDate,
      endDate: toDate,
      reason: description,
    };
    console.log("Request Body:", requestBody);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/leave/add`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate(`/employee-dashboard/leave/${user._id}`);
      }
    } catch (error) {
      console.error("Error submitting leave request:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", backgroundColor: "#f5f6f8", borderRadius: "8px" }}>
      <h2 style={{ fontWeight: "bold" }}>Request for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label>Leave Type</label>
          <select
            value={leaveType}
            name="leaveType"
            onChange={(e) => setLeaveType(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
            required
          >
            <option value="">Select Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Earned Leave">Earned Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
            <option value="Paternity Leave">Paternity Leave</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "50px", marginBottom: "20px" }}>
          <div style={{ flex: 1 }}>
            <label>From Date</label>
            <input
              type="date"
              name="startDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
              required
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>To Date</label>
            <input
              type="date"
              name="endDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
              required
            />
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Description</label>
          <textarea
            placeholder="Reason"
            name="reason"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
            rows={3}
            required
          />
        </div>

        <button
          type="submit"
          style={{ width: "100%", padding: "12px", backgroundColor: "#00897b", color: "#fff", border: "none", borderRadius: "5px", fontWeight: "bold", fontSize: "16px" }}
        >
          Request Leave
        </button>
      </form>
    </div>
  );
};

export default Add;