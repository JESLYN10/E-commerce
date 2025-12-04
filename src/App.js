import React, { useRef, useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Cart from './Cart';
import WishList from './WishList';
import MyOrders from './MyOrders';
import Description from './Description';
import Login from "./Login";
import Logout from "./Logout";
import SignUp from "./SignUp";
import Products from "./Product";
import "./App.css";
import AdminDashboard from './AdminDashboard';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const categories = [
  { name: "Drinkware", image: "https://i.pinimg.com/736x/12/fe/c0/12fec0e6357238bee4ab115f725178ac.jpg" },
  { name: "Accessories", image: "https://i.pinimg.com/736x/5d/90/75/5d90759086f2f27352d21725017050b4.jpg" },
  { name: "Jewelry", image: "https://i.pinimg.com/736x/28/2f/1b/282f1b999edaf47a646dac59ded3bb7e.jpg" },
  { name: "Home Decor", image: "https://i.pinimg.com/736x/9c/41/23/9c4123d5fab874916277c1f3bddb26ff.jpg" },
  { name: "Stationery", image: "https://i.pinimg.com/736x/9d/25/6e/9d256e925b8a928f06872c6a5c1f0b6b.jpg" },
  { name: "Keepsakes", image: "https://i.pinimg.com/736x/97/db/ba/97dbba88a5bc9d83561ec7aab7426345.jpg" },
  { name: "Bags", image: "https://i.pinimg.com/736x/80/3b/b2/803bb24b5a39914c874032355677ca94.jpg" },
];

const occasions = [
  { name: "Corporate Gifts", image: "https://i.pinimg.com/736x/a1/91/ea/a191ea0a56706be60be621f95cbf7237.jpg" },
  { name: "Personal Gifts", image: "https://i.pinimg.com/736x/31/2e/4f/312e4fa596b93e613c4cfcc8565c7625.jpg" },
  { name: "Wedding", image: "https://i.pinimg.com/736x/d2/6d/b0/d26db074a02a027e7879d7105d8e9452.jpg" },
  { name: "Housewarming", image: "https://i.pinimg.com/736x/85/aa/66/85aa6604efe1b49d1984701e0a81e337.jpg" },
  { name: "Romantic Gifts", image: "https://i.pinimg.com/736x/87/15/ee/8715eeb1cca0c2dd75cacac1f8e85c73.jpg" },
  { name: "Back to School", image: "https://i.pinimg.com/736x/4b/98/2d/4b982d6978115affe6edb53f94fe64a7.jpg" },
  { name: "Festivals", image: "https://www.prabhatkhabar.com/wp-content/uploads/2024/07/New-Project-47-1.jpg" },
  { name: "Beach Parties", image: "https://i.pinimg.com/736x/77/fb/a4/77fba45d713fe10250ee495d962bfe03.jpg" },
  { name: "Self-Care", image: "https://i.pinimg.com/736x/a9/25/c4/a925c44783131d1c819e9f94630ed5f7.jpg" },
  { name: "Art Enthusiasts", image: "https://i.pinimg.com/736x/ed/75/88/ed7588bc8bf6f943c2d9de7375766cce.jpg" },
];

function Sections({ categories, occasions, setFilter }) {
  const navigate = useNavigate();
  const occasionsRef = useRef(null);
  const categoriesRef = useRef(null);

  const scroll = (ref, direction) => {
    const { current } = ref;
    if (current) {
      const scrollAmount = 300;
      if (direction === "left") {
        current.scrollLeft -= scrollAmount;
      } else {
        current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <div>
      <section>
        <h1 style={{ textAlign: "center", fontFamily: "Cambria", marginTop:"100px" }}>Occasions</h1>
        <div style={{ position: "relative", margin: "80px" }}>
          <button
            onClick={() => scroll(occasionsRef, "left")}
            style={{
              position: "absolute",
              left: "-50px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0, 0, 0, 0.5)",
              border: "none",
              color: "#fff",
              padding: "10px",
              borderRadius: "50%",
              cursor: "pointer",
              zIndex: 1,
            }}
          >
            &#10094;
          </button>

          <div
            className="occasions-container"
            ref={occasionsRef}
            style={{
              display: "flex",
              overflowX: "auto",
              scrollBehavior: "smooth",
              padding: "10px 0",
              gap: "15px",
            }}
          >
            {occasions.map((occasion) => (
              <div
                key={occasion.name}
                className="occasion-item"
                style={{
                  minWidth: "200px",
                  flex: "0 0 auto",
                  textAlign: "center",
                  backgroundColor: "#f9f9f9",
                  padding: "10px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                onClick={() => {
                  setFilter({ type: "occasions", value: occasion.name });
navigate("/products", {
  state: { filter: { type: "occasions", value: occasion.name } }
});

                }}
              >
                <img
                  src={occasion.image}
                  alt={occasion.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <p
                  style={{
                    marginTop: "10px",
                    fontWeight: "bold",
                    fontFamily: "Cambria",
                  }}
                >
                  {occasion.name}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll(occasionsRef, "right")}
            style={{
              position: "absolute",
              right: "-50px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0, 0, 0, 0.5)",
              border: "none",
              color: "#fff",
              padding: "10px",
              borderRadius: "50%",
              cursor: "pointer",
              zIndex: 1,
            }}
          >
            &#10095;
          </button>
        </div>
      </section>

      <section>
        <h1 style={{ textAlign: "center", fontFamily: "Cambria" }}>Categories</h1>
        <div style={{ position: "relative", margin: "80px" }}>
          <button
            onClick={() => scroll(categoriesRef, "left")}
            style={{
              position: "absolute",
              left: "-50px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0, 0, 0, 0.5)",
              border: "none",
              color: "#fff",
              padding: "10px",
              borderRadius: "50%",
              cursor: "pointer",
              zIndex: 1,
            }}
          >
            &#10094;
          </button>

          <div
            className="categories-container"
            ref={categoriesRef}
            style={{
              display: "flex",
              overflowX: "auto",
              scrollBehavior: "smooth",
              padding: "10px 0",
              gap: "15px",
            }}
          >
            {categories.map((category) => (
              <div
                key={category.name}
                className="category-item"
                style={{
                  minWidth: "200px",
                  flex: "0 0 auto",
                  textAlign: "center",
                  backgroundColor: "#f9f9f9",
                  padding: "10px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                onClick={() => {
                  setFilter({ type: "category", value: category.name });
                  navigate("/products", {
  state: { filter: { type: "category", value: category.name } }
});

                }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <p
                  style={{
                    marginTop: "10px",
                    fontWeight: "bold",
                    fontFamily: "Cambria",
                  }}
                >
                  {category.name}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll(categoriesRef, "right")}
            style={{
              position: "absolute",
              right: "-50px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0, 0, 0, 0.5)",
              border: "none",
              color: "#fff",
              padding: "10px",
              borderRadius: "50%",
              cursor: "pointer",
              zIndex: 1,
            }}
          >
            &#10095;
          </button>
        </div>
      </section>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => {
            setFilter(null);
            navigate("/products");
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            marginBottom:"100px"
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}
const ExplorePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      type: "image",
      content:
        "https://cdn.igp.com/f_auto,q_auto,t_pnopt34prodlp/banners/build_your_own_box_d_illustration_5_20240207150651.gif",
    },
    {
      type: "image",
      content:
        "https://cdn.igp.com/f_auto,q_auto,t_pnopt32prodlp/banners/flowers_d_banners_5_20240528101946.jpg",
    },
    {
      type: "image",
      content:
        "https://cdn.igp.com/f_auto,q_auto,t_pnopt32prodlp/banners/anniversary_d_banners_5_20240521142743.jpg",
    },
    {
      type: "image",
      content:
        "https://cdn.igp.com/f_auto,q_auto,t_pnopt32prodlp/banners/birthday_d_banners_5_20240521142730.jpg",
    },
    {
      type: "image",
      content:
        "https://cdn.igp.com/f_auto,q_auto,t_pnopt32prodlp/banners/tech_gadgets_d_banners_5_20240208190717.jpg",
    },
  ];

  const moveSlide = useCallback((direction) => {
    const totalSlides = slides.length;
    setCurrentIndex((prevIndex) => (prevIndex + direction + totalSlides) % totalSlides);
  }, [slides.length]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      moveSlide(1); 
    }, 5000);
    return () => clearInterval(interval);
  }, [moveSlide]); 
  return (
    <div className="explore-container">
      <div
        className="slider"
        style={{
          display: "flex",
          transition: "transform 0.5s ease-in-out",
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div className="slide" key={index} style={{ flex: "0 0 100%" }}>
              <img
                src={slide.content}
                alt={`Slide ${index + 1}`}
                style={{ width: "100%", height: "auto" }}
              />
          </div>
        ))}
      </div>
      <div className="controls">
        <button className="control" onClick={() => moveSlide(-1)}>
          &#10094;
        </button>
        <button className="control" onClick={() => moveSlide(1)}>
          &#10095;
        </button>
      </div>
    </div>
  );
};


function Search({  searchTerm, setSearchTerm, onSearch }) {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSearch(e.target.value);
          navigate("/products"); 
        }}
        style={{
          marginTop: "50px",
          padding: "10px",
          width: "800px",
          borderRadius: "15px",
          border: "3px solid #ccc",
        }}
      />
      <p style={{ marginTop: "20px" }}>
        You are searching for: <b>{searchTerm}</b>
      </p>
    </div>
  );
}

function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [description, setDescription] = useState([]);
  const ProtectedUser = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!user || !isLoggedIn) {
    window.location.href = "/login";
    return null;
  }

  return children;
};

 function notify(message, type = "success") {
    Swal.fire({
      title: message,
      icon: type,
      timer: 3000,
      showConfirmButton: false,
      toast: true,
      position: "top-right",
    });
  }
 useEffect(() => {
  const storedUser = localStorage.getItem("user");
  const storedLogin = localStorage.getItem("isLoggedIn") === "true";

  if (storedUser && storedLogin) {
    setUser(JSON.parse(storedUser));
    setIsLoggedIn(true);
  } else {
    setUser(null);
    setIsLoggedIn(false);
  }
}, []);


  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  };
const addToCart = async (product) => {
  try {
    const userId = user?.userId || "demo";
    await axios.post(`${API_BASE_URL}/cart/add`, {
      userId,
      productId: product._id || product.id,
      quantity: 1,
    });
    setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    notify(`${product.name} has been added to your cart!`);
  } catch (err) {
    console.error("Failed to add to cart:", err);
    notify(`Failed to add to cart`, "error");
  }
};


const addToWishlist = async (product) => {
  try {
    const userId = user?.userId || "demo";
    await axios.post(`${API_BASE_URL}/wishlist/add`, {
      userId,
      productId: product._id || product.id,
    });
    setWishlist((prev) => [...prev, product]);
    notify(`${product.name} has been added to your wishlist!`);
  } catch (err) {
    console.error("Failed to add to wishlist:", err);
    notify(`Failed to add to wishlist`, "error");
  }
};




  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
   notify("Product has been removed from your cart!", "warning");
  };


  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
  notify("Product has been removed from your wishlist!", "warning");
  };

  const addToOrders = (product) => {
    setOrders((prevOrders) => {
      if (!prevOrders.some((item) => item.id === product.id)) {
      notify(`${product.name} has been added to your orders!`);
        return [...prevOrders, product];
      }
     notify(`${product.name} is already in your orders!`, "info");
      return prevOrders;
    });
  };

  const removeFromOrders = (productId) => {
    setOrders((prevOrders) => prevOrders.filter((item) => item.id !== productId));
    notify("Product has been removed from your orders!", "warning");
  };

 function onSearch(term) {
    setSearchTerm(term);
    setFilter(term ? { type: "search", value: term } : null);
  }

const linkStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textDecoration: "none",
  color: "#333",
  cursor: "pointer",
  width: "70px",
  transition: "color 0.3s ease",
  marginLeft: "5px", // spacing between icons
};

const iconStyle = {
  height: "32px",
  marginBottom: "6px",
};


  return (
    <>
      <div className="app-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            backgroundColor: "white",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src="https://i.pinimg.com/736x/4b/11/a9/4b11a959bae374f84a99cc6fa7d2dbab.jpg"
              style={{ height: "80px" }}
              alt="Logo"
            />
            <h2 style={{ fontFamily: "Bradley Hand ITC", margin: "0" }}>
              <b>CharmCart</b>
            </h2>
          </div>
          <Search
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                   onSearch={onSearch}/>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Link
      to="/wishlist"
      style={{ ...linkStyle, marginLeft: 0 }} // no left margin for first item
      onMouseEnter={(e) => (e.currentTarget.style.color = "#007BFF")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/256/3916/3916579.png"
        alt="Wishlist"
        style={iconStyle}
      />
      <span style={{ fontSize: "14px", fontWeight: "600" }}>Wishlist</span>
    </Link>

    <Link
      to="/cart"
      style={linkStyle}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#007BFF")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/256/3916/3916598.png"
        alt="Cart"
        style={iconStyle}
      />
      <span style={{ fontSize: "14px", fontWeight: "600" }}>Cart</span>
    </Link>

    <Link
      to="/myorders"
      style={linkStyle}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#007BFF")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/256/16774/16774126.png"
        alt="My Orders"
        style={iconStyle}
      />
      <span style={{ fontSize: "14px", fontWeight: "600" }}>My Orders</span>
    </Link>

    {isLoggedIn ? (
      <Link
        to="/logout"
        onClick={handleLogout}
        style={linkStyle}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#007BFF")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/256/17766/17766670.png"
          alt="Logout"
          style={iconStyle}
        />
        <span style={{ fontSize: "14px", fontWeight: "600" }}>Logout</span>
      </Link>
    ) : (
      <Link
        to="/login"
        onClick={handleLogin}
        style={linkStyle}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#007BFF")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/256/17766/17766670.png"
          alt="Login"
          style={iconStyle}
        />
        <span style={{ fontSize: "14px", fontWeight: "600" }}>Login</span>
      </Link>
    )}

          </div>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <>
              <ExplorePage />
                {!searchTerm && (
                  <Sections
                    categories={categories}
                    occasions={occasions}
                    setFilter={setFilter}
                  />
                )}
              </>
            }
          />
          <Route
            path="/products"
            element={
              <Products
                setFilter={setFilter}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                addToCart={addToCart}
                addToWishlist={addToWishlist}
                setDescription={setDescription}
              />
            }
          />
          <Route path="/Cart" element={<Cart cart={cart} removeFromCart={removeFromCart} addToOrders={addToOrders} setCart={setCart} isLoggedIn={isLoggedIn} />} />
          <Route path="/WishList" element={<WishList wishlist={wishlist} removeFromWishlist={removeFromWishlist} />} />
          <Route path="/MyOrders" element={<MyOrders orders={orders} removeFromOrders={removeFromOrders} />} />
          <Route path="/Description" element={<Description description={description} addToCart={addToCart} addToWishList={addToWishlist} />} />
          <Route
            path="/Login"
            element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}
          />
                    <Route
            path="/logout"
            element={<Logout setIsLoggedIn={setIsLoggedIn} />}
          />

           <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
            <footer style={{ backgroundColor: "#333", color: "#ccc", padding: "20px 0" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: "1", minWidth: "250px", marginBottom: "20px" }}>
            <h4 style={{ color: "#fff", marginBottom: "10px" }}>About Us</h4>
            <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
              We are a forward-thinking company focused on delivering top-notch services and products. Our mission is to make life better for our customers through innovation and dedication.
            </p>
          </div>
          <div style={{ flex: "1", minWidth: "250px", marginBottom: "20px" ,marginLeft:"120px"}}>
            <h4 style={{ color: "#fff", marginBottom: "10px" }}>Contact</h4>
            <ul style={{ listStyle: "none", padding: "0", fontSize: "14px" }}>
              <li style={{ marginBottom: "5px" }}>Phone: (123) 456-7890</li>
              <li style={{ marginBottom: "5px" }}>Email: contact@charmcart.com</li>
              <li style={{ marginBottom: "5px" }}>Address: 123 Main Street, Coimbatore, Tamil Nadu, India</li>
            </ul>
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: "14px",
            marginTop: "20px",
            borderTop: "1px solid #444",
            paddingTop: "10px",
            marginBottom:"5%"
          }}
        >
          © 2025 CharmCart. All rights reserved.
        </div>
      </footer>
    </>
  );
}

export default App;
