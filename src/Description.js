 import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

export default function Description({ addToCart, addToWishList }) {
  const [description, setDescription] = useState([]); 
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
   const [error, setError] = useState(null);

  const { productId } = location.state || {};
useEffect(() => {
  console.log("Fetching product details for ID:", productId);
  fetch(`http://localhost:5000/api/products/${productId}`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json();
    })
    .then((data) => {
      console.log("Fetched product data:", data);
      setDescription([data]); // Wrap data in an array
    })
    .catch((err) => {
      console.error("Error fetching product details:", err);
      setDescription([]); // Clear the description on error
    });
}, [productId]);


const handleSubmitReview = async (event) => {
  event.preventDefault();
  const userName = event.target.userName.value;
  const userReview = event.target.userReview.value;

  if (!rating) {
    alert("Please provide a rating before submitting.");
    return;
  }

  const newReview = { userName, userReview, rating };

  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/products/${productId}/reviews`, 
      newReview
    );
    setReviews(data.reviews); // Backend should return updated reviews.
    event.target.reset();
    setRating(0);
  } catch (err) {
    console.error("Failed to submit review:", err);
    setError("Failed to submit your review. Please try again.");
  }
};

  const renderStars = (rating) => (
    <ReactStars count={5} value={rating} size={20} edit={false} color2={"gold"} />
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Cambria", backgroundColor: "white" }}>
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
          marginTop: "15px",
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

      {description.length > 0 ? (
        <div>
          {description.map((item) => (
            <div
              key={item.id}
              style={{
                textAlign: "center",
                marginBottom: "40px",
              }}
            >
              <h2
                style={{
                  fontSize: "32px",
                  marginTop: "10px",
                  textShadow: "1px 1px 2px gray",
                }}
              >
                {item.name}
              </h2>
              <h4
                style={{
                  fontWeight: "bold",
                  fontSize: "22px",
                  color: "#555",
                }}
              >
                Price: Rs.{item.price}
              </h4>
              <div
                className="product"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  gap: "70px",
                  width: "80%",
                  margin: "auto",
                  background: "white",
                  padding: "50px",
                  borderRadius: "15px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  transition: "transform 0.3s ease",
                }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  style={{
                    height: "300px",
                    width: "300px",
                    borderRadius: "15px",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "5px",
                    width: "60%",
                  }}
                >
                  <h3>Description</h3>
                  <p
                    style={{
                      fontSize: "18px",
                      color: "black",
                      textAlign: "left",
                    }}
                  >
                    {item.des}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "20px",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={() => addToCart(item)}
                      style={{
                        padding: "10px 15px",
                        borderRadius: "10px",
                        backgroundColor: "#FC94AF",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "14px",
                        border: "none",
                        cursor: "pointer",
                        transition: "transform 0.2s",
                      }}
                      onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => addToWishList(item)}
                      style={{
                        padding: "10px 15px",
                        borderRadius: "10px",
                        backgroundColor: "#9E4244",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "14px",
                        border: "none",
                        cursor: "pointer",
                        transition: "transform 0.2s",
                      }}
                      onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                    >
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
          Loading product details...
        </p>
      )}

      {/* The rest of your UI for delivery info and reviews */}
      {/* (Include your existing delivery icons + reviews code here as is) */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          backgroundColor: "white",
          padding: "15px 20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ textAlign: "center" }}>
    <img src="https://i.pinimg.com/736x/ef/f6/15/eff6157cdfb2328a7a0d54acd1ac710c.jpg" 
         style={{ height: "50px", width: "70px" }} />
    <p style={{ fontSize: "14px", fontWeight: "bold", color: "#333", marginTop: "5px" }}>Free Delivery</p>
  </div>

  <div style={{ height: "50px", width: "1.5px", backgroundColor: "#ccc" }}></div>

  <div style={{ textAlign: "center" }}>
    <img src="https://i.pinimg.com/736x/43/a3/d8/43a3d843e276e545124d020182f5f8d6.jpg" 
         style={{ height: "45px", width: "50px" }} />
    <p style={{ fontSize: "14px", fontWeight: "bold", color: "#333", marginTop: "5px" }}>Trusted</p>
  </div>

  <div style={{ height: "50px", width: "1.5px", backgroundColor: "#ccc" }}></div>

  <div style={{ textAlign: "center" }}>
    <img src="https://i.pinimg.com/736x/f1/6c/d8/f16cd80edb88c7b9c394d87426a56abc.jpg" 
         style={{ height: "50px", width: "70px" }} />
    <p style={{ fontSize: "14px", fontWeight: "bold", color: "#333", marginTop: "5px" }}>Cash On Delivery</p>
  </div>

  <div style={{ height: "50px", width: "1.5px", backgroundColor: "#ccc" }}></div>

  <div style={{ textAlign: "center" }}>
    <img src="https://i.pinimg.com/736x/15/d3/7e/15d37ef6c9cc4b5b79f1738bfb424af4.jpg" 
         style={{ height: "60px", width: "70px" }} />
    <p style={{ fontSize: "14px", fontWeight: "bold", color: "#333", marginTop: "5px" }}>Pay Online</p>
  </div>

  <div style={{ height: "50px", width: "1.5px", backgroundColor: "#ccc" }}></div>

  <div style={{ textAlign: "center" }}>
    <img src="https://i.pinimg.com/736x/df/0e/6a/df0e6aa45036ee5db03fab7babd0486b.jpg" 
         style={{ height: "60px", width: "70px" }} />
    <p style={{ fontSize: "14px", fontWeight: "bold", color: "#333", marginTop: "5px" }}>24/7 Service</p>
  </div>

  <div style={{ height: "50px", width: "1.5px", backgroundColor: "#ccc" }}></div>

  <div style={{ textAlign: "center" }}>
    <img src="https://i.pinimg.com/736x/ab/0c/b3/ab0cb3048106e0bea36e195729db020c.jpg" 
         style={{ height: "50px", width: "50px" }} />
    <p style={{ fontSize: "14px", fontWeight: "bold", color: "#333", marginTop: "5px" }}>Return/Exchange</p>
  </div>


      </div>

      <h1 style={{ textAlign: "center", fontSize: "28px", color: "black", margin: "40px 0" }}>
        📝 Reviews
      </h1>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px" }}>
        <form
          onSubmit={handleSubmitReview}
          style={{
            width: "45%",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            fontSize: "16px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <label htmlFor="userName" style={{ fontSize: "18px", marginBottom: "8px", display: "block" }}>
            Your Name:
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            required
            style={{
              width: "80%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid black",
              marginBottom: "20px",
            }}
            aria-label="Your name"
          />
          <br />

          <label htmlFor="userReview" style={{ fontSize: "18px", marginBottom: "8px", display: "block" }}>
            Your Review:
          </label>
          <textarea
            id="userReview"
            name="userReview"
            rows="4"
            cols="50"
            required
            style={{
              width: "80%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid black",
              marginBottom: "20px",
            }}
            aria-label="Your review"
          ></textarea>
          <br />

          <label htmlFor="rating" style={{ fontSize: "18px", marginBottom: "8px", display: "block" }}>
            Rating (1 to 5):
          </label>
          <ReactStars
            count={5}
            size={24}
            color2={"#ffd700"}
            value={rating}
            onChange={(newRating) => setRating(newRating)}
            aria-label="Rating"
          />
          <br />

          <button
            type="submit"
            style={{
              backgroundColor: "#F97272",
              color: "white",
              padding: "12px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Submit Review
          </button>
        </form>

        <div
          style={{
            width: "45%",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ textAlign: "center", fontSize: "24px" }}>Reviews</h2>
          <div id="reviews">
            {reviews.map((review, index) => (
              <div
                key={`${review.userName}-${index}`}
                style={{
                  background: "#f9f9f9",
                  padding: "20px",
                  marginBottom: "20px",
                  borderRadius: "10px",
                 

                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                <strong style={{ fontSize: "18px" }}>{review.userName}</strong>
                <span>{renderStars(review.rating)}</span>
                <p>{review.userReview}</p>
                <small>{review.timestamp}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
 