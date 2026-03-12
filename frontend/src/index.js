// src/index.js
// Bootstraps the React application and mounts it to the DOM

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';         // Global CSS reset and design tokens
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Render App inside React.StrictMode for additional development checks
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
