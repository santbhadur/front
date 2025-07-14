import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Home from './Home';

export default function Layout() {
  return (
    <div class="layout">
      <p className='sale'>Sale</p>
      <p className='In'>Invoice</p>
      <p className='In'>Create Notes</p>
      <p className='In'>E-Invoice</p>
      <p className='In'>Subscriptions</p>
      <Link to='/Home'>Home</Link>
    </div>
  );
}
