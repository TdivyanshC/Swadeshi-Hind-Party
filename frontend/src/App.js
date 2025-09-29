import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ChevronDownIcon, SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Theme Context
const ThemeContext = React.createContext();

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={`App ${isDark ? 'dark' : ''}`}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/manifesto" element={<Manifesto />} />
              <Route path="/leadership" element={<Leadership />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}

// Layout Component with Header and Footer
function Layout({ children }) {
  const { isDark, toggleTheme } = React.useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Manifesto', path: '/manifesto' },
    { name: 'Leadership', path: '/leadership' },
    { name: 'Get Involved', path: '/get-involved' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-lg">स्व</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  Swadeshi Hindu Party
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-orange-600 dark:hover:text-orange-400 ${
                    location.pathname === item.path
                      ? 'text-orange-600 dark:text-orange-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                {isDark ? (
                  <SunIcon className="h-5 w-5 text-yellow-500" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-gray-700" />
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg rounded-lg mt-2 py-2 animate-slideDown">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-orange-50 dark:hover:bg-gray-800 ${
                    location.pathname === item.path
                      ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-gray-800'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-600 to-orange-700 dark:from-gray-800 dark:to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Party Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">स्व</span>
                </div>
                <span className="text-xl font-bold">Swadeshi Hindu Party</span>
              </div>
              <p className="text-orange-100 dark:text-gray-300 mb-4 leading-relaxed">
                स्वदेशी सोच, स्वदेशी रास्ते - Building a self-reliant and culturally rooted India through the five pillars of progress.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-orange-200 hover:text-white transition-colors duration-200">Facebook</a>
                <a href="#" className="text-orange-200 hover:text-white transition-colors duration-200">Twitter</a>
                <a href="#" className="text-orange-200 hover:text-white transition-colors duration-200">Instagram</a>
                <a href="#" className="text-orange-200 hover:text-white transition-colors duration-200">YouTube</a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-orange-200 dark:text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-orange-200 dark:text-gray-300">
                <p>Email: info@swadeshihindu.party</p>
                <p>Phone: +91 98765 43210</p>
                <p>Address: New Delhi, India</p>
              </div>
            </div>
          </div>

          <div className="border-t border-orange-500/30 dark:border-gray-700 mt-8 pt-8 text-center">
            <p className="text-orange-200 dark:text-gray-400">
              © 2025 Swadeshi Hindu Party. All rights reserved. | स्वदेशी सोच, स्वदेशी रास्ते
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Home Page Component
function Home() {
  const [currentPillar, setCurrentPillar] = useState(0);

  const pillars = [
    {
      id: 'atmanirbhar',
      title: 'Atmanirbhar Bharat',
      subtitle: 'Self-Reliance',
      description: 'Promoting local industries, Swadeshi products, and entrepreneurship to reduce dependence on imports.',
      icon: '🏭',
      color: 'from-blue-500 to-blue-600',
      image: 'https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxmYXJtZXJzfGVufDB8fHx8MTc1OTE1MzkyNnww&ixlib=rb-4.1.0&q=85'
    },
    {
      id: 'kisan',
      title: 'Kisan Samman',
      subtitle: 'Respect for Farmers',
      description: 'Ensuring fair prices, modern technology, and dignity for the farmers who feed our nation.',
      icon: '🌾',
      color: 'from-green-500 to-green-600',
      image: 'https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxmYXJtZXJzfGVufDB8fHx8MTc1OTE1MzkyNnww&ixlib=rb-4.1.0&q=85'
    },
    {
      id: 'nari',
      title: 'Nari Shakti',
      subtitle: 'Women Empowerment',
      description: 'Promoting local industries, Swadeshi products, and entrepreneurship to reduce dependence on imports.',
      icon: '👩',
      color: 'from-pink-500 to-pink-600',
      image: 'https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHx3b21lbnxlbnwwfHx8fDE3NTkxNTM5MzF8MA&ixlib=rb-4.1.0&q=85'
    },
    {
      id: 'yuva',
      title: 'Yuva Shakti',
      subtitle: 'Youth Power',
      description: 'Creating jobs, skill programs, and platforms for the youth to lead the nation towards innovation and progress.',
      icon: '🎓',
      color: 'from-purple-500 to-purple-600',
      image: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHx5b3V0aHxlbnwwfHx8fDE3NTkxNTM5Mzd8MA&ixlib=rb-4.1.0&q=85'
    },
    {
      id: 'sanskriti',
      title: 'Sanskriti aur Seva',
      subtitle: 'Culture & Service',
      description: 'Protecting India\'s cultural heritage while promoting unity, service, and harmony across all communities.',
      icon: '🕉️',
      color: 'from-orange-500 to-orange-600',
      image: 'https://images.unsplash.com/photo-1519802772250-a52a9af0eacb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxjdWx0dXJlfGVufDB8fHx8MTc1OTE1Mzk0M3ww&ixlib=rb-4.1.0&q=85'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPillar((prev) => (prev + 1) % pillars.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-600 via-orange-500 to-red-600 dark:from-gray-900 dark:via-gray-800 dark:to-orange-900">
        <div className="absolute inset-0 bg-black/30"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1682786703198-65b867dc6a07?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwb2xpdGljYWwlMjByYWxseXxlbnwwfHx8fDE3NTkxNTM4OTh8MA&ixlib=rb-4.1.0&q=85)'
          }}
        ></div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <div className="animate-fadeInUp">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              स्वदेशी सोच<br />
              <span className="text-yellow-300">स्वदेशी रास्ते</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100 leading-relaxed max-w-3xl mx-auto">
              Building a self-reliant India rooted in our culture, empowering our farmers, women, and youth for a prosperous future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/get-involved"
                className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Join the Movement
              </Link>
              <Link
                to="/manifesto"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-105"
              >
                Our Vision
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDownIcon className="h-8 w-8 text-white/70" />
        </div>
      </section>

      {/* Five Pillars Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Five Pillars
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The foundation of our vision for a strong, self-reliant, and culturally rooted India
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Interactive Pillar Display */}
            <div className="order-2 lg:order-1">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={pillars[currentPillar].image}
                  alt={pillars[currentPillar].title}
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center mb-2">
                    <span className="text-3xl mr-3">{pillars[currentPillar].icon}</span>
                    <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                      {currentPillar + 1} of {pillars.length}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{pillars[currentPillar].title}</h3>
                  <p className="text-orange-200 mb-1 font-medium">{pillars[currentPillar].subtitle}</p>
                  <p className="text-sm opacity-90 leading-relaxed">{pillars[currentPillar].description}</p>
                </div>
              </div>
            </div>

            {/* Pillars List */}
            <div className="order-1 lg:order-2 space-y-4">
              {pillars.map((pillar, index) => (
                <div
                  key={pillar.id}
                  onClick={() => setCurrentPillar(index)}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                    currentPillar === index
                      ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 shadow-lg scale-105'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-orange-300 dark:hover:border-orange-600 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${pillar.color} flex items-center justify-center text-white text-xl flex-shrink-0`}>
                      {pillar.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        {pillar.title}
                      </h4>
                      <p className="text-sm text-orange-600 dark:text-orange-400 font-medium mb-2">
                        {pillar.subtitle}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 dark:from-gray-800 dark:to-orange-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Be Part of the Change
          </h2>
          <p className="text-xl text-orange-100 dark:text-gray-300 mb-8 leading-relaxed">
            Join us in building a stronger, more self-reliant India. Every contribution, every voice, and every action matters in our journey towards progress.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/get-involved"
              className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Involved
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// About Page
function About() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Swadeshi Hindu Party
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            स्वदेशी सोच, स्वदेशी रास्ते - A movement rooted in our culture, committed to progress
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                Founded with a vision to create a self-reliant and culturally rooted India, the Swadeshi Hindu Party represents the aspirations of millions who believe in the power of indigenous solutions and traditional values.
              </p>
              <p>
                Our movement emerged from the need to balance modern development with our cultural heritage, ensuring that progress doesn't come at the cost of our identity and values.
              </p>
              <p>
                We stand for an India that is economically independent, socially harmonious, and spiritually grounded in its ancient wisdom while embracing innovation and progress.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3687322/pexels-photo-3687322.jpeg"
              alt="Indian Flag Rally"
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-300">
              To build a self-reliant India that honors its cultural heritage while embracing progress and innovation.
            </p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">👁️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Our Vision</h3>
            <p className="text-gray-600 dark:text-gray-300">
              An India where every citizen thrives in harmony, prosperity, and cultural pride.
            </p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Our Values</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Unity, integrity, cultural preservation, and inclusive development for all.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Manifesto Page
function Manifesto() {
  const [activeSection, setActiveSection] = useState('sankalp');

  const sankalpPoints = [
    {
      category: "Youth Empowerment",
      icon: "🎓",
      color: "from-blue-500 to-blue-600",
      image: "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHx5b3V0aHxlbnwwfHx8fDE3NTkxNTM5Mzd8MA&ixlib=rb-4.1.0&q=85",
      description: "Government-funded competitive exam coaching for youth"
    },
    {
      category: "Farmers' Justice",
      icon: "🚜",
      color: "from-green-500 to-green-600",
      image: "https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxmYXJtZXJzfGVufDB8fHx8MTc1OTE1MzkyNnww&ixlib=rb-4.1.0&q=85",
      description: "Loan waiver and legal MSP guarantee for all farmers"
    },
    {
      category: "Reservation Reform",
      icon: "⚖️",
      color: "from-gray-500 to-gray-600",
      image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "End caste-based reservation - start poverty-based reservation"
    },
    {
      category: "Population Control",
      icon: "👨‍👩‍👧‍👦",
      color: "from-indigo-500 to-indigo-600",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Strict population control law for sustainable future"
    },
    {
      category: "One Nation, One Law",
      icon: "🏛️",
      color: "from-amber-500 to-amber-600",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Uniform Civil Code for equal rights to all citizens"
    },
    {
      category: "Health for All",
      icon: "🏥",
      color: "from-teal-500 to-teal-600",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Mandatory health insurance for every citizen"
    },
    {
      category: "Education Reform",
      icon: "📚",
      color: "from-rose-500 to-rose-600",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Compulsory moral, health, technical, and military education"
    },
    {
      category: "School Fee Regulation",
      icon: "🎒",
      color: "from-cyan-500 to-cyan-600",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Strict control on private school fees - no exploitation"
    },
    {
      category: "Pension Justice",
      icon: "👴",
      color: "from-emerald-500 to-emerald-600",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Restore pensions of government employees, end perks of MLAs/MPs if required"
    },
    {
      category: "Public Welfare Support",
      icon: "🤝",
      color: "from-violet-500 to-violet-600",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Full support to laws like population control and every initiative for public welfare"
    }
  ];

  const manifestoPoints = [
    {
      category: "Economic Development",
      icon: "💼",
      color: "from-blue-500 to-blue-600",
      points: [
        "Promote indigenous industries and reduce import dependency",
        "Support small and medium enterprises with easy credit access",
        "Develop rural infrastructure and connectivity",
        "Create job opportunities in tier-2 and tier-3 cities"
      ]
    },
    {
      category: "Agricultural Reform",
      icon: "🌾",
      color: "from-green-500 to-green-600",
      points: [
        "Ensure fair pricing and direct market access for farmers",
        "Modernize farming techniques with technology integration",
        "Provide crop insurance and weather protection schemes",
        "Develop food processing and storage infrastructure"
      ]
    },
    {
      category: "Social Empowerment",
      icon: "👥",
      color: "from-purple-500 to-purple-600",
      points: [
        "Gender equality and women's safety measures",
        "Youth skill development and employment programs",
        "Education reform focusing on practical skills",
        "Healthcare accessibility in rural and urban areas"
      ]
    },
    {
      category: "Cultural Heritage",
      icon: "🕉️",
      color: "from-orange-500 to-orange-600",
      points: [
        "Preserve and promote Indian languages and traditions",
        "Support arts, crafts, and cultural industries",
        "Educational curriculum including Indian philosophy",
        "Cultural exchange and heritage tourism development"
      ]
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Manifesto
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive roadmap for building a stronger, self-reliant, and culturally rich India
          </p>
        </div>

        <div className="space-y-12">
          {manifestoPoints.map((section, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-full flex items-center justify-center text-2xl mr-4`}>
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {section.category}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.points.map((point, pointIndex) => (
                  <div key={pointIndex} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 dark:text-gray-300">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Leadership Page
function Leadership() {
  const leaders = [
    {
      name: "Dr. Rajesh Kumar",
      position: "Party President",
      image: "https://via.placeholder.com/300x300/f97316/ffffff?text=RK",
      bio: "A visionary leader with 20+ years of experience in public service and community development."
    },
    {
      name: "Smt. Priya Sharma",
      position: "Vice President",
      image: "https://via.placeholder.com/300x300/059669/ffffff?text=PS",
      bio: "Champion of women's rights and rural development with extensive grassroots experience."
    },
    {
      name: "Shri Arun Patel",
      position: "Secretary General",
      image: "https://via.placeholder.com/300x300/dc2626/ffffff?text=AP",
      bio: "Former civil servant dedicated to transparent governance and youth empowerment."
    },
    {
      name: "Dr. Meera Singh",
      position: "Policy Head",
      image: "https://via.placeholder.com/300x300/7c3aed/ffffff?text=MS",
      bio: "Policy expert focusing on economic reforms and sustainable development strategies."
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Leadership
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Dedicated leaders committed to serving the nation with integrity and vision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <img
                src={leader.image}
                alt={leader.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {leader.name}
              </h3>
              <p className="text-orange-600 dark:text-orange-400 font-medium mb-3">
                {leader.position}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {leader.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Get Involved Page (Forms without payment)
function GetInvolved() {
  const [activeTab, setActiveTab] = useState('donate');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    message: '',
    skills: '',
    availability: '',
    address: '',
    membershipType: 'individual'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e, formType) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/${formType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Form submitted successfully! We will contact you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          amount: '',
          message: '',
          skills: '',
          availability: '',
          address: '',
          membershipType: 'individual'
        });
      }
    } catch (error) {
      alert('Error submitting form. Please try again.');
    }
  };

  const tabs = [
    { id: 'donate', label: 'Donate', icon: '❤️', color: 'text-red-600' },
    { id: 'membership', label: 'Membership', icon: '👥', color: 'text-blue-600' },
    { id: 'volunteer', label: 'Volunteer', icon: '🤝', color: 'text-green-600' }
  ];

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Get Involved
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Join us in building a stronger India. Every contribution matters.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-700 shadow-md'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Forms */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          {activeTab === 'donate' && (
            <form onSubmit={(e) => handleSubmit(e, 'donations')}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Support Our Cause
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Donation Amount (₹) *
                  </label>
                  <input
                    type="number"
                    name="amount"
                    required
                    min="1"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Share why you want to support our cause..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="mt-6 w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200"
              >
                Submit Donation Form
              </button>
            </form>
          )}

          {activeTab === 'membership' && (
            <form onSubmit={(e) => handleSubmit(e, 'memberships')}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Become a Member (₹250)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Membership Type *
                  </label>
                  <select
                    name="membershipType"
                    required
                    value={formData.membershipType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="individual">Individual</option>
                    <option value="family">Family</option>
                    <option value="student">Student</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address *
                </label>
                <textarea
                  name="address"
                  rows="3"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                ></textarea>
              </div>
              <button
                type="submit"
                className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
              >
                Submit Membership Application
              </button>
            </form>
          )}

          {activeTab === 'volunteer' && (
            <form onSubmit={(e) => handleSubmit(e, 'volunteers')}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Volunteer With Us (₹20 Registration)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Availability *
                  </label>
                  <input
                    type="text"
                    name="availability"
                    required
                    value={formData.availability}
                    onChange={handleInputChange}
                    placeholder="e.g., Weekends, Evenings"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Skills & Experience *
                </label>
                <textarea
                  name="skills"
                  rows="4"
                  required
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="Tell us about your skills, experience, and how you'd like to contribute..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                ></textarea>
              </div>
              <button
                type="submit"
                className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200"
              >
                Submit Volunteer Application
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// Contact Page
function Contact() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Get in touch with our team. We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Get In Touch
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">📍</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Address</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    123 Parliament Street<br />
                    New Delhi, Delhi 110001<br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">📞</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    +91 98765 43210<br />
                    +91 87654 32109
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">✉️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    info@swadeshihindu.party<br />
                    contact@swadeshihindu.party
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">🌐</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Social Media</h3>
                  <div className="flex space-x-4 mt-2">
                    <a href="#" className="text-orange-600 hover:text-orange-700">Facebook</a>
                    <a href="#" className="text-orange-600 hover:text-orange-700">Twitter</a>
                    <a href="#" className="text-orange-600 hover:text-orange-700">Instagram</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send us a Message
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  rows="5"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;