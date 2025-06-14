/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DepartmentList.css";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import column, { DepartmentButtons } from "../../utils/DepartmentHelper.jsx";

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [depLoading, setDepLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        setDepLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/department/all", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                let sno = 1;
                const data = response.data.departments.map((dep) => ({
                    _id: dep._id,
                    sno: sno++,
                    dept_name: dep.dep_name,
                    action: <DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />,
                }));

                setDepartments(data);
            }
        } catch (error) {
            console.error("Error fetching departments:", error);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            }
        } finally {
            setDepLoading(false);
        }
    };

    
    const onDepartmentDelete = (id) => {
        setDepartments((prevDepartments) => prevDepartments.filter(dep => dep._id !== id));
    };

    
    const filteredData = departments.filter(dep =>
        dep.dept_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {depLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Manage Department</h2>
                    </div>
                    <div className="search-add">
                        <input
                            type="search"
                            placeholder="Search Department"
                            className="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn">
                            <Link to="/admin-dashboard/department/add-department" className="add-dept">
                                Add Department
                            </Link>
                        </button>
                    </div>
                    <div>
                        <DataTable columns={column} data={filteredData} pagination />
                    </div>
                </>
            )}
        </div>
    );
};

export default DepartmentList;
