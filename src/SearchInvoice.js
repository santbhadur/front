import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductItems from './ProductItems';

const SearchInvoice = () => {
  const [query, setQuery] = useState('');
  const [invoiceData, setInvoiceData] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

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
          className='otherdetail1'
          value={selectedOption1}
          onChange={(e) => setSelectedOption1(e.target.value)}
        />
        <label>Due Date</label><br />
        <input
          type='date'
          className='otherdetail2'
          value={selectedOption2}
          onChange={(e) => setSelectedOption2(e.target.value)}
        />
      </div>

      <div style={{ position: 'absolute', top: '15%', width: '300px', marginTop: '2px' }}>
        {invoiceData.map((invoice) => (
          <div
            key={invoice.id}
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
      />

      {shouldShowGenerateButton && (
        <button
          onClick={() => {
            navigate('/preview', {
              state: {
                customer: selectedInvoice,
                products: cartItems,
                invoiceDate: selectedOption1,
                dueDate: selectedOption2,
                notes: inputText,
              },
            });
          }}
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

export default SearchInvoice;
