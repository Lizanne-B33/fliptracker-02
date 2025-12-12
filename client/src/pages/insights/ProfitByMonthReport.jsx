// This is an aggregated report that calculates the
// profit made from sold items, then summarizes by month.
// this report can be printed out by the user for record keeping
// or to send to the accountant.

// client/src/pages/insights/ProfitByMonthReport.jsx
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../api/apiConfig';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function ProfitByMonthReport() {
  // COMPONENT STATE: the Loading is the indicator the user sees
  // while the report is getting created, the rows, what the report
  // generates.
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // Runs once when the component is mounted.
  // [] dependency array only on first render.
  // fetch data: async function that gets data from api, and updates
  // the state with data. (or on error, sets rows to [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          '/api/inventory/profit-by-month/'
        );
        setRows(response.data || []);
      } catch (err) {
        console.error('Error fetching profit by month:', err);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Print button, renders the print dialog for the current page.
  // logo appears because it was on my nav/header. Magic!
  const printPage = () => window.print();

  return (
    <div className="report-container" style={{ margin: '20px' }}>
      <h2 style={{ marginBottom: '16px' }}>Profit by Month</h2>
      <div style={{ marginBottom: '12px' }}>
        <button onClick={printPage} className="btn btn-primary">
          Print
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : rows.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Month</th>
              <th>Profit ($)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, index) => (
              <tr key={index}>
                <td>{r.month}</td>
                <td>{Number(r.profit).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
