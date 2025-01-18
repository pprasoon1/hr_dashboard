import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/alerts');
        setAlerts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching alerts');
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  const getSeverityColor = (type) => {
    switch (type) {
      case 'Low Performance':
        return 'bg-red-100 text-red-800';
      case 'Consecutive Absences':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Alerts</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Current Alerts</h2>
        {alerts.length === 0 ? (
          <p>No alerts at this time.</p>
        ) : (
          <ul className="space-y-4">
            {alerts.map((alert, index) => (
              <li 
                key={index} 
                className={`p-4 rounded-lg ${getSeverityColor(alert.type)}`}
              >
                <div className="font-bold">{alert.type}</div>
                <div>{alert.message}</div>
                <div className="text-sm mt-2">Date: {new Date(alert.date).toLocaleDateString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AlertsPage;

