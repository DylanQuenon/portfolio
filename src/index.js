import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/Variables.scss'
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './ThemeContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>  {/* Le ThemeProvider entoure toute l'application */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
