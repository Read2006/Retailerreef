import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Plus, Minus, Trash2, Mail, Phone, MapPin, Star, ChevronRight, Award, Shield, Truck, Home, Search, Grid } from 'lucide-react';

const RetailerReef = () => {
  const [cart, setCart] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  // DATA
  const products = [
    // KITCHEN
    { id: 1, name: "Pro Stainless Cookware", category: "kitchen", price: 189.99, image: "https://images.unsplash.com/photo-1585515120245-0e623c6d569d?auto=format&fit=crop&w=600&q=80", rating: 4.9, reviews: 234, badge: "Best Seller" },
    { id: 2, name: "Ceramic Dinner Set", category: "kitchen", price: 79.99, image: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&w=600&q=80", rating: 4.8, reviews: 412 },
    { id: 3, name: "Bamboo Utensils", category: "kitchen", price: 24.99, image: "https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?auto=format&fit=crop&w=600&q=80", rating: 4.7, reviews: 289 },
    { id: 4, name: "Glass Storage Jars", category: "kitchen", price: 39.99, image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80", rating: 4.6, reviews: 201 },
    { id: 5, name: "Espresso Machine", category: "kitchen", price: 129.99, image: "https://images.unsplash.com/photo-1556742046-d44670e1b65c?auto=format&fit=crop&w=600&q=80", rating: 4.8, reviews: 523, badge: "Hot" },
    { id: 6, name: "Pro Knife Block", category: "kitchen", price: 119.99, image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=600&q=80", rating: 4.9, reviews: 445 },
    
    // BEDROOM
    { id: 7, name: "Cotton Sheets", category: "bedroom", price: 89.99, image: "https://images.unsplash.com/photo-1522771753018-be8071801b81?auto=format&fit=crop&w=600&q=80", rating: 4.9, reviews: 189, badge: "Premium" },
    { id: 8, name: "Fleece Blanket", category: "bedroom", price: 45.99, image: "https://images.unsplash.com/photo-1580301762395-9c64265e9674?auto=format&fit=crop&w=600&q=80", rating: 4.8, reviews: 156 },
    { id: 9, name: "Foam Pillow", category: "bedroom", price: 34.99, image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?auto=format&fit=crop&w=600&q=80", rating: 4.7, reviews: 298 },
    { id: 10, name: "Nightstand Lamp", category: "bedroom", price: 54.99, image: "https://images.unsplash.com/photo-1507473888900-52e1ad145986?auto=format&fit=crop&w=600&q=80", rating: 4.6, reviews: 167 },
    
    // BATHROOM
    { id: 11, name: "Bath Towel Set", category: "bathroom", price: 54.99, image: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=600&q=80", rating: 4.9, reviews: 356 },
    { id: 12, name: "Bamboo Bath Mat", category: "bathroom", price: 28.99, image: "https://images.unsplash.com/photo-1605619141774-633b45a0b59b?auto=format&fit=crop&w=600&q=80", rating: 4.5, reviews: 167 },
    { id: 13, name: "Soap Dispenser", category: "bathroom", price: 31.99, image: "https://images.unsplash.com/photo-1585779034823-7e9ac48abd9e?auto=format&fit=crop&w=600&q=80", rating: 4.5, reviews: 189 },
    
    // DECOR
    { id: 15, name: "Wall Clock", category: "decor", price: 42.99, image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=600&q=80", rating: 4.4, reviews: 178 },
    { id: 16, name: "Ceramic Vase", category: "decor", price: 36.99, image: "https://images.unsplash.com/photo-1581783342308-f792ca11dfdd?auto=format&fit=crop&w=600&q=80", rating: 4.6, reviews: 198 },
    { id: 17, name: "Wall Mirror", category: "decor", price: 79.99, image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=600&q=80", rating: 4.6, reviews: 145 },

    // CLEANING
    { id: 19, name: "Eco Cleaning Kit", category: "cleaning", price: 34.99, image: "https://images.unsplash.com/photo-1585833895995-1c5c179c3cb6?auto=format&fit=crop&w=600&q=80", rating: 4.7, reviews: 298 },
    { id: 21, name: "Stainless Bin", category: "cleaning", price: 67.99, image: "https://images.unsplash.com/photo-1594306352932-d81a98083812?auto=format&fit=crop&w=600&q=80", rating: 4.7, reviews: 145 },
  ];

  const categories = [
    { id: 'kitchen', name: 'Kitchen', icon: '🍳' },
    { id: 'bedroom', name: 'Bedroom', icon: '🛏️' },
    { id: 'bathroom', name: 'Bathroom', icon: '🛁' },
    { id: 'decor', name: 'Decor', icon: '🎨' },
    { id: 'cleaning', name: 'Cleaning', icon: '🧹' }
  ];

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 140; // Adjusted for mobile sticky header
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
    alert('Message sent!');
    setContactForm({ name: '', email: '', message: '' });
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col h-full group">
      <div className="relative w-full aspect-[4/5] bg-gray-50 rounded-t-lg overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.badge && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-1.5 py-0.5 rounded text-[10px] font-bold z-10">
            {product.badge}
          </div>
        )}
      </div>
      <div className="p-2 flex flex-col flex-grow">
        <h3 className="font-medium text-gray-900 line-clamp-2 text-xs md:text-sm mb-1 h-8 leading-tight">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          <Star size={10} className="text-yellow-400 fill-current" />
          <span className="text-[10px] text-gray-500">{product.rating} ({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm font-bold text-gray-900">${Math.floor(product.price)}<span className="text-xs align-top">.99</span></span>
          <button
            onClick={() => addToCart(product)}
            className="bg-gray-900 text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-blue-600 active:scale-90 transition-all shadow-sm"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20 md:pb-0">
      
      {/* --- APP HEADER --- */}
      <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          {/* Top Row: Logo & Icons */}
          <div className="flex items-center justify-between px-3 py-3">
            <h1 
              className="text-lg font-black tracking-tight text-gray-900 flex items-center gap-1.5"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="bg-blue-600 text-white w-7 h-7 rounded flex items-center justify-center text-sm font-bold">R</div>
              RetailerReef
            </h1>
            <div className="flex items-center gap-3">
              <button onClick={() => setCartOpen(!cartOpen)} className="relative">
                <ShoppingCart size={22} className="text-gray-700" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Sticky Categories Row (Mobile Horizontal Scroll) */}
          <div className="px-3 pb-3 overflow-x-auto flex gap-2 hide-scrollbar md:hidden border-b border-gray-100 bg-white">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToSection(cat.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100 whitespace-nowrap active:bg-blue-50 active:border-blue-200 transition-colors"
              >
                <span className="text-sm">{cat.icon}</span>
                <span className="text-xs font-semibold text-gray-700">{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Desktop Nav (Hidden on Mobile) */}
          <nav className="hidden md:flex px-4 py-2 gap-6 bg-gray-50 border-t border-gray-100">
             {categories.map((cat) => (
                <button key={cat.id} onClick={() => scrollToSection(cat.id)} className="text-sm font-medium text-gray-600 hover:text-blue-600">
                  {cat.name}
                </button>
             ))}
          </nav>
        </div>
      </header>

      {/* --- HERO (Compact on Mobile) --- */}
      <section className="relative h-[250px] md:h-[400px] bg-gray-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80" 
          alt="Banner" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-12 text-white">
          <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-blue-300 mb-1">New Arrivals</span>
          <h2 className="text-2xl md:text-5xl font-bold leading-tight mb-3">Upgrade Your <br/>Living Space</h2>
          <button 
             onClick={() => scrollToSection('kitchen')}
             className="bg-white text-gray-900 px-5 py-2 rounded-full font-bold text-sm self-start hover:bg-blue-50 transition"
          >
            Shop Now
          </button>
        </div>
      </section>

      <main className="max-w-7xl mx-auto pb-12">
        {categories.map((category) => (
          <section key={category.id} id={category.id} className="pt-6 px-2 md:px-4 border-b border-gray-100 pb-6 last:border-0">
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-lg md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                {category.name}
              </h2>
              <button onClick={() => scrollToSection(category.id)} className="text-xs text-blue-600 font-bold">View All</button>
            </div>
            
            {/* MOBILE GRID: 2 Columns, Tight Gap */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
              {products
                .filter(p => p.category === category.id)
                .map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </section>
        ))}

        {/* --- CONTACT SECTION --- */}
        <section id="contact" className="px-4 py-8 bg-white mt-4 border-t border-gray-100">
          <h2 className="text-xl font-bold mb-4">Contact Support</h2>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
             <div className="space-y-3 text-sm mb-4">
               <div className="flex items-center gap-3">
                 <div className="bg-white p-2 rounded-full shadow-sm"><Mail size={16} className="text-blue-500"/></div>
                 <span>contact@retailerreef.com</span>
               </div>
               <div className="flex items-center gap-3">
                 <div className="bg-white p-2 rounded-full shadow-sm"><Phone size={16} className="text-green-500"/></div>
                 <span>+1 (555) 123-4567</span>
               </div>
             </div>
             <button className="w-full bg-white border border-gray-200 py-2 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-100">
               Send Message
             </button>
          </div>
        </section>
      </main>

      {/* --- MOBILE BOTTOM NAV (App Feel) --- */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-2 px-6 flex justify-between items-center z-40 safe-area-bottom">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-center gap-1 text-blue-600">
          <Home size={20} />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button onClick={() => setMobileMenuOpen(true)} className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-900">
          <Grid size={20} />
          <span className="text-[10px] font-medium">Menu</span>
        </button>
        <button onClick={() => setCartOpen(true)} className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-900 relative">
          <ShoppingCart size={20} />
          {cartItemCount > 0 && <span className="absolute top-0 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
          <span className="text-[10px] font-medium">Cart</span>
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end" onClick={() => setMobileMenuOpen(false)}>
           <div className="w-64 bg-white h-full shadow-xl p-4 flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-lg">Menu</h2>
                <button onClick={() => setMobileMenuOpen(false)}><X size={24}/></button>
              </div>
              <nav className="flex flex-col gap-2">
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => scrollToSection(cat.id)} className="text-left px-4 py-3 bg-gray-50 rounded-lg font-medium text-gray-700">
                    {cat.name}
                  </button>
                ))}
              </nav>
           </div>
        </div>
      )}

      {/* CART OVERLAY */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex justify-end" onClick={() => setCartOpen(false)}>
          <div className="w-full max-w-sm bg-white h-full shadow-xl flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-bold text-lg">Cart ({cartItemCount})</h2>
              <button onClick={() => setCartOpen(false)}><X size={24}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
               {cart.map(item => (
                 <div key={item.id} className="flex gap-3">
                   <img src={item.image} className="w-16 h-16 rounded object-cover bg-gray-100" />
                   <div className="flex-1">
                     <div className="flex justify-between">
                       <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                       <button onClick={() => removeFromCart(item.id)}><Trash2 size={14} className="text-gray-400"/></button>
                     </div>
                     <p className="text-sm font-bold">${item.price}</p>
                     <div className="flex items-center gap-3 mt-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="bg-gray-100 p-1 rounded"><Minus size={12}/></button>
                        <span className="text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="bg-gray-100 p-1 rounded"><Plus size={12}/></button>
                     </div>
                   </div>
                 </div>
               ))}
            </div>
            <div className="p-4 border-t bg-gray-50">
               <div className="flex justify-between font-bold mb-3"><span>Total</span><span>${cartTotal.toFixed(2)}</span></div>
               <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold">Checkout</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default RetailerReef;