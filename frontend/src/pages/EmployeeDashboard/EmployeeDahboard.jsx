/* eslint-disable no-unused-vars */
import React from "react";

import Navbar from "../../components/dashboard/Navbar.jsx";
// import AdminSummary from "../../components/dashboard/AdminSummary.jsx";
import { Outlet } from "react-router-dom";
import EmployeeSidebar from "../../components/EmployeeDashboard/EmployeeSidebar.jsx";
const EmployeeDahboard = () => {
  return (
    <div className="flex">
      <EmployeeSidebar />
      <div className="dashboard-content">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDahboard;
