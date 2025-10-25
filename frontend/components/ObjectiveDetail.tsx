'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Objective data with detailed content for each objective
const objectiveDetails: { [key: string]: any } = {
  'constitutional-respect': {
    id: 1,
    title: "Constitutional Respect & Defense",
    description: "Ensuring complete honor to the Indian Constitution while implementing comprehensive security measures through strong and integrated defense mechanisms",
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 7V17L12 22L21 17V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    color: "from-orange-500 to-red-500",
    image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    fullDescription: `The Constitution of India is the sacred foundation of our democracy and the guiding light for our nation's progress. Our commitment to constitutional respect and defense ensures that every citizen's fundamental rights are protected while strengthening our national security.

**Key Initiatives:**
• Constitutional awareness programs in every school and college
• Protection of fundamental rights through judicial reforms
• Strengthening democratic institutions
• Comprehensive defense modernization
• Cyber security and information warfare capabilities

**Implementation Strategy:**
We will establish constitutional literacy programs and create fast-track courts for fundamental rights violations. Our defense strategy will focus on indigenous development while maintaining strategic partnerships.

**Expected Impact:**
This initiative will strengthen democratic values, ensure justice for all citizens, and create a secure environment for India's continued progress and prosperity.`,
    objectives: [
      "Establish constitutional courts in every state",
      "Implement digital constitutional literacy programs",
      "Modernize defense forces with indigenous technology",
      "Strengthen border security infrastructure",
      "Create comprehensive cyber defense systems"
    ],
    timeline: "Immediate implementation with 5-year modernization plan",
    budget: "₹10,00,000 crores for defense and constitutional reforms"
  },
  'one-nation-one-constitution': {
    id: 2,
    title: "One Nation, One Constitution, One Law",
    description: "Implementing the principle of unified legal framework across Bharatvarsh to uphold honor, dignity, and equality in immediate effect",
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    color: "from-blue-500 to-blue-600",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    fullDescription: `Unity in diversity is our strength, but legal uniformity is essential for justice. Our One Nation, One Constitution, One Law initiative creates a unified legal framework that ensures equal treatment for all citizens regardless of their location or background.

**Key Initiatives:**
• Uniform Civil Code implementation
• Unified criminal justice system
• Standardized administrative procedures
• Common economic policies across states
• National judicial standards

**Implementation Strategy:**
We will establish a constitutional amendment process to implement uniform laws while respecting cultural diversity. A national judicial commission will oversee the standardization process.

**Expected Impact:**
This initiative will eliminate legal disparities, ensure equal justice for all citizens, and create a more unified and stronger nation.`,
    objectives: [
      "Implement Uniform Civil Code within 3 years",
      "Create unified criminal procedure code",
      "Establish national judicial standards",
      "Standardize administrative procedures",
      "Implement common economic policies"
    ],
    timeline: "3-year implementation with phased rollout",
    budget: "₹50,000 crores for legal reforms"
  },
  'modern-defense-infrastructure': {
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
    ),
    color: "from-green-500 to-green-600",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    fullDescription: `A strong nation needs a strong defense. Our modern defense infrastructure program focuses on building indigenous military capabilities while ensuring comprehensive security for our citizens.

**Key Initiatives:**
• Indigenous defense production expansion
• Advanced missile and drone technology development
• Cyber warfare capabilities
• Space-based defense systems
• Modern border surveillance systems

**Implementation Strategy:**
We will increase defense spending to 3% of GDP and establish partnerships with private sector for technology development. Focus will be on self-reliance in critical technologies.

**Expected Impact:**
This program will make India self-sufficient in defense technology, create millions of jobs in defense sector, and ensure comprehensive security for our nation.`,
    objectives: [
      "Achieve 70% self-reliance in defense production",
      "Develop indigenous missile systems",
      "Establish cyber warfare command",
      "Modernize border surveillance",
      "Create space-based defense capabilities"
    ],
    timeline: "10-year modernization program",
    budget: "₹25,00,000 crores over 10 years"
  },
  'cultural-heritage-preservation': {
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
    ),
    color: "from-purple-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1513415277634-6fda6b25210c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    fullDescription: `Our cultural heritage is our identity and strength. This comprehensive program ensures the preservation and promotion of India's rich cultural traditions, monuments, and intangible heritage.

**Key Initiatives:**
• Digital documentation of cultural heritage
• Restoration of ancient monuments
• Preservation of traditional arts and crafts
• Cultural education in schools
• International cultural exchange programs

**Implementation Strategy:**
We will establish a national cultural heritage authority and create digital archives of our cultural wealth. Community participation will be encouraged in preservation efforts.

**Expected Impact:**
This program will preserve our cultural identity, boost tourism, create jobs in cultural sector, and strengthen national pride.`,
    objectives: [
      "Document 1 million cultural artifacts digitally",
      "Restore 10,000 heritage monuments",
      "Preserve 500 traditional art forms",
      "Establish cultural heritage museums",
      "Create cultural tourism circuits"
    ],
    timeline: "Ongoing program with 10-year intensive phase",
    budget: "₹1,00,000 crores for cultural preservation"
  }
};

interface ObjectiveDetailProps {
  slug: string;
}

export default function ObjectiveDetail({ slug }: ObjectiveDetailProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    window.scrollTo(0, 0);
  }, [slug]);

  const objective = objectiveDetails[slug];

  if (!objective) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 dark:from-gray-900 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Objective Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">The objective you're looking for doesn't exist.</p>
          <Link
            href="/objectives"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300"
          >
            Back to Objectives
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-orange-50 to-green-50 dark:from-gray-900 dark:to-gray-900 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-white/30 to-green-400/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className={`w-20 h-20 bg-gradient-to-r ${objective.color} rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-700 ${loaded ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
              <div className="text-white">
                {objective.icon}
              </div>
            </div>

            <h1 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-gray-800 to-green-600 bg-clip-text text-transparent mb-6 transform transition-all duration-700 delay-200 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {objective.title}
            </h1>

            <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transform transition-all duration-700 delay-300 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {objective.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Image */}
              <div className={`relative h-80 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-700 delay-400 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <img
                  src={objective.image}
                  alt={objective.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{objective.title}</h2>
                  <p className="text-gray-200">{objective.description}</p>
                </div>
              </div>

              {/* Detailed Description */}
              <div className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transform transition-all duration-700 delay-500 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About This Objective</h3>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {objective.fullDescription.split('\n\n').map((paragraph: string, index: number) => (
                    <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Objectives */}
              <div className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transform transition-all duration-700 delay-600 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Objectives</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {objective.objectives.map((obj: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 dark:text-gray-300">{obj}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline & Budget */}
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transform transition-all duration-700 delay-700 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Implementation Timeline</h4>
                  <p className="text-gray-600 dark:text-gray-300">{objective.timeline}</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Budget Allocation</h4>
                  <p className="text-gray-600 dark:text-gray-300">{objective.budget}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Facts */}
              <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg transform transition-all duration-700 delay-800 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Facts</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">Priority Level</span>
                    <span className="font-semibold text-orange-600">High</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">Target Beneficiaries</span>
                    <span className="font-semibold text-green-600">All Citizens</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 dark:text-gray-300">Implementation</span>
                    <span className="font-semibold text-blue-600">Immediate</span>
                  </div>
                </div>
              </div>

              {/* Related Objectives */}
              <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg transform transition-all duration-700 delay-900 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Related Objectives</h4>
                <div className="space-y-3">
                  {Object.entries(objectiveDetails)
                    .filter(([key]) => key !== slug)
                    .slice(0, 3)
                    .map(([key, obj]) => (
                      <Link
                        key={key}
                        href={`/objectives/${key}`}
                        className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 bg-gradient-to-r ${obj.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                            <div className="text-white opacity-80">
                              {React.cloneElement(obj.icon, { className: "w-4 h-4" })}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                              {obj.title}
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                              {obj.description.substring(0, 60)}...
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>

              {/* Share & Actions */}
              <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg transform transition-all duration-700 delay-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Share & Connect</h4>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Share on Twitter
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Share on Facebook
                  </button>
                  <Link
                    href="/get-involved"
                    className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300"
                  >
                    Get Involved
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Objectives */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Explore More Objectives
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Discover our comprehensive vision for India's transformation across all sectors
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/objectives"
              className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Objectives
            </Link>
            <Link
              href="/get-involved"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-105"
            >
              Join the Movement
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}