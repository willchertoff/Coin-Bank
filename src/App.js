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
  const [loading, setLoading] = useState(false)

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

  const [query, setQuery] = useState("");
  const [newData, setNewData] = useState([]);
  const search = (evt) => {
    if (evt.key === "Enter") {
      setLoading(true)
      fetch(`https://api2.binance.com/api/v3/ticker/24hr`)
        .then((res) => res.json())
        .then((result) => {
          console.log('query: ' + query)
          let myBin;
         for (var i = 0; i < result.length; i++) {
           console.log(result[i].symbol)

           if (result[i].symbol === query) {
            myBin= result[i]
            console.log('myBin: ' + {myBin})

            return myBin;
           }
         }
         console.log('myBin: ' + JSON.stringify({myBin}))

          setNewData(myBin)
          setQuery("");
          setLoading(false)

        });
    }
  };
  // console.log('myBin: ' + {myBin})


  return (
    <div className="App">
      <nav>
        <input type="text" className='search-bar' placeholder=" 'BTCUSDT'... " onChange={(e) => setQuery(e.target.value)} value={query} onKeyPress={search} />
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
           {newData.length < 4 &&
            <tbody>
              
              {coinData.map((coin, i) => {
                return (
                  <tr key={coin.symbol}>
                    <td>{i + 1}</td>
                    <td>{coinNames[coin.symbol]}</td>
                    <td>${Number(coin.lastPrice).toLocaleString()}</td>
                    <td style={
                        Number(coin.priceChangePercent) > 0
                          ? { color: "green" }
                          : { color: "red" }
                      }>
                    {Number(coin.priceChangePercent).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          }
          {typeof newData != 'undefined' ? (
          <tbody className='searched'>
                <tr key='said'>
                  <td>1</td>
                  <td>{newData.symbol}</td>
                  <td>${Number(newData.lastPrice).toLocaleString()}</td>
                  <td
                    style={
                      Number(newData.priceChangePercent) > 0
                        ? { color: "green" }
                        : { color: "red" }
                    }>
                  {Number(newData.priceChangePercent).toFixed(2)}
                  </td>
                </tr>
          </tbody>) : (loading ? 'loading': '')}
        </table>
        <div className="bottom-logo">
          <img src={logoText} alt='logo'/>
        </div>
      </div>
    </div>
  );
}
export default App;
