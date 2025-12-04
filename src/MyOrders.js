import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const userId = "demo"; 

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${userId}`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const getProductDetails = (productId) =>
    products.find((p) => p._id === productId || p.id === productId) || {};

  const calculateTotal = () => {
    return orders.reduce((total, item) => {
      const product = getProductDetails(item.productId);
      return total + (product.price || 0) * item.quantity;
    }, 0);
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      fetchOrders();
    } catch (err) {
      console.error("Failed to cancel order", err);
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
          padding: "2px 2px",
          marginBottom: "2px",
          borderRadius: "8px",
          backgroundColor: "white",
          border: "none",
          cursor: "pointer",
          gap: "10px",
          transition: "all 0.3s ease",
          marginTop: "15px"
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
          style={{ height: "30px", marginRight: "8px" }}
          alt="back"
        />
      </button>

      <h1 style={{ fontFamily: "Cambria" }}>Your Orders</h1>
      {orders.length === 0 ? (
        <p>Your order list is empty.</p>
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
          {orders.map((order) => {
            const product = getProductDetails(order.productId);
            return (
              <div
                key={order._id}
                style={{
                  flex: "1 1 30%",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  padding: "20px",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <h3 style={{ fontFamily: "Cambria" }}>
                  <b>{product.name}</b>
                </h3>
                <img
                  src={product.img}
                  alt={product.name}
                  style={{
                    height: "50%",
                    width: "50%",
                    borderRadius: "15px",
                    marginTop: "20px",
                    objectFit: "cover",
                  }}
                />
                <h4 style={{ fontFamily: "Cambria" }}>Price: Rs.{product.price}</h4>
                <h4 style={{ fontFamily: "Cambria" }}>Quantity: {order.quantity}</h4>
                <h4 style={{ fontFamily: "Cambria" }}>Total: Rs.{product.price * order.quantity}</h4>
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "5px",
                    backgroundColor: "#F25278",
                    cursor: "pointer",
                    color: "white",
                    border: "none",
                    fontFamily: "Cambria",
                    marginTop: "20px",
                  }}
                >
                  Cancel Order
                </button>
              </div>
            );
          })}
        </div>
      )}

      {orders.length > 0 && (
        <div>
          <h2>Total Price: Rs.{calculateTotal()}</h2>
        </div>
      )}
    </div>
  );
}
