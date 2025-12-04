import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

export default function WishList({ wishlist, removeFromWishlist, addToCart }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
const userId = user?._id || "demo"; // fallback for safety


  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/wishlist/${userId}`); // Replace 'demo' with userId if available dynamically
        setWishlistItems(response.data);
      } catch (error) {
        console.error("Failed to fetch wishlist items", error);
      }
    };

    fetchWishlistItems();
  }, [userId]);

  const handleRemoveFromWishlist= async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/wishlist/${id}`, { params: { userId } });
      setWishlistItems((prevItems) => prevItems.filter((item) => item._id !== id));
      removeFromWishlist(id);
    } catch (error) {
      console.error("Failed to remove item from wishlist", error);
    }
  };

  const handleAddToCart = async (item) => {
    try {
      await axios.post(`${API_BASE_URL}/cart/add`, {
        userId: item.userId,
        productId: item.productId,
        quantity: 1,
      });
       handleRemoveFromWishlist(item._id);
      addToCart(item);
    } catch (error) {
      console.error("Failed to add item to cart", error);
    }
  };
  

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

      <h1>Your Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
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
          {wishlistItems.map((item) => (
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
              <h3>{item.product.name}</h3>
              <img
                src={item.product.img}
                alt={item.product.name}
                style={{
                  height: "150px",
                  width: "150px",
                  borderRadius: "10px",
                  marginTop: "20px",
                  objectFit: "cover",
                }}
              />
              <h4>Price: Rs.{item.product.price}</h4>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <button
                  onClick={() => handleAddToCart(item)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "5px",
                    backgroundColor: "#28a745",
                    cursor: "pointer",
                    color: "white",
                    border: "none",
                  }}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemoveFromWishlist(item._id)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "5px",
                    backgroundColor: "#F25278",
                    cursor: "pointer",
                    color: "white",
                    border: "none",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
