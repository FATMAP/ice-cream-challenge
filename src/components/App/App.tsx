import { useState, useEffect } from "react";
import SearchResults from "components/SearchResults/SearchResults";
import { Shop } from "types";
import "./App.scss";
import SearchBar from "components/SearchBar/SearchBar";
import ShopDetail from "components/ShopDetail/ShopDetail";

function App() {
  const [inputText, setInputText] = useState("");
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | undefined>();
  const [areResultsOpen, setResultsOpen] = useState(false);

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
   * Clears selected shop if the Search input is cleared
   * (manually or using the clear button)
   */
  useEffect(() => {
    if (inputText.length === 0) {
      setSelectedShop(undefined);
    }
  }, [inputText]);

  /**
   * "Autocompletes" search text to shop name when clicking one from the list
   */
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
          onInputFocus={() => setResultsOpen(true)}
          onInputChange={(e) => setInputText(e.target.value)}
          onClear={() => setInputText("")}
        />
        <SearchResults
          options={shops}
          query={inputText}
          isOpen={areResultsOpen}
          setItem={(item: Shop) => {
            setSelectedShop(item);
            setResultsOpen(false);
          }}
        />
      </div>

      {selectedShop && <ShopDetail selectedShop={selectedShop} />}
    </main>
  );
}

export default App;
