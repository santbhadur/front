import React, { useState } from 'react';

const CreateInvoice = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Invoice submitted successfully!');
        setFormData({ customerName: '', phoneNumber: '', address: '' });
      } else {
        alert('Failed to submit invoice.');
      }
    } catch (error) {
      console.error('Error submitting invoice:', error);
      alert('An error occurred.');
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Create Invoice</h2>
      
      <div style={{ marginBottom: '10px' }}>
        <label>Customer Name:</label><br />
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          placeholder="Enter customer name"
          style={{ width: '300px', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Phone Number:</label><br />
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter phone number"
          style={{ width: '300px', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Address:</label><br />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter address"
          style={{ width: '300px', padding: '8px' }}
        />
      </div>

      <button
        onClick={handleSubmit}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default CreateInvoice;
