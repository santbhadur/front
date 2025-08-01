import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SaleDetails = () => {
  const { saleId } = useParams();
  const [sale, setSale] = useState(null);

  useEffect(() => {
    const fetchSaleDetails = async () => {
      try {
        const response = await fetch(`https://backend-kappa-rouge-15.vercel.app/sales/${saleId}`);
        const data = await response.json();
        setSale(data);
      } catch (error) {
        console.error('Error fetching sale details:', error);
      }
    };

    fetchSaleDetails();
  }, [saleId]);

  if (!sale) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading sale details...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sale Details</h2>
      
      <div style={styles.infoBox}>
        <Detail label="Invoice Number" value={sale.invoiceNumber} />
        <Detail label="Customer Name" value={sale.customerName} />
        <Detail label="Grand Total" value={`₹${sale.grandTotal}`} />
        <Detail label="Date" value={new Date(sale.invoiceDate).toLocaleDateString()} />
        {sale.paymentMethod && <Detail label="Payment Method" value={sale.paymentMethod} />}
        {sale.billingAddress && <Detail label="Billing Address" value={sale.billingAddress} />}
      </div>

      {sale.items && sale.items.length > 0 && (
        <>
          <h3 style={styles.subheading}>Item Details</h3>
          <table style={styles.table}>
            <thead style={styles.tableHead}>
              <tr>
                <th style={styles.th}>Product</th>
                <th style={styles.th}>Qty</th>
                <th style={styles.th}>Unit Price</th>
                <th style={styles.th}>GST (%)</th>
                <th style={styles.th}>Total</th>
              </tr>
            </thead>
            <tbody>
              {sale.items.map((item, index) => (
                <tr key={index} style={styles.tr}>
                  <td style={styles.td}>{item.productName}</td>
                  <td style={styles.td}>{item.quantity}</td>
                  <td style={styles.td}>₹{item.unitPrice}</td>
                  <td style={styles.td}>{item.gst}%</td>
                  <td style={styles.td}>₹{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

const Detail = ({ label, value }) => (
  <p style={styles.detail}>
    <strong>{label}:</strong> {value}
  </p>
);

const styles = {
  container: {
    padding: '30px',
    maxWidth: '900px',
    margin: 'auto',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    borderBottom: '2px solid #eee',
    paddingBottom: '10px',
  },
  infoBox: {
    marginBottom: '30px',
    lineHeight: '1.8',
  },
  detail: {
    fontSize: '16px',
    marginBottom: '8px',
  },
  subheading: {
    fontSize: '22px',
    margin: '20px 0 10px',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '15px',
  },
  tableHead: {
    backgroundColor: '#f2f2f2',
  },
  th: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
  tr: {
    borderBottom: '1px solid #eee',
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd',
  },
};

export default SaleDetails;
