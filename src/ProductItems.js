

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductItems({
  cartItems,
  setCartItems,
  selectedInvoice,
  selectedOption1,
  selectedOption2,
  inputText
}) {
  const navigate = useNavigate();


    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [qty, setQty] = useState('');
    

    useEffect(() => {
        fetch('http://localhost:5000/items')
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

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        setSearchTerm(item.productName);
        setFilteredItems([]);
        setQty('');
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
            id: selectedItem.id,
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
    const totalProducts = cartItems.length;
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const grandTotal = cartItems.reduce((sum, item) => sum + parseFloat(item.total), 0).toFixed(2);
    

    return (
        <div>
            <div className='itemlist'>
            {filteredItems.length > 0 && (
                <ul >
                    {filteredItems.map(item => (
                        <li
                            key={item.id}
                            onClick={() => handleSelectItem(item)}
                            style={{ padding: '8px', cursor: 'pointer', backgroundColor: '#f9f9f9' }}
                        >
                            {item.productName}
                        </li>
                    ))}
                </ul>
            )}

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
    <div style={{ width: '15%' }}></div>
    <div style={{ width: '15%' }}></div>
    <div style={{ width: '20%' }}></div>
    <div style={{ width: '20%' }}>Grand Total: ₹{grandTotal}</div>
</div>
 
                </>
            )}
            {selectedInvoice && cartItems.length > 0 && (
  <button
    onClick={() => {
      navigate('/preview', {
        state: {
          customer: selectedInvoice,
          products: cartItems,
          invoiceDate: selectedOption1,
          dueDate: selectedOption2,
          notes: inputText
        }
      });
    }}
    style={{
      marginTop: '30px',
      padding: '10px 20px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      cursor: 'pointer'
    }}
  >
    Generate Bill Preview
  </button>
)}

            
        </div>
    );
}
