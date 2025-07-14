import React from 'react';

const Pdf = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <table style={{ borderCollapse: 'collapse', widtd: '80%' }}>
        
          <tr>
            <td style={cellStyle} colSpan="8">Tax Invoice</td>
          </tr>
          <tr>
            <td style={cellStyle}>Header hkjjkjkkjkjkjkjjjjjjjjjjjjjjjjjjjjjjjjjjjj1</td>
            <td style={cellStyle}  rowSpan="0">KASHTBHANJAN ENTERPRISE<br></br>
                GSTIN:241ZTPS9056L1Z4<br></br>
                PAN:IZTPS9056L<br></br>
                C/13, Hari Om Nagar, Gujarat housing board,<br></br>
                surat<br></br>
                surat gujarat, 394221<br></br>
                mobile : +91 9998666990<br></br>
                email: info@KASHTBHANJANenterprise.customer<br></br>
                website: www.KASHTBHANJANenterprise.com<br></br>
                
            </td>
            <td style={cellStyle} colSpan="3">Invoice #:<br></br>
            25inv</td>
           
            <td style={cellStyle} colSpan="3">Invoice date:
                28
            </td>
            
            
          </tr>
        
          <tr>
            <td style={cellStyle}>Row 1 - Col 1</td>
            <td style={cellStyle} celSpan="3">Row 1 - Col 2</td>
            <td style={cellStyle} celSpan="3">Row 1 - Col 3</td>
            <td style={cellStyle}>Row 1 - Col 4</td>
            <td style={cellStyle}>Row 1 - Col 5</td>
            
            <td style={cellStyle} celSpan={2}>Row 1 - Col 8</td>
          </tr>
          <tr>
            <td style={cellStyle}>Row 2 - Col 1</td>
            <td style={cellStyle}>Row 2 - Col 2</td>
            <td style={cellStyle}>Row 2 - Col 3</td>
            <td style={cellStyle}>Row 2 - Col 4</td>
            <td style={cellStyle}>Row 2 - Col 5</td>
            <td style={cellStyle}>Row 2 - Col 6</td>
            <td style={cellStyle}>Row 2 - Col 7</td>
            <td style={cellStyle}>Row 2 - Col 8</td>
          </tr>
        
      </table>
    </div>
  );
};

const cellStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  fontSize : '10px'
};

export default Pdf;
