import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

export default function Products({ addToCart, addToWishlist, searchTerm }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const filter = location.state?.filter || null;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `${API_BASE_URL}/products`;
        const params = new URLSearchParams();

        if (filter) {
          if (filter.type === "category") params.append("category", filter.value);
          else if (filter.type === "occasions") params.append("occasions", filter.value);
        }

        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, [filter, searchTerm]);

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => navigate("/")}
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
          src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
          alt="home-icon"
          style={{ width: "20px", height: "20px" }}
        />
      </button>

      <h2 style={{ textAlign: "center" }}>
        {searchTerm
          ? `Search Results for "${searchTerm}"`
          : filter
          ? `Products for ${filter.type === "category" ? `Category: ${filter.value}` : `Occasion: ${filter.value}`}`
          : "All Products"}
      </h2>

      <div
        style={{
          padding: "90px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "40px",
        }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="product"
              style={{
                flex: "1 1 22%",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                padding: "20px",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
                onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
              }}
            >
              <h3 style={{ fontFamily: "Cambria" }}>
                <b>{product.name}</b>
              </h3>
              <img
                src={product.img}
                style={{
                  height: "200px",
                  width: "200px",
                  borderRadius: "15px",
                  marginTop: "20px",
                  cursor: "pointer",
                }}
                alt={product.name}
                onClick={() =>
                  navigate(`/description`, { state: { productId: product._id } })
                }
                
              />
              <h4 style={{ fontFamily: "Cambria" }}>
                <b>Price: Rs.{product.price}</b>
              </h4>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "20px",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={() => addToCart(product)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "5px 8px",
                    borderRadius: "8px",
                    backgroundColor: "#FC94AF",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                      onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/34/34627.png"
                    alt="cart"
                    style={{ height: "14px", width: "14px", filter: "invert(1)" }}
                  />
                  Cart
                </button>
                <button
                  onClick={() => addToWishlist(product)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "5px 8px",
                    borderRadius: "8px",
                    backgroundColor: "#9E4244",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                      onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1077/1077086.png"
                    alt="wishlist"
                    style={{ height: "14px", width: "14px", filter: "invert(1)" }}
                  />
                  Wishlist
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", fontSize: "18px", marginTop: "50px" }}>
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}