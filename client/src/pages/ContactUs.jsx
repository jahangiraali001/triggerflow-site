import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const res = await fetch(`${API_BASE_URL}/api/contact`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});

      const data = await res.json();
      if (data.success) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Server error. Please try later.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', margin: '10px 0' }}
        />
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', margin: '10px 0' }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          style={{ width: '100%', padding: '8px', margin: '10px 0' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Send</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default ContactUs;
