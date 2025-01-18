import React, { useState } from 'react';
import axios from 'axios';

const EmailDispatch = () => {
  const [type, setType] = useState('daily');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleDispatch = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('http://localhost:5000/api/email-dispatch/send', {
        to: 'all@company.com', // This would typically be fetched from your employee list
        subject: `${type.charAt(0).toUpperCase() + type.slice(1)} Mood Check`,
        type: type
      });

      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (err) {
      setError('Failed to send emails. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Email Dispatch</h2>
      <div className="flex items-center mb-4">
        <label className="mr-4">
          <input
            type="radio"
            value="daily"
            checked={type === 'daily'}
            onChange={() => setType('daily')}
            className="mr-2"
          />
          Daily
        </label>
        <label>
          <input
            type="radio"
            value="weekly"
            checked={type === 'weekly'}
            onChange={() => setType('weekly')}
            className="mr-2"
          />
          Weekly
        </label>
      </div>
      <button
        onClick={handleDispatch}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? 'Sending...' : 'Send Emails'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">Emails sent successfully!</p>}
    </div>
  );
};

export default EmailDispatch;

