import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Coin from './components/Coin'
function App() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    axios.get("https://api.coinstats.app/public/v1/coins?skip=0")
      .then((response) => {
        setListOfCoins(response.data.coins);
      })
      .catch((error) => {
        console.error("Error fetching coins:", error);
      });
  }, []);

  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  })

  return (
    <div className="App">
      <div className="cryptoHeader">
        <input type="text" placeholder="Search your coin"  onChange={(event) => {setSearchWord(event.target.value)}}/>
      </div>
      <div className="cryptoDisplay">
        {filteredCoins.map((coin) => {
            return <Coin name={coin.name} icon={coin.icon} price={coin.price} symbol={coin.symbol} />;
        })}
      </div>
    </div>
  );
}

export default App;
