import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// <tr key={coin.symbol}>
//   <td>{i + 1}</td>
//   <td>{coinNames[coin.symbol]}</td>
//   <td>${Number(coin.lastPrice).toLocaleString()}</td>
//   <td
//     style={
//       Number(coin.priceChangePercent) > 0
//         ? { color: "green" }
//         : { color: "red" }
//     }
//   ></td>