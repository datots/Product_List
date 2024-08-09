import data from "../data.json";
import { DessertItem } from "./Desserts";

interface ItemsInCartProps {
  addItemsInCart: (dessert: DessertItem) => void;
}
const ItemsInCart: React.FC<ItemsInCartProps> = ({ addItemsInCart }) => {
  return (
    <div>
      {data.length === 0 ? (
        <p>No Products found</p>
      ) : (
        data.map((product, index) => (
          <div key={index}>
            <img src={product.image.desktop} alt="" />
            <h2>{product.name}</h2>
            <p>Price: {product.price}</p>
            <button onClick={() => addItemsInCart(product)}>Add To Cart</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ItemsInCart;
