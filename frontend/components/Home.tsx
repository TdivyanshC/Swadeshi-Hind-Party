'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
const API = `${BACKEND_URL}/api`;

// Theme Context
const ThemeContext = React.createContext(null);

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
                href="/get-involved"
                className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Join the Movement
              </Link>
              <Link
                href="/manifesto"
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
                        href={`/challenges/${challenge.slug}`}
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
                        href={`/challenges/${challenge.slug}`}
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
              {[
                {
                  id: 1,
                  title: "Constitutional Respect & Defense",
                  description: "Ensuring complete honor to the Indian Constitution while implementing comprehensive security measures through strong and integrated defense mechanisms",
                  icon: (
                    <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3 7V17L12 22L21 17V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )
                },
                {
                  id: 2,
                  title: "One Nation, One Constitution, One Law",
                  description: "Implementing the principle of unified legal framework across Bharatvarsh to uphold honor, dignity, and equality in immediate effect",
                  icon: (
                    <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )
                },
                {
                  id: 3,
                  title: "Modern Defense Infrastructure",
                  description: "Arranging advanced military technology and modern weaponry for external security with immediate budget allocation for robust internal security systems",
                  icon: (
                    <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 7V17L12 22L22 17V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  id: 4,
                  title: "Cultural Heritage Preservation",
                  description: "Comprehensive protection and conservation of Indian culture, civilization, religious heritage, and historical monuments across the entire nation",
                  icon: (
                    <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 8H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                }
              ].map((objective: any, index: number) => (
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
                  tabIndex={0}
                >
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
                href="/objectives"
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
                href="/manifesto"
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
              href="/get-involved"
              className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Involved
            </Link>
            <Link
              href="/contact"
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

export default Home;