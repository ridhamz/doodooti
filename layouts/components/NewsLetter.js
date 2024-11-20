import React, { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('Thanks for joining my newsletter!');
        setEmail('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center" style={{color: '#F2ac08'}}>
        My Newsletter
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Get the latest updates, stories, and insights directly in your inbox
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-4 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2"
            style={{
              focusRingColor: '#F2ac08',
              borderColor: '#F2ac08'
            }}
            required
          />
        </div>
        
        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}
        
        {status && (
          <div className="text-green-500 text-sm text-center">
            {status}
          </div>
        )}
        
        <button
          type="submit"
          className="w-full text-white py-2 rounded-md 
                     hover:opacity-90 transition-opacity duration-300
                     focus:outline-none focus:ring-2"
          style={{
            backgroundColor: '#F2ac08',
            boxShadow: '0 2px 4px rgba(242, 172, 8, 0.3)'
          }}
        >
          Subscribe
        </button>
      </form>
      
      <p className="text-xs text-gray-500 text-center mt-4">
        No spam, just personal stories and insights. Unsubscribe anytime.
      </p>
    </div>
  );
};

export default NewsletterSignup;