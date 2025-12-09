import React, { useState, useMemo } from 'react';
import { ShoppingCart, Search, Menu, X, Plus, Minus, Trash2, Mail, Phone, MapPin, Star, ChevronRight, Award, Shield, Truck } from 'lucide-react';

const RetailerReef = () => {
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  // REALISTIC HOUSEHOLD DATA
  const products = [
    { id: 1, name: "Premium Stainless Steel Cookware Set", category: "kitchen", price: 189.99, image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=400&q=80", rating: 4.8, reviews: 234, badge: "Trending" },
    { id: 2, name: "Organic Cotton Bedding Set", category: "bedroom", price: 129.99, image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=400&q=80", rating: 4.9, reviews: 189 },
    { id: 3, name: "Modern LED Desk Lamp", category: "decor", price: 45.99, image: "https://images.unsplash.com/photo-1534073828943-f801091a7d58?auto=format&fit=crop&w=400&q=80", rating: 4.6, reviews: 156 },
    { id: 4, name: "Eco-Friendly Cleaning Kit", category: "cleaning", price: 34.99, image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=400&q=80", rating: 4.7, reviews: 298 },
    { id: 5, name: "Ceramic Dinnerware Set", category: "kitchen", price: 79.99, image: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&w=400&q=80", rating: 4.8, reviews: 412, badge: "Popular" },
    { id: 6, name: "Memory Foam Bath Mat", category: "bathroom", price: 28.99, image: "https://images.unsplash.com/photo-1605619141774-633b45a0b59b?auto=format&fit=crop&w=400&q=80", rating: 4.5, reviews: 167 },
    { id: 7, name: "Bamboo Kitchen Utensils", category: "kitchen", price: 24.99, image: "https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?auto=format&fit=crop&w=400&q=80", rating: 4.7, reviews: 289 },
    { id: 8, name: "Luxury Bath Towel Set", category: "bathroom", price: 54.99, image: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=400&q=80", rating: 4.9, reviews: 356, badge: "Premium" },
    { id: 9, name: "Glass Storage Containers", category: "kitchen", price: 39.99, image: "https://images.unsplash.com/photo-1612681621979-5668293e4496?auto=format&fit=crop&w=400&q=80", rating: 4.6, reviews: 201 },
    { id: 10, name: "Decorative Throw Pillows", category: "decor", price: 42.99, image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?auto=format&fit=crop&w=400&q=80", rating: 4.4, reviews: 178 },
    { id: 11, name: "Stainless Steel Trash Can", category: "cleaning", price: 67.99, image: "https://images.unsplash.com/photo-1594306352932-d81a98083812?auto=format&fit=crop&w=400&q=80", rating: 4.7, reviews: 145 },
    { id: 12, name: "Electric Coffee Maker", category: "kitchen", price: 89.99, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80", rating: 4.8, reviews: 523, badge: "Best Seller" },
    { id: 13, name: "Wall Mounted Coat Rack", category: "decor", price: 32.99, image: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=400&q=80", rating: 4.5, reviews: 98 },
    { id: 14, name: "Shower Curtain Set", category: "bathroom", price: 26.99, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80", rating: 4.6, reviews: 267 },
    { id: 15, name: "Professional Knife Set", category: "kitchen", price: 119.99, image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=400&q=80", rating: 4.9, reviews: 445 },
    { id: 16, name: "Modern Area Rug", category: "decor", price: 149.99, image: "https://images.unsplash.com/photo-1575414003502-c424b94c34a2?auto=format&fit=crop&w=400&q=80", rating: 4.7, reviews: 189 },
    { id: 17, name: "Laundry Hamper", category: "cleaning", price: 38.99, image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=400&q=80", rating: 4.5, reviews: 134 },
    { id: 18, name: "Non-Stick Baking Set", category: "kitchen", price: 29.99, image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=400&q=80", rating: 4.8, reviews: 312 },
    { id: 19, name: "Bathroom Organizer", category: "bathroom", price: 44.99, image: "https://images.unsplash.com/photo-1633505367807-6c23ae671f54?auto=format&fit=crop&w=400&q=80", rating: 4.6, reviews: 223 },
    { id: 20, name: "Designer Table Lamp", category: "decor", price: 56.99, image: "https://images.unsplash.com/photo-1507473888900-52e1ad145986?auto=format&fit=crop&w=400&q=80", rating: 4.7, reviews: 176 },
    { id: 21, name: "Vacuum Storage Bags", category: "cleaning", price: 22.99, image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80", rating: 4.4, reviews: 267 },
    { id: 22, name: "Bamboo Cutting Boards", category: "kitchen", price: 34.99, image: "https://images.unsplash.com/photo-1582236967069-b3a62057929c?auto=format&fit=crop&w=400&q=80", rating: 4.8, reviews: 398 },
    { id: 23, name: "Decorative Wall Mirror", category: "decor", price: 79.99, image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=400&q=80", rating: 4.6, reviews: 145 },
    { id: 24, name: "Soap Dispenser Set", category: "bathroom", price: 31.99, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80", rating: 4.5, reviews: 189 },
    { id: 25, name: "Stainless Mixing Bowls", category: "kitchen", price: 42.99, image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=400&q=80", rating: 4.7, reviews: 276 },
    { id: 26, name: "Microfiber Cleaning Set", category: "cleaning", price: 18.99, image: "https://images.unsplash.com/photo-1585833895995-1c5c179c3cb6?auto=format&fit=crop&w=400&q=80", rating: 4.8, reviews: 534 },
    { id: 27, name: "Elegant Candle Holders", category: "decor", price: 36.99, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=400&q=80", rating: 4.6, reviews: 198 },
    { id: 28, name: "Shower Caddy Premium", category: "bathroom", price: 27.99, image: "https://images.unsplash.com/photo-1555096462-c1c5eb4e4dce?auto=format&fit=crop&w=400&q=80", rating: 4.7, reviews: 245 }
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

  const HomePage = () => (
    <div className="space-y-12 md:space-y-16 animate-fade-in">
      <div className="relative bg-gray-900 text-white rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1600&q=80" 
            alt="Hero" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 px-6 md:px-12 py-16 md:py-32 text-center md:text-left">
          <h1 className="text-3xl md:text-6xl font-extrabold mb-4 leading-tight">
            Elevate Your <br className="hidden md:block"/>Everyday Living
          </h1>
          <p className="text-gray-200 text-base md:text-xl mb-8 max-w-xl mx-auto md:mx-0">
            Discover our curated collection of premium household essentials. From chef-grade cookware to luxury linens.
          </p>
          <button 
            onClick={() => setCurrentPage('products')}
            className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition transform hover:scale-105 shadow-lg"
          >
            Shop Collection
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Truck, title: "Free Shipping", sub: "On orders over $50", color: "text-blue-600", bg: "bg-blue-50" },
          { icon: Shield, title: "Secure Payment", sub: "100% Protected", color: "text-green-600", bg: "bg-green-50" },
          { icon: Award, title: "Premium Quality", sub: "Certified Products", color: "text-purple-600", bg: "bg-purple-50" },
          { icon: ChevronRight, title: "Easy Returns", sub: "30-Day Guarantee", color: "text-orange-600", bg: "bg-orange-50" }
        ].map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className={`${item.bg} w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3`}>
              <item.icon className={item.color} size={24} />
            </div>
            <h3 className="font-bold text-gray-900 text-sm md:text-base">{item.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{item.sub}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setCurrentPage('products'); }}
              className="group bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
              <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">{cat.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-end mb-8 px-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-500 text-sm mt-1">Handpicked for your home</p>
          </div>
          <button 
             onClick={() => setCurrentPage('products')}
             className="text-blue-600 font-semibold text-sm hover:underline"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );

  const ProductsPage = () => (
    <div className="animate-fade-in">
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Our Collection</h1>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-5 py-3 rounded-xl font-medium transition-all text-sm ${
                  selectedCategory === cat.id
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
    </div>
  );

  const ContactPage = () => (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center text-gray-900">Get in Touch</h1>
      <p className="text-center text-gray-500 mb-10">We'd love to hear from you. Here's how you can reach us.</p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-blue-50 p-3 rounded-xl">
                <Mail className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Email Support</h3>
                <p className="text-gray-500 text-sm mb-2">Our team is here to help.</p>
                <a href="mailto:contact@retailerreef.com" className="text-blue-600 font-semibold hover:underline">
                  contact@retailerreef.com
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-green-50 p-3 rounded-xl">
                <Phone className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                <p className="text-gray-500 text-sm mb-2">Mon-Fri from 8am to 5pm.</p>
                <p className="font-semibold text-gray-900">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-purple-50 p-3 rounded-xl">
                <MapPin className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Office</h3>
                <p className="text-gray-500 text-sm">
                  123 Retail Street<br />Commerce City, RC 12345
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-xl font-bold mb-6 text-gray-900">Send us a Message</h2>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                required
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                required
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                rows="4"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transform hover:scale-[1.02] transition-all shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 
              className="text-xl md:text-2xl font-black tracking-tight text-gray-900 cursor-pointer flex items-center gap-2"
              onClick={() => setCurrentPage('home')}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">R</div>
              RetailerReef
            </h1>
            
            <nav className="hidden md:flex items-center bg-gray-100 rounded-full p-1">
              {['home', 'products', 'contact'].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                    currentPage === page ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                  } capitalize`}
                >
                  {page}
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
              {['home', 'products', 'contact'].map((page) => (
                <button
                  key={page}
                  onClick={() => { setCurrentPage(page); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium capitalize ${
                    currentPage === page ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                  }`}
                >
                  {page}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {cartOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity" onClick={() => setCartOpen(false)}>
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
                    onClick={() => setCartOpen(false)}
                    className="mt-4 text-blue-600 font-semibold hover:underline"
                  >
                    Continue Shopping
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

      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'products' && <ProductsPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      <footer className="bg-white border-t border-gray-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs">R</div>
                RetailerReef
              </h3>
              <p className="text-gray-500 leading-relaxed mb-6">
                Premium household essentials designed to elevate your everyday living. Quality, style, and comfort delivered to your door.
              </p>
              <div className="flex gap-4">
                {/* Social placeholders */}
                <div className="w-8 h-8 bg-gray-100 rounded-full hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"></div>
                <div className="w-8 h-8 bg-gray-100 rounded-full hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"></div>
                <div className="w-8 h-8 bg-gray-100 rounded-full hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Quick Links</h4>
              <ul className="space-y-4 text-gray-500">
                <li><button onClick={() => setCurrentPage('home')} className="hover:text-blue-600 transition-colors">Home</button></li>
                <li><button onClick={() => setCurrentPage('products')} className="hover:text-blue-600 transition-colors">Shop All</button></li>
                <li><button onClick={() => setCurrentPage('contact')} className="hover:text-blue-600 transition-colors">Contact Us</button></li>
                <li><button className="hover:text-blue-600 transition-colors">Track Order</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Customer Care</h4>
              <ul className="space-y-4 text-gray-500">
                <li><button className="hover:text-blue-600 transition-colors">Shipping Policy</button></li>
                <li><button className="hover:text-blue-600 transition-colors">Returns & Refunds</button></li>
                <li><button className="hover:text-blue-600 transition-colors">FAQ</button></li>
                <li><button className="hover:text-blue-600 transition-colors">Terms of Service</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Contact Info</h4>
              <ul className="space-y-4 text-gray-500">
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-blue-600" />
                  contact@retailerreef.com
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-green-600" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={16} className="text-purple-600" />
                  123 Retail Street, Commerce City
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-16 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 RetailerReef. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RetailerReef;