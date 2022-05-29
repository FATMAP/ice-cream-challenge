import { Shop } from "types";
import "./ShopDetail.scss";

interface Props {
  selectedShop: Shop;
}

const ShopDetail: React.FC<Props> = ({ selectedShop }) => (
  <article className="shopDetail">
    <h2 className="shopName">{selectedShop.name}</h2>
    <h3 className="shopType">{selectedShop?.type}</h3>
  </article>
);

export default ShopDetail;
