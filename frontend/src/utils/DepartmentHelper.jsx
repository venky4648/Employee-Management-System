/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const column = [
  {
    name: "s.no",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dept_name,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export default column;

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete?');
        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/department/${_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.data.success) {
                    onDepartmentDelete(_id);
                }
            } catch (error) {
                console.error("Error deleting department:", error);
                if (error.response?.data?.message) {
                    alert(error.response.data.message);
                }
            }
        }
    };

    return (
        <>
            <button className="btn" onClick={() => navigate(`/admin-dashboard/department/${_id}`)}>Edit</button>
            <button onClick={handleDelete} className="btn" style={{ backgroundColor: "red" }}>
                Delete
            </button>
        </>
    );
};

// Prop validation
DepartmentButtons.propTypes = {
    _id: PropTypes.string.isRequired,
    onDepartmentDelete: PropTypes.func.isRequired,
};
