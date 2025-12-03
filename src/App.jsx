import React, { useState, useEffect } from "react";
import "./App.css";

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
    { id: 11, name: "Stainless Steel Mixing Bowls", price: 34.99, img: "https://images.unsplash.com/photo-1598511729356-1b2f6d4bdb2b?auto=format&fit=crop&w=400&q=80" },
    { id: 12, name: "Kitchen Spice Rack", price: 27.99, img: "https://images.unsplash.com/photo-1612831455542-1fc3db245cde?auto=format&fit=crop&w=400&q=80" },
  ];

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("retailerreef_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("retailerreef_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(item => item.id === product.id);
      if (exist) {
        return prev.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item);
      }
      return [...prev, {...product, quantity: 1}];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <h2>RetailerReef</h2>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#products">Products</a>
          <a href="#cart">Cart ({cart.length})</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero">
        <h1>High-Quality Household Items</h1>
        <p>Affordable prices. Durable products. Trusted quality.</p>
      </header>

      {/* Products */}
      <section id="products" className="products-grid">
        {PRODUCTS.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </section>

      {/* Cart */}
      <section id="cart" className="cart-section">
        <h2>Cart Items ({cart.length})</h2>
        {cart.length === 0 ? <p>Your cart is empty.</p> :
          <>
            <ul>
              {cart.map(item => (
                <li key={item.id}>
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </li>
              ))}
            </ul>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
          </>
        }
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <h2>Contact Us</h2>
        <p>Email: <a href="mailto:contact@retailerreef.com">contact@retailerreef.com</a></p>
      </section>

      {/* Footer */}
      <footer>
        © 2025 RetailerReef. All rights reserved.
      </footer>
    </div>
  );
}
