import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from 'prop-types'

export const column =[
    {
        name:"s No",
        selector:(row)=> row.sno,
        // width:"70px"
    },
    {
        name:"Emp ID",
        selector:(row)=> row.employeeId,
        // width:"150px"
    },
    {
        name:"Name",
        selector:(row)=> row.name,
        sortable:true,
        // width:"150px"
    },
    {
        name:"Leave Type",
        selector:(row)=> row.leaveType,
        // width:"150px"
    },
    {
        name:"Department",
        selector:(row)=> row.department,
        // width:"150px"
    },
    {
        name:"Days",
        selector:(row)=> row.days,
        // width:"100px"
    },
    {
        name:"Status",
        selector:(row)=> row.status,
        // width:"100px"
    },
    {
        name:"Action",
        selector:(row)=> <LeaveButtons Id={row._id} />,
        // width:"130px"
    }

    
];

export const LeaveButtons = ({Id})=>{
    const navigate = useNavigate();
    const handleView=(id)=>{
        navigate(`/admin-dashboard/leaves/${id}`);
    }
    return (
        <button onClick={() => handleView(Id)} className="btn" style={{ backgroundColor: "blue",borderRadius:"5px" }}>
            View
        </button>
    )
}

//prop validation
LeaveButtons.propTypes = {
    Id: PropTypes.string.isRequired,
};