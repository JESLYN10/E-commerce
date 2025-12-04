import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    des: "",
    img: "",
    category: "",
    occasions: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to load products.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, price, des, img, category, occasions } = formData;

      if (!name || !price || !des || !img || !category || !occasions) {
        alert("Please fill out all fields.");
        return;
      }

      const payload = { name, price, des, img, category, occasions };
      const endpoint = editingId ? `${API_BASE_URL}/products/${editingId}` : `${API_BASE_URL}/products`;

      if (editingId) {
        await axios.put(endpoint, payload);
      } else {
        await axios.post(endpoint, payload);
      }

      setEditingId(null);
      setFormData({
        name: "",
        price: "",
        des: "",
        img: "",
        category: "",
        occasions: "",
      });
      fetchProducts();
    } catch (error) {
      console.error("Submit failed:", error.response?.data || error.message);
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${API_BASE_URL}/products/${id}`);
        fetchProducts();
      } catch (err) {
        setError("Delete failed. Please try again.");
      }
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#4CAF50" }}>Admin Dashboard</h1>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "400px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />
      </div>

      <h2 style={{ color: "#333", textAlign: "center" }}>{editingId ? "Edit Product" : "Add Product"}</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "10px",
          maxWidth: "600px",
          margin: "0 auto 30px",
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
          required
        />
        <textarea
          name="des"
          placeholder="Description"
          value={formData.des}
          onChange={handleChange}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd", resize: "none" }}
          rows="4"
          required
        />
        <input
          name="img"
          placeholder="Image URL"
          value={formData.img}
          onChange={handleChange}
          style={{  border: "1px solid #ddd", height: "300px",
                    width: "300px",
                    borderRadius: "15px",
                    objectFit: "cover", }}
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
          required
        />
        <input
          name="occasions"
          placeholder="Occasions (e.g., birthday, wedding)"
          value={formData.occasions}
          onChange={handleChange}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
          required
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <h2 style={{ color: "#333", textAlign: "center" }}>Product List</h2>
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading products...</p>
      ) : (
   <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px",
    alignItems: "center",
  }}
>
  {filteredProducts.map((product) => (
    <div
      key={product._id}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        width: "100%",
        maxWidth: "800px",
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ flex: 1 }}>
        <img
          src={product.img}
          alt={product.name}
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "15px",
            margin: "20px",
          }}
        />
      </div>
      <div style={{ flex: 2, paddingLeft: "20px" }}>
        <h3 style={{ color: "#4CAF50" }}>{product.name}</h3>
        <p><strong>Price:</strong> ₹{product.price}</p>
        <p style={{ margin: "10px 0" }}>
          <strong>Description:</strong> {product.des || "No description available."}
        </p>
         <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Occasions:</strong> {product.occasions}
      </p>
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => handleEdit(product)}
            style={{
              marginRight: "10px",
              padding: "10px 20px",
              backgroundColor: "#FFC107",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              color: "#fff",
            }}
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(product._id)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#DC3545",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              color: "#fff",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ))}


        </div>
      )}
    </div>
  );
}
