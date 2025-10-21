import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ChevronDownIcon, SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import './App.css';
import Objectives, { objectivesData } from './components/Objectives';
import ManifestoDetail from './components/ManifestoDetail';
import ObjectiveDetail from './components/ObjectiveDetail';
import ChallengeDetail from './components/ChallengeDetail';

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
              <Route path="/objectives" element={<Objectives />} />
              <Route path="/objectives/:slug" element={<ObjectiveDetail />} />
              <Route path="/manifesto" element={<Manifesto />} />
              <Route path="/manifesto/:slug" element={<ManifestoDetail />} />
              <Route path="/challenges/:slug" element={<ChallengeDetail />} />
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
    { name: 'Our Objectives', path: '/objectives' },
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
                  Swadeshi Hind Party
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
                <span className="text-xl font-bold">Swadeshi Hind Party</span>
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
                <p>Email: info@swadeshihindparty.in</p>
                <p>Phone: +91 8650307307</p>
                <p>Address: Hathras, Uttar Pradesh</p>
              </div>
            </div>
          </div>

          <div className="border-t border-orange-500/30 dark:border-gray-700 mt-8 pt-8 text-center">
            <p className="text-orange-200 dark:text-gray-400">
              © 2025 Swadeshi Hind Party. All rights reserved. | स्वदेशी सोच, स्वदेशी रास्ते
            </p>
            <p className="text-orange-200 dark:text-gray-400 mt-2">
              Designed and made by <a href="https://www.thesocialhood.in" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300 underline">The SocialHood Company</a>
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
  const [loaded, setLoaded] = useState(false);

  const pillars = [
    {
      id: 'atmanirbhar',
      title: 'Atmanirbhar Bharat',
      subtitle: 'Self-Reliance',
      description: 'Promoting local industries, Swadeshi products, and entrepreneurship to reduce dependence on imports.',
      icon: '🏭',
      color: 'from-blue-500 to-blue-600',
      image: '/assets/aatmnirbhar.jpg'
    },
    {
      id: 'kisan',
      title: 'Kisan Samman',
      subtitle: 'Respect for Farmers',
      description: 'Ensuring fair prices, modern technology, and dignity for the farmers who feed our nation.',
      icon: '🌾',
      color: 'from-green-500 to-green-600',
      image: '/assets/kisaan.jpg'
    },
    {
      id: 'nari',
      title: 'Nari Shakti',
      subtitle: 'Women Empowerment',
      description: 'Empowering women through education, economic opportunities, and equal rights in all spheres of life.',
      icon: '👩',
      color: 'from-pink-500 to-pink-600',
      image: '/assets/women.jpg'
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

  useEffect(() => {
    // Simulate loading delay for animation
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-600 via-orange-500 to-red-600 dark:from-gray-900 dark:via-gray-800 dark:to-orange-900">
        <div className="absolute inset-0 bg-black/30"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(/assets/hero_img.jpeg)'
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

          {/* Pillars Text Cards - Horizontal Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.id}
                onClick={() => setCurrentPillar(index)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 border-2 text-center ${
                  currentPillar === index
                    ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 shadow-lg scale-105'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-orange-300 dark:hover:border-orange-600 hover:shadow-md'
                }`}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${pillar.color} flex items-center justify-center text-white text-2xl mx-auto mb-4 flex-shrink-0`}>
                  {pillar.icon}
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {pillar.title}
                </h4>
                <p className="text-sm text-orange-600 dark:text-orange-400 font-medium mb-3">
                  {pillar.subtitle}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Pillar Image Display */}
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={pillars[currentPillar].image}
              alt={pillars[currentPillar].title}
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white text-center">
              <div className="flex items-center justify-center mb-3">
                <span className="text-4xl mr-3">{pillars[currentPillar].icon}</span>
                <span className="text-sm font-medium bg-white/20 px-4 py-2 rounded-full">
                  {currentPillar + 1} of {pillars.length}
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-3">{pillars[currentPillar].title}</h3>
              <p className="text-orange-200 mb-2 font-medium text-lg">{pillars[currentPillar].subtitle}</p>
              <p className="text-base opacity-90 leading-relaxed max-w-2xl mx-auto">{pillars[currentPillar].description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* India's Core Challenges - Modern Horizontal Accordion */}
      <section className="relative py-20 bg-gradient-to-br from-orange-50 to-green-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-white/30 to-green-400/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              India's Core Challenges
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The pressing issues that demand our immediate attention and collective action
            </p>
          </div>

          {/* Desktop Horizontal Accordion */}
          <div className="hidden lg:flex h-96 relative overflow-hidden rounded-2xl shadow-2xl">
            {[
              {
                title: "Poor Civic Sense",
                description: "Lack of civic responsibility and awareness leading to environmental degradation, traffic chaos, and social disorder that affects our daily lives.",
                image: "/assets/civic_sense.jpg",
                slug: "poor-civic-sense"
              },
              {
                title: "Broken Infrastructure",
                description: "Decaying roads, unreliable power supply, inadequate water systems, and crumbling public facilities that hinder progress and quality of life.",
                image: "/assets/floods.webp",
                slug: "broken-infrastructure"
              },
              {
                title: "Waste & Pollution",
                description: "Rampant pollution, improper waste management, and environmental degradation threatening public health and ecological balance.",
                image: "/assets/authorities.jpg",
                slug: "waste-pollution"
              },
              {
                title: "Unemployment",
                description: "Rising joblessness, lack of economic opportunities, and inadequate skill development leaving millions without dignified livelihoods.",
                image: "/assets/unemployment-concept.webp",
                slug: "unemployment"
              },
              {
                title: "Corrupt Authorities",
                description: "Systemic corruption, bureaucratic inefficiency, and misuse of power eroding public trust and hindering genuine development.",
                image: "/assets/bridge.webp",
                slug: "corrupt-authorities"
              },
              {
                title: "Undemocratic Practices",
                description: "Erosion of democratic values, suppression of dissent, and concentration of power undermining the very foundation of our republic.",
                image: "/assets/corrupt.webp",
                slug: "undemocratic-practices"
              }
            ].map((challenge, index) => (
              <div
                key={index}
                className="accordion-panel flex relative overflow-hidden cursor-pointer transition-all duration-700 ease-in-out group"
                style={{
                  backgroundImage: `url(${challenge.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Subtle Dark Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 opacity-0 transition-all duration-700 group-hover:opacity-100"></div>

                {/* Background Image Zoom Effect */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{backgroundImage: `url(${challenge.image})`}}
                ></div>

                {/* Content Container */}
                <div className="relative h-full flex flex-col p-6 transition-all duration-700">
                  {/* Centered Title (Default State) */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:top-6 group-hover:-translate-y-0 transition-all duration-700">
                    <h3 className="text-2xl font-bold text-white text-center whitespace-nowrap" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                      {challenge.title}
                    </h3>
                  </div>

                  {/* Description (Hidden by default, shown on hover) */}
                  <div className="flex-1 flex flex-col justify-center items-center opacity-0 transform translate-y-8 transition-all duration-700 delay-200 group-hover:opacity-100 group-hover:translate-y-0 text-center">
                    <p className="text-white leading-relaxed text-sm font-bold mb-3" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                      {challenge.description}
                    </p>
                    {/* Learn More Button */}
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-300">
                      <Link
                        to={`/challenges/${challenge.slug}`}
                        className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-xl border border-white/40"
                      >
                        Learn More
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Dimming effect for non-hovered panels */}
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Mobile/Tablet Vertical Accordion */}
          <div className="lg:hidden space-y-4">
            {[
              {
                title: "Poor Civic Sense",
                description: "Lack of civic responsibility and awareness leading to environmental degradation, traffic chaos, and social disorder that affects our daily lives.",
                image: "/assets/civic_sense.jpg",
                slug: "poor-civic-sense"
              },
              {
                title: "Broken Infrastructure",
                description: "Decaying roads, unreliable power supply, inadequate water systems, and crumbling public facilities that hinder progress and quality of life.",
                image: "/assets/broken_infrastructure.jpg",
                slug: "broken-infrastructure"
              },
              {
                title: "Waste & Pollution",
                description: "Rampant pollution, improper waste management, and environmental degradation threatening public health and ecological balance.",
                image: "/assets/waste_pollution.jpg",
                slug: "waste-pollution"
              },
              {
                title: "Unemployment",
                description: "Rising joblessness, lack of economic opportunities, and inadequate skill development leaving millions without dignified livelihoods.",
                image: "/assets/unemployment.jpg",
                slug: "unemployment"
              },
              {
                title: "Corrupt Authorities",
                description: "Systemic corruption, bureaucratic inefficiency, and misuse of power eroding public trust and hindering genuine development.",
                image: "/assets/corrupt_authorities.jpg",
                slug: "corrupt-authorities"
              },
              {
                title: "Undemocratic Practices",
                description: "Erosion of democratic values, suppression of dissent, and concentration of power undermining the very foundation of our republic.",
                image: "/assets/undemocratic_practices.jpg",
                slug: "undemocratic-practices"
              }
            ].map((challenge, index) => (
              <div key={index} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={challenge.image}
                    alt={challenge.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2">{challenge.title}</h3>
                    <p className="text-gray-200 text-sm leading-relaxed">{challenge.description}</p>
                    {/* Learn More Button for Mobile */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                      <Link
                        to={`/challenges/${challenge.slug}`}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        Learn More
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
       </section>
 
       {/* Featured Sections Preview */}
       <section className="py-20 bg-gradient-to-br from-orange-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Objectives Preview */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Objectives
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Building a self-reliant, culturally rooted, and prosperous India through transformative objectives
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {objectivesData.slice(0, 4).map((objective, index) => (
                <div
                  key={objective.id}
                  className={`group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden ${
                    loaded ? 'animate-fadeInUp' : 'opacity-0'
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both'
                  }}
                  role="article"
                  aria-labelledby={`objective-${objective.id}-title`}
                  tabIndex="0"
                >
                  {/* Share Button */}
                  <button
                    onClick={() => handleShare(objective)}
                    className="absolute top-4 left-4 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-orange-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                    aria-label={`Share objective ${objective.id}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                    </svg>
                  </button>

                  {/* Number Badge */}
                  <div className="absolute top-4 right-4 w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:animate-pulse">
                    {String(objective.id).padStart(2, '0')}
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="p-4 bg-gradient-to-r from-orange-100 to-green-100 dark:from-orange-900/30 dark:to-green-900/30 rounded-full">
                      <div className="text-orange-600 dark:text-orange-400">
                        {objective.icon}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    id={`objective-${objective.id}-title`}
                    className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300"
                  >
                    {objective.title}
                  </h3>

                  {/* Decorative Line */}
                  <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-green-500 mx-auto mb-4 group-hover:w-20 transition-all duration-300"></div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                    {objective.description}
                  </p>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/objectives"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Learn More About Our Objectives
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>

          {/* Manifesto Preview */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Manifesto
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                A comprehensive roadmap for building a stronger, self-reliant, and culturally rich India
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {(() => {
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
                    image: "/assets/students.jpg",
                    description: "End caste-based reservation - start poverty-based reservation"
                  },
                  {
                    category: "Population Control",
                    icon: "👨‍👩‍👧‍👦",
                    color: "from-indigo-500 to-indigo-600",
                    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                    description: "Strict population control law for sustainable future"
                  }
                ];
                return sankalpPoints.map((point, index) => (
                  <div key={index} className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 border border-gray-100 dark:border-gray-700">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-400 to-blue-500 rounded-full translate-y-12 -translate-x-12"></div>
                    </div>

                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={point.image}
                        alt={point.category}
                        className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                      {/* Floating Icon */}
                      <div className="absolute top-6 left-6 transform group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
                        <div className={`w-16 h-16 bg-gradient-to-r ${point.color} rounded-2xl flex items-center justify-center text-3xl shadow-2xl backdrop-blur-sm bg-opacity-90`}>
                          {point.icon}
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-xs font-semibold text-white border border-white/30">
                        {index + 1} of {sankalpPoints.length}
                      </div>

                      {/* Hover Overlay Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    <div className="relative p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                      {/* Decorative Elements */}
                      <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse delay-1000"></div>

                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300 leading-tight">
                        {point.category}
                      </h3>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mb-4 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-green-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                        {point.description}
                      </p>

                      {/* Action Button */}
                      <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                        <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                          Learn More
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Border Glow Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500 via-transparent to-green-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                ));
              })()}
            </div>

            <div className="text-center">
              <Link
                to="/manifesto"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Read Our Complete Manifesto
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Party Unity Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/party.jpeg"
            alt="Swadeshi Hind Party - United and Strong"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <div className="animate-fadeInUp">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              एक साथ, एक मज़बूत भारत
            </h2>
            <p className="text-2xl md:text-3xl mb-8 text-orange-200 font-medium">
              One United, One Strong India
            </p>
            <p className="text-xl md:text-2xl mb-12 text-gray-200 leading-relaxed max-w-4xl mx-auto">
              Our roots run deep in the soil of this ancient land. United by culture, strengthened by diversity,
              we stand as one force for India's renaissance. स्वदेशी विचार, स्वदेशी शक्ति - Indigenous thoughts, indigenous strength.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">संस्कृति की जड़ें</h3>
                <p className="text-orange-200">Cultural Roots</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">राष्ट्रीय एकता</h3>
                <p className="text-orange-200">National Unity</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">स्वदेशी शक्ति</h3>
                <p className="text-orange-200">Indigenous Strength</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-red-500/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-yellow-500/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-10 w-28 h-28 bg-green-500/20 rounded-full blur-xl"></div>
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
            About Swadeshi Hind Party
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
                Founded with a vision to create a self-reliant and culturally rooted India, the Swadeshi Hind Party represents the aspirations of millions who believe in the power of indigenous solutions and traditional values.
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
      image: "/assets/students.jpg",
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

        {/* Section Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveSection('sankalp')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeSection === 'sankalp'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              🇮🇳 Sankalp for Strong Bharat
            </button>
            <button
              onClick={() => setActiveSection('detailed')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeSection === 'detailed'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              📋 Detailed Policies
            </button>
          </div>
        </div>

        {/* Sankalp Section */}
        {activeSection === 'sankalp' && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                हमारा संकल्प - मजबूत भारत के लिए
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
                Our resolute pledge for a strong, prosperous, and self-reliant India. These are the transformational changes we promise to implement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sankalpPoints.map((point, index) => {
                const slugMap = {
                  1: 'youth-empowerment',
                  2: 'farmers-justice',
                  3: 'reservation-reform',
                  4: 'population-control',
                  5: 'one-nation-one-law',
                  6: 'health-for-all',
                  7: 'education-reform',
                  8: 'school-fee-regulation',
                  9: 'pension-justice',
                  10: 'public-welfare-support'
                };
                return (
                  <div key={index} className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 border border-gray-100 dark:border-gray-700">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-400 to-blue-500 rounded-full translate-y-12 -translate-x-12"></div>
                    </div>

                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={point.image}
                        alt={point.category}
                        className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                      {/* Floating Icon */}
                      <div className="absolute top-6 left-6 transform group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
                        <div className={`w-16 h-16 bg-gradient-to-r ${point.color} rounded-2xl flex items-center justify-center text-3xl shadow-2xl backdrop-blur-sm bg-opacity-90`}>
                          {point.icon}
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-xs font-semibold text-white border border-white/30">
                        {index + 1} of {sankalpPoints.length}
                      </div>

                      {/* Hover Overlay Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    <div className="relative p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                      {/* Decorative Elements */}
                      <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse delay-1000"></div>

                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300 leading-tight">
                        {point.category}
                      </h3>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mb-4 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-green-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                        {point.description}
                      </p>

                      {/* Action Button */}
                      <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                        <Link
                          to={`/manifesto/${slugMap[point.id] || ''}`}
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          Learn More
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </Link>
                      </div>
                    </div>

                    {/* Border Glow Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500 via-transparent to-green-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-r from-orange-600 to-red-600 dark:from-gray-800 dark:to-orange-900 rounded-2xl p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-4">🇮🇳 यही है हमारा संकल्प</h3>
              <p className="text-lg text-orange-100 dark:text-gray-300 max-w-3xl mx-auto">
                Every promise made is a promise to be kept. Together, we will build a stronger, more prosperous, and truly self-reliant India where every citizen can thrive with dignity and pride.
              </p>
            </div>
          </div>
        )}

        {/* Detailed Policies Section */}
        {activeSection === 'detailed' && (
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
        )}
      </div>
    </div>
  );
}

// Leadership Page
function Leadership() {
  const leaders = [
    {
      name: "Matendra Singh",
      position: "President",
      image: "/assets/matendra singh.jpg",
      bio: "A visionary leader dedicated to building a self-reliant and culturally rooted India through the five pillars of progress."
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
                    Hathras, Uttar Pradesh
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
                    +91 8650307307
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
                    info@swadeshihindparty.in
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