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
import '../App.css';

export default function DisplayHome() {
  const [query, setQuery] = useState('');
  const [invoiceData, setInvoiceData] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [sales, setSales] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchSales();
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (query.trim()) {
        searchInvoices(query);
      } else {
        setInvoiceData([]);
        setNotFound(false);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [query]);

  const fetchSales = async () => {
    try {
      const response = await fetch('http://localhost:5000/sales');
      const data = await response.json();
      setSales(data);
    } catch (error) {
      console.error('Failed to fetch sales data:', error);
    }
  };

  const searchInvoices = async (searchTerm) => {
    try {
      const response = await fetch(`http://localhost:5000/invoices/search?customerName=${searchTerm}`);
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
      setInvoiceData([]);
      setNotFound(true);
    }
  };

  const handleDeleteInvoice = async (invoiceId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this invoice?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/invoices/${invoiceId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setInvoiceData(prev => prev.filter((inv) => inv._id !== invoiceId));
        alert('Invoice deleted successfully');
      } else {
        alert('Failed to delete invoice');
      }
    } catch (error) {
      console.error('Error deleting invoice:', error);
      alert('Something went wrong while deleting the invoice');
    }
  };

  const dataToDisplay = query.trim() ? invoiceData : sales;

  return (
    <div>
      <Layout />
      <h2>Invoices</h2>
      <div className='Homes'>
        <div className='Homesmain'>
          <input
            type="text"
            placeholder="Search by customer name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {notFound && <p>No invoices found.</p>}

          <TableContainer
            component={Paper}
            style={{ marginTop: '20px', maxHeight: '400px', overflowY: 'auto' }}
          >
            <Table className="sticky-header">
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
                {dataToDisplay.map((invoice) => (
                  <TableRow
                    key={invoice._id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/invoice/${invoice._id}`)}
                  >
                    <TableCell>{invoice.invoiceNumber}</TableCell>
                    <TableCell>{invoice.customerName}</TableCell>
                    <TableCell>{invoice.grandTotal}</TableCell>
                    <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteInvoice(invoice._id);
                        }}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
