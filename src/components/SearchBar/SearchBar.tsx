import SearchIcon from "assets/search.svg";
import CloseIcon from "assets/close.svg";
import "./SearchBar.scss";

interface Props {
  inputText: string;
  onInputChange: (a: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

const SearchBar: React.FC<Props> = ({ inputText, onInputChange, onClear }) => (
  <header className="searchBar">
    <img src={SearchIcon} alt="Search icon" />
    <input
      placeholder="Search"
      value={inputText}
      onChange={onInputChange}
    ></input>
    {inputText.length > 0 && (
      <button onClick={onClear}>
        <img src={CloseIcon} alt="Search icon" />
      </button>
    )}
  </header>
);

export default SearchBar;
