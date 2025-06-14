/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/login";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard/EmployeeDahboard.jsx";

import RoleBaseRoutes from "./utils/RoleBaseRoutes.jsx";
import PrivateRoutes from "./utils/ProtectRoutes.jsx";
import AdminSummary from "./components/dashboard/AdminSummary.jsx";
import DepartmentList from "./components/department/DepartmentList.jsx";
import AddDepartment from "./components/department/AddDepartment.jsx";
import EditDepartment from "./components/department/EditDepartment.jsx";
import List from "./components/empoloyee/List.jsx";
import Add from "./components/empoloyee/Add.jsx";
import ViewEmployee from "./components/empoloyee/view.jsx";
import EditEmp from "./components/empoloyee/EditEmp.jsx";
import AddSalary from "./components/salary/Add.jsx";
import ViewSalary from "./components/salary/viewsalary.jsx";
import SummaryCard from "./pages/EmployeeDashboard/Summary.jsx";
import View from './components/empoloyee/view.jsx';
import ViewList from './components/leave/List.jsx';
import AddLeaves from './components/leave/Add.jsx';
import Setting from "./components/EmployeeDashboard/Setting.jsx";
import Table from "./components/leave/Table.jsx";
import ViewLists from "./components/leave/ViewList.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole="admin">
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route exact path="/admin-dashboard/dashboard" element={<AdminSummary />} />
          <Route exact path="/admin-dashboard/department" element={<DepartmentList />} />
          <Route exact path="/admin-dashboard/department/add-department" element={<AddDepartment />} />
          <Route exact path="/admin-dashboard/add-employee" element={<Add />} />
          <Route exact path="/admin-dashboard/employee/:id" element={<ViewEmployee />} />
          <Route exact path="/admin-dashboard/edit-employee/:id" element={<EditEmp />} />
          <Route exact path="/admin-dashboard/department/:id" element={<EditDepartment />} />
          <Route exact path="/admin-dashboard/employee" element={<List />} />
          <Route exact path="/admin-dashboard/employees/salary/:id" element={<ViewSalary />} />
          <Route exact path="/admin-dashboard/salary/add" element={<AddSalary />} />
          <Route exact path="/admin-dashboard/settings" element={<Setting />} />
          <Route exact path="/admin-dashboard/leave" element={<Table />} />
          <Route exact path="/admin-dashboard/leaves/:id" element={<ViewLists />} />
          <Route path="/admin-dashboard/employees/leaves/:id" element={<ViewList />} />
          
        </Route>

        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<SummaryCard />} />
          <Route exact path="/employee-dashboard/profile/:id" element={<View />} />
          <Route exact path="/employee-dashboard/leave/:id" element={<ViewList />} />
          <Route exact path="/employee-dashboard/add-leave" element={<AddLeaves />} />
          <Route exact path="/employee-dashboard/salary/:id" element={<ViewSalary />} />
          <Route exact path="/employee-dashboard/settings" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
