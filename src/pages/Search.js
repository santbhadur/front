import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductItems from './ProductItems';
import { Search } from '@mui/icons-material';



const todayDate = new Date().toISOString().split('T')[0];

const Search = () => {
  const [query, setQuery] = useState('');
  const [invoiceData, setInvoiceData] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(todayDate); // Invoice Date
const [selectedOption4, setSelectedOption4] = useState(todayDate); // Due Date
const [invoiceNumber, setInvoiceNumber] = useState('');


  

  // Form data
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [inputText, setInputText] = useState('');
  const [cartItems, setCartItems] = useState([]);

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
  fetch('http://localhost:5000/api/next-invoice-number')
    .then(res => res.json())
    
    .then(data => {
      if (data.invoiceNumber) {
        setInvoiceNumber(data.invoiceNumber);
        console.log('Invoice number:', invoiceNumber)
      }
    })
    .catch(err => console.error('Failed to fetch invoice number', err));
}, [invoiceNumber]);

const handleSubmit = async () => {
  if (!selectedInvoice || cartItems.length === 0) {
    alert("Please select a customer and add at least one product.");
    return;
  }

  const invoicePayload = {
    invoiceNumber,
    customerId: selectedInvoice.id,
    customerName: selectedInvoice.customerName,
    customerAddress: selectedInvoice.address,
    invoiceDate: selectedOption3,
    dueDate: selectedOption4,
    notes: inputText,
    items: cartItems,
    totalProducts: cartItems.length,
    totalQuantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    grandTotal: cartItems.reduce((sum, item) => sum + parseFloat(item.total), 0).toFixed(2),
    someField: 'ABC-123',
  };

  try {
    const response = await fetch('http://localhost:5000/invoices/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoicePayload),
    });

    if (response.ok) {
      const data = await response.json();

      // Navigate to preview page with the invoice data
      navigate('/preview', {
        state: {
          invoiceNumber,
          ...invoicePayload
        }
      });

      // Optionally: reset UI if needed
      setCartItems([]);
      setInputText('');
      setSelectedInvoice(null);
      setSelectedOption3(todayDate);
      setSelectedOption4(todayDate);

      // Fetch new invoice number
      const next = await fetch('http://localhost:5000/api/next-invoice-number');
      const nextData = await next.json();
      setInvoiceNumber(nextData.invoiceNumber);

    } else {
      alert('Failed to save invoice');
    }
  } catch (error) {
    console.error('Error saving invoice:', error);
    alert('Error occurred while saving the invoice');
  }
};



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

  
  // Prevent multiple button rendering:
  const shouldShowGenerateButton = selectedInvoice && cartItems.length > 0;

  return (
    <div style={{ margin: '20px' }}>
      <label>Select Customer</label><br />
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
      />
      <div className='otherdetail'>
        <label className='Invoicedate'>Invoice Date</label><br />
        <input
          type='date'
          className='otherdetail3'
          value={selectedOption3}
          onChange={(e) => setSelectedOption3(e.target.value)}
        />
        <label>Due Date</label><br />
        <input
          type='date'
          className='otherdetail4'
          value={selectedOption4}
          onChange={(e) => setSelectedOption4(e.target.value)}
        />
      </div>

      <div style={{ position: 'absolute', top: '15%', width: '300px', marginTop: '2px' }}>
        {invoiceData.map((invoice) => (
          <div
            key={invoice._id}
            onClick={() => handleSelectInvoice(invoice)}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              marginBottom: '1px',
              cursor: 'pointer',
              backgroundColor: '#f9f9f9',
            }}
          >
            <p>{invoice.customerName}</p>
          </div>
        ))}
        {notFound && <p style={{ color: 'red' }}>No invoice found for "{query}"</p>}
      </div>

      {selectedInvoice && (
        <div style={{
          marginTop: '30px',
          width: '300px',
          padding: '20px',
          border: '2px solid #007bff',
          borderRadius: '5px',
          position: 'relative',
        }}>
          <button
            onClick={() => setSelectedInvoice(null)}
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              background: 'transparent',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              color: '#dc3545',
            }}
            title="Clear selected invoice"
          >
            ❌
          </button>
          <p><strong>{selectedInvoice.customerName}</strong></p><br />
          <p>Shipping/Billing: {selectedInvoice.address}</p>
        </div>
      )}

      <ProductItems
        cartItems={cartItems}
        setCartItems={setCartItems}
        selectedInvoice={selectedInvoice}
        selectedOption1={selectedOption1}
        selectedOption2={selectedOption2}
        inputText={inputText}
        invoiceNumber={invoiceNumber}
      />

      {shouldShowGenerateButton && (
        <button
          onClick={handleSubmit}
          style={{
            marginTop: '30px',
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          save
        </button>
      )}
    </div>
  );
};

export default Search;
