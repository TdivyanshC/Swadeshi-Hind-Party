'use client'

import React, { useState } from 'react';
import Link from 'next/link';

export default function Manifesto() {
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
                const slugMap: { [key: number]: string } = {
                  0: 'youth-empowerment',
                  1: 'farmers-justice',
                  2: 'reservation-reform',
                  3: 'population-control',
                  4: 'one-nation-one-law',
                  5: 'health-for-all',
                  6: 'education-reform',
                  7: 'school-fee-regulation',
                  8: 'pension-justice',
                  9: 'public-welfare-support'
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
                          href={`/manifesto/${slugMap[index] || ''}`}
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