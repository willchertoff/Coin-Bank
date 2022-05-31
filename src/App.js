import './index.css';
import logoText from './assets/coin-icon-text.png';
import logo from './assets/coin-icon.png';
import { useState, useEffect } from "react";

function App() {
  const coinNames = {
    BTCUSDT: "Bitcoin",
    ETHUSDT: "Ethereum",
    SOLUSDT: "Solana",
    ADAUSDT: "Cardano",
    DOGEUSDT: "DogeCoin"
  };
  const [coinData, setCoinData] = useState([]);
  const coinBank = ["BTCUSDT", "ETHUSDT", "DOGEUSDT", "SOLUSDT", "ADAUSDT"];
  useEffect(() => {
    fetch(`https://api2.binance.com/api/v3/ticker/24hr`)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter((ticker) => {
          if (coinBank.includes(ticker.symbol)) {
            return true;
          }
        });
        setCoinData(filteredData);
      });
  }, []);

  return (
    <div className="App">
      <nav>
        {/* <img
          alt="logo"
          src={logo}
        /> */}
        <input type="text" placeholder="Search" />
      </nav>
      <div className="main-content">
        <h2>Today's Coin Bank</h2>
        <table>
          <thead>
            <tr className='titles'>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h %</th>
            </tr>
          </thead>
          <tbody>
            {coinData.map((coin, i) => {
              return (
                <tr key={coin.symbol}>
                  <td>{i + 1}</td>
                  <td>{coinNames[coin.symbol]}</td>
                  <td>${Number(coin.lastPrice).toLocaleString()}</td>
                  <td
                    style={
                      Number(coin.priceChangePercent) > 0
                        ? { color: "green" }
                        : { color: "red" }
                    }>
                  {Number(coin.priceChangePercent)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="bottom-logo">
          <img src={logoText} alt='logo'/>
        </div>
      </div>
    </div>
  );
}
export default App;
