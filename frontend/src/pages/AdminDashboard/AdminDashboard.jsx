/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import Navbar from "../../components/dashboard/Navbar.jsx";
// import AdminSummary from "../../components/dashboard/AdminSummary.jsx";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found. Redirecting to login.");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:3000/api/auth/verify", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("Admin Data Response:", data);

        if (response.ok && data.success) {
          if (data.user.role !== "admin") {
            console.error("User is not an admin.");
            setAdminData(null);
          } else {
            setAdminData(data.user);
          }
        } else {
          console.error("Admin verification failed:", data.message);
          setAdminData(null);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!adminData) return <p>Unauthorized or failed to fetch admin data.</p>;

  return (
    <div className="dashboard-container">
      <AdminSidebar />
      <div className="dashboard-content">
            <Navbar />
            <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
