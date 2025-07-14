import React from 'react';
import { useLocation } from 'react-router-dom';

const BillPreview = () => {
  const location = useLocation();
  const { customer, products, invoiceDate, dueDate, notes } = location.state || {};

  if (!customer || !products) return <p>No bill data to preview.</p>;

  return (
    <div style={{ margin: '20px' }}>
      <h2>Invoice Preview</h2>
      <p><strong>Customer:</strong> {customer.customerName}</p>
      <p><strong>Address:</strong> {customer.address}</p>
      <p><strong>Invoice Date:</strong> {invoiceDate}</p>
      <p><strong>Due Date:</strong> {dueDate}</p>
      <p><strong>Notes:</strong> {notes}</p>

      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #000' }}>Product</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Price + Tax</th>
            <th>Discount (%)</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={i}>
              <td>{p.productName}</td>
              <td>{p.quantity}</td>
              <td>{p.unitPrice}</td>
              <td>{p.priceWithTax}</td>
              <td>{p.discount}</td>
              <td>{p.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: '20px' }}>
        Grand Total: ₹
        {products.reduce((sum, item) => sum + parseFloat(item.total), 0).toFixed(2)}
      </h3>
    </div>
  );
};

export default BillPreview;
