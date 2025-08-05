import React from 'react';
import { useLocation } from 'react-router-dom';

const BillPreview = () => {
  const location = useLocation();
  const { customer, products, invoiceNumber, invoiceDate, dueDate, notes, paymentMethod } = location.state || {};

  if (!customer || !products) return <p style={{ textAlign: 'center' }}>No bill data to preview.</p>;

  // Totals
  const subtotal = products.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const totalDiscount = products.reduce((sum, item) => sum + ((item.unitPrice * item.quantity) * (item.discount / 100)), 0);
  const totalTax = products.reduce((sum, item) => sum + (item.priceWithTax - item.unitPrice * item.quantity), 0);
  const grandTotal = products.reduce((sum, item) => sum + parseFloat(item.total), 0);

  return (
    <div style={styles.container}>
      {/* Business Header */}
      <div style={styles.header}>
        <h1 style={{ margin: 0 }}>My Company</h1>
        <p>123 Business St, Mumbai</p>
        <p>Email: billing@mycompany.com | Phone: 9876543210</p>
      </div>

      {/* Invoice Info */}
      <div style={styles.section}>
        <h2>Invoice</h2>
        <p><strong>Invoice Number:</strong> {invoiceNumber || 'N/A'}</p>
        <p><strong>Invoice Date:</strong> {invoiceDate}</p>
        <p><strong>Due Date:</strong> {dueDate || 'N/A'}</p>
        {paymentMethod && <p><strong>Payment Method:</strong> {paymentMethod}</p>}
      </div>

      {/* Customer Info */}
      <div style={styles.section}>
        <h3>Bill To:</h3>
        <p><strong>Name:</strong> {customer.customerName}</p>
        <p><strong>Address:</strong> {customer.address}</p>
        <p><strong>Phone:</strong> {customer.phone}</p>
        <p><strong>Email:</strong> {customer.email}</p>
      </div>

      {/* Product Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Product</th>
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
              <td>₹{p.unitPrice.toFixed(2)}</td>
              <td>₹{p.priceWithTax.toFixed(2)}</td>
              <td>{p.discount}%</td>
              <td>₹{parseFloat(p.total).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals Section */}
      <div style={styles.totals}>
        <p><strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}</p>
        <p><strong>Total Discount:</strong> ₹{totalDiscount.toFixed(2)}</p>
        <p><strong>Total Tax:</strong> ₹{totalTax.toFixed(2)}</p>
        <h3><strong>Grand Total:</strong> ₹{grandTotal.toFixed(2)}</h3>
      </div>

      {/* Notes */}
      {notes && (
        <div style={styles.section}>
          <h4>Additional Notes</h4>
          <p>{notes}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    maxWidth: '900px',
    margin: 'auto',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.6,
  },
  header: {
    borderBottom: '2px solid #ccc',
    marginBottom: '20px',
    paddingBottom: '10px',
    textAlign: 'center',
  },
  section: {
    marginTop: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    fontSize: '15px',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f2f2f2',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
  },
  totals: {
    marginTop: '30px',
    textAlign: 'right',
    fontSize: '16px',
  },
};

export default BillPreview;
