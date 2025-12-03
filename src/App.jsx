import React, { useState, useMemo } from 'react';
import { ShoppingCart, Search, Menu, X, Plus, Minus, Trash2, Mail, Phone, MapPin, Star, Filter, Home, Package, Shield, Truck } from 'lucide-react';

const RetailerReef = () => {
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const products = [
    { id: 1, name: "Premium Stainless Steel Cookware Set", category: "kitchen", price: 89.99, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80", rating: 4.8, reviews: 234 },
    { id: 2, name: "Organic Cotton Bedding Set", category: "bedroom", price: 129.99, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&q=80", rating: 4.9, reviews: 189 },
    { id: 3, name: "Modern LED Desk Lamp", category: "decor", price: 45.99, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80", rating: 4.6, reviews: 156 },
    { id: 4, name: "Eco-Friendly Cleaning Kit", category: "cleaning", price: 34.99, image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=500&q=80", rating: 4.7, reviews: 298 },
    { id: 5, name: "Ceramic Dinnerware Set 16-Piece", category: "kitchen", price: 79.99, image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&q=80", rating: 4.8, reviews: 412 },
    { id: 6, name: "Memory Foam Bath Mat", category: "bathroom", price: 28.99, image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=500&q=80", rating: 4.5, reviews: 167 },
    { id: 7, name: "Bamboo Kitchen Utensil Set", category: "kitchen", price: 24.99, image: "https://images.unsplash.com/photo-1565183928294-7d22f1653f8a?w=500&q=80", rating: 4.7, reviews: 289 },
    { id: 8, name: "Luxury Bath Towel Set", category: "bathroom", price: 54.99, image: "https://images.unsplash.com/photo-1600096194735-ec70730f2b3a?w=500&q=80", rating: 4.9, reviews: 356 },
    { id: 9, name: "Glass Food Storage Containers", category: "kitchen", price: 39.99, image: "https://images.unsplash.com/photo-1584990347449-27080773f0b3?w=500&q=80", rating: 4.6, reviews: 201 },
    { id: 10, name: "Decorative Throw Pillows Set", category: "decor", price: 42.99, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80", rating: 4.4, reviews: 178 },
    { id: 11, name: "Stainless Steel Trash Can", category: "cleaning", price: 67.99, image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&q=80", rating: 4.7, reviews: 145 },
    { id: 12, name: "Electric Coffee Maker", category: "kitchen", price: 89.99, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&q=80", rating: 4.8, reviews: 523 },
    { id: 13, name: "Wall-Mounted Coat Rack", category: "decor", price: 32.99, image: "https://images.unsplash.com/photo-1595428773977-4ae8b33a261b?w=500&q=80", rating: 4.5, reviews: 98 },
    { id: 14, name: "Shower Curtain with Hooks", category: "bathroom", price: 26.99, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80", rating: 4.6, reviews: 267 },
    { id: 15, name: "Knife Block Set", category: "kitchen", price: 119.99, image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500&q=80", rating: 4.9, reviews: 445 },
    { id: 16, name: "Area Rug Modern Design", category: "decor", price: 149.99, image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=500&q=80", rating: 4.7, reviews: 189 },
    { id: 17, name: "Laundry Hamper with Lid", category: "cleaning", price: 38.99, image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&q=80", rating: 4.5, reviews: 134 },
    { id: 18, name: "Non-Stick Baking Sheet Set", category: "kitchen", price: 29.99, image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=500&q=80", rating: 4.8, reviews: 312 },
    { id: 19, name: "Bathroom Organizer Set", category: "bathroom", price: 44.99, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80", rating: 4.6, reviews: 223 },
    { id: 20, name: "Table Lamp with Shade", category: "decor", price: 56.99, image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&q=80", rating: 4.7, reviews: 176 },
    { id: 21, name: "Vacuum Storage Bags", category: "cleaning", price: 22.99, image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=80", rating: 4.4, reviews: 267 },
    { id: 22, name: "Cutting Board Set Bamboo", category: "kitchen", price: 34.99, image: "https://images.unsplash.com/photo-1565183928294-7d22f1653f8a?w=500&q=80", rating: 4.8, reviews: 398 },
    { id: 23, name: "Decorative Wall Mirror", category: "decor", price: 79.99, image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&q=80", rating: 4.6, reviews: 145 },
    { id: 24, name: "Soap Dispenser Set", category: "bathroom", price: 31.99, image: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=500&q=80", rating: 4.5, reviews: 189 },
    { id: 25, name: "Mixing Bowl Set", category: "kitchen", price: 42.99, image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&q=80", rating: 4.7, reviews: 276 },
    { id: 26, name: "Microfiber Cleaning Cloths", category: "cleaning", price: 18.99, image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=500&q=80", rating: 4.8, reviews: 534 },
    { id: 27, name: "Candle Holder Set", category: "decor", price: 36.99, image: "https://images.unsplash.com/photo-1602874801006-95415c52462b?w=500&q=80", rating: 4.6, reviews: 198 },
    { id: 28, name: "Shower Caddy Organizer", category: "bathroom", price: 27.99, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80", rating: 4.7, reviews: 245 }
  ];

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'kitchen', name: 'Kitchen', count: products.filter(p => p.category === 'kitchen').length },
    { id: 'bathroom', name: 'Bathroom', count: products.filter(p => p.category === 'bathroom').length },
    { id: 'bedroom', name: 'Bedroom', count: products.filter(p => p.category === 'bedroom').length },
    { id: 'decor', name: 'Home Decor', count: products.filter(p => p.category === 'decor').length },
    { id: 'cleaning', name: 'Cleaning', count: products.filter(p => p.category === 'cleaning').length }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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
    alert('Thank you for contacting us! We will get back to you soon.');
    setContactForm({ name: '', email: '', message: '' });
  };

  const HomePage = () => (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl overflow-hidden">
        <div className="px-8 py-20 md:py-32 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to RetailerReef</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">Your trusted destination for premium household essentials. High-quality products, exceptional value, and customer satisfaction guaranteed.</p>
          <button 
            onClick={() => setCurrentPage('products')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
          >
            Shop Now
          </button>
        </div>
        <div className="absolute inset-0 bg-black opacity-10"></div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-4 gap-8">
        <div className="text-center p-6">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="text-blue-600" size={32} />
          </div>
          <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
          <p className="text-gray-600">On orders over $50</p>
        </div>
        <div className="text-center p-6">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="text-green-600" size={32} />
          </div>
          <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
          <p className="text-gray-600">100% secure transactions</p>
        </div>
        <div className="text-center p-6">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="text-purple-600" size={32} />
          </div>
          <h3 className="font-semibold text-lg mb-2">Easy Returns</h3>
          <p className="text-gray-600">30-day return policy</p>
        </div>
        <div className="text-center p-6">
          <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="text-orange-600" size={32} />
          </div>
          <h3 className="font-semibold text-lg mb-2">Best Quality</h3>
          <p className="text-gray-600">Premium products only</p>
        </div>
      </div>

      {/* Featured Products */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Premium Collection</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover high-quality household essentials carefully selected for your home. Every product is tested for durability, functionality, and style.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group">
              <div className="relative overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-110 transition duration-300" />
                <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {product.rating} ★
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 h-12 line-clamp-2">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-600">${product.price}</span>
                  <button onClick={() => addToCart(product)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-1">
                    <Plus size={16} />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Why Choose RetailerReef?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
            <p className="text-gray-600">We source only the highest quality household items from trusted manufacturers worldwide. Every product meets our strict quality standards.</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">Unbeatable Value</h3>
            <p className="text-gray-600">Competitive pricing without compromising on quality. Get premium products at prices that fit your budget. Save more on everyday essentials.</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">Customer Satisfaction</h3>
            <p className="text-gray-600">Your happiness is our priority. Excellent customer service, easy returns, and 100% satisfaction guarantee on every purchase.</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-gray-700 text-lg font-medium mb-4">
            "Quality you can trust, prices you'll love, service that exceeds expectations."
          </p>
          <div className="flex justify-center gap-4 flex-wrap text-sm text-gray-600">
            <span>✓ Verified Quality Products</span>
            <span>✓ Fast & Free Shipping</span>
            <span>✓ Secure Checkout</span>
            <span>✓ 24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductsPage = () => (
    <div>
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>
      
      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group">
            <div className="relative overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-56 object-cover group-hover:scale-110 transition duration-300" 
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2 h-12 line-clamp-2">{product.name}</h3>
              <div className="flex items-center mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-xl">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );

  const ContactPage = () => (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Mail className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <a href="mailto:contact@retailerreef.com" className="text-blue-600 hover:underline">
                  contact@retailerreef.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Phone className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <MapPin className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Address</h3>
                <p className="text-gray-600">123 Retail Street<br />Commerce City, RC 12345</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 p-6 rounded-xl">
            <h3 className="font-semibold text-lg mb-2">Customer Support Hours</h3>
            <p className="text-gray-700">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-gray-700">Saturday: 10:00 AM - 4:00 PM</p>
            <p className="text-gray-700">Sunday: Closed</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                required
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                required
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                required
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 
                className="text-2xl font-bold text-blue-600 cursor-pointer"
                onClick={() => setCurrentPage('home')}
              >
                RetailerReef
              </h1>
              
              <nav className="hidden md:flex gap-6">
                <button
                  onClick={() => setCurrentPage('home')}
                  className={`font-medium ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  Home
                </button>
                <button
                  onClick={() => setCurrentPage('products')}
                  className={`font-medium ${currentPage === 'products' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  Products
                </button>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className={`font-medium ${currentPage === 'contact' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  Contact
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ShoppingCart size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-2">
              <button
                onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              >
                Home
              </button>
              <button
                onClick={() => { setCurrentPage('products'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              >
                Products
              </button>
              <button
                onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              >
                Contact
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setCartOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Shopping Cart</h2>
                <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-100 rounded">
                  <X size={24} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 bg-gray-50 p-4 rounded-lg">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                          <p className="text-blue-600 font-bold">${item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              <Plus size={16} />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">Subtotal:</span>
                      <span className="font-bold">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Shipping:</span>
                      <span>{cartTotal > 50 ? 'FREE' : '$9.99'}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold pt-2 border-t">
                      <span>Total:</span>
                      <span className="text-blue-600">${(cartTotal + (cartTotal > 50 ? 0 : 9.99)).toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mt-4">
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'products' && <ProductsPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">RetailerReef</h3>
              <p className="text-gray-400">Your trusted destination for premium household essentials.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => setCurrentPage('home')} className="hover:text-white">Home</button></li>
                <li><button onClick={() => setCurrentPage('products')} className="hover:text-white">Products</button></li>
                <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>contact@retailerreef.com</li>
                <li>+1 (555) 123-4567</li>
                <li>Mon-Fri: 9AM - 6PM</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RetailerReef. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RetailerReef;