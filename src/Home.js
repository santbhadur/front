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


  // Form data
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [inputText, setInputText] = useState('');

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
    const response = await fetch('https://backend-kappa-rouge-15.vercel.app/sales');
    const data = await response.json();
    setSales(data);
  } catch (error) {
    console.error('Failed to fetch sales data:', error);
  }
};


  const searchInvoices = async (searchTerm) => {
    try {
      const response = await fetch(`https://backend-kappa-rouge-15.vercel.app/invoices/search?customerName=${searchTerm}`);
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
    const response = await fetch(`https://backend-kappa-rouge-15.vercel.app/sales/${saleId}`, {
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

  

  return (

    <div style={{ margin: '20px' }}>
      <Layout />
      <div className='Total'>
        hiis
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
                    marginLeft:'-21%',
                    marginTop:'3%',
                    cursor: 'pointer',
                    backgroundColor: '#f9f9f9',
                    
                  }}

                >
                  <p><strong>Customer Name:</strong> {invoice.customerName}</p>
                </div>
              ))}
              {notFound && <p style={{ color: 'red' }}>No invoice found for "{query}"</p>}
            </div>
            <div className='Amountline'>
          <p className='Amountlin1'>Amount</p>
          <p className='Amountlin1'>Status</p>
          <p className='Amountlin1'>Bill</p>
          <p className='Amountlin1'>Customer</p>
          <p className='Amountlin1'>Date</p>
          <p className='Amountlin1'>Delete</p>
        </div>
        <div className="sales-list-scrollable">

            {[...sales].reverse().map((sale) => (
  <div className="Amountline1" key={sale._id}
   style={{ display: 'flex', gap: '1px', padding: '10px 0', borderBottom: '1px solid #ddd' }}  >
    <div className="Amountline1" key={sale._id} onClick={() => navigate(`/sale/${sale._id}`)}
   style={{ display: 'flex', gap: '1px', padding: '10px 0', borderBottom: '1px solid #ddd' }}>
    <p className="Amountlin1">₹{sale.grandTotal}</p>
    <p className="Amountlin1">Paid</p>
    <p className="Amountlin1">{sale.invoiceNumber}</p>
    <p className="Amountlin1">{sale.customerName}</p>
    <p className="Amountlin1">{new Date(sale.invoiceDate).toLocaleDateString()}</p>
    </div>
     <p className="Amountlin1">
      
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
      </p>
  </div>
))}
</div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Home;
