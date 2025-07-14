import React, { useEffect, useState } from 'react';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/invoices')
      .then((res) => res.json())
      .then((data) => setInvoices(data))
      .catch((err) => console.error('Error fetching invoices:', err));
  }, []);

  return (
    <div style={{ margin: '20px' }}>
      <h2>All Invoices</h2>
      {invoices.map((inv) => (
        <div key={inv.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <p><strong>Customer Name:</strong> {inv.customerName}</p>
          <p><strong>Phone Number:</strong> {inv.phoneNumber}</p>
          <p><strong>Address:</strong> {inv.address}</p>
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;
