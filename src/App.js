import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [price, setPrice] = useState(1);
  const [amount, setAmount] = useState(1);
  const onChange = (event) => setAmount(event.target.value);
  const onSelect = (event) => setPrice(event.target.value);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onSelect} value={price}>
          <option value="xx">Select a coin</option>
          {coins.map((coin) => (
            <option value={coin.quotes.USD.price} key={coin.id}>
              {coin.name}({coin.symbol}) : ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <hr />
      <div>
        <div>
          <label htmlFor="USD">USD</label>
          <input
            id="USD"
            onChange={onChange}
            value={amount}
            type="number"
            placeholder="Enter USD"
          />
        </div>
        <div>
          <label htmlFor="coin">Coin</label>
          <input id="coin" value={amount / price} type="number" disabled />
        </div>
      </div>
    </div>
  );
}

export default App;
