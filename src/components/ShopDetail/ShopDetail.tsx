import { Shop } from "types";
import IceCream from "assets/ice cream.svg";
import Location from "assets/location.svg";
import "./ShopDetail.scss";

interface Props {
  selectedShop: Shop;
}

const ShopDetail: React.FC<Props> = ({ selectedShop }) => (
  <article className="shopDetail">
    <img
      src={selectedShop?.type === "IceCream" ? IceCream : Location}
      alt={selectedShop?.type || "Shop type"}
    />
    <aside>
      <h2 className="shopName">{selectedShop.name}</h2>
      <h3 className="shopType">{selectedShop?.type}</h3>
    </aside>
  </article>
);

export default ShopDetail;
