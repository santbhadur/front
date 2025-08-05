import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductItems from './ProductItems';
import SearchInvoice from './SearchInvoice';
import CreateInvoice from './CreateInvoice';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';



const Home = () => {
  const [query, setQuery] = useState('');
  const [invoiceData, setInvoiceData] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [sales, setSales] = useState([]);


  const navigate = useNavigate();


  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (query.trim() !== '') {
        searchInvoices(query);
      } else {
        setInvoiceData([]);
        setNotFound(false);
        setSelectedInvoice(null);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [query]);
  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await fetch('https://backend-git-main-santbhadurs-projects.vercel.app/api/invoices/submit');
      const data = await response.json();
      setSales(data);
    } catch (error) {
      console.error('Failed to fetch sales data:', error);
    }
  };


  const searchInvoices = async (searchTerm) => {
    try {
      const response = await fetch(`https://backend-git-main-santbhadurs-projects.vercel.app/invoices/search?customerName=${searchTerm}`);
      const data = await response.json();

      if (response.ok && data.length > 0) {
        setInvoiceData(data);
        setNotFound(false);
      } else {
        setInvoiceData([]);
        setNotFound(true);
      }
    } catch (error) {
      console.error('Search error:', error);
      setNotFound(true);
    }
  };

  const handleDeleteSale = async (saleId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this sale?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://backend-git-main-santbhadurs-projects.vercel.app/api/invoices/submit/${saleId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove from UI
        setSales(sales.filter((sale) => sale._id !== saleId));
        alert('Sale deleted successfully');
      } else {
        alert('Failed to delete sale');
      }
    } catch (error) {
      console.error('Error deleting sale:', error);
      alert('Something went wrong while deleting');
    }
  };


  const handleSelectInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setInvoiceData([]); // Remove all results
  };

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



  return (
    

    <div style={{ margin: '20px' }}>
      <Layout />
      <div className='Total'>
        Total Sale
      </div>
      <div className='Homes'>
        <div className='Homesmain'>
          <h1>Sale</h1>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter customer name"
            style={{
              padding: '8px',
              fontSize: '16px',
              marginRight: '10px',
              width: '300px',
            }}
          /><Link
            to='/SearchInvoice'
            className='create'
            style={{
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '5px 10px',
      cursor: 'pointer',
      borderRadius: '4px',
      textDecoration: 'none',
    }}
          >
            Create Invoice
          </Link>

          <div style={{ marginTop: '20px' }}>

            <div >
              {invoiceData.map((invoice) => (
                <div
                  className='Homes'
                  key={invoice.id}
                  onClick={() => handleSelectInvoice(invoice)}
                  style={{
                    border: '1px solid #ccc',
                    padding: '15px',
                    marginBottom: '10px',
                    marginLeft: '-21%',
                    marginTop: '3%',
                    cursor: 'pointer',
                    backgroundColor: '#f9f9f9',

                  }}

                >
                  <p><strong>Customer Name:</strong> {invoice.customerName}</p>
                </div>
              ))}
              {notFound && <p style={{ color: 'red' }}>No invoice found for "{query}"</p>}
            </div>
            <div className="sales-list-scrollable">
  <table style={styles.table}>
    <thead style={styles.tableHead}>
      <tr>
        <th style={styles.th}>Amount</th>
        <th style={styles.th}>Status</th>
        <th style={styles.th}>Invoice </th>
        <th style={styles.th}>Customer</th>
        <th style={styles.th}>Date</th>
        <th style={styles.th}>View</th>
        <th style={styles.th}>Action</th>
      </tr>
    </thead>
    <tbody>
      {[...sales].reverse().map((sale) => (
        <tr key={sale._id} style={styles.tr}>
          <td style={styles.td}>₹{sale.grandTotal}</td>
          <td style={styles.td}>Paid</td>
          <td
            style={{ ...styles.td, cursor: 'pointer', color: '#007bff' }}
            onClick={() => navigate(`/sale/${sale._id}`)}
          >
            {sale.invoiceNumber}
          </td>
          <td style={styles.td}>{sale.customerName}</td>
          <td style={styles.td}>{new Date(sale.invoiceDate).toLocaleDateString()}</td>
          <td style={styles.td}>
  <button
    onClick={() => navigate(`/sale/${sale._id}`)}
    style={{
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '5px 10px',
      cursor: 'pointer',
      borderRadius: '4px',
    }}
  >
    View
  </button>
</td>

          <td style={styles.td}>
            <button
              onClick={() => handleDeleteSale(sale._id)}
              style={{
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

          </div>
        </div>

      </div>
    </div>
  );
  
};

export default Home;
