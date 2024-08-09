import { useState } from "react";
import Modal from "react-modal";

interface DessertItems {
  name: string;
  price: number;
  image: {
    desktop: string;
  };
  category: string;
  quantity?: number;
}

interface CartProps {
  cart: DessertItems[];
  deleteItemsIncart: (name: string) => void;
  totalAmountCalculation: () => string;
  setCart: React.Dispatch<React.SetStateAction<DessertItems[]>>;
}

const Cart: React.FC<CartProps> = ({
  cart,
  deleteItemsIncart,
  totalAmountCalculation,
  setCart,
}) => {
  const [modalInOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setCart([]);
    setModalIsOpen(false);
  }
  return (
    <div className="bg-white w-64 h-auto h-max items-center text-center">
      <div className={`cart ${cart.length > 0 ? "active" : ""}`}>
        <h2>My Cart</h2>
        {cart.length === 0 ? (
          <p>Cart Is Empty.</p>
        ) : (
          <div className="m-12 flex flex-col">
            <ul className="space-y-4">
              {cart
                .filter(
                  (item) => item.quantity !== undefined && item.quantity > 0
                )
                .map((item, index) => (
                  <li key={index}>
                    <div>
                      <div className="">
                        <img src={item.image.desktop} />
                      </div>
                      <div>
                        <h1 className="text-lg font-semibold">
                          {item.category}
                        </h1>
                        <h2 className="text-md">{item.name}</h2>
                        <p className="text-sm">{item.price}</p>
                        <p>{item.price * (item.quantity ?? 1)} $</p>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => deleteItemsIncart(item.name)}
                        className="flex float-right"
                      >
                        X
                      </button>
                      <div>
                        <button
                          onClick={() =>
                            setCart((prevCart) =>
                              prevCart.map((prevItem) =>
                                prevItem.name === item.name
                                  ? {
                                      ...prevItem,
                                      quantity: (prevItem.quantity ?? 0) + 1,
                                    }
                                  : prevItem
                              )
                            )
                          }
                        >
                          +
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            setCart((prevCart) =>
                              prevCart.map((prevItem) =>
                                prevItem.name === item.name
                                  ? {
                                      ...prevItem,
                                      quantity: Math.max(
                                        (prevItem.quantity ?? 1) - 1,
                                        0
                                      ),
                                    }
                                  : prevItem
                              )
                            )
                          }
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
            <div>
              <div>
                <p className="space-x-8">
                  Total Amount :<p>$: {totalAmountCalculation()} </p>
                </p>
              </div>
              <button
                className="bg-red-700 text-white h-12 w-48 rounded-2xl items-center text-center "
                disabled={
                  cart.length === 0 || Number(totalAmountCalculation()) === 0
                }
                onClick={openModal}
              >
                Confirm Order
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        <Modal
          isOpen={modalInOpen}
          className="flex flex-col items-center justify-center w-80 h-auto bg-white z-50 fixed inset-0 m-auto p-4 rounded-3xl shadow-md "
        >
          <h1 className="mt-14">Order Confirmed</h1>
          <p className="mb-11">We hope you enjoy your food</p>
          <div className="bg-straw w-auto mb-14 h-auto">
            <ul className="space-y-4">
              {cart
                .filter(
                  (item) => item.quantity !== undefined && item.quantity > 0
                )
                .map((item, index) => (
                  <li key={index}>
                    <div className="grid grid-cols-2 gap-24">
                      <div>
                        <h1>{item.category}</h1>
                        <h2>{item.name}</h2>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                      <div>
                        <p>Total: ${item.price * (item.quantity ?? 1)}</p>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
            <div className="grid grid-cols-2 gap-24">
              <p>Order Total:</p>
              <span>${totalAmountCalculation()}</span>
            </div>
          </div>
          <button
            className="bg-red-700 text-white h-12 w-56 rounded-2xl items-center text-center"
            onClick={closeModal}
          >
            Start New Order
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default Cart;
