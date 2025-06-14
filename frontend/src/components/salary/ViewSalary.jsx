// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewSalary = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  let sno = 1;

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/salary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Error fetching salary data. Please check console.");
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, [id]);

  const handleFilter = (e) => {
    const keyword = e.target.value;
    const filteredRecords = salaries.filter((salary) =>
      salary.employeeId.employeeId?.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredSalaries(filteredRecords);
  };

  // Inline CSS styles
  const styles = {
    container: {
      overflowX: 'auto',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f9fafb',
    },
    title: {
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: '700',
      marginBottom: '20px',
      color: '#333',
    },
    searchContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: '15px',
    },
    searchInput: {
      padding: '6px 10px',
      fontSize: '14px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      width: '220px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: '#fff',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    th: {
      border: '1px solid #ddd',
      padding: '12px 15px',
      backgroundColor: '#007BFF',
      color: 'white',
      fontWeight: '600',
      textAlign: 'left',
      userSelect: 'none',
    },
    td: {
      border: '1px solid #ddd',
      padding: '10px 15px',
      color: '#333',
      verticalAlign: 'middle',
    },
    noRecords: {
      textAlign: 'center',
      marginTop: '30px',
      fontSize: '18px',
      color: '#666',
    },
    loading: {
      textAlign: 'center',
      fontSize: '18px',
      marginTop: '40px',
      color: '#555',
    }
  };

  return (
    <>
      {filteredSalaries === null ? (
        <div style={styles.loading}>Loading ...</div>
      ) : (
        <div style={styles.container}>
          <div>
            <h2 style={styles.title}>Salary History</h2>
          </div>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by Employee ID"
              style={styles.searchInput}
              onChange={handleFilter}
            />
          </div>
          {Array.isArray(filteredSalaries) && filteredSalaries.length > 0 ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>S.No</th>
                  <th style={styles.th}>Employee ID</th>
                  <th style={styles.th}>Salary</th>
                  <th style={styles.th}>Allowances</th>
                  <th style={styles.th}>Deductions</th>
                  <th style={styles.th}>Total</th>
                  <th style={styles.th}>Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary) => (
                  <tr key={salary._id}>
                    <td style={styles.td}>{sno++}</td>
                    <td style={styles.td}>{salary.employeeId.employeeId}</td>
                    <td style={styles.td}>{salary.basicSalary}</td>
                    <td style={styles.td}>{salary.allowances}</td>
                    <td style={styles.td}>{salary.deductions}</td>
                    <td style={styles.td}>{salary.netSalary}</td>
                    <td style={styles.td}>
                      {new Date(salary.payDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={styles.noRecords}>No salary records found.</div>
          )}
        </div>
      )}
    </>
  );
};

export default ViewSalary;
