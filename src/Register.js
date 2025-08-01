import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AddConstomer from './pages/AddConstomer';
import './App.css'; // For slide-panel CSS
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ShippingAddress from './pages/ShippingAddress';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gstNumber: '',
    companyName: '',
    billingAddress: '',
    shippingAddress: '',
  });

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showAddress2Form, setShowAddress2Form] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  const handleAddressSubmit = (address) => {
    setFormData((prevData) => ({
      ...prevData,
      billingAddress: address,
    }));
    setShowAddressForm(false);
  };

   const handleAddress2Submit = (address) => {
    setFormData((prevData) => ({
      ...prevData,
      billingAddress: address,
    }));
    setShowAddress2Form(false);
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h6>Customer Form</h6>
      <form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" />

        </Form.Group>

        <div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="number" placeholder="Enter Phone" />

          </Form.Group>
        </div><br></br>

        <div>
          <h6>Company Details(optional)</h6>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>GST Number</Form.Label>
            <Form.Control type="number" placeholder="Enter GST Number" />

          </Form.Group>
        </div>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Company Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Company Name" />

        </Form.Group>

        <div>

          <Box sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 } }}>
            <Fab size="small" color="secondary" aria-label="add" onClick={() => setShowAddressForm(true)}>
              <AddIcon />
            </Fab>
            <span>{formData.billingAddress ? formData.billingAddress : 'Billing Address'}</span>
          </Box>
        </div>

        <div>

          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab size="small" color="secondary" aria-label="add" onClick={() => setShowAddress2Form(true)}>
              <AddIcon />
            </Fab>
            <span>Shipping Address</span>
          </Box>
        </div><br></br>

        <Button variant="primary">Save</Button>
      </form>

      {/* Slide Panel for Billing Address */}
      {showAddressForm && (
        <>
          <div className="overlay2" onClick={() => setShowAddressForm(false)}></div>
          <div className="slide-panel2 open">
            <button onClick={() => setShowAddressForm(false)} style={{ float: 'right' }}>X</button>
            <AddConstomer
              onSubmitAddress={handleAddressSubmit}
              onCancel={() => setShowAddressForm(false)}
            />
          </div>
        </>
      )}
      {showAddress2Form && (
        <>
          <div className="overlay2" onClick={() => setShowAddress2Form(false)}></div>
          <div className="slide-panel2 open">
            <button onClick={() => setShowAddress2Form(false)} style={{ float: 'right' }}>X</button>
            <ShippingAddress
              onSubmitAddress={handleAddress2Submit}
              onCancel={() => setShowAddress2Form(false)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
