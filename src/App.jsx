import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const PRODUCTS = [
    {
      id: 1,
      name: "Premium Steel Knife Set",
      price: 49.99,
      img: "https://images.unsplash.com/photo-1586201375761-83865001e30b?w=800&q=80"
    },
    {
      id: 2,
      name: "Luxury Ceramic Dinner Plates",
      price: 39.99,
      img: "https://images.unsplash.com/photo-1608753894962-d2b6f282e084?w=800&q=80"
    },
    {
      id: 3,
      name: "Glass Storage Jars Pack",
      price: 25.0,
      img: "https://images.unsplash.com/photo-1600185363127-3b7e9d4edbff?w=800&q=80"
    },
    {
      id: 4,
      name: "Non-stick Cooking Pan",
      price: 29.99,
      img: "https://images.unsplash.com/photo-1588776814546-9ed76e127ec9?w=800&q=80"
    },
    {
      id: 5,
      name: "Large Storage Box Set",
      price: 19.99,
      img: "https://images.unsplash.com/photo-1596464716121-fb52ecfb7d92?w=800&q=80"
    }
  ];

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("retailerreef_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("retailerreef_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => setCart((prev) => [...prev, product]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="nav">
        <h2>RetailerReef</h2>
        <div className="nav-links">
          <a href="#products">Products</a>
          <a href="#cart">Cart ({cart.length})</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <h1>Premium Household Products</h1>
        <p>High-quality goods. Trusted quality. Best prices.</p>
      </header>

      {/* PRODUCTS */}
      <section id="products" className="products">
        {PRODUCTS.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.img} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="price">${p.price.toFixed(2)}</p>
            <button className="add-btn" onClick={() => addToCart(p)}>
              Add to Cart
            </button>
          </div>
        ))}
      </section>

      {/* CART */}
      <section id="cart" className="cart-section">
        <h2>Your Cart ({cart.length})</h2>

        {cart.length === 0 ? (
          <p>No items yet.</p>
        ) : (
          cart.map((item, i) => (
            <div className="cart-item" key={i}>
              {item.name} — ${item.price.toFixed(2)}
            </div>
          ))
        )}
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © 2025 RetailerReef — Premium Household Items
      </footer>
    </>
  );
}
