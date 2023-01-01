import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ConnexionContextProvider } from "./contexts"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConnexionContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConnexionContextProvider>
);
