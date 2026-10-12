import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '../style.css';
import { readTheme, applyTheme } from './theme';

applyTheme(readTheme(), { persist: false });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);