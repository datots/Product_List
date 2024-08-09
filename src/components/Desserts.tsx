import { useState } from "react";
import data from "../data.json";
import Cart from "./Cart";

export interface DessertItem {
  name: string;
  price: number;
  image: {
    desktop: string;
  };
  category: string;
  quantity?: number;
}

const Desserts = () => {
  const [cart, setCart] = useState<DessertItem[]>([]);

  const addItemsInCart = (dessert: DessertItem) => {
    const ExistingDessert = cart.find((item) => item.name === dessert.name);
    if (ExistingDessert) {
      setCart(
        cart.map((item) =>
          item.name === dessert.name
            ? {
                ...ExistingDessert,
                quantity: (ExistingDessert.quantity ?? 0) + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...dessert,
          quantity: 1,
        },
      ]);
    }
  };

  const deleteItemsIncart = (name: string) => {
    setCart(cart.filter((item) => item.name !== name));
  };

  const totalAmountCalculation = () => {
    return cart
      .reduce((total, item) => total + item.price * (item.quantity ?? 1), 0)
      .toFixed(2);
  };

  return (
    <section>
      <h1 className=" text-2xl font-bold mb-4 ml-10 ">Desserts</h1>
      <section className="sm:flex flex-col lg:grid grid-cols-2 gap-20">
        <div className=" lg:grid grid-cols-3 sm:flex flex-col">
          {data.map((category, index) => {
            return (
              <div key={index} className="box-border w-100% p-2 ">
                <img
                  src={category.image.desktop}
                  className="w-full h-auto rounded-xl "
                  alt=""
                />
                <h1 className="text-lg font-semibold">{category.category}</h1>
                <h2 className="text-md">{category.name}</h2>
                <p className="text-sm">{category.price} $</p>
                <button onClick={() => addItemsInCart(category)}>
                  Add To Cart
                </button>
              </div>
            );
          })}
        </div>
        <Cart
          cart={cart}
          deleteItemsIncart={deleteItemsIncart}
          totalAmountCalculation={totalAmountCalculation}
          setCart={setCart}
        />
      </section>
    </section>
  );
};

export default Desserts;
