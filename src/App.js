import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchInvoice from './SearchInvoice';
import CreateInvoice from './CreateInvoice';
import AddItem from './AddItem'; // Import the new page
import ProductItems from './ProductItems';
import Home from './Home';
import Layout from './Layout';
import BillPreview from './BillPreview';
import Pdf from './Pdf';
import SaleDetails from './components/SaleDetails';
import Register from './Register';
import AddConstomer from './pages/AddConstomer';
import DisplayHome from './pages/DisplayHome';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <>
    
    <Routes>

      <Route path="/" element={<Layout />} />
      <Route path="/Home" element={<Home />} />
      <Route path='/add-constomer' element={<AddConstomer />} />
      <Route path="/SearchInvoice" element={<SearchInvoice />} />
      <Route path="/create-invoice" element={<CreateInvoice />} />
      <Route path="/add-item" element={<AddItem />} /> {/* Add new route */}
      <Route path="/ProductItems" element={<ProductItems />} />
      <Route path="/preview" element={<BillPreview />} />
      <Route path="/Pdf" element={<Pdf />} />
      <Route path="/sale/:saleId" element={<SaleDetails />} />
      <Route path="/demo" element={<Register />} />
      <Route path="/demo1" element={<DisplayHome />} />
    </Routes>
    </>
  );
}

export default App;
