import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MetaMaskProvider } from "metamask-react";
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Open+Sans:400,600%7Csans-serif"
  media="all"
></link>;

ReactDOM.render(

  <React.StrictMode>
    <MetaMaskProvider>
    <App />
    </MetaMaskProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);
