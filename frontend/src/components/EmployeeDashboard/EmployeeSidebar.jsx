/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import '../dashboard/AminSidebar.css'; // Import the CSS file for styling
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaCalendarAlt,
  FaMoneyBill,
  FaCog,
} from "react-icons/fa";
import "../dashboard/AdminSummary";
import { useAuth } from "../../context/authContext";
import "../dashboard/AminSidebar.css"; // CSS file you provided

const EmployeeSidebar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const profilePath = user?._id
    ? `/employee-dashboard/profile/${user._id}`
    : "/employee-dashboard/profile";

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/employee-dashboard",
      exact: true,
    },
    {
      name: "My Profile",
      icon: <FaUser />,
      path: profilePath,
    },
    {
      name: "Leave",
      icon: <FaCalendarAlt />,
      path: `/employee-dashboard/leave/${user?._id}`,
    },
    {
      name: "Salary",
      icon: <FaMoneyBill />,
      path: `/employee-dashboard/salary/${user?._id}`,
    },
    {
      name: "Settings",
      icon: <FaCog />,
      path: "/employee-dashboard/settings",
    },
  ];

  return (
    <div className={`sidebar ${!isOpen ? "closed" : ""}`}>
      <h1 className="sidebar-title">Employee Management System</h1>

      <button className="menu-button" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? "✖" : "☰"}
      </button>

      <ul>
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              end={item.exact || undefined}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setIsOpen(false)}
            >
              <span className="icon">{item.icon}</span>
              {isOpen && (
                <span className="menu-text">
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeSidebar;
