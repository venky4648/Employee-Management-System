/* eslint-disable no-unused-vars */
// ListLeaves.jsx
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const List = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [empLoading, setEmpLoading] = useState(true);
  const { id } = useParams();
  let sno = 1;

  const handleFilter = (e) => {
    const records = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(records);
  };

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/leave/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console
      if (response.data.success && response.data.leaves) {
        setLeaves(response.data.leaves);
        setFilteredLeaves(response.data.leaves);
      } else {
        setLeaves([]);
        setFilteredLeaves([]);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Error fetching leave data.");
    } finally {
      setEmpLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [id]);

  const styles = {
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#fff",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      height:'100%'
    },
    th: {
      border: "1px solid #ddd",
      padding: "12px 15px",
      backgroundColor: "#007BFF",
      color: "white",
      fontWeight: "600",
      textAlign: "left",
    },
    td: {
      border: "1px solid #ddd",
      padding: "10px 15px",
      color: "#333",
      verticalAlign: "middle",
    },
  };

  return (
    <>
      <div className="text-center">
        <h2 className="text-2xl font-bold">Manage Leaves</h2>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", margin: "20px" }}>
        <input
          type="search"
          placeholder="Search By Status"
          onChange={handleFilter}
          style={{
            padding: "6px 10px",
            fontSize: "14px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "220px",
          }}
        />
        <button
          style={{ backgroundColor: "#007BFF", padding: "8px 14px", borderRadius: "5px" }}
        >
          <Link to="/employee-dashboard/add-leave" style={{ color: "white", textDecoration: "none" }}>
            Add Leave
          </Link>
        </button>
      </div>

      <div style={{ overflowX: "auto", padding: "20px" }}>
        {empLoading ? (
          <div style={{ textAlign: "center", fontSize: "18px" }}>Loading...</div>
        ) : filteredLeaves.length === 0 ? (
          <div style={{ textAlign: "center", fontSize: "18px" }}>No leave records found.</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>S.No</th>
                <th style={styles.th}>Leave Type</th>
                <th style={styles.th}>From</th>
                <th style={styles.th}>To</th>
                <th style={styles.th}>Reason</th>
                <th style={styles.th}>Applied Date</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.map((leave) => (
                <tr key={leave._id}>
                  <td style={styles.td}>{sno++}</td>
                  <td style={styles.td}>{leave.leaveType}</td>
                  <td style={styles.td}>{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td style={styles.td}>{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td style={styles.td}>{leave.reason}</td>
                  <td style={styles.td}>{new Date(leave.createdAt).toLocaleDateString()}</td>
                  <td style={styles.td}>{leave.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default List;
