

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

export default function ProductItems({
  cartItems,
  setCartItems,
  selectedInvoice,
  invoiceNumber,
  setIsIntraState,
  setCgst,
  setSgst,
  setIgst,
  setTotalGstValue,
  setAvgGstPercent,
  setAvgDiscountPercent,
  setTotalDiscountValue
}) {
  const navigate = useNavigate();


    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [qty, setQty] = useState('');
    

    useEffect(() => {
        fetch('https://backend-git-main-santbhadurs-projects.vercel.app/items')
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(err => console.error('Error fetching items:', err));
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredItems([]);
            return;
        }

        const results = items.filter(item =>
            item.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(results);
    }, [searchTerm, items]);
    useEffect(() => {
  const customerState = selectedInvoice?.shippingAddress?.state?.toLowerCase() || '';
  const intraState = customerState === 'gujarat';
  setIsIntraState(intraState);

  const totalGstRaw = cartItems.reduce((sum, item) => {
    const unitPrice = parseFloat(item.unitPrice);
    const priceWithTax = parseFloat(item.priceWithTax);
    const gstAmount = (priceWithTax - unitPrice) * item.quantity;
    return sum + gstAmount;
  }, 0);

  const avgGst = cartItems.length > 0
    ? (
        cartItems.reduce((sum, item) => {
          const unitPrice = parseFloat(item.unitPrice);
          const priceWithTax = parseFloat(item.priceWithTax);
          return sum + ((priceWithTax - unitPrice) / unitPrice) * 100;
        }, 0) / cartItems.length
      )
    : 0;

  const cgstVal = intraState ? (totalGstRaw / 2).toFixed(2) : '';
  const sgstVal = intraState ? (totalGstRaw / 2).toFixed(2) : '';
  const igstVal = !intraState ? totalGstRaw.toFixed(2) : '';

  const totalDiscountVal = cartItems.reduce((sum, item) => {
    const priceWithTax = parseFloat(item.priceWithTax);
    const quantity = item.quantity;
    const discountPercent = parseFloat(item.discount) || 0;
    const totalBeforeDiscount = priceWithTax * quantity;
    const discountAmount = (totalBeforeDiscount * discountPercent) / 100;
    return sum + discountAmount;
  }, 0);

  const avgDiscount = cartItems.length > 0
    ? (
        cartItems.reduce((sum, item) => sum + (parseFloat(item.discount) || 0), 0) / cartItems.length
      )
    : 0;

  // Send calculated values to parent
  setCgst(cgstVal);
  setSgst(sgstVal);
  setIgst(igstVal);
  setTotalGstValue(totalGstRaw.toFixed(2));
  setAvgGstPercent(avgGst.toFixed(2));
  setAvgDiscountPercent(avgDiscount.toFixed(2));
  setTotalDiscountValue(totalDiscountVal.toFixed(2));
}, [cartItems, selectedInvoice]);


    const handleSelectItem = (item) => {
        setSelectedItem(item);
        setSearchTerm(item.productName);
        setFilteredItems([]);
        setQty('');
    };

    // Example of correct usage inside ProductItems.js
const handleAddProduct = (product) => {
  const updatedItems = [...cartItems, product];
  setCartItems(updatedItems);
};



    const handleAddToCart = () => {
        if (!selectedItem || !qty || isNaN(qty) || qty <= 0) {
            alert('Select a product and enter a valid quantity');
            return;
        }

        const unitPrice = parseFloat(selectedItem.sellingPrice);
        const gstPercent = parseFloat(selectedItem.gstValue || 0);
        const quantity = parseInt(qty);

        const priceWithTax = unitPrice + (unitPrice * gstPercent) / 100;
        const total = quantity * priceWithTax;

        const newItem = {
            id: selectedItem._id,
            productName: selectedItem.productName,
            quantity,
            unitPrice: unitPrice.toFixed(2),
            priceWithTax: priceWithTax.toFixed(2),
            discount: 0,
            total: total.toFixed(2),
        };

        setCartItems([...cartItems, newItem]);

        // Reset
        setSelectedItem(null);
        setSearchTerm('');
        setQty('');
    };

    const customerState = selectedInvoice?.shippingAddress?.state?.toLowerCase() || '';
const isIntraState = customerState === 'gujarat';

const totalGstValueRaw = cartItems.reduce((sum, item) => {
  const unitPrice = parseFloat(item.unitPrice);
  const priceWithTax = parseFloat(item.priceWithTax);
  const gstAmount = (priceWithTax - unitPrice) * item.quantity;
  return sum + gstAmount;
}, 0);

const avgGstPercentRaw = cartItems.length > 0
  ? (
      cartItems.reduce((sum, item) => {
        const unitPrice = parseFloat(item.unitPrice);
        const priceWithTax = parseFloat(item.priceWithTax);
        return sum + ((priceWithTax - unitPrice) / unitPrice) * 100;
      }, 0) / cartItems.length
    )
  : 0;



const cgst = isIntraState ? (totalGstValueRaw / 2).toFixed(2) : null;
const sgst = isIntraState ? (totalGstValueRaw / 2).toFixed(2) : null;
const igst = !isIntraState ? totalGstValueRaw.toFixed(2) : null;


    const handleDiscountChange = (index, discountPercentValue) => {
        const updatedCart = [...cartItems];
        const item = updatedCart[index];
        const discountPercent = parseFloat(discountPercentValue) || 0;

        const priceWithTax = parseFloat(item.priceWithTax);
        const quantity = item.quantity;
        const totalBeforeDiscount = quantity * priceWithTax;

        const discountAmount = (totalBeforeDiscount * discountPercent) / 100;
        const newTotal = totalBeforeDiscount - discountAmount;

        updatedCart[index] = {
            ...item,
            discount: discountPercent,
            total: newTotal.toFixed(2),
        };

        setCartItems(updatedCart);
    };
    const totalGstValue = cartItems.reduce((sum, item) => {
  const unitPrice = parseFloat(item.unitPrice);
  const priceWithTax = parseFloat(item.priceWithTax);
  const gstAmount = (priceWithTax - unitPrice) * item.quantity;
  return sum + gstAmount;
}, 0).toFixed(2);

const avgGstPercent = cartItems.length > 0
  ? (
      cartItems.reduce((sum, item) => {
        const unitPrice = parseFloat(item.unitPrice);
        const priceWithTax = parseFloat(item.priceWithTax);
        return sum + ((priceWithTax - unitPrice) / unitPrice) * 100;
      }, 0) / cartItems.length
    ).toFixed(2)
  : 0;

const totalDiscountValue = cartItems.reduce((sum, item) => {
  const unitPrice = parseFloat(item.unitPrice);
  const priceWithTax = parseFloat(item.priceWithTax);
  const quantity = item.quantity;
  const totalBeforeDiscount = priceWithTax * quantity;
  const discountPercent = parseFloat(item.discount) || 0;
  const discountAmount = (totalBeforeDiscount * discountPercent) / 100;
  return sum + discountAmount;
}, 0).toFixed(2);

const avgDiscountPercent = cartItems.length > 0
  ? (
      cartItems.reduce((sum, item) => sum + (parseFloat(item.discount) || 0), 0) / cartItems.length
    ).toFixed(2)
  : 0;


    const totalProducts = cartItems.length;
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const grandTotal = cartItems.reduce((sum, item) => sum + parseFloat(item.total), 0).toFixed(2);
    
    console.log('Received invoiceNumber prop:', invoiceNumber);


    return (
        <div>
            <div className='itemlist'>
            {filteredItems.length > 0 && (
                <ul >
                    {filteredItems.map(item => (
                        <li
                            key={item._id}
                            onClick={() => handleSelectItem(item)}
                            style={{ padding: '8px', cursor: 'pointer', backgroundColor: '#f9f9f9' }}
                        >
                            {item.productName}
                        </li>
                    ))}
                </ul>
            )}

            </div>
            <div style={{ marginBottom: '20px', fontWeight: 'bold' }}>
            Invoice Number: {invoiceNumber || 'Loading...'}
</div>

            <div className='productionitem'>

            <input
                type='text'
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setSelectedItem(null);
                }}
                placeholder='Search Product'
                className='searchproduct'
            />

            
            <input
                type='number'
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                placeholder='Qty'
               className='productionitem1'
            />

            
                <button
                    onClick={handleAddToCart}
                    style={{
                        
                        width: '10%',
                        height: '25',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        marginLeft:'1%'
                    }}
                >
                    Add
                </button>
            
            </div>
            <div className='producthead'>
                      <div style={{ width: '10%', }} >Product Name</div>
                        <div style={{ width: '10%', marginLeft: '10%'  }}>Qty</div>
                        <div style={{ width: '15%' }}>Unit Price</div>
                        <div style={{ width: '15%' }}>Price + Tax</div>
                        <div style={{ width: '20%' }}>Discount</div>
                        <div style={{ width: '20%' }}>Total</div>
                        </div>

            {cartItems.length > 0 && (
                <>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '30px',
                        fontWeight: 'bold',
                        borderBottom: '2px solid #007bff',
                        paddingBottom: '8px'
                    }}>
                        
                    </div>

                    {cartItems.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '8px 0',
                                borderBottom: '1px solid #ddd'
                            }}
                        >
                            <div style={{ width: '20%' }}>{item.productName}</div>
                            <div style={{ width: '10%' }}>{item.quantity}</div>
                            <div style={{ width: '15%' }}>{item.unitPrice}</div>
                            <div style={{ width: '15%' }}>{item.priceWithTax}</div>
                            <div style={{ width: '20%' }}>
                                <input
                                    type='number'
                                    value={item.discount}
                                    onChange={(e) => handleDiscountChange(index, e.target.value)}
                                    placeholder='Discount %'
                                    style={{ width: '50%', padding: '5px' }}
                                />

                            </div>
                            <div style={{ width: '20%' }}>{item.total}</div>
                            
                        </div>
                    ))}
                    <div
    style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '12px 0',
        fontWeight: 'bold',
        borderTop: '2px solid #007bff',
        marginTop: '10px'
    }}
>
    <div style={{ width: '20%' }}>Total Products: {totalProducts}</div>
    <div style={{ width: '10%' }}>Total Qty: {totalQuantity}</div>
    <div style={{ width: '15%' }}>dds</div>
    <div style={{ width: '15%' }}></div>
    <div style={{ width: '20%' }}></div>
    <div style={{ width: '20%' }}>Total</div>
</div>
<div className='container py-5'>
    <div className='shipping'>
  {parseFloat(totalGstValue) > 0 && (
      isIntraState ? (
        <div>
          <p className='joint'>CGST:{(avgGstPercentRaw / 2).toFixed(2)}% (₹{parseFloat(cgst)})<br /></p> 
         <p className='joint'>SGST: {(avgGstPercentRaw / 2).toFixed(2)}% (₹{parseFloat(sgst)})<br /> </p>
        </div>
      ) : (
        <>
          <p className='joint'>IGST: {parseFloat(avgGstPercent)}% (₹{parseFloat(igst)})<br /></p>
        </>
      )
    )}
    
      <>
       <p className='joint'> Discount: {parseFloat(avgDiscountPercent)}% (₹{parseFloat(totalDiscountValue)})<br /> </p>
      </>
    <p className='joint'>Grand Total: ₹{grandTotal}</p>
        </div>
 

 </div>
                </>
            )}
           
            
        </div>

        
    );
}
