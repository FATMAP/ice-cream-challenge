import { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import SearchIcon from "./assets/search.svg";
import CloseIcon from "./assets/close.svg";
import "./App.scss";

type DBKeys = "name" | "type";
type Shop = Record<DBKeys, string>;

function App() {
  const [inputText, setInputText] = useState("");
  const [shops, setShops] = useState<Shop[]>([]);
  const [searchResults, setResults] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  const fuse = useMemo(
    () =>
      new Fuse(shops, {
        keys: ["name"],
      }),
    [shops]
  );

  useEffect(() => {
    fetch("http://127.0.01:8000/shops")
      .then((r) => r.json())
      .then((r) => setShops(r));
  }, []);

  useEffect(() => {
    const results = fuse
      .search(inputText || "", { limit: 10 })
      .map((o: { item: Shop }) => o.item);
    setResults(results);
  }, [inputText, fuse]);

  useEffect(() => {
    if (inputText.length === 0) {
      setSelectedShop(null);
    }
  }, [inputText]);

  return (
    <main className="main">
      <div className="search">
        <div className="searchBar">
          <img src={SearchIcon} alt="Search icon" />
          <input
            placeholder="Search"
            value={selectedShop ? selectedShop.name : inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></input>
          {inputText.length > 0 && (
            <button onClick={() => setInputText("")}>
              <img src={CloseIcon} alt="Search icon" />
            </button>
          )}
        </div>
        {searchResults.length > 0 && !selectedShop && (
          <ul className="searchResults">
            {searchResults.map((item: Shop, index) => (
              <li
                key={`${item.name}-${index}`}
                role="button"
                onClick={() => setSelectedShop(item)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedShop && (
        <div>
          <p>{selectedShop.name}</p>
          <p>{selectedShop?.type}</p>
        </div>
      )}
    </main>
  );
}

export default App;
