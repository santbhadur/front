import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductItems from './ProductItems';
import SearchInvoice from './SearchInvoice';
import CreateInvoice from './CreateInvoice';
import Layout from './Layout';


const Home = () => {
  const [query, setQuery] = useState('');
  const [invoiceData, setInvoiceData] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);


  // Form data
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [inputText, setInputText] = useState('');

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

  const searchInvoices = async (searchTerm) => {
    try {
      const response = await fetch(`http://localhost:5000/invoices/search?customerName=${searchTerm}`);
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

  const handleSelectInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setInvoiceData([]); // Remove all results
  };

  const handleSubmit = async () => {
    if (!selectedOption1 || !selectedOption2 || !inputText) {
      alert("Please fill all the fields before submitting!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/invoices/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invoiceId: selectedInvoice.id,
          selectedOption1,
          selectedOption2,
          inputText,
        }),
      });

      if (response.ok) {
        alert('Data submitted successfully');
        // Optionally, reset the form or handle other UI updates
        setSelectedOption1('');
        setSelectedOption2('');
        setInputText('');
      } else {
        alert('Failed to submit data');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Error occurred while submitting data');
    }
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
          <p className='Amountlin1'>Mode</p>
          <p className='Amountlin1'>Bill</p>
          <p className='Amountlin1'>Customer</p>
          <p className='Amountlin1'>Date</p>
        </div>
            {selectedInvoice && (
              <div className='selectIn'>
                <p className='Amountline1'> {selectedInvoice.customerName}</p><br></br>
                <p className='Amountline1'> shipping billing {selectedInvoice.address}</p>
                

              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Home;
