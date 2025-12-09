import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Plus, Minus, Trash2, Mail, Phone, MapPin, Star, ChevronRight, Award, Shield, Truck, ArrowUp } from 'lucide-react';

const RetailerReef = () => {
  const [cart, setCart] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  // FIXED & RELIABLE PRODUCT DATA (Organized by Category)
  const products = [
    // KITCHEN
    { id: 1, name: "Pro Stainless Cookware Set", category: "kitchen", price: 189.99, image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=600&q=80", rating: 4.9, reviews: 234, badge: "Best Seller" },
    { id: 2, name: "Ceramic Dinnerware Set", category: "kitchen", price: 79.99, image: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=600&q=80", rating: 4.8, reviews: 412 },
    { id: 3, name: "Bamboo Utensil Set", category: "kitchen", price: 24.99, image: "https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=600&q=80", rating: 4.7, reviews: 289 },
    { id: 4, name: "Glass Storage Jars", category: "kitchen", price: 39.99, image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&q=80", rating: 4.6, reviews: 201 },
    { id: 5, name: "Espresso Machine", category: "kitchen", price: 129.99, image: "https://images.unsplash.com/photo-1520981825232-ece5fae45120?w=600&q=80", rating: 4.8, reviews: 523, badge: "Trending" },
    { id: 6, name: "Professional Knife Block", category: "kitchen", price: 119.99, image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&q=80", rating: 4.9, reviews: 445 },
    
    // BEDROOM
    { id: 7, name: "Organic Cotton Sheets", category: "bedroom", price: 89.99, image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80", rating: 4.9, reviews: 189, badge: "Premium" },
    { id: 8, name: "Plush Fleece Blanket", category: "bedroom", price: 45.99, image: "https://images.unsplash.com/photo-1580301762395-9c64265e9674?w=600&q=80", rating: 4.8, reviews: 156 },
    { id: 9, name: "Memory Foam Pillow", category: "bedroom", price: 34.99, image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=600&q=80", rating: 4.7, reviews: 298 },
    { id: 10, name: "Bedside Nightstand Lamp", category: "bedroom", price: 54.99, image: "https://images.unsplash.com/photo-1507473888900-52e1ad145986?w=600&q=80", rating: 4.6, reviews: 167 },
    
    // BATHROOM
    { id: 11, name: "Luxury Bath Towel Set", category: "bathroom", price: 54.99, image: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=600&q=80", rating: 4.9, reviews: 356 },
    { id: 12, name: "Bamboo Bath Mat", category: "bathroom", price: 28.99, image: "https://images.unsplash.com/photo-1605619141774-633b45a0b59b?w=600&q=80", rating: 4.5, reviews: 167 },
    { id: 13, name: "Marble Soap Dispenser", category: "bathroom", price: 31.99, image: "https://images.unsplash.com/photo-1585779034823-7e9ac48abd9e?w=600&q=80", rating: 4.5, reviews: 189 },
    { id: 14, name: "Shower Caddy Organizer", category: "bathroom", price: 27.99, image: "https://images.unsplash.com/photo-1555096462-c1c5eb4e4dce?w=600&q=80", rating: 4.7, reviews: 245 },

    // DECOR
    { id: 15, name: "Minimalist Wall Clock", category: "decor", price: 42.99, image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&q=80", rating: 4.4, reviews: 178 },
    { id: 16, name: "Geometric Vase Set", category: "decor", price: 36.99, image: "https://images.unsplash.com/photo-1581783342308-f792ca11dfdd?w=600&q=80", rating: 4.6, reviews: 198 },
    { id: 17, name: "Decorative Wall Mirror", category: "decor", price: 79.99, image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80", rating: 4.6, reviews: 145 },
    { id: 18, name: "Modern Area Rug", category: "decor", price: 149.99, image: "https://images.unsplash.com/photo-1575414003502-c424b94c34a2?w=600&q=80", rating: 4.7, reviews: 189, badge: "New" },

    // CLEANING
    { id: 19, name: "Eco Cleaning Kit", category: "cleaning", price: 34.99, image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80", rating: 4.7, reviews: 298 },
    { id: 20, name: "Microfiber Cloths", category: "cleaning", price: 18.99, image: "https://images.unsplash.com/photo-1585833895995-1c5c179c3cb6?w=600&q=80", rating: 4.8, reviews: 534 },
    { id: 21, name: "Stainless Trash Can", category: "cleaning", price: 67.99, image: "https://images.unsplash.com/photo-1594306352932-d81a98083812?w=600&q=80", rating: 4.7, reviews: 145 },
    { id: 22, name: "Laundry Hamper", category: "cleaning", price: 38.99, image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80", rating: 4.5, reviews: 134 }
  ];

  const categories = [
    { id: 'kitchen', name: 'Kitchen', icon: '🍳', subtitle: 'Cookware & Dining' },
    { id: 'bedroom', name: 'Bedroom', icon: '🛏️', subtitle: 'Bedding & Comfort' },
    { id: 'bathroom', name: 'Bathroom', icon: '🛁', subtitle: 'Bath & Spa' },
    { id: 'decor', name: 'Home Decor', icon: '🎨', subtitle: 'Style & Accents' },
    { id: 'cleaning', name: 'Cleaning', icon: '🧹', subtitle: 'Organization & Care' }
  ];

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for fixed header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! We will contact you soon.');
    setContactForm({ name: '', email: '', message: '' });
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group">
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=600&q=80'}}
        />
        {product.badge && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-md">
            {product.badge}
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">{product.category}</div>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm md:text-base">{product.name}</h3>
        <div className="flex items-center gap-1 mb-auto">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-sm"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* --- NAVBAR --- */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 
              className="text-2xl font-black tracking-tighter text-gray-900 cursor-pointer flex items-center gap-2"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-lg">R</span>
              RetailerReef
            </h1>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id)}
                  className="text-sm font-semibold text-gray-600 hover:text-blue-600 capitalize transition-colors"
                >
                  {cat.name}
                </button>
              ))}
              <button onClick={() => scrollToSection('contact')} className="text-sm font-semibold text-gray-600 hover:text-blue-600 capitalize transition-colors">
                Contact
              </button>
            </nav>

            {/* Cart & Mobile Menu */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ShoppingCart size={24} className="text-gray-700" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-700"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Nav Dropdown */}
          {mobileMenuOpen && (
            <nav className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl py-2 px-4 flex flex-col animate-fade-in">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id)}
                  className="w-full text-left px-4 py-3 border-b border-gray-50 text-gray-700 font-medium"
                >
                  {cat.name}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full text-left px-4 py-3 text-gray-700 font-medium"
              >
                Contact Us
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* --- HERO --- */}
      <section className="relative bg-gray-900 text-white h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80" 
            alt="Interior" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Premium Essentials for <br/><span className="text-blue-400">Modern Living</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Upgrade your home with our curated collection of kitchenware, bedding, and decor.
          </p>
          <button 
            onClick={() => scrollToSection('kitchen')}
            className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
          >
            Start Exploring
          </button>
        </div>
      </section>

      {/* --- FEATURES STRIP --- */}
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, title: "Free Shipping", sub: "Orders over $50" },
            { icon: Shield, title: "Secure Payment", sub: "100% Protected" },
            { icon: Award, title: "Top Quality", sub: "Certified Items" },
            { icon: ChevronRight, title: "Easy Returns", sub: "30-Day Policy" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-center md:justify-start gap-3 p-2">
              <div className="bg-blue-50 p-2 rounded-full text-blue-600"><item.icon size={20} /></div>
              <div>
                <p className="font-bold text-sm text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12 space-y-20">
        
        {/* --- CATEGORY SECTIONS LOOP --- */}
        {categories.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-24">
            <div className="flex items-end justify-between mb-8 border-b border-gray-200 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{category.icon}</span>
                  <h2 className="text-3xl font-bold text-gray-900 capitalize">{category.name}</h2>
                </div>
                <p className="text-gray-500">{category.subtitle}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products
                .filter(p => p.category === category.id)
                .map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </section>
        ))}

        {/* --- CONTACT SECTION --- */}
        <section id="contact" className="scroll-mt-24 pt-12">
          <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">
            <div className="p-10 md:p-16 flex flex-col justify-center text-white">
              <h2 className="text-3xl font-bold mb-6">Need Help?</h2>
              <p className="text-gray-400 mb-8">
                Our support team is available 24/7 to assist you with any questions or orders.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="text-blue-400" /> 
                  <div><p className="text-xs text-gray-400">Email</p><p className="font-semibold">contact@retailerreef.com</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-green-400" />
                  <div><p className="text-xs text-gray-400">Phone</p><p className="font-semibold">+1 (555) 123-4567</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="text-purple-400" />
                  <div><p className="text-xs text-gray-400">Location</p><p className="font-semibold">Commerce City, USA</p></div>
                </div>
              </div>
            </div>
            <div className="bg-white p-10 md:p-16">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Send us a message</h3>
                <input
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="Your Name"
                  required
                  value={contactForm.name}
                  onChange={e => setContactForm({...contactForm, name: e.target.value})}
                />
                <input
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="Your Email"
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={e => setContactForm({...contactForm, email: e.target.value})}
                />
                <textarea
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
                  placeholder="Message"
                  rows="3"
                  required
                  value={contactForm.message}
                  onChange={e => setContactForm({...contactForm, message: e.target.value})}
                ></textarea>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-12 text-center">
        <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center justify-center gap-2">
           <span className="text-blue-600">R</span> RetailerReef
        </h2>
        <p className="text-gray-500 text-sm mb-6">&copy; 2024 RetailerReef. All rights reserved.</p>
        <div className="flex justify-center gap-6 text-gray-400">
          <button className="hover:text-blue-600">Privacy Policy</button>
          <button className="hover:text-blue-600">Terms of Service</button>
          <button className="hover:text-blue-600">Shipping Info</button>
        </div>
      </footer>

      {/* --- CART SLIDE-OVER --- */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100] flex justify-end" onClick={() => setCartOpen(false)}>
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Your Cart ({cartItemCount})</h2>
              <button onClick={() => setCartOpen(false)}><X /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                 <div className="text-center text-gray-500 mt-10">Cart is empty</div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 border-b pb-4">
                    <img src={item.image} className="w-20 h-20 object-cover rounded-lg bg-gray-100" alt={item.name} />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{item.name}</h3>
                      <p className="text-blue-600 font-bold">${item.price}</p>
                      <div className="flex items-center gap-3 mt-2">
                         <button onClick={() => updateQuantity(item.id, -1)} className="p-1 bg-gray-100 rounded"><Minus size={14} /></button>
                         <span className="text-sm font-medium">{item.quantity}</span>
                         <button onClick={() => updateQuantity(item.id, 1)} className="p-1 bg-gray-100 rounded"><Plus size={14} /></button>
                         <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-500"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-5 border-t bg-gray-50">
                <div className="flex justify-between mb-4 font-bold text-lg">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold">Checkout</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RetailerReef;