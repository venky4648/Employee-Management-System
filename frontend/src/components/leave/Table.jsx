/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { column, LeaveButtons } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";

const Table = () => {
  const [empLoading, setEmpLoading] = useState(false);
  const [Leaves, setLeaves] = useState([]);
  const [allLeaves, setAllLeaves] = useState([]); // Backup for full list

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    setEmpLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/leave", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status || "N/A",
          action: <LeaveButtons Id={leave._id} />,
        }));

        setLeaves(data);
        setAllLeaves(data);
      }
    } catch (error) {
      console.error("Error fetching leaves:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      }
    } finally {
      setEmpLoading(false);
    }
  };

  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredLeaves = allLeaves.filter((leave) =>
      leave.name.toLowerCase().includes(searchValue)
    );
    setLeaves(filteredLeaves);
  };
  const handleFilterStatus = (status) => {
    if (status === "All") {
      setLeaves(allLeaves); // Reset to all leaves
    } else {
      const filteredLeaves = allLeaves.filter((leave) =>
        leave.status.toLowerCase().includes(status.toLowerCase())
      );
      setLeaves(filteredLeaves);
    }
  };

  return (
    <>
      {Leaves ? (
        <>
          <div className="text-center">
            <h2 className="text-2xl font-bold">Manage Leaves</h2>
          </div>

          <div
            className="search-add"
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px",
            }}
          >
            <input
              type="search"
              placeholder="Search By Name"
              className="search"
              onChange={handleFilter}
              style={{
                padding: "6px 10px",
                fontSize: "14px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                width: "420px",
                height: "40px",
                marginTop: "20px",
              }}
            />
            <div
              className="button-group"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "20px",
              }}
            >
              <button
                className="btn"
                onClick={() => handleFilterStatus("All")}
                style={{ backgroundColor: "#6c757d", borderRadius: "5px" }}
              >
                All
              </button>
              <button
                className="btn"
                onClick={() => handleFilterStatus("Pending")}
                style={{ backgroundColor: "#007BFF", borderRadius: "5px" }}
              >
                Pending
              </button>
              <button
                className="btn"
                onClick={() => handleFilterStatus("Approved")}
                style={{ backgroundColor: "#28A745", borderRadius: "5px" }}
              >
                Approved
              </button>
              <button
                className="btn"
                onClick={() => handleFilterStatus("Rejected")}
                style={{ backgroundColor: "#DC3545", borderRadius: "5px" }}
              >
                Rejected
              </button>
            </div>
          </div>
          <DataTable
            columns={column}
            data={Leaves}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="500px"
            rowsPerPage={20}
            highlightOnHover
            pointerOnHover
            customStyles={{
              headCells: {
                style: {
                  backgroundColor: "#007BFF",
                  color: "white",
                  fontWeight: "600",
                },
              },
              cells: {
                style: {
                  padding: "10px 15px",
                  color: "#333",
                },
              },
            }}
          />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Table;
