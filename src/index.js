import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{ backgroundColor: '#18181B', width: '100vw', minHeight: '100vh' }}>
      <App />
    </div>
  </React.StrictMode>
);


