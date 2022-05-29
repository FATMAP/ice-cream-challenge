import { Shop } from "types";
import "./SearchResults.scss";

interface Props {
  results: Shop[];
  isOpen: boolean;
  setItem: (a: Shop) => void;
}

const SearchResults: React.FC<Props> = ({ results, isOpen, setItem }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <ul className="searchResults">
      {results.map((item: Shop, index) => (
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
