import { render, screen, cleanup } from "@testing-library/react";
import ShopDetail from "./ShopDetail";

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

describe("Renders SearchBar with props", () => {
  it("should render Shop Detail with basic name info", () => {
    const randomIndex = Math.floor(Math.random() * shops.length);
    const shopAtRandom = shops[randomIndex];

    render(<ShopDetail selectedShop={shopAtRandom} />);
    const shopName = screen.getByText(shopAtRandom.name);
    expect(shopName).toBeInTheDocument();
  });

  it("should render type for valid shops with type", () => {
    const randomIndex = Math.floor(Math.random() * shops.length);
    const shopAtRandom = shops[randomIndex];

    render(<ShopDetail selectedShop={shopAtRandom} />);
    const shopType = screen.getByRole("heading", { level: 3 });
    expect(shopType).toBeInTheDocument();
  });

  it("should render shops with name but without type", () => {
    const shop = {
      name: "Frozen Sweets Indulgence",
    };

    render(<ShopDetail selectedShop={shop} />);
    const shopName = screen.getByRole("heading", { level: 2 });
    const shopType = screen.getByRole("heading", { level: 3 });
    expect(shopName).toBeInTheDocument();
    expect(shopType).toBeEmptyDOMElement(); // empty h3 tag
  });
});
