/* eslint-disable no-unused-vars */
import React from 'react';
import SummaryCard from './SummaryCard';
import { FaBuilding, FaCheckCircle, FaFile, FaHourglass, FaMoneyBill, FaTimesCircle, FaUsers } from 'react-icons/fa';
import './AdminSummary.css';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const AdminSummary = () => {
  const [summary,setSummary]=useState(null)

  useEffect (()=>{
    const fetchSummary=async()=>{
      try{
        const response = await axios.get("http://localhost:3000/api/dashboard/summary",{
          headers :{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setSummary(response.data.summary);
        console.log("Summary fetched successfully:", response.data.summary);
      }catch (err){
        alert("Error fetching summary");
        console.error("Error fetching summary:", err);
      }
    }

    fetchSummary();
  },[])

  if (!summary) {
    return <div>Loading...</div>;
  }
  return (
    <div className="admin-summary">
      <h2>Dashboard Overview</h2>
      <div className="summary-grid">
        <SummaryCard icon={<FaUsers />} text="Total Members" number={summary.totalEmployees} iconClass="bg-blue" />
        <SummaryCard icon={<FaBuilding />} text="Total Departments" number={summary.totalDepartments} iconClass="bg-green" />
        <SummaryCard icon={<FaMoneyBill />} text="Monthly Pay" number={`${summary.totalMonthlyPay}/-`} iconClass="bg-yellow" />
      </div>
      <div className='mt-12'>
        <h4 className='text'>Leave Deatils</h4>
        <div className='leave-summmary-grid'>
            <div className='row1'>
                <SummaryCard icon={<FaFile />} text="Total Leaves" number={summary.totalLeaves} iconClass="bg-blue" />
                <SummaryCard icon={<FaCheckCircle />} text="Approved Leaves" number={summary.approvedLeaves} iconClass="bg-green" />
            </div>
            <div className='row2'>
                <SummaryCard icon={<FaHourglass/>} text="Pending Leaves" number={summary.pendingLeaves} iconClass="bg-yellow" />
                <SummaryCard icon={<FaTimesCircle />} text="Denied Leaves" number={summary.deniedLeaves} iconClass="bg-yellow" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
