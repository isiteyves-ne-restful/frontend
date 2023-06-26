import React, { useEffect, useState } from "react";
import Product from "./Product";
import { errorToast, successToast } from "../utils/Toast";
import { API_URL, sendRequest } from "../utils/Api";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  // function to add product to cart
  const addToCart = (product) => {
    const existingCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCartItems = [...existingCartItems, product];
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const removeFromCart = (item) => {
    // Update cart items in localStorage after removing an item
    const existingCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCartItems = existingCartItems.filter(
      (cartItem) => cartItem.code !== item.code
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  // function to fetch products
  const fetchProducts = async () => {
    try {
      const response = await sendRequest(API_URL + "/products", "GET");
      console.log("ibigurishwa...", response.data);
      setProducts(response.data?.data || []);
    } catch (error) {
      errorToast(
        error?.response?.data?.message ||
          "An error occurred while fetching products"
      );
    }
  };

  useEffect(() => {
    fetchProducts();
    const token = localStorage.getItem("token");
    if (token) setLoggedIn(true);
  }, []);
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold text-center text-[#2272C3] mt-12 overflow-hidden">
        <Link
          to={loggedIn ? "/" : "/login"}
          className=" underline text-blue-500 text-[18px]"
          onClick={() => {
            if (loggedIn) {
              localStorage.removeItem("token");
              setLoggedIn(false);
            }
          }}
        >
          {loggedIn ? "Logout" : "Login"}
        </Link>
        <br />
        Welcome to Binary Supermarkert
      </h2>
      <p className="text-xl font-bold text-center">
        By <b>KALIM</b>
      </p>
      <div className="flex justify-between">
        <h2
          style={{
            fontWeight: 700,
            fontSize: 30,
            marginTop: "1rem",
            marginLeft: "2rem",
          }}
        >
          Products
        </h2>
        {loggedIn && (
          <button
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: "#fff",
              marginTop: "1rem",
              marginRight: "2rem",
            }}
            className="bg-[#2272C3] px-4 py-2 rounded-md text-white"
            onClick={() => (window.location.href = "/cart")}
          >
            Go to your Cart
          </button>
        )}
      </div>
      <div className="flex justify-between p-5">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            removeFromCart={removeFromCart}
            addToCart={addToCart}
          />
        ))}
      </div>
      {products.length === 0 && (
        <p className="text-center mx-auto text-xl font-bold text-[orange] mt-6">
          No products are in stock yet
        </p>
      )}
    </div>
  );
};

export default ProductList;
