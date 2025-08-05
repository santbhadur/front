import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function ShippingAddress({ onSubmitAddress, onCancel }) {
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

    if (!address1 || !pincode || !city || !state) {
      setError('Please fill all required fields.');
      return;
    }

    const customerData = {
      address1,
      address2,
      pincode,
      city,
      state,
    };

    console.log('Shipping Address Data:', customerData);
    onSubmitAddress(customerData);
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h4>Billing Address</h4>
      <form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="address1">
          <Form.Label>Address1</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address1"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="address2">
          <Form.Label>Address2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address2"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="pincode">
          <Form.Label>Pincode:</Form.Label>
          <Form.Control
            type="text"
            name="pincode"
            value={pincode}
            onChange={handlePincodeChange}
            maxLength={6}
            placeholder="Enter Pincode"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="city">
          <Form.Label>City:</Form.Label>
          <Form.Control type="text" name="city" value={city} readOnly />
        </Form.Group>

        <Form.Group className="mb-3" controlId="state">
          <Form.Label>State:</Form.Label>
          <Form.Control type="text" name="state" value={state} readOnly />
        </Form.Group>

        <Button variant="primary" type="submit">Save</Button>
        <Button variant="secondary" onClick={onCancel} style={{ marginLeft: '10px' }}>
          Cancel
        </Button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
}
