import React, { useState } from 'react';

const AddItem = () => {
  const [productName, setProductName] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [gstValue, setGstValue] = useState('');
  const [unit, setUnit] = useState('');
  const [hsn, setHsn] = useState('');

  const handleSubmit = async () => {
    if (!productName || !sellingPrice || !gstValue || !unit || !hsn) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName,
          sellingPrice,
          gstValue,
          unit,
          hsn,
        }),
      });

      if (response.ok) {
        alert(`✅ Item "${productName}" added successfully!`);
        // Reset the form
        setProductName('');
        setSellingPrice('');
        setGstValue('');
        setUnit('');
        setHsn('');
      } else {
        alert('❌ Failed to add item');
      }
    } catch (error) {
      console.error('Error submitting item:', error);
      alert('❌ Error occurred while submitting item');
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Add Item</h2>

      <div style={{ marginBottom: '10px' }}>
        <label>Product Name:</label><br />
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
          style={{ width: '300px', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Selling Price:</label><br />
        <input
          type="number"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
          placeholder="Enter selling price"
          style={{ width: '300px', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>GST (18%):</label><br />
        <input
          type="number"
          value={gstValue}
          onChange={(e) => setGstValue(e.target.value)}
          placeholder="Enter GST value"
          style={{ width: '300px', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Primary Unit:</label><br />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          style={{ width: '300px', padding: '8px' }}
        >
          <option value="">-- select option --</option>
          <option value="KG">KG</option>
          <option value="PCS">PCS</option>
        </select>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>HSN/SAC:</label><br />
        <input
          type="number"
          value={hsn}
          onChange={(e) => setHsn(e.target.value)}
          placeholder="Enter HSN/SAC code"
          style={{ width: '300px', padding: '8px' }}
        />
      </div>

      <button
        onClick={handleSubmit}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Add Item
      </button>
    </div>
  );
};

export default AddItem;
