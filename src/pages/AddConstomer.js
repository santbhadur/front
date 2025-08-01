import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AddConstomer() {
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [error, setError] = useState('');

  const handlePincodeChange = async (e) => {
    const pin = e.target.value;
    setPincode(pin);

    if (pin.length === 6) {
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
        const data = await response.json();

        if (data[0].Status === 'Success' && data[0].PostOffice.length > 0) {
          const postOffice = data[0].PostOffice[0];
          setCity(postOffice.District);
          setState(postOffice.State);
          setError('');
        } else {
          setCity('');
          setState('');
          setError('Invalid Pincode');
        }
      } catch (err) {
        setError('Failed to fetch location');
        setCity('');
        setState('');
      }
    } else {
      setCity('');
      setState('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can handle or validate the final form data here
    const customerData = {
      address1,
      address2,
      pincode,
      city,
      state,
    };

    console.log('Customer Data:', customerData);
    alert('Form submitted!');
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Billing Address</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Address1</Form.Label>
          <Form.Control type="text" placeholder="Enter Address1" />

        </Form.Group>
        </div>
        <div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Address2</Form.Label>
          <Form.Control type="text" placeholder="Enter Address" />

        </Form.Group>
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Pincode:</Form.Label>
          <Form.Control type="text" name="pincode"
            value={pincode}
            onChange={handlePincodeChange}
            maxLength={6} placeholder="Enter Company Name" />

        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>City:</Form.Label>
          <Form.Control type="text"  name="city" value={city} placeholder="Enter Company Name" />

        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>State:</Form.Label>
          <Form.Control type="text"  name="state" value={state} placeholder="Enter Company Name" />

        </Form.Group>
        
   
        <Button variant="primary">Save</Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
