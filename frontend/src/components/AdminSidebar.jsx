/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUser, FaBuilding, FaCalendarAlt, FaMoneyBill, FaCog } from "react-icons/fa";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "dashboard", icon: <FaTachometerAlt />, path: "/admin-dashboard/dashboard" },
    { name: "employee", icon: <FaUser />, path: "/admin-dashboard/employee" },
    { name: "department", icon: <FaBuilding />, path: "/admin-dashboard/department" },
    { name: "leave", icon: <FaCalendarAlt />, path: "/admin-dashboard/leave" },
    { name: "salary", icon: <FaMoneyBill />, path: "/admin-dashboard/salary/add" },
    { name: "settings", icon: <FaCog />, path: "/admin-dashboard/settings" },
  ];

  return (
    <>
      <style>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          width: 240px;
          background-color: #2c3e50;
          color: #ecf0f1;
          transition: width 0.3s ease;
          overflow: hidden;
          z-index: 1000;
          padding-top: 60px;
        }

        .sidebar.closed {
          width: 70px;
        }

        .sidebar-title {
          position: absolute;
          top: 10px;
          left: 20px;
          font-size: 1.1rem;
          font-weight: bold;
          color: #ecf0f1;
          display: block;
        }

        .menu-button {
          position: absolute;
          top: 15px;
          right: 10px;
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #ecf0f1;
          cursor: pointer;
          z-index: 1001;
        }

        .sidebar ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sidebar li {
          display: flex;
          align-items: center;
          padding: 14px 20px;
          transition: background 0.2s ease;
        }

        .sidebar li:hover {
          background-color: #34495e;
        }

        .sidebar a {
          text-decoration: none;
          color: inherit;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .sidebar a.active {
          background-color: #1abc9c;
          color: white;
          border-radius: 8px;
        }

        .icon {
          font-size: 1.2rem;
          margin-right: 15px;
          min-width: 20px;
          text-align: center;
        }

        .menu-text {
          font-size: 1rem;
          transition: opacity 0.3s ease;
        }

        .sidebar.closed .menu-text {
          display: none;
        }

        @media (max-width: 768px) {
          .sidebar {
            position: relative;
            width: 100%;
            height: auto;
            flex-direction: row;
          }

          .sidebar.closed {
            width: 100%;
          }

          .menu-button {
            top: 10px;
            left: auto;
            right: 20px;
          }

          .sidebar ul {
            display: flex;
            flex-wrap: wrap;
            padding-top: 60px;
          }

          .sidebar li {
            width: 100%;
            justify-content: flex-start;
          }
        }
      `}</style>

      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <h1 className="sidebar-title">Employee Management System</h1>
        <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </button>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <span className="icon">{item.icon}</span>
                {isOpen && <span className="menu-text">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AdminSidebar;
