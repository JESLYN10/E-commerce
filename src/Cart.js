import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

export default function Cart({ cart, removeFromCart, addToOrders, setCart, isLoggedIn }) {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const userId = "demo";

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/cart/${userId}`);
        console.log("Fetched Cart Items:", response.data); // Debug the response
        setCartItems(response.data);
      } catch (error) {
        console.error("Failed to fetch cart items", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/cart/${id}`, { params: { userId } });
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
      removeFromCart(id);
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  };

  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const response = await axios.patch(`${API_BASE_URL}/cart/${id}`, {
        userId,
        quantity: newQuantity,
      });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, quantity: response.data.quantity } : item
        )
      );
    } catch (error) {
      console.error("Failed to update item quantity", error);
    }
  };

  const handlePlaceOrder = async () => {
    if (!isLoggedIn) {
      sessionStorage.setItem("redirectAfterLogin", "/cart");
      navigate("/login");
      return;
    }

    try {
      const orderPromises = cartItems.map((item) =>
        axios.post(`${API_BASE_URL}/orders/add`, {
          userId: item.userId,
          productId: item.productId,
          quantity: item.quantity,
        })
      );
      await Promise.all(orderPromises);
      setCartItems([]);
      cartItems.forEach((item) => addToOrders(item));
    } catch (error) {
      console.error("Failed to place order", error);
    }
  };

  function calculateTotal(items = []) {
    return items.reduce((total, item) => {
      const price = item?.product?.price || 0;
      const quantity = item?.quantity || 1;
      return total + price * quantity;
    }, 0);
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
           <button
        onClick={() => navigate("/products")}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 18px",
          marginBottom: "20px",
          borderRadius: "8px",
          backgroundColor: "white",
          border: "none",
          cursor: "pointer",
          gap: "10px",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#e0e0e0";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "white";
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/256/3916/3916837.png"
          alt="back"
          style={{ height: "20px", width: "20px" }}
        />
      </button>
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "20px",
            margin: "20px auto",
            maxWidth: "1200px",
          }}
        >
          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{
                flex: "1 1 30%",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                padding: "20px",
              }}
            >
              <h3>{item.product.name || "Product Name Unavailable"}</h3>
              <img
                src={item.product.img || "https://via.placeholder.com/150"}
                alt={item.product.name || "Product"}
                style={{
                  height: "150px",
                  width: "150px",
                  borderRadius: "10px",
                  marginTop: "20px",
                  objectFit: "cover",
                }}
              />
              <h4>Price: Rs.{item.product.price || 0}</h4>
              <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
                <button
                  onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: "5px",
                    backgroundColor: "#f0f0f0",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: "5px",
                    backgroundColor: "#f0f0f0",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item._id)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "5px",
                  backgroundColor: "#F25278",
                  cursor: "pointer",
                  color: "white",
                  border: "none",
                  marginTop: "10px",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Total Price: Rs.{calculateTotal(cartItems)}</h2>
          <button
            onClick={handlePlaceOrder}
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
