import React, { useState, useMemo } from 'react';
import { ShoppingCart, Search, Menu, X, Plus, Minus, Trash2, Mail, Phone, MapPin, Star, ChevronRight, Award, Shield, Truck } from 'lucide-react';

const RetailerReef = () => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  // FIXED REALISTIC HOUSEHOLD IMAGES
  const products = [
    { id: 1, name: "Premium Stainless Cookware Set", category: "kitchen", price: 189.99, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80", rating: 4.8, reviews: 234, badge: "Trending" },
    { id: 2, name: "Organic Cotton Bedding", category: "bedroom", price: 129.99, image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=500&q=80", rating: 4.9, reviews: 189 },
    { id: 3, name: "Modern LED Desk Lamp", category: "decor", price: 45.99, image: "https://images.unsplash.com/photo-1507473888900-52e1ad145986?w=500&q=80", rating: 4.6, reviews: 156 },
    { id: 4, name: "Eco-Friendly Cleaning Kit", category: "cleaning", price: 34.99, image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=500&q=80", rating: 4.7, reviews: 298 },
    { id: 5, name: "Ceramic Dinnerware Set", category: "kitchen", price: 79.99, image: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=500&q=80", rating: 4.8, reviews: 412, badge: "Popular" },
    { id: 6, name: "Memory Foam Bath Mat", category: "bathroom", price: 28.99, image: "https://images.unsplash.com/photo-1576426863863-10d786a2991b?w=500&q=80", rating: 4.5, reviews: 167 },
    { id: 7, name: "Bamboo Kitchen Utensils", category: "kitchen", price: 24.99, image: "https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=500&q=80", rating: 4.7, reviews: 289 },
    { id: 8, name: "Luxury Bath Towel Set", category: "bathroom", price: 54.99, image: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=500&q=80", rating: 4.9, reviews: 356, badge: "Premium" },
    { id: 9, name: "Glass Storage Containers", category: "kitchen", price: 39.99, image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&q=80", rating: 4.6, reviews: 201 },
    { id: 10, name: "Decorative Throw Pillows", category: "decor", price: 42.99, image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=500&q=80", rating: 4.4, reviews: 178 },
    { id: 11, name: "Stainless Steel Trash Can", category: "cleaning", price: 67.99, image: "https://images.unsplash.com/photo-1594306352932-d81a98083812?w=500&q=80", rating: 4.7, reviews: 145 },
    { id: 12, name: "Electric Coffee Maker", category: "kitchen", price: 89.99, image: "https://images.unsplash.com/photo-1520981825232-ece5fae45120?w=500&q=80", rating: 4.8, reviews: 523, badge: "Best Seller" },
    { id: 13, name: "Wall Mounted Coat Rack", category: "decor", price: 32.99, image: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?w=500&q=80", rating: 4.5, reviews: 98 },
    { id: 14, name: "Shower Curtain Set", category: "bathroom", price: 26.99, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80", rating: 4.6, reviews: 267 },
    { id: 15, name: "Professional Knife Set", category: "kitchen", price: 119.99, image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500&q=80", rating: 4.9, reviews: 445 },
    { id: 16, name: "Modern Area Rug", category: "decor", price: 149.99, image: "https://images.unsplash.com/photo-1575414003502-c424b94c34a2?w=500&q=80", rating: 4.7, reviews: 189 },
    { id: 17, name: "Laundry Hamper", category: "cleaning", price: 38.99, image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500&q=80", rating: 4.5, reviews: 134 },
    { id: 18, name: "Non-Stick Baking Set", category: "kitchen", price: 29.99, image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=500&q=80", rating: 4.8, reviews: 312 },
    { id: 19, name: "Bathroom Organizer", category: "bathroom", price: 44.99, image: "https://images.unsplash.com/photo-1633505367807-6c23ae671f54?w=500&q=80", rating: 4.6, reviews: 223 },
    { id: 20, name: "Designer Table Lamp", category: "decor", price: 56.99, image: "https://images.unsplash.com/photo-1513506003013-19c6cd0868cb?w=500&q=80", rating: 4.7, reviews: 176 },
    { id: 21, name: "Vacuum Storage Bags", category: "cleaning", price: 22.99, image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=500&q=80", rating: 4.4, reviews: 267 },
    { id: 22, name: "Bamboo Cutting Boards", category: "kitchen", price: 34.99, image: "https://images.unsplash.com/photo-1582236967069-b3a62057929c?w=500&q=80", rating: 4.8, reviews: 398 },
    { id: 23, name: "Decorative Wall Mirror", category: "decor", price: 79.99, image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&q=80", rating: 4.6, reviews: 145 },
    { id: 24, name: "Soap Dispenser Set", category: "bathroom", price: 31.99, image: "https://images.unsplash.com/photo-1585779034823-7e9ac48abd9e?w=500&q=80", rating: 4.5, reviews: 189 },
    { id: 25, name: "Stainless Mixing Bowls", category: "kitchen", price: 42.99, image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=500&q=80", rating: 4.7, reviews: 276 },
    { id: 26, name: "Microfiber Cleaning Set", category: "cleaning", price: 18.99, image: "https://images.unsplash.com/photo-1585833895995-1c5c179c3cb6?w=500&q=80", rating: 4.8, reviews: 534 },
    { id: 27, name: "Elegant Candle Holders", category: "decor", price: 36.99, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&q=80", rating: 4.6, reviews: 198 },
    { id: 28, name: "Shower Caddy Premium", category: "bathroom", price: 27.99, image: "https://images.unsplash.com/photo-1555096462-c1c5eb4e4dce?w=500&q=80", rating: 4.7, reviews: 245 }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: '🏠' },
    { id: 'kitchen', name: 'Kitchen', icon: '🍳' },
    { id: 'bathroom', name: 'Bathroom', icon: '🛁' },
    { id: 'bedroom', name: 'Bedroom', icon: '🛏️' },
    { id: 'decor', name: 'Decor', icon: '🎨' },
    { id: 'cleaning', name: 'Cleaning', icon: '🧹' }
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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="relative w-full h-48 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80'}} // Fallback image
        />
        {product.badge && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold z-10 shadow-sm">
            {product.badge}
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <div className="text-xs text-blue-600 font-bold uppercase tracking-wide mb-1">{product.category}</div>
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm md:text-base leading-snug">{product.name}</h3>
          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-gray-900 text-white p-2 rounded-full hover:bg-blue-600 transition-colors shadow-sm"
            aria-label="Add to cart"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 
              className="text-xl md:text-2xl font-black tracking-tight text-gray-900 cursor-pointer flex items-center gap-2"
              onClick={() => scrollToSection('home')}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">R</div>
              RetailerReef
            </h1>
            
            <nav className="hidden md:flex items-center gap-6">
              {['home', 'products', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-sm font-semibold text-gray-600 hover:text-blue-600 uppercase tracking-wide transition-colors"
                >
                  {section}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="relative p-3 hover:bg-gray-100 rounded-full transition-colors group"
              >
                <ShoppingCart size={22} className="text-gray-700 group-hover:text-blue-600 transition-colors" />
                {cartItemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">
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

          {mobileMenuOpen && (
            <nav className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl py-4 px-4 flex flex-col gap-2 animate-fade-in">
              {['home', 'products', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="w-full text-left px-4 py-3 rounded-xl font-medium capitalize hover:bg-gray-50 text-gray-700"
                >
                  {section}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* CART MODAL (Same as before) */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity" onClick={() => setCartOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
                <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center opacity-50">
                  <ShoppingCart size={64} className="mb-4" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <button 
                    onClick={() => {setCartOpen(false); scrollToSection('products');}}
                    className="mt-4 text-blue-600 font-semibold hover:underline"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-grow space-y-6 overflow-y-auto pr-2">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
                            <p className="text-gray-500 text-sm">${item.price}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm hover:text-blue-600"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="font-semibold text-sm w-4 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm hover:text-blue-600"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 pt-6 mt-6 space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="text-green-600 font-medium">{cartTotal > 50 ? 'FREE' : '$9.99'}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-2xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>${(cartTotal + (cartTotal > 50 ? 0 : 9.99)).toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg">
                      Checkout Now
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative bg-gray-900 text-white min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80" 
            alt="Hero" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight">
            Make Your Home <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">A Masterpiece</span>
          </h1>
          <p className="text-gray-200 text-lg md:text-2xl mb-10 max-w-2xl mx-auto">
            Discover our curated collection of premium household essentials. From chef-grade cookware to luxury linens.
          </p>
          <button 
            onClick={() => scrollToSection('products')}
            className="bg-white text-gray-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition transform hover:scale-105 shadow-xl"
          >
            Shop Collection
          </button>
        </div>
      </section>

      {/* --- FEATURES STRIP --- */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, title: "Free Shipping", sub: "On orders over $50", color: "text-blue-600", bg: "bg-blue-50" },
            { icon: Shield, title: "Secure Payment", sub: "100% Protected", color: "text-green-600", bg: "bg-green-50" },
            { icon: Award, title: "Premium Quality", sub: "Certified Products", color: "text-purple-600", bg: "bg-purple-50" },
            { icon: ChevronRight, title: "Easy Returns", sub: "30-Day Guarantee", color: "text-orange-600", bg: "bg-orange-50" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center md:flex-row md:text-left gap-4 p-4 rounded-xl hover:bg-gray-50 transition">
              <div className={`${item.bg} w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0`}>
                <item.icon className={item.color} size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm md:text-base">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-16 space-y-24">
        
        {/* --- CATEGORIES --- */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { 
                  setSelectedCategory(cat.id); 
                  scrollToSection('products'); 
                }}
                className={`group rounded-2xl p-6 text-center transition-all border ${
                  selectedCategory === cat.id 
                  ? 'bg-gray-900 text-white shadow-lg border-gray-900' 
                  : 'bg-white text-gray-700 hover:shadow-lg border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
                <p className="text-sm font-semibold">{cat.name}</p>
              </button>
            ))}
          </div>
        </section>

        {/* --- ALL PRODUCTS SECTION --- */}
        <section id="products" className="scroll-mt-24">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Our Collection</h2>
                <p className="text-gray-500 mt-1">Showing {filteredProducts.length} premium products</p>
              </div>
              
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <Search size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">No products found matching your criteria</p>
              <button 
                onClick={() => {setSearchQuery(''); setSelectedCategory('all');}}
                className="mt-4 text-blue-600 font-semibold hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>

        {/* --- CONTACT SECTION --- */}
        <section id="contact" className="scroll-mt-24">
          <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Let's Get in Touch</h2>
                <p className="text-gray-300 mb-8 text-lg">
                  Have questions about our products or your order? We're here to help you upgrade your home.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <Mail className="text-blue-400" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email us</p>
                      <p className="font-semibold">contact@retailerreef.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <Phone className="text-green-400" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Call us</p>
                      <p className="font-semibold">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <MapPin className="text-purple-400" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Visit us</p>
                      <p className="font-semibold">123 Retail Street, Commerce City</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 md:p-12 lg:p-16">
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Message</label>
                    <textarea
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      rows="4"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                      placeholder="How can we help?"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg transform active:scale-95"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm">R</div>
             RetailerReef
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">Premium household essentials designed to elevate your everyday living. Quality, style, and comfort.</p>
          <div className="border-t border-gray-800 pt-8 text-sm text-gray-500">
            &copy; 2024 RetailerReef. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RetailerReef;