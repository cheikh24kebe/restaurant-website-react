import React, { useState, useEffect, useCallback } from 'react';
import { FaBars, FaTimes, FaShoppingCart, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaInstagram, FaTwitter, FaTripadvisor, FaChevronLeft, FaChevronRight, FaTrash } from 'react-icons/fa';
import './index.css';

// Menu data
const menuItems = [
  {
    id: 1,
    name: "Accara",
    category: "appetizers",
    price: 8.99,
    description: "Black-eyed pea fritters served with spicy tomato sauce",
    image: "img/accara.jpg"
  },
  {
    id: 2,
    name: "Fataya",
    category: "appetizers",
    price: 7.99,
    description: "Savory fried pastries filled with fish or meat",
    image: "img/fataya.jpg"
  },
  {
    id: 3,
    name: "Thieboudienne",
    category: "mains",
    price: 18.99,
    description: "Senegal's national dish - fish and rice with vegetables",
    image: "img/thieboudieune.jpg"
  },
  {
    id: 4,
    name: "Yassa Poulet",
    category: "mains",
    price: 16.99,
    description: "Marinated grilled chicken with onions and lemon sauce",
    image: "img/yassa poulet.jpg"
  },
  {
    id: 5,
    name: "Mafe",
    category: "mains",
    price: 17.99,
    description: "Peanut stew with meat and vegetables, served with rice",
    image: "img/mafe.jpg"
  },
  {
    id: 6,
    name: "Thiakry",
    category: "desserts",
    price: 6.99,
    description: "Millet couscous with sweetened yogurt and dried fruits",
    image: "img/thiakry.jpg"
  },
  {
    id: 7,
    name: "Bissap",
    category: "drinks",
    price: 4.99,
    description: "Refreshing hibiscus tea, a Senegalese favorite",
    image: "img/bissap.jpg"
  },
  {
    id: 8,
    name: "Ginger Juice",
    category: "drinks",
    price: 5.99,
    description: "Freshly pressed ginger with a hint of lemon",
    image: "img/ginger .jpg"
  }
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'appetizers', name: 'Appetizers' },
  { id: 'mains', name: 'Main Courses' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'drinks', name: 'Drinks' }
];

const gallerySlides = [
  {
    id: 1,
    image: "img/bao1.jpg",
    alt: "Baobab Restaurant Interior"
  },
  {
    id: 2,
    image: "img/bao2.jpg",
    alt: "Traditional Senegalese Dish"
  },
  {
    id: 3,
    image: "img/bao3.jpg",
    alt: "Chef Preparing Food"
  },
  {
    id: 4,
    image: "img/bao4.jpg",
    alt: "Dining Experience"
  }
];

// Custom hook for cart functionality
const useCart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('baobabCart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('baobabCart', JSON.stringify(items));
  }, [items]);

  const addItem = (name, price) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.name === name);
      if (existingItem) {
        return prevItems.map(item =>
          item.name === name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { name, price: parseFloat(price), quantity: 1 }];
      }
    });
  };

  const removeItem = (name) => {
    setItems(prevItems => prevItems.filter(item => item.name !== name));
  };

  const updateQuantity = (name, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(name);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.name === name ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalQuantity = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    calculateTotal,
    getTotalQuantity,
  };
};

// Header Component
const Header = ({ cartQuantity, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="logo">
            <h1 className="text-2xl font-bold text-primary">
              Baobab<span className="text-secondary">Restaurant</span>
            </h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            {['home', 'menu', 'gallery', 'about', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-secondary font-semibold hover:text-primary transition-colors capitalize"
              >
                {section}
              </button>
            ))}
            <button onClick={onCartClick} className="cart-icon relative">
              <FaShoppingCart className="text-xl text-secondary hover:text-primary transition-colors" />
              {cartQuantity > 0 && (
                <span className="cart-count">{cartQuantity}</span>
              )}
            </button>
          </nav>

          <div className="flex items-center space-x-4 md:hidden">
            <button onClick={onCartClick} className="cart-icon relative">
              <FaShoppingCart className="text-xl text-secondary" />
              {cartQuantity > 0 && (
                <span className="cart-count">{cartQuantity}</span>
              )}
            </button>
            <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4">
            <div className="flex flex-col space-y-4 px-4">
              {['home', 'menu', 'gallery', 'about', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-secondary font-semibold hover:text-primary transition-colors w-full text-left py-2 capitalize"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero Component
const Hero = () => {
  const scrollToMenu = () => {
    const element = document.getElementById('menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero min-h-screen flex items-center relative pt-20">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80)'
        }}
      ></div>
      
      <div className="container mx-auto px-4 text-center text-white relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Authentic Senegalese Cuisine</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Experience the vibrant flavors of Senegal at Baobab Restaurant, located in the heart of Harlem at 120 West 116th Street.
        </p>
        <button onClick={scrollToMenu} className="btn-primary text-lg">
          View Our Menu
        </button>
      </div>
    </section>
  );
};

// Menu Component
const Menu = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Our Menu</h2>
        
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-6 py-2 font-semibold transition-all duration-300 border-b-2 ${
                activeCategory === category.id
                  ? 'text-primary border-primary'
                  : 'text-gray-600 border-transparent hover:text-primary hover:border-primary'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div key={item.id} className="menu-card">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold text-lg">${item.price.toFixed(2)}</span>
                  <button
                    onClick={() => onAddToCart(item.name, item.price)}
                    className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-accent transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Gallery Component
const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % gallerySlides.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + gallerySlides.length) % gallerySlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Our Gallery</h2>
        
        <div className="max-w-4xl mx-auto relative rounded-lg overflow-hidden shadow-2xl">
          <div className="relative h-64 md:h-96 overflow-hidden">
            {gallerySlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
          >
            <FaChevronLeft />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
          >
            <FaChevronRight />
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {gallerySlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-white'
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// About Component
const About = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="about-text">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-8 relative">
              Our Story
              <span className="absolute bottom-[-10px] left-0 w-20 h-1 bg-primary"></span>
            </h2>
            
            <div className="space-y-4 text-gray-600">
              <p>
                Baobab Restaurant was founded in 2010 by the Diop family, who brought their cherished 
                family recipes from Dakar to Harlem. Named after the iconic baobab tree of Senegal, 
                our restaurant stands as a symbol of strength, community, and nourishment.
              </p>
              
              <p>
                Our mission is to share the rich culinary heritage of Senegal with New York City. 
                Each dish is prepared with authentic ingredients and traditional techniques, ensuring 
                an unforgettable dining experience that transports you to the vibrant streets of Dakar.
              </p>
              
              <p>
                We take pride in our commitment to quality, sourcing the freshest ingredients and 
                preparing each meal with the same care and love that has been passed down through 
                generations of our family.
              </p>
            </div>
            
            <button 
              onClick={scrollToContact}
              className="btn-primary mt-6"
            >
              Visit Us Today
            </button>
          </div>

          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80" 
              alt="Chef Cooking"
              className="w-full rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Component
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Contact Us</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="contact-info">
            <h3 className="text-2xl font-bold text-secondary mb-6">Get In Touch</h3>
            
            <div className="contact-details space-y-6 mb-8">
              <div className="contact-detail flex items-center">
                <FaMapMarkerAlt className="text-primary text-xl mr-4" />
                <p className="text-gray-600">120 West 116th Street, New York, NY 10026</p>
              </div>
              
              <div className="contact-detail flex items-center">
                <FaPhone className="text-primary text-xl mr-4" />
                <p className="text-gray-600">(212) 555-7890</p>
              </div>
              
              <div className="contact-detail flex items-center">
                <FaEnvelope className="text-primary text-xl mr-4" />
                <p className="text-gray-600">info@baobabrestaurant.com</p>
              </div>
            </div>
            
            <div className="hours">
              <h3 className="text-2xl font-bold text-secondary mb-4">Business Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Thursday: 11:00 AM - 10:00 PM</p>
                <p>Friday - Saturday: 11:00 AM - 11:00 PM</p>
                <p>Sunday: 12:00 PM - 9:00 PM</p>
              </div>
            </div>
          </div>

          <div className="contact-form bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-secondary mb-6">Send Us a Message</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
              
              <div className="form-group mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
              
              <div className="form-group mb-6">
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors resize-vertical"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="btn-primary w-full"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="map rounded-lg overflow-hidden shadow-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3019.1166666666666!2d-73.9497222!3d40.8027778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ4JzEwLjAiTiA3M8KwNTYnNTkuMCJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Baobab Restaurant Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="footer-logo">
            <h2 className="text-2xl font-bold text-white mb-4">Baobab Restaurant</h2>
            <p className="text-gray-300">
              Authentic Senegalese cuisine in the heart of Harlem.
            </p>
          </div>

          <div className="footer-links">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['home', 'menu', 'gallery', 'about', 'contact'].map((section) => (
                <li key={section}>
                  <button 
                    onClick={() => scrollToSection(section)}
                    className="text-gray-300 hover:text-primary transition-colors capitalize"
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-hours">
            <h3 className="text-xl font-semibold mb-4">Opening Hours</h3>
            <div className="space-y-2 text-gray-300">
              <p>Mon-Thu: 11am - 10pm</p>
              <p>Fri-Sat: 11am - 11pm</p>
              <p>Sun: 12pm - 9pm</p>
            </div>
          </div>

          <div className="footer-social">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {[FaFacebookF, FaInstagram, FaTwitter, FaTripadvisor].map((Icon, index) => (
                <button 
                  key={index}
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors"
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="copyright border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2025 Baobab Restaurant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Cart Component
const Cart = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const handleCheckout = () => {
    if (cart.items.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    alert('Thank you for your order! Your food will be prepared shortly.');
    onClearCart();
    onClose();
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      onClearCart();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>
      
      <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white z-50 flex flex-col shadow-2xl">
        <div className="bg-secondary text-white p-6 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Your Order</h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-primary transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.items.length === 0 ? (
            <div className="empty-cart text-center py-12">
              <FaShoppingCart className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">Your cart is empty</p>
              <p className="text-gray-500">Add some delicious items from our menu!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.name} className="cart-item flex justify-between items-center py-4 border-b border-gray-200">
                  <div className="cart-item-info flex-1">
                    <div className="cart-item-name font-semibold text-gray-800">
                      {item.name}
                    </div>
                    <div className="cart-item-price text-primary font-semibold">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="cart-item-controls flex items-center space-x-3">
                    <button
                      onClick={() => onUpdateQuantity(item.name, item.quantity - 1)}
                      className="quantity-btn w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
                    >
                      -
                    </button>
                    
                    <span className="item-quantity font-semibold min-w-8 text-center">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => onUpdateQuantity(item.name, item.quantity + 1)}
                      className="quantity-btn w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
                    >
                      +
                    </button>
                    
                    <button
                      onClick={() => onRemoveItem(item.name)}
                      className="remove-item text-red-500 hover:text-red-700 transition-colors ml-2"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-white">
            <div className="cart-total flex justify-between items-center text-xl font-semibold mb-4">
              <span>Total:</span>
              <span className="text-primary">${cart.calculateTotal().toFixed(2)}</span>
            </div>
            
            <div className="cart-actions flex space-x-3">
              <button
                onClick={handleClearCart}
                className="flex-1 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-accent transition-colors"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// Notification Component
const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-24 right-6 bg-primary text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
      {message}
    </div>
  );
};

// Main App Component
function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });
  
  const cart = useCart();

  const handleAddToCart = (name, price) => {
    cart.addItem(name, price);
    showNotification(`${name} added to cart!`);
  };

  const showNotification = (message) => {
    setNotification({ show: true, message });
  };

  const closeNotification = () => {
    setNotification({ show: false, message: '' });
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <div className="App">
      <Header 
        cartQuantity={cart.getTotalQuantity()} 
        onCartClick={openCart} 
      />

      <main>
        <Hero />
        <Menu onAddToCart={handleAddToCart} />
        <Gallery />
        <About />
        <Contact />
      </main>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={closeCart}
        cart={cart}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeItem}
        onClearCart={cart.clearCart}
      />

      {notification.show && (
        <Notification 
          message={notification.message} 
          onClose={closeNotification} 
        />
      )}
    </div>
  );
}

export default App;