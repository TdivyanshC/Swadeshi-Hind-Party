import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Challenge data with detailed content for each core challenge
const challengeDetails = {
  'poor-civic-sense': {
    id: 1,
    title: "Poor Civic Sense",
    description: "Lack of civic responsibility and awareness leading to environmental degradation, traffic chaos, and social disorder that affects our daily lives.",
    icon: "🚫",
    color: "from-red-500 to-red-600",
    image: "/assets/civic_sense.jpg",
    fullDescription: `Poor civic sense is one of India's most pressing challenges that affects every citizen's quality of life. From littering public spaces to traffic violations, the lack of civic responsibility creates chaos and hinders national progress.

**Key Issues:**
• Rampant littering and environmental degradation
• Traffic violations and road safety concerns
• Noise pollution and public disturbance
• Lack of respect for public property
• Inadequate waste management practices

**Root Causes:**
The problem stems from inadequate civic education, lack of enforcement, and cultural acceptance of irresponsible behavior. Many citizens are unaware of their rights and responsibilities.

**Our Solution:**
We will implement comprehensive civic education programs from school level, strict enforcement of civic laws, and community participation in maintaining public spaces.`,
    solutions: [
      "Mandatory civic education in all schools",
      "Strict enforcement of traffic and civic laws",
      "Community-led cleanliness drives",
      "Public awareness campaigns",
      "Digital monitoring and citizen reporting systems"
    ],
    impact: "Improved quality of life, cleaner cities, reduced accidents, and enhanced community harmony",
    timeline: "3-year comprehensive program",
    budget: "₹50,000 crores for civic infrastructure and education"
  },
  'broken-infrastructure': {
    id: 2,
    title: "Broken Infrastructure",
    description: "Decaying roads, unreliable power supply, inadequate water systems, and crumbling public facilities that hinder progress and quality of life.",
    icon: "🏗️",
    color: "from-gray-500 to-gray-600",
    image: "/assets/floods.webp",
    fullDescription: `India's infrastructure crisis is a major bottleneck to economic growth and development. Decaying roads, unreliable power supply, and inadequate public facilities create daily challenges for citizens and businesses.

**Key Issues:**
• Poor road conditions and traffic congestion
• Unreliable power supply and frequent outages
• Inadequate water supply and sewage systems
• Crumbling public buildings and facilities
• Insufficient public transportation

**Root Causes:**
Years of neglect, poor maintenance, rapid urbanization without adequate planning, and insufficient investment in infrastructure development have led to this crisis.

**Our Solution:**
We will launch a massive infrastructure renewal program focusing on smart cities, renewable energy, and sustainable development practices.`,
    solutions: [
      "National infrastructure renewal program",
      "Smart city development initiatives",
      "Renewable energy expansion",
      "Public-private partnerships for infrastructure",
      "Digital infrastructure monitoring systems"
    ],
    impact: "Economic growth acceleration, improved quality of life, reduced business costs, and enhanced global competitiveness",
    timeline: "10-year infrastructure transformation",
    budget: "₹50,00,000 crores for comprehensive infrastructure development"
  },
  'waste-pollution': {
    id: 3,
    title: "Waste & Pollution",
    description: "Rampant pollution, improper waste management, and environmental degradation threatening public health and ecological balance.",
    icon: "♻️",
    color: "from-green-500 to-green-600",
    image: "/assets/authorities.jpg",
    fullDescription: `Environmental degradation and pollution have reached critical levels in India. Poor waste management, industrial pollution, and lack of environmental consciousness threaten public health and ecological balance.

**Key Issues:**
• Improper waste disposal and management
• Industrial pollution of air and water
• Plastic pollution and marine ecosystem damage
• Deforestation and loss of biodiversity
• Climate change impacts

**Root Causes:**
Rapid industrialization without environmental safeguards, lack of waste management infrastructure, and inadequate environmental regulations have contributed to this crisis.

**Our Solution:**
We will implement comprehensive environmental protection measures, promote circular economy principles, and create sustainable waste management systems.`,
    solutions: [
      "Nationwide waste management infrastructure",
      "Plastic ban and alternatives promotion",
      "Industrial pollution control measures",
      "Afforestation and biodiversity conservation",
      "Circular economy implementation"
    ],
    impact: "Cleaner environment, improved public health, biodiversity conservation, and sustainable development",
    timeline: "5-year environmental transformation",
    budget: "₹2,00,000 crores for environmental protection"
  },
  'unemployment': {
    id: 4,
    title: "Unemployment",
    description: "Rising joblessness, lack of economic opportunities, and inadequate skill development leaving millions without dignified livelihoods.",
    icon: "💼",
    color: "from-blue-500 to-blue-600",
    image: "/assets/unemployment-concept.webp",
    fullDescription: `Unemployment is a major socio-economic challenge affecting millions of Indians. The mismatch between education and job requirements, lack of skill development, and insufficient job creation have created a crisis.

**Key Issues:**
• High youth unemployment rates
• Skill gap between education and industry needs
• Lack of entrepreneurship opportunities
• Informal sector predominance
• Rural-urban migration pressures

**Root Causes:**
Outdated education system, lack of vocational training, insufficient industrial growth, and inadequate job creation policies have led to this situation.

**Our Solution:**
We will focus on skill development, entrepreneurship promotion, and creating an ecosystem for job creation through industry-academia collaboration.`,
    solutions: [
      "National skill development mission",
      "Industry-academia collaboration programs",
      "Entrepreneurship promotion initiatives",
      "Digital job platform creation",
      "Vocational education integration"
    ],
    impact: "Reduced unemployment, increased economic productivity, enhanced employability, and inclusive growth",
    timeline: "5-year employment generation program",
    budget: "₹3,00,000 crores for skill development and job creation"
  },
  'corrupt-authorities': {
    id: 5,
    title: "Corrupt Authorities",
    description: "Systemic corruption, bureaucratic inefficiency, and misuse of power eroding public trust and hindering genuine development.",
    icon: "⚖️",
    color: "from-yellow-500 to-yellow-600",
    image: "/assets/bridge.webp",
    fullDescription: `Corruption in governance and administration is a major impediment to India's progress. Bureaucratic red tape, misuse of power, and lack of transparency erode public trust and hinder development.

**Key Issues:**
• Bureaucratic corruption and bribery
• Lack of transparency in governance
• Inefficient public service delivery
• Misuse of public funds
• Political interference in administration

**Root Causes:**
Weak institutional mechanisms, lack of accountability, inadequate anti-corruption measures, and political patronage have perpetuated this problem.

**Our Solution:**
We will implement comprehensive anti-corruption measures, promote transparency, and create accountable governance systems.`,
    solutions: [
      "Digital governance implementation",
      "Anti-corruption authority establishment",
      "Transparent public procurement systems",
      "Citizen oversight mechanisms",
      "Accountability and performance-based administration"
    ],
    impact: "Improved governance, enhanced public trust, efficient service delivery, and accelerated development",
    timeline: "3-year governance reform program",
    budget: "₹25,000 crores for governance modernization"
  },
  'undemocratic-practices': {
    id: 6,
    title: "Undemocratic Practices",
    description: "Erosion of democratic values, suppression of dissent, and concentration of power undermining the very foundation of our republic.",
    icon: "🏛️",
    color: "from-purple-500 to-purple-600",
    image: "/assets/corrupt.webp",
    fullDescription: `The erosion of democratic values and institutions threatens the foundation of our republic. Suppression of dissent, concentration of power, and weakening of democratic institutions are serious concerns.

**Key Issues:**
• Suppression of free speech and dissent
• Weakening of democratic institutions
• Concentration of power in few hands
• Electoral malpractices
• Lack of accountability in governance

**Root Causes:**
Political patronage, weak institutional frameworks, inadequate protection of democratic rights, and lack of civic participation have contributed to this challenge.

**Our Solution:**
We will strengthen democratic institutions, protect fundamental rights, promote civic participation, and ensure accountability in governance.`,
    solutions: [
      "Strengthening democratic institutions",
      "Protecting freedom of speech and expression",
      "Electoral reforms and transparency",
      "Civic education and participation programs",
      "Judicial independence and accountability"
    ],
    impact: "Strengthened democracy, protected fundamental rights, enhanced civic participation, and accountable governance",
    timeline: "Ongoing democratic strengthening program",
    budget: "₹15,000 crores for democratic reforms"
  }
};

function ChallengeDetail({ slug }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    window.scrollTo(0, 0);
  }, [slug]);

  const challenge = challengeDetails[slug];

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 dark:from-gray-900 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Challenge Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">The challenge you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300"
          >
            Back to Home
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
            <div className={`w-20 h-20 bg-gradient-to-r ${challenge.color} rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-700 ${loaded ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
              <span className="text-3xl">{challenge.icon}</span>
            </div>

            <h1 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-gray-800 to-green-600 bg-clip-text text-transparent mb-6 transform transition-all duration-700 delay-200 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {challenge.title}
            </h1>

            <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transform transition-all duration-700 delay-300 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {challenge.description}
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
                  src={challenge.image}
                  alt={challenge.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{challenge.title}</h2>
                  <p className="text-gray-200">{challenge.description}</p>
                </div>
              </div>

              {/* Detailed Description */}
              <div className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transform transition-all duration-700 delay-500 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Understanding This Challenge</h3>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {challenge.fullDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <div className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transform transition-all duration-700 delay-600 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Solutions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {challenge.solutions.map((solution, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 dark:text-gray-300">{solution}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact & Timeline */}
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transform transition-all duration-700 delay-700 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">Expected Impact</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-center">{challenge.impact}</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">Implementation Timeline</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-center">{challenge.timeline}</p>
                </div>
              </div>

              {/* Budget */}
              <div className={`bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white text-center transform transition-all duration-700 delay-800 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <h4 className="text-2xl font-bold mb-2">Budget Allocation</h4>
                <p className="text-orange-100 text-lg">{challenge.budget}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Facts */}
              <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg transform transition-all duration-700 delay-900 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Facts</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">Severity Level</span>
                    <span className="font-semibold text-red-600">Critical</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">Affected Population</span>
                    <span className="font-semibold text-orange-600">All Citizens</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 dark:text-gray-300">Solution Status</span>
                    <span className="font-semibold text-green-600">Ready to Implement</span>
                  </div>
                </div>
              </div>

              {/* Related Challenges */}
              <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg transform transition-all duration-700 delay-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Related Challenges</h4>
                <div className="space-y-3">
                  {Object.entries(challengeDetails)
                    .filter(([key]) => key !== slug)
                    .slice(0, 3)
                    .map(([key, chal]) => (
                      <Link
                        key={key}
                        to={`/challenges/${key}`}
                        className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 bg-gradient-to-r ${chal.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                            <span className="text-sm">{chal.icon}</span>
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                              {chal.title}
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                              {chal.description.substring(0, 60)}...
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>

              {/* Share & Actions */}
              <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg transform transition-all duration-700 delay-1100 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
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
                    to="/get-involved"
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

      {/* Back to Home */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Explore More Challenges
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Understand India's core challenges and our comprehensive solutions for a better future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Home
            </Link>
            <Link
              to="/get-involved"
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

export default ChallengeDetail;