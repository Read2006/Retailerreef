import React, { useState, useEffect } from "react";

export default function App() {
  // Product list
  const PRODUCTS = [
    { id: 1, name: "Stainless Steel Knife Set", price: 49.99, img: "https://images.unsplash.com/photo-1586201375761-83865001e30b?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Ceramic Dinner Plate Set", price: 39.99, img: "https://images.unsplash.com/photo-1608753894962-d2b6f282e084?auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: "Glass Storage Jars", price: 25.0, img: "https://images.unsplash.com/photo-1600185363127-3b7e9d4edbff?auto=format&fit=crop&w=400&q=80" },
    { id: 4, name: "Non-stick Frying Pan", price: 29.99, img: "https://images.unsplash.com/photo-1588776814546-9ed76e127ec9?auto=format&fit=crop&w=400&q=80" },
    { id: 5, name: "Plastic Storage Box Set", price: 19.99, img: "https://images.unsplash.com/photo-1596464716121-fb52ecfb7d92?auto=format&fit=crop&w=400&q=80" },
    { id: 6, name: "Cotton Bed Sheet Set", price: 59.99, img: "https://images.unsplash.com/photo-1600180758897-7e7f5e7f0c39?auto=format&fit=crop&w=400&q=80" },
    { id: 7, name: "LED Desk Lamp", price: 24.99, img: "https://images.unsplash.com/photo-1587825140708-1e03eeb6608f?auto=format&fit=crop&w=400&q=80" },
    { id: 8, name: "Vacuum Storage Bags", price: 15.99, img: "https://images.unsplash.com/photo-1612392061788-6600f2c82f2a?auto=format&fit=crop&w=400&q=80" },
    { id: 9, name: "Ceramic Mug Set", price: 29.99, img: "https://images.unsplash.com/photo-1584270354949-8d5f6e0f5f1f?auto=format&fit=crop&w=400&q=80" },
    { id: 10, name: "Wooden Cutting Board", price: 22.99, img: "https://images.unsplash.com/photo-1585238342022-cff38f3c3b11?auto=format&fit=crop&w=400&q=80" },
  ];

  // Cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("retailerreef_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("retailerreef_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* NAVBAR */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#1e293b", padding: "15px 25px", color: "white", position: "sticky", top: 0, zIndex: 1000 }}>
        <h2 style={{ margin: 0 }}>RetailerReef</h2>
        <div style={{ display: "flex", gap: "20px" }}>
          <a style={{ color: "white", textDecoration: "none" }} href="#">Home</a>
          <a style={{ color: "white", textDecoration: "none" }} href="#products">Products</a>
          <a style={{ color: "white", textDecoration: "none" }} href="#cart">Cart ({cart.length})</a>
          <a style={{ color: "white", textDecoration: "none" }} href="#contact">Contact Us</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ padding: "60px 20px", textAlign: "center", backgroundColor: "#f1f5f9" }}>
        <h1 style={{ fontSize: "42px", marginBottom: "15px" }}>High-Quality Household Items</h1>
        <p style={{ fontSize: "20px", maxWidth: "600px", margin: "0 auto" }}>Affordable prices. Durable products. Trusted quality.</p>
      </div>

      {/* PRODUCTS */}
      <div id="products" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "25px", padding: "40px" }}>
        {PRODUCTS.map(product => (
          <div key={product.id} style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "15px", textAlign: "center", backgroundColor: "white", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
            <img src={product.img} alt={product.name} style={{ width: "100%", borderRadius: "8px" }} />
            <h3 style={{ margin: "10px 0" }}>{product.name}</h3>
            <p style={{ fontWeight: "bold" }}>${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)} style={{ padding: "10px 15px", backgroundColor: "#1e293b", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* CART */}
      <div id="cart" style={{ padding: "40px 20px", backgroundColor: "#f8fafc", maxWidth: "900px", margin: "0 auto" }}>
        <h2>Cart Items ({cart.length})</h2>
        {cart.length === 0 ? <p>Your cart is empty.</p> :
          <>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {cart.map((item, index) => (
                <li key={index} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #ccc" }}>
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                  <button onClick={() => removeFromCart(index)} style={{ marginLeft: "10px", cursor: "pointer" }}>Remove</button>
                </li>
              ))}
            </ul>
            <h3 style={{ marginTop: "15px" }}>Total: ${totalPrice.toFixed(2)}</h3>
          </>
        }
      </div>

      {/* CONTACT */}
      <div id="contact" style={{ padding: "40px 20px", textAlign: "center", backgroundColor: "#f1f5f9" }}>
        <h2>Contact Us</h2>
        <p>Email: <a href="mailto:contact@retailerreef.com">contact@retailerreef.com</a></p>
      </div>

      {/* FOOTER */}
      <footer style={{ textAlign: "center", padding: "25px", backgroundColor: "#1e293b", color: "white" }}>
        © 2025 RetailerReef. All rights reserved.
      </footer>
    </div>
  );
}
