import { render, screen, cleanup } from "@testing-library/react";
import SearchResults from "./SearchResults";

afterAll(() => {
  cleanup();
});

const shops = [
  {
    name: "Ice, Ice, Baby",
    type: "IceCream",
  },
  {
    name: "Frostbite Ice Cream",
    type: "IceCream",
  },
  {
    name: "Old Fashioned Ice Creamery",
    type: "IceCream",
  },
  {
    name: "The Ice Cream Quarters",
    type: "IceCream",
  },
];

describe("Renders SearchResults with props", () => {
  it("Any of the results should be in the list", () => {
    render(
      <SearchResults options={shops} query={"ice"} isOpen setItem={() => {}} />
    );
    const randomIndex = Math.floor(Math.random() * shops.length);
    const resultAtRandom = shops[randomIndex];
    const result = screen.getByText(resultAtRandom.name);
    expect(result).toBeInTheDocument();
  });

  it("Non relevant results should be filtered", () => {
    render(
      <SearchResults
        options={shops}
        query={"testing"}
        isOpen
        setItem={() => {}}
      />
    );

    const resultsWrapper = screen.queryByTestId("searchResultsWrapper");
    // searchResults is (internally) empty, component returns null
    expect(resultsWrapper).toBeNull();
  });
});
