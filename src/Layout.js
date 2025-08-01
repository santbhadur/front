import React, { useState } from 'react';
import './App.css';
import Register from './Register';

export default function Layout() {
  const [showRegister, setShowRegister] = useState(false);

  const openPanel = () => setShowRegister(true);
  const closePanel = () => setShowRegister(false);

  return (
    <div>
      <div className="layout">
        <p className="sale">Sale</p>
        <p><button onClick={openPanel}>Add Customer</button></p>
        <p><a href="/create-invoice">Customer Details</a></p>
        <p><a href="/add-item">Add Item</a></p>
        <a href="/home">Home</a>
      </div>

      {showRegister && (
        <>
          <div className="overlay" onClick={closePanel}></div>
          <div className={`slide-panel open`}>
            <button onClick={closePanel} style={{ float: 'right' }}>X</button>  
            <Register />
          </div>
        </>
      )}
    </div>
  );
}
