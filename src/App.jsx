import React, { useState, useEffect } from "react";

export default function App() {
  // Sample products
  const PRODUCTS = [
    {
      id: 1,
      name: "Stainless Steel Knife Set",
      price: 49.99,
      img: "https://images.unsplash.com/photo-1586201375761-83865001e30b?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "Ceramic Dinner Plate Set",
      price: 39.99,
      img: "https://images.unsplash.com/photo-1608753894962-d2b6f282e084?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "Glass Storage Jars",
      price: 25.00,
      img: "https://images.unsplash.com/photo-1600185363127-3b7e9d4edbff?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      name: "Non-stick Frying Pan",
      price: 29.99,
      img: "https://images.unsplash.com/photo-1588776814546-9ed76e127ec9?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 5,
      name: "Plastic Storage Box Set",
      price: 19.99,
      img: "https://images.unsplash.com/photo-1596464716121-fb52ecfb7d92?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const [cart, setCart] = useState(() => {
    // Load cart from localStorage if exists
    const saved = localStorage.getItem("retailerreef_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("retailerreef_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* NAVBAR */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#1e293b",
        padding: "15px 25px",
        color: "white"
      }}>
        <h2 style={{ margin: 0 }}>RetailerReef</h2>

        <div style={{ display: "flex", gap: "20px" }}>
          <a style={{ color: "white", textDecoration: "none" }} href="#">Home</a>
          <a style={{ color: "white", textDecoration: "none" }} href="#products">Products</a>
          <a style={{ color: "white", textDecoration: "none" }} href="#cart">Cart ({cart.length})</a>
          <a style={{ color: "white", textDecoration: "none" }} href="#contact">Contact Us</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div style={{ padding: "40px", textAlign: "center", backgroundColor: "#f1f5f9" }}>
        <h1 style={{ fontSize: "36px" }}>High-Quality Household Items</h1>
        <p style={{ fontSize: "18px" }}>Affordable prices. Durable products. Trusted quality.</p>
      </div>

      {/* PRODUCTS */}
      <div id="products" style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
        padding: "30px"
      }}>
        {PRODUCTS.map(product => (
          <div key={product.id} style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            width: "220px",
            padding: "15px",
            textAlign: "center",
            backgroundColor: "white"
          }}>
            <img src={product.img} alt={product.name} style={{ width: "100%", borderRadius: "6px" }} />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)} style={{
              padding: "8px 15px",
              backgroundColor: "#1e293b",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* CART SECTION */}
      <div id="cart" style={{ padding: "30px", backgroundColor: "#f8fafc" }}>
        <h2>Cart Items ({cart.length})</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
            ))}
          </ul>
        )}
      </div>

      {/* CONTACT US */}
      <div id="contact" style={{ padding: "30px", textAlign: "center" }}>
        <h2>Contact Us</h2>
        <p>Email: <a href="mailto:contact@retailerreef.com">contact@retailerreef.com</a></p>
      </div>

      {/* FOOTER */}
      <footer style={{ textAlign: "center", padding: "20px", backgroundColor: "#1e293b", color: "white" }}>
        © 2025 RetailerReef. All rights reserved.
      </footer>
    </div>
  );
}
