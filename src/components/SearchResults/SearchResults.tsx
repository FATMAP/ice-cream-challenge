import React, { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Shop } from "types";
import "./SearchResults.scss";

interface Props {
  isOpen: boolean;
  query: string;
  options: Shop[];
  setItem: (a: Shop) => void;
}

const SearchResults: React.FC<Props> = ({
  isOpen,
  query,
  options,
  setItem,
}) => {
  const [searchResults, setResults] = useState<Shop[]>([]);

  /**
   * Memoization of the 'fuse' object avoids the `results`
   * useEffect below changing on every re-render.
   */
  const fuse = useMemo(
    () =>
      new Fuse(options, {
        keys: ["name"],
      }),
    [options]
  );

  /**
   * Populate searchResults when query text changes
   */
  useEffect(() => {
    const results = fuse
      .search(query || "", { limit: 10 })
      .map((o: { item: Shop }) => o.item);
    setResults(results);
  }, [query, fuse]);

  if (!isOpen || searchResults.length === 0) {
    return null;
  }

  return (
    <ul className="searchResults" data-testid="searchResultsWrapper">
      {searchResults.map((item: Shop, index) => (
        <li
          key={`${item.name}-${index}`}
          role="button"
          onClick={() => setItem(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
