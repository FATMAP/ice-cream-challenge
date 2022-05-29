import { Shop } from "types";
import "./SearchResults.scss";

interface Props {
  results: Shop[];
  setSelectedItem: (a: Shop) => void;
}

const SearchResults: React.FC<Props> = ({ results, setSelectedItem }) => {
  if (!results.length) {
    return null;
  }
  return (
    <ul className="searchResults">
      {results.map((item: Shop, index) => (
        <li
          key={`${item.name}-${index}`}
          role="button"
          onClick={() => setSelectedItem(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
