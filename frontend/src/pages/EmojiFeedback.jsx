import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const EmojiFeedback = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get('type');
    const employee = searchParams.get('employee');
    const emoji = searchParams.get('emoji');

    if (type && employee && emoji) {
      submitFeedback(type, employee, emoji);
    }
  }, [location]);

  const submitFeedback = async (type, employee, emoji) => {
    try {
      await axios.post('http://localhost:5000/api/emoji-response', {
        employee_id: employee,
        emoji: emoji,
        type: type
      });
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
    }
  };

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (submitted) {
    return (
      <div className="text-center mt-8 text-green-500">
        Thank you for your feedback!
      </div>
    );
  }

  return (
    <div className="text-center mt-8">
      <p>Loading...</p>
    </div>
  );
};

export default EmojiFeedback;

