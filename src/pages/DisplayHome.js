import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function DisplayHome() {
  const [query, setQuery] = useState('');
  const [invoiceData, setInvoiceData] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [sales, setSales] = useState([]);

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

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await fetch('https://backend-kappa-rouge-15.vercel.app/sales');
      const data = await response.json();
      setSales(data);
    } catch (error) {
      console.error('Failed to fetch sales data:', error);
    }
  };

  const searchInvoices = async (searchTerm) => {
    try {
      const response = await fetch(`https://backend-kappa-rouge-15.vercel.app/invoices/search?customerName=${searchTerm}`);
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

  const handleDeleteSale = async (saleId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this sale?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://backend-kappa-rouge-15.vercel.app/sales/${saleId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSales(sales.filter((sale) => sale._id !== saleId));
        alert('Sale deleted successfully');
      } else {
        alert('Failed to delete sale');
      }
    } catch (error) {
      console.error('Error deleting sale:', error);
      alert('Something went wrong while deleting');
    }
  };

  const handleSelectInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setInvoiceData([]);
  };

  return (
    <div>
      <Layout />
      <h2>Invoices</h2>
      <input
        type="text"
        placeholder="Search by customer name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {notFound && <p>No invoices found.</p>}

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceData.map((invoice) => (
              <TableRow key={invoice._id} onClick={() => handleSelectInvoice(invoice)} style={{ cursor: 'pointer' }}>
                <TableCell>{invoice.invoiceNumber || 'N/A'}</TableCell>
                <TableCell>{invoice.customerName}</TableCell>
                <TableCell>{invoice.totalAmount}</TableCell>
                <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteSale(invoice._id); }}>
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
