import { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import SearchResults from "components/SearchResults/SearchResults";
import { Shop } from "types";
import "./App.scss";
import SearchBar from "components/SearchBar/SearchBar";
import ShopDetail from "components/ShopDetail/ShopDetail";

function App() {
  const [inputText, setInputText] = useState("");
  const [shops, setShops] = useState<Shop[]>([]);
  const [searchResults, setResults] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | undefined>();

  /**
   * API data fetching - this could be done:
   * 1. api route for nextjs (middleware)
   * 2. `getStaticProps` in nextjs
   * 3. SSR middleware before render
   * 4. here, because it's a simple fetch and we don't use env vars.
   */
  useEffect(() => {
    fetch("http://127.0.01:8000/shops")
      .then((r) => r.json())
      .then((r) => setShops(r));
  }, []);

  /**
   * Memoization of the 'fuse' object avoids the `results`
   * useEffect hook dependencies changing on every re-render.
   */
  const fuse = useMemo(
    () =>
      new Fuse(shops, {
        keys: ["name"],
      }),
    [shops]
  );

  /**
   * The fuzzy search could be done in `SearchResults`, but
   * the Fuse instance should be here (because of unmount)
   * and I prefer to have them together.
   */
  useEffect(() => {
    const results = fuse
      .search(inputText || "", { limit: 10 })
      .map((o: { item: Shop }) => o.item);
    setResults(results);
  }, [inputText, fuse]);

  useEffect(() => {
    if (inputText.length === 0) {
      setSelectedShop(undefined);
    }
  }, [inputText]);

  useEffect(() => {
    if (selectedShop) {
      setInputText(selectedShop.name);
    }
  }, [selectedShop]);

  return (
    <main className="main">
      <div className="search">
        <SearchBar
          inputText={inputText}
          onInputChange={(e) => setInputText(e.target.value)}
          onClear={() => setInputText("")}
        />
        <SearchResults
          results={searchResults}
          setSelectedItem={setSelectedShop}
        />
      </div>

      {selectedShop && <ShopDetail selectedShop={selectedShop} />}
    </main>
  );
}

export default App;
