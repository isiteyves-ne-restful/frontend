// Product.js

import { useEffect, useState } from "react";

const Product = ({ product, addToCart, removeFromCart }) => {
  const [inCart, setInCart] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const isInCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    return cartItems.some((cartItem) => cartItem.code === product.code);
  };

  useEffect(() => {
    setInCart(isInCart(product));
    const token = localStorage.getItem("token");
    if (token) setLoggedIn(true);
  }, []);

  return (
    <div
      className="p-4 bg-white rounded-lg"
      style={{
        border: "1px solid gray",
      }}
    >
      <img
        // src={product.image}
        src={
          "https://www.cordings.co.uk/us/media/catalog/product/cache/cd8841c53967ae23713927ef35661c5b/t/r/tr470mstxx_5.jpg"
        }
        alt={product.name}
        className="h-[10rem] object-cover"
      />
      <div className="mt-4">
        <h3 className="text-xl font-bold">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
      </div>
      {loggedIn && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => {
            if (!inCart) addToCart({ ...product, quantity: 1 });
            else removeFromCart(product);
            setInCart(isInCart(product));
          }}
        >
          {inCart ? "Remove from Cart" : "Add to Cart or Buy"}
        </button>
      )}
    </div>
  );
};

export default Product;
