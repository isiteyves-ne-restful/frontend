import React, { useEffect, useState } from "react";
import { errorToast, successToast } from "../utils/Toast";
import { useNavigate } from "react-router";
import { API_URL, sendRequest } from "../utils/Api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [productQuantities, setProductQuantities] = useState([]);

  const handleCheckout = async () => {
    try {
      if (!window.confirm("Do you want to checkout?")) return;
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        const quantity = productQuantities[i] || item?.quantity;
        const data = {
          product_code: item.id,
          quantity,
          total: item.price * quantity,
        };
        await sendRequest(API_URL + "/purchased", "POST", data);
      }
      successToast("Checkout successful!");
      handleClearCart();
    } catch (e) {
      console.log(e, e.message);
      errorToast(e?.response?.data?.message || "An error occurred");
    }
  };

  const handleRemoveFromCart = (item) => {
    // Update cart items in localStorage after removing an item
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem?.id !== item?.id
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const handleClearCart = () => {
    // Clear cart items in localStorage
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const getTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item, ind) => {
      total += item.price * (productQuantities[ind] || item?.quantity);
    });
    return total;
  };

  useEffect(() => {
    // Load cart items from localStorage
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);

    // update product quantities
    const quantities = savedCartItems.map((item) => item.quantity);
    setProductQuantities(quantities);
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold overflow-hidden">Cart</h2>
      {cartItems.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <button
            className="bg-[#2272C3] px-4 py-2 rounded-md text-white"
            onClick={() => navigate("/")}
          >
            Go to Products
          </button>
        </>
      ) : (
        <div className="w-[70%]">
          {cartItems.map((item, ind) => (
            <div
              key={ind}
              className="flex items-center justify-between mt-4"
              style={{ padding: "1rem", border: "2px solid #ccc" }}
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-600">Price: ${item.price}</p>
                  <p className="text-gray-600">
                    Quantity:&nbsp;&nbsp;
                    <button
                      className="quantity-buttons"
                      onClick={() => {
                        const productQuant = [...productQuantities];
                        if (productQuant[ind] - 1 >= 1) {
                          productQuant[ind] = productQuant[ind] - 1;
                          setProductQuantities(productQuant);
                        }
                      }}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      name={`quantity$[ind]`}
                      value={productQuantities[ind] || 1}
                      id="quantity-field"
                      readOnly
                    />
                    <button
                      className="quantity-buttons"
                      onClick={() => {
                        const productQuant = [...productQuantities];
                        if (productQuant[ind] + 1 < 100) {
                          productQuant[ind] = productQuant[ind] + 1;
                          setProductQuantities(productQuant);
                        }
                      }}
                    >
                      +
                    </button>
                  </p>
                </div>
              </div>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => handleRemoveFromCart(item)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4">
            <h3 className="text-xl font-bold">
              Total price: ${getTotalPrice()}
            </h3>
            <div className="flex">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md mt-2"
                onClick={() => handleClearCart()}
              >
                Clear Cart
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md mt-2 ml-5"
                onClick={() => navigate("/")}
              >
                Go to Products
              </button>
              <button
                className="px-4 py-2 text-white rounded-md mt-2 ml-5"
                onClick={() => handleCheckout()}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
