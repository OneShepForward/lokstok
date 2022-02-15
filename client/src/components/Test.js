import React, { useState } from 'react';
import QrReader from 'react-qr-reader'

function Test() {
  const [result, setResult] = useState('No result');
  
  function handleScan(data) {
    if (data) {
      setResult(data)
    }
  }
  function handleError(err) {
    console.error(err)
  }
  return (
    <div>
    <QrReader
      delay={300}
      onError={(err) => handleError(err)}
      onScan={(data) => handleScan(data)}
      style={{ width: '100%' }}
    />
    <p>{result}</p>
    </div>
  );
}

export default Test;