// client/src/pages/insights/ProfitByMonthReport.jsx
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../api/apiConfig';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function ProfitByMonthReport() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/products/profit-by-month/');
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
