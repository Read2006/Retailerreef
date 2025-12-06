import React, { useState, useMemo } from 'react';
import { ShoppingCart, Search, Menu, X, Plus, Minus, Trash2, Mail, Phone, MapPin, Star, Heart, ChevronRight, Award, Shield, Truck } from 'lucide-react';

const RetailerReef = () => {
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const products = [
    { id: 1, name: "Premium Stainless Steel Cookware Set", category: "kitchen", price: 89.99, image: "https://picsum.photos/seed/cookware/400/400", rating: 4.8, reviews: 234, badge: "Trending" },
    { id: 2, name: "Organic Cotton Bedding Set", category: "bedroom", price: 129.99, image: "https://picsum.photos/seed/bedding/400/400", rating: 4.9, reviews: 189 },
    { id: 3, name: "Modern LED Desk Lamp", category: "decor", price: 45.99, image: "https://picsum.photos/seed/lamp/400/400", rating: 4.6, reviews: 156 },
    { id: 4, name: "Eco-Friendly Cleaning Kit", category: "cleaning", price: 34.99, image: "https://picsum.photos/seed/cleaning/400/400", rating: 4.7, reviews: 298 },
    { id: 5, name: "Ceramic Dinnerware Set", category: "kitchen", price: 79.99, image: "https://picsum.photos/seed/dinnerware/400/400", rating: 4.8, reviews: 412, badge: "Popular" },
    { id: 6, name: "Memory Foam Bath Mat", category: "bathroom", price: 28.99, image: "https://picsum.photos/seed/bathmat/400/400", rating: 4.5, reviews: 167 },
    { id: 7, name: "Bamboo Kitchen Utensils", category: "kitchen", price: 24.99, image: "https://picsum.photos/seed/utensils/400/400", rating: 4.7, reviews: 289 },
    { id: 8, name: "Luxury Bath Towel Set", category: "bathroom", price: 54.99, image: "https://picsum.photos/seed/towels/400/400", rating: 4.9, reviews: 356, badge: "Premium" },
    { id: 9, name: "Glass Storage Containers", category: "kitchen", price: 39.99, image: "https://picsum.photos/seed/containers/400/400", rating: 4.6, reviews: 201 },
    { id: 10, name: "Decorative Throw Pillows", category: "decor", price: 42.99, image: "https://picsum.photos/seed/pillows/400/400", rating: 4.4, reviews: 178 },
    { id: 11, name: "Stainless Steel Trash Can", category: "cleaning", price: 67.99, image: "https://picsum.photos/seed/trash/400/400", rating: 4.7, reviews: 145 },
    { id: 12, name: "Electric Coffee Maker", category: "kitchen", price: 89.99, image: "https://picsum.photos/seed/coffee/400/400", rating: 4.8, reviews: 523, badge: "Best Seller" },
    { id: 13, name: "Wall Mounted Coat Rack", category: "decor", price: 32.99, image: "https://picsum.photos/seed/coatrack/400/400", rating: 4.5, reviews: 98 },
    { id: 14, name: "Shower Curtain Set", category: "bathroom", price: 26.99, image: "https://picsum.photos/seed/curtain/400/400", rating: 4.6, reviews: 267 },
    { id: 15, name: "Professional Knife Set", category: "kitchen", price: 119.99, image: "https://picsum.photos/seed/knives/400/400", rating: 4.9, reviews: 445 },
    { id: 16, name: "Modern Area Rug", category: "decor", price: 149.99, image: "https://picsum.photos/seed/rug/400/400", rating: 4.7, reviews: 189 },
    { id: 17, name: "Laundry Hamper", category: "cleaning", price: 38.99, image: "https://picsum.photos/seed/hamper/400/400", rating: 4.5, reviews: 134 },
    { id: 18, name: "Non-Stick Baking Set", category: "kitchen", price: 29.99, image: "https://picsum.photos/seed/baking/400/400", rating: 4.8, reviews: 312 },
    { id: 19, name: "Bathroom Organizer", category: "bathroom", price: 44.99, image: "https://picsum.photos/seed/organizer/400/400", rating: 4.6, reviews: 223 },
    { id: 20, name: "Designer Table Lamp", category: "decor", price: 56.99, image: "https://picsum.photos/seed/tablelamp/400/400", rating: 4.7, reviews: 176 },
    { id: 21, name: "Vacuum Storage Bags", category: "cleaning", price: 22.99, image: "https://picsum.photos/seed/vacuum/400/400", rating: 4.4, reviews: 267 },
    { id: 22, name: "Bamboo Cutting Boards", category: "kitchen", price: 34.99, image: "https://picsum.photos/seed/boards/400/400", rating: 4.8, reviews: 398 },
    { id: 23, name: "Decorative Wall Mirror", category: "decor", price: 79.99, image: "https://picsum.photos/seed/mirror/400/400", rating: 4.6, reviews: 145 },
    { id: 24, name: "Soap Dispenser Set", category: "bathroom", price: 31.99, image: "https://picsum.photos/seed/soap/400/400", rating: 4.5, reviews: 189 },
    { id: 25, name: "Stainless Mixing Bowls", category: "kitchen", price: 42.99, image: "https://picsum.photos/seed/bowls/400/400", rating: 4.7, reviews: 276 },
    { id: 26, name: "Microfiber Cleaning Set", category: "cleaning", price: 18.99, image: "https://picsum.photos/seed/microfiber/400/400", rating: 4.8, reviews: 534 },
    { id: 27, name: "Elegant Candle Holders", category: "decor", price: 36.99, image: "https://picsum.photos/seed/candles/400/400", rating: 4.6, reviews: 198 },
    { id: 28, name: "Shower Caddy Premium", category: "bathroom", price: 27.99, image: "https://picsum.photos/seed/caddy/400/400", rating: 4.7, reviews: 245 }
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
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <div className="relative w-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center" style={{ paddingBottom: '100%' }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div className="text-4xl md:text-6xl mb-3">
            {product.category === 'kitchen' && '🍳'}
            {product.category === 'bathroom' && '🛁'}
            {product.category === 'bedroom' && '🛏️'}
            {product.category === 'decor' && '🎨'}
            {product.category === 'cleaning' && '🧹'}
          </div>
          <p className="text-xs md:text-sm text-gray-600 text-center font-medium line-clamp-3">{product.name}</p>
        </div>
        {product.badge && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
            {product.badge}
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[40px] text-sm">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
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
        <div className="flex items-center justify-between">
          <span className="text-lg md:text-xl font-bold text-gray-900">${product.price}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-full font-medium hover:shadow-lg transition-all text-xs md:text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="space-y-12 md:space-y-16">
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white rounded-2xl md:rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 px-4 md:px-12 py-10 md:py-24">
          <h1 className="text-2xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight">
            Premium Home<br />Essentials
          </h1>
          <p className="text-sm md:text-xl mb-4 md:mb-6 text-white/90 max-w-2xl">
            Quality products for your kitchen, bathroom & home. Shop with confidence.
          </p>
          <button 
            onClick={() => setCurrentPage('products')}
            className="bg-white text-blue-600 px-6 md:px-8 py-2.5 md:py-4 rounded-full font-semibold hover:bg-gray-100 transition text-sm md:text-base"
          >
            Shop Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
            <Truck className="text-blue-600" size={20} />
          </div>
          <h3 className="font-bold text-sm mb-1">Free Shipping</h3>
          <p className="text-xs text-gray-600">Over $50</p>
        </div>
        <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
            <Shield className="text-green-600" size={20} />
          </div>
          <h3 className="font-bold text-sm mb-1">Secure</h3>
          <p className="text-xs text-gray-600">100% Safe</p>
        </div>
        <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
          <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
            <Award className="text-purple-600" size={20} />
          </div>
          <h3 className="font-bold text-sm mb-1">Quality</h3>
          <p className="text-xs text-gray-600">Premium</p>
        </div>
        <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
          <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
            <ChevronRight className="text-orange-600" size={20} />
          </div>
          <h3 className="font-bold text-sm mb-1">Returns</h3>
          <p className="text-xs text-gray-600">30 Days</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Shop by Category</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setCurrentPage('products'); }}
              className="bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-lg transition"
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <p className="text-xs md:text-sm font-semibold">{cat.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl font-bold mb-3">Featured Products</h2>
          <p className="text-gray-600 text-sm md:text-base px-4">Our most popular items</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => setCurrentPage('products')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition"
          >
            View All Products
          </button>
        </div>
      </div>
    </div>
  );

  const ProductsPage = () => (
    <div>
      <h1 className="text-2xl md:text-4xl font-bold mb-6">All Products</h1>
      
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-medium transition text-sm ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-white text-gray-700 shadow-sm'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500">No products found</p>
        </div>
      )}
    </div>
  );

  const ContactPage = () => (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-4xl font-bold mb-8 text-center">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Mail className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold mb-1">Email</h3>
                <a href="mailto:contact@retailerreef.com" className="text-blue-600">
                  contact@retailerreef.com
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <Phone className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold mb-1">Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <MapPin className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold mb-1">Address</h3>
                <p>123 Retail Street<br />Commerce City, RC 12345</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Send Message</h2>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <input
              type="text"
              required
              value={contactForm.name}
              onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your Name"
            />
            
            <input
              type="email"
              required
              value={contactForm.email}
              onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
            />
            
            <textarea
              required
              value={contactForm.message}
              onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
              rows="4"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your message..."
            ></textarea>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition"
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
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 
              className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
              onClick={() => setCurrentPage('home')}
            >
              RetailerReef
            </h1>
            
            <nav className="hidden md:flex gap-6">
              <button
                onClick={() => setCurrentPage('home')}
                className={`font-medium ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-600'}`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage('products')}
                className={`font-medium ${currentPage === 'products' ? 'text-blue-600' : 'text-gray-600'}`}
              >
                Products
              </button>
              <button
                onClick={() => setCurrentPage('contact')}
                className={`font-medium ${currentPage === 'contact' ? 'text-blue-600' : 'text-gray-600'}`}
              >
                Contact
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="relative p-2 hover:bg-gray-100 rounded-lg"
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
                className="md:hidden"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

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

      {cartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setCartOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Cart</h2>
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

      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'products' && <ProductsPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">RetailerReef</h3>
              <p className="text-gray-400">Premium household essentials</p>
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
                <li>Shipping Info</li>
                <li>Returns</li>
                <li>FAQ</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>contact@retailerreef.com</li>
                <li>+1 (555) 123-4567</li>
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