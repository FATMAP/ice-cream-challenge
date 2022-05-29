import { useState, useEffect } from "react";
import SearchResults from "components/SearchResults/SearchResults";
import SearchBar from "components/SearchBar/SearchBar";
import ShopDetail from "components/ShopDetail/ShopDetail";
import { Shop } from "types";
import "./App.scss";

function App() {
  /**
   * `shops` and the api fetch below could be fetched server-side and
   * passed as props (e.g. `getServerSideProps`), but this is simpler for CRA.
   */
  const [shops, setShops] = useState<Shop[]>([]);
  /**
   * inputText and selectedShop could be in a shared context and
   * used in children components instead of being in this state and then
   * passed to every children. Because there's only 1 level nesting,
   * I thought this was a better solution.
   * Source https://reactjs.org/docs/context.html#before-you-use-context.
   */
  const [inputText, setInputText] = useState("");
  const [selectedShop, setSelectedShop] = useState<Shop | undefined>();

  const [areResultsOpen, setResultsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/shops")
      .then((r) => r.json())
      .then((r) => setShops(r))
      .catch((e: Error) => alert(e.message))
      .finally(() => setLoading(false));
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
      {!loading && (
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
      )}

      {selectedShop && <ShopDetail selectedShop={selectedShop} />}
    </main>
  );
}

export default App;
