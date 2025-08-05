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
    billingAddress: {},
    shippingAddress: {},
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

  const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ VALIDATE BEFORE SENDING
  if (
    !formData.name ||
    !formData.phone ||
    !formData.billingAddress.address1 ||
    !formData.shippingAddress.address1
  ) {
    alert('Please fill all required fields including addresses');
    return;
  }

  try {
    const response = await fetch('https://backend-git-main-santbhadurs-projects.vercel.app/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
      console.log(response.data)
    if (response.ok) {
      alert('Customer saved successfully');
      // Optional: reset form after success
      setFormData({
        name: '',
        phone: '',
        gstNumber: '',
        companyName: '',
        billingAddress: {},
        shippingAddress: {},
      });
      
    } else {
      alert('Error saving customer');
    }
  } catch (err) {
    console.error(err);
    alert('Network error');
  }
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
      shippingAddress: address,
    }));
    setShowAddress2Form(false);
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h6>Customer Form</h6>
      <form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <div>
          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              name="phone"
              placeholder="Enter Phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Form.Group>
        </div><br></br>

        <div>
          <h6>Company Details(optional)</h6>
          <Form.Group className="mb-3" controlId="formGstNumber">
            <Form.Label>GST Number</Form.Label>
            <Form.Control
              type="text"
              name="gstNumber"
              placeholder="Enter GST Number"
              value={formData.gstNumber}
              onChange={handleChange}
            />
          </Form.Group>
        </div>

        <Form.Group className="mb-3" controlId="formCompanyName">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            name="companyName"
            placeholder="Enter Company Name"
            value={formData.companyName}
            onChange={handleChange}
          />
        </Form.Group>

        <div>

          <Box sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 } }}>
            <Fab size="small" color="secondary" aria-label="add" onClick={() => setShowAddressForm(true)}>
              <AddIcon />
            </Fab>
            <span>
              {formData.billingAddress?.address1
                ? `${formData.billingAddress.address1}, ${formData.billingAddress.city}, ${formData.billingAddress.state}`
                : 'Billing Address'}
            </span>


          </Box>
        </div>

        <div>

          <Box sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 } }}>
            <Fab size="small" color="secondary" aria-label="add" onClick={() => setShowAddress2Form(true)}>
              <AddIcon />
            </Fab>
            <span>
              {formData.shippingAddress?.address1
                ? `${formData.shippingAddress.address1}, ${formData.shippingAddress.city}, ${formData.shippingAddress.state}`
                : 'Shipping Address'}
            </span>
          </Box>

        </div><br></br>

        <Button variant="primary" type="submit">Save</Button>

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
