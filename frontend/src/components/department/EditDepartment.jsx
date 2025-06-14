/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditDepartment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [department, setDepartment] = useState({
        dep_name: "",
        description: ""
    });
    const [depLoading, setDepLoading] = useState(false);

    useEffect(() => {
        const fetchDepartment = async () => {
            setDepLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/api/department/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.data.success) {
                    setDepartment({
                        dep_name: response.data.department.dep_name || "",
                        description: response.data.department.description || "",
                    });
                }
            } catch (error) {
                console.error("Error fetching department:", error);
                if (error.response?.data?.message) {
                    alert(error.response.data.message);
                }
            } finally {
                setDepLoading(false);
            }
        };

        fetchDepartment();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDepartment((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Sending data:", department); // Debugging step

        try {
            const response = await axios.put(
                `http://localhost:3000/api/department/${id}`,
                department,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                alert("Department updated successfully!"); 
                navigate("/admin-dashboard/department");
            }
        } catch (error) {
            console.error("Error updating department:", error);
            alert(error.response?.data?.error || "An error occurred. Please try again.");
        }
    };

    return (
        <>
            {depLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="add-department-container">
                    <div className="add-department-box">
                        <h3>Edit Department</h3>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="dep_name">Department Name:</label>
                                <input
                                    type="text"
                                    name="dep_name"
                                    placeholder="Department Name"
                                    onChange={handleInputChange}
                                    value={department.dep_name} 
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="description">Description:</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    onChange={handleInputChange}
                                    value={department.description} 
                                    cols="30"
                                    rows="5"
                                ></textarea>
                            </div>
                            <button type="submit">Edit Department</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditDepartment;
