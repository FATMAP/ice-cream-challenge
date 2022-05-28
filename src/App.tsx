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
  const isSearching = inputText.length > 0;

  const fuse = useMemo(() => new Fuse(shops, {
    keys: ["name"],
  }), [shops]);

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

  return (
    <main className="main">
      <img src={SearchIcon} alt="Search icon" />
      <input
        placeholder="Search"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></input>
      {isSearching && <img src={CloseIcon} alt="Search icon" />}
      <ul>
        {isSearching && searchResults.map((item: Shop) => <li>{item.name}</li>)}
      </ul>
    </main>
  );
}

export default App;
