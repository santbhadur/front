import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductItems from './ProductItems';






const todayDate = new Date().toISOString().split('T')[0];

const SearchInvoice = () => {
  const [query, setQuery] = useState('');
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [invoiceDate, setInvoiceDate] = useState(todayDate);
  const [dueDate, setDueDate] = useState(todayDate);
  const [invoiceNumber, setInvoiceNumber] = useState('');

  const [inputText, setInputText] = useState('');
  const [cartItems, setCartItems] = useState([]);
  // Add these at the top in useState declarations
const [isIntraState, setIsIntraState] = useState(false);
const [cgst, setCgst] = useState('');
const [sgst, setSgst] = useState('');
const [igst, setIgst] = useState('');
const [totalGstValue, setTotalGstValue] = useState('');
const [avgGstPercent, setAvgGstPercent] = useState('');
const [avgDiscountPercent, setAvgDiscountPercent] = useState('');
const [totalDiscountValue, setTotalDiscountValue] = useState('');


  const navigate = useNavigate();

  // Fetch invoice number once
  useEffect(() => {
    fetch('https://backend-git-main-santbhadurs-projects.vercel.app/api/next-invoice-number')
      .then((res) => res.json())
      .then((data) => {
        if (data.invoiceNumber) {
          setInvoiceNumber(data.invoiceNumber);
        }
      })
      .catch((err) => console.error('Failed to fetch invoice number', err));
  }, []);

  // Fetch all customers
  useEffect(() => {
    fetch('https://backend-git-main-santbhadurs-projects.vercel.app/api/customers')
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.error('Failed to fetch customers', err));
  }, []);

  // Filter customers by query
  useEffect(() => {
    if (query.trim() === '') {
      setFilteredCustomers([]);
      setNotFound(false);
      return;
    }

    const filtered = customers.filter((cust) =>
      cust.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredCustomers(filtered);
    setNotFound(filtered.length === 0);
  }, [query, customers]);

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setFilteredCustomers([]);
    setQuery(customer.name);
  };

  const handleSubmit = async () => {
  if (!selectedCustomer || cartItems.length === 0) {
    alert('Please select a customer and add at least one product.');
    return;
  }

  const shipping = selectedCustomer.shippingAddress || {};
  const fullAddress = `${shipping.address1 || ''}, ${shipping.city || ''}, ${shipping.state || ''}`;

  const invoicePayload = {
    invoiceNumber,
    customerId: selectedCustomer._id,
    customerName: selectedCustomer.name,
    customerAddress: fullAddress,
    invoiceDate,
    dueDate,
    notes: inputText,
    items: cartItems,
    totalProducts: cartItems.length,
    totalQuantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    grandTotal: cartItems.reduce((sum, item) => sum + parseFloat(item.total), 0).toFixed(2),

    // GST / Discount data
    isIntraState,
    cgst,
    sgst,
    igst,
    totalGstValue,
    avgGstPercent,
    avgDiscountPercent,
    totalDiscountValue
  };

  // ✅ Console full invoice payload for debug
  console.log("Invoice Payload to Save:", invoicePayload);

  try {
    const response = await fetch('https://backend-git-main-santbhadurs-projects.vercel.app/api/invoices/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoicePayload),
    });

    if (response.ok) {
      alert('Data saved successfully!');
      const savedInvoice = await response.json();
      console.log('Saved invoice (from backend):', savedInvoice);

      // Reset
      setCartItems([]);
      setInputText('');
      setSelectedCustomer(null);
      setQuery('');
      setInvoiceDate(todayDate);
      setDueDate(todayDate);

      // Navigate to preview
      navigate('/preview', {
        state: {
          invoiceNumber,
          ...invoicePayload,
        },
      });

      // Get new invoice number
      const next = await fetch('http://localhost:5000/api/next-invoice-number');
      const nextData = await next.json();
      setInvoiceNumber(nextData.invoiceNumber);
    } else {
      console.error('Save failed. Response:', response);
      alert('Failed to save invoice.');
    }
  } catch (error) {
    console.error('Error saving invoice:', error);
    alert('An error occurred while saving the invoice.');
  }
};

  const shouldShowGenerateButton = selectedCustomer && cartItems.length > 0;

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

      <div style={{ position: 'absolute', top: '15%', width: '300px', marginTop: '2px' }}>
        {filteredCustomers.map((customer) => (
          <div
            key={customer._id}
            onClick={() => handleSelectCustomer(customer)}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '2px',
              cursor: 'pointer',
              backgroundColor: '#f9f9f9',
            }}
          >
            <p>{customer.name}</p>
          </div>
        ))}
        {notFound && <p style={{ color: 'red' }}>No customer found for "{query}"</p>}
      </div>


      <div className="otherdetail">
        <label>Invoice Date</label><br />
        <input
          type="date"
          className="otherdetail3"
          value={invoiceDate}
          onChange={(e) => setInvoiceDate(e.target.value)}
        />
        <label>Due Date</label><br />
        <input
          type="date"
          className="otherdetail4"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      {selectedCustomer && (
        <div
          style={{
            marginTop: '30px',
            width: '300px',
            padding: '20px',
            border: '2px solid #007bff',
            borderRadius: '5px',
            position: 'relative',
          }}
        >
          <button
            onClick={() => setSelectedCustomer(null)}
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
            title="Clear selected customer"
          >
            ❌
          </button>
          <p><strong>{selectedCustomer.name}</strong></p><br />
          <p>
            Address:{' '}
            {`${selectedCustomer.shippingAddress?.address1 || ''},${selectedCustomer.shippingAddress?.address2 || ''}, ${selectedCustomer.shippingAddress?.city || ''}, ${selectedCustomer.shippingAddress?.state || ''}`},
          </p>
        </div>
      )}

      <ProductItems
        cartItems={cartItems}
        setCartItems={setCartItems}
        selectedInvoice={selectedCustomer}
        selectedOption1={''}
        selectedOption2={''}
        inputText={inputText}
        invoiceNumber={invoiceNumber}
          // New props
  setIsIntraState={setIsIntraState}
  setCgst={setCgst}
  setSgst={setSgst}
  setIgst={setIgst}
  setTotalGstValue={setTotalGstValue}
  setAvgGstPercent={setAvgGstPercent}
  setAvgDiscountPercent={setAvgDiscountPercent}
  setTotalDiscountValue={setTotalDiscountValue}
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
          Save
        </button>
      )}
    </div>
  );
};

export default SearchInvoice;
