import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    setData(prevData => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], [name]: value };
      return newData;
    });
  };

  const handleDataChange = (event) => {
    setData(event.target.value.split('\n').map(line => {
      const [amount, phoneNumber] = line.split(/\s+/);
      return { amount, phoneNumber, transactionId: '' };
    }));
  };

  const handleCopyToClipboard = (event) => {
    event.target.select();
    document.execCommand('copy');
    event.target.classList.add('copied');

  };

  const handlePasteFromClipboard = (event) => {
    event.preventDefault();
    navigator.clipboard.readText()
      .then(text => {
        event.target.value = text;
      })
      .catch(error => {
        console.error('Error reading clipboard content: ', error);
      });
  };
  return (
    <div className='main'>

      <div className="inputArea">
        <h2>
          Input Box
        </h2>
        <textarea value={data.map(item => `${item.amount} ${item.phoneNumber}`).join('\n')} onChange={handleDataChange}></textarea>
      </div>
      {data.map((item, index) => (
        <div key={index} className='singleData'>
          <label>
            <input className='amount' type="text" name='amount' onClick={handleCopyToClipboard} value={item.amount} readOnly />
          </label>
          <label>
            <input className='phoneNumber' type="text" name='phoneNumber' value={item.phoneNumber} onClick={handleCopyToClipboard} readOnly />
          </label>
          <label>
            <input onClick={(event) => {
              handlePasteFromClipboard(event);
              handleChange(event, index)
            }} className='transactions' type="text" name='transactionId' value={item.transactionId} />
          </label>
        </div>
      ))}

      <div className="inputArea">
        <h2>
          Output Box
        </h2>
        <textarea onClick={handleCopyToClipboard} value={data.map(item => `${item.amount} ${item.phoneNumber} ${item.transactionId}`).join('\n')} readOnly></textarea>
      </div>
    </div>
  );
};

export default App;
