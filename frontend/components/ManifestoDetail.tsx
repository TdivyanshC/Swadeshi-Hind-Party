'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Manifesto data with detailed content for each topic
const manifestoDetails: { [key: string]: any } = {
  'youth-empowerment': {
    id: 1,
    title: "Youth Empowerment",
    icon: "🎓",
    color: "from-blue-500 to-blue-600",
    image: "/assets/youth.jpeg",
    shortDescription: "Government-funded competitive exam coaching for youth",
    fullDescription: `Our commitment to youth empowerment represents a fundamental investment in India's future. We recognize that the youth are the backbone of our nation's progress and innovation.

**Key Initiatives:**
• Government-funded competitive exam coaching centers in every district
• Free study materials and online learning platforms
• Skill development programs aligned with industry needs
• Entrepreneurship incubation centers for young innovators
• International exchange programs for cultural and educational exposure

**Implementation Strategy:**
The program will establish dedicated coaching centers equipped with modern facilities, experienced faculty, and comprehensive study materials. We will partner with educational institutions and industry leaders to ensure our youth receive world-class preparation for competitive examinations and career opportunities.

**Expected Impact:**
Within the first five years, we aim to increase India's competitive exam success rate by 300% and create 10 million skilled job opportunities for our youth. This initiative will transform India into a global hub of skilled professionals and innovative entrepreneurs.`,
    objectives: [
      "Establish 5,000+ competitive exam coaching centers nationwide",
      "Provide free education to 50 million youth annually",
      "Create 10 million skilled job opportunities",
      "Develop 1,000 entrepreneurship incubation centers",
      "Launch international exchange programs for 100,000 students"
    ],
    timeline: "Immediate implementation within 6 months of forming government",
    budget: "₹50,000 crores allocated for first 5 years"
  },
  'farmers-justice': {
    id: 2,
    title: "Farmers' Justice",
    icon: "🚜",
    color: "from-green-500 to-green-600",
    image: "/assets/farmer.jpeg",
    shortDescription: "Loan waiver and legal MSP guarantee for all farmers",
    fullDescription: `Agriculture is the backbone of our economy and farmers are the real wealth creators of our nation. Our comprehensive farmers' justice program addresses the systemic issues that have plagued Indian agriculture for decades.

**Key Initiatives:**
• Complete loan waiver for all farmer debts
• Legal guarantee for Minimum Support Price (MSP) at 50% above production cost
• Establishment of Farmers' Commission for policy advocacy
• Modernization of agricultural infrastructure
• Sustainable farming practices and climate-resilient crop varieties

**Implementation Strategy:**
We will create a dedicated Farmers' Commission with constitutional status to ensure farmer interests are protected. The MSP will be calculated scientifically and legally guaranteed, removing the uncertainty that farmers currently face.

**Expected Impact:**
This program will provide economic security to 140 million farmers and their families, increase agricultural productivity by 40%, and ensure food security for 1.4 billion Indians.`,
    objectives: [
      "Complete loan waiver for 140 million farmers",
      "Legal MSP guarantee at 50% above production cost",
      "Establish constitutional Farmers' Commission",
      "Modernize irrigation infrastructure covering 50 million hectares",
      "Implement sustainable farming practices nationwide"
    ],
    timeline: "Loan waiver within 3 months, MSP guarantee within 6 months",
    budget: "₹2,50,000 crores for comprehensive agricultural transformation"
  },
  'reservation-reform': {
    id: 3,
    title: "Reservation Reform",
    icon: "⚖️",
    color: "from-gray-500 to-gray-600",
    image: "/assets/students.jpg",
    shortDescription: "End caste-based reservation - start poverty-based reservation",
    fullDescription: `True equality cannot be achieved through divisive caste-based reservations that have perpetuated social divisions for decades. Our reservation reform focuses on economic empowerment based on genuine need rather than birth-based criteria.

**Key Initiatives:**
• Complete abolition of caste-based reservation system
• Implementation of poverty and economic criteria-based reservations
• Merit-based opportunities with economic support for underprivileged
• Skill development programs for economic upliftment
• Transparent and scientific assessment methods

**Implementation Strategy:**
We will replace the current caste-based system with a poverty-index based reservation that provides genuine support to those who need it most. This will ensure that benefits reach the truly disadvantaged while promoting meritocracy and national unity.

**Expected Impact:**
This reform will create a more equitable society where opportunities are based on merit and need rather than birth, fostering national integration and economic growth.`,
    objectives: [
      "Abolish all caste-based reservations within 2 years",
      "Implement poverty-index based reservation system",
      "Create economic upliftment programs for 100 million families",
      "Establish transparent assessment and monitoring mechanisms",
      "Promote merit-based opportunities with support for disadvantaged"
    ],
    timeline: "Phased implementation over 2 years with immediate policy announcement",
    budget: "₹1,00,000 crores for economic empowerment programs"
  },
  'population-control': {
    id: 4,
    title: "Population Control",
    icon: "👨‍👩‍👧‍👦",
    color: "from-indigo-500 to-indigo-600",
    image: "/assets/population.avif",
    shortDescription: "Strict population control law for sustainable future",
    fullDescription: `Sustainable development requires responsible population management. Our comprehensive population control program balances individual rights with national responsibility for future generations.

**Key Initiatives:**
• Strict but humane population control measures
• Incentives for small family norms
• Quality family planning services nationwide
• Education and awareness programs
• Economic benefits for responsible family planning

**Implementation Strategy:**
We will implement a balanced approach that respects individual choices while ensuring national sustainability. The program will focus on education, incentives, and quality healthcare services rather than coercive measures.

**Expected Impact:**
This program will stabilize India's population growth, ensure better resource distribution, improve quality of life, and create a sustainable future for all citizens.`,
    objectives: [
      "Stabilize population growth within 15 years",
      "Provide quality family planning services to 100% population",
      "Implement incentives for small family norms",
      "Launch nationwide education and awareness campaigns",
      "Ensure sustainable resource distribution for future generations"
    ],
    timeline: "Immediate implementation with phased rollout",
    budget: "₹25,000 crores for comprehensive population management"
  },
  'one-nation-one-law': {
    id: 5,
    title: "One Nation, One Law",
    icon: "🏛️",
    color: "from-amber-500 to-amber-600",
    image: "/assets/justice.avif",
    shortDescription: "Uniform Civil Code for equal rights to all citizens",
    fullDescription: `Unity in diversity is our strength, but legal diversity should not divide our society. Our One Nation, One Law initiative aims to establish a Uniform Civil Code that ensures equal rights and justice for all citizens regardless of religion, caste, or community.

**Key Initiatives:**
• Implementation of Uniform Civil Code across India
• Reform of personal laws to eliminate discriminatory practices
• Protection of minority rights while ensuring equality
• Modernization of legal framework for contemporary needs
• Nationwide legal education and awareness programs

**Implementation Strategy:**
We will establish a comprehensive legal reform commission to draft and implement the Uniform Civil Code. The code will respect cultural sensitivities while ensuring fundamental rights and equality for all citizens.

**Expected Impact:**
This initiative will strengthen national unity, eliminate legal discrimination, and create a more cohesive and just society where every citizen enjoys equal rights and opportunities.`,
    objectives: [
      "Draft and implement Uniform Civil Code within 3 years",
      "Reform personal laws to ensure gender equality",
      "Establish legal reform commission with diverse representation",
      "Launch nationwide legal literacy programs",
      "Create unified judicial system for faster justice delivery"
    ],
    timeline: "Implementation within 3 years with phased rollout",
    budget: "₹10,000 crores for legal reforms and education"
  },
  'health-for-all': {
    id: 6,
    title: "Health for All",
    icon: "🏥",
    color: "from-teal-500 to-teal-600",
    image: "/assets/health.avif",
    shortDescription: "Mandatory health insurance for every citizen",
    fullDescription: `Healthcare is a fundamental right, not a privilege. Our Health for All program ensures that every citizen has access to quality healthcare services through comprehensive health insurance and infrastructure development.

**Key Initiatives:**
• Mandatory universal health insurance coverage
• Establishment of government hospitals in every district
• Free treatment for critical illnesses
• Preventive healthcare and wellness programs
• Integration of traditional and modern medicine

**Implementation Strategy:**
We will implement a universal health insurance scheme covering all citizens with minimal premium contributions. Government will subsidize costs for economically weaker sections while ensuring quality healthcare delivery.

**Expected Impact:**
This program will reduce out-of-pocket healthcare expenses by 80%, increase life expectancy by 10 years, and create a healthier, more productive population.`,
    objectives: [
      "Implement universal health insurance within 2 years",
      "Establish 10,000+ primary health centers nationwide",
      "Provide free treatment for critical diseases",
      "Launch preventive healthcare programs",
      "Integrate AYUSH with modern medicine systems"
    ],
    timeline: "Universal coverage within 2 years, full implementation in 5 years",
    budget: "₹5,00,000 crores for comprehensive healthcare transformation"
  },
  'education-reform': {
    id: 7,
    title: "Education Reform",
    icon: "📚",
    color: "from-rose-500 to-rose-600",
    image: "/assets/education.avif",
    shortDescription: "Compulsory moral, health, technical, and military education",
    fullDescription: `Education must prepare our youth for the challenges of the 21st century while preserving our cultural values. Our comprehensive education reform focuses on holistic development combining academic excellence with practical skills and moral education.

**Key Initiatives:**
• Compulsory moral and ethical education in all schools
• Integration of health, technical, and military education
• Vocational training from secondary level
• Digital literacy and skill development programs
• Preservation of cultural heritage in curriculum

**Implementation Strategy:**
We will reform the education system to include compulsory subjects that build character, health consciousness, technical skills, and national pride. The curriculum will balance modern education with traditional values.

**Expected Impact:**
This reform will create well-rounded individuals who are academically sound, morally strong, technically skilled, and physically fit, ready to lead India into a prosperous future.`,
    objectives: [
      "Implement compulsory moral education nationwide",
      "Introduce technical education from class 6",
      "Establish military training programs in schools",
      "Launch digital literacy initiatives",
      "Reform curriculum to include cultural heritage"
    ],
    timeline: "Phased implementation over 3 years",
    budget: "₹2,00,000 crores for education infrastructure and teacher training"
  },
  'school-fee-regulation': {
    id: 8,
    title: "School Fee Regulation",
    icon: "🎒",
    color: "from-cyan-500 to-cyan-600",
    image: "/assets/fees.avif",
    shortDescription: "Strict control on private school fees - no exploitation",
    fullDescription: `Quality education should be accessible to all, not just the privileged few. Our school fee regulation ensures that private schools cannot exploit parents while maintaining educational quality and teacher welfare.

**Key Initiatives:**
• Strict fee regulation for all private schools
• Transparent fee structure with government oversight
• Quality education standards enforcement
• Teacher salary standardization
• Financial assistance for deserving students

**Implementation Strategy:**
We will establish a regulatory authority to monitor and control school fees, ensuring they are reasonable and justified. Schools will be required to maintain transparency in their financial operations.

**Expected Impact:**
This regulation will reduce the financial burden on parents, ensure quality education, and prevent exploitation while maintaining high educational standards.`,
    objectives: [
      "Establish fee regulatory authority",
      "Implement transparent fee structures",
      "Provide financial aid to 50 million students",
      "Standardize teacher salaries",
      "Enforce quality education standards"
    ],
    timeline: "Implementation within 1 year",
    budget: "₹50,000 crores for student financial assistance"
  },
  'pension-justice': {
    id: 9,
    title: "Pension Justice",
    icon: "👴",
    color: "from-emerald-500 to-emerald-600",
    image: "/assets/pension.avif",
    shortDescription: "Restore pensions of government employees, end perks of MLAs/MPs if required",
    fullDescription: `Government employees have served the nation faithfully and deserve dignity in retirement. Our pension justice program ensures fair pensions while rationalizing excessive perks for elected representatives.

**Key Initiatives:**
• Restoration of old pension scheme for government employees
• Rationalization of MLA/MP allowances and perks
• Transparent pension fund management
• Social security for all retirees
• Pension parity across government services

**Implementation Strategy:**
We will restore the defined benefit pension system for government employees while ensuring fiscal responsibility. Elected representatives' perks will be aligned with actual requirements.

**Expected Impact:**
This program will provide financial security to millions of retired government employees and ensure responsible use of public funds.`,
    objectives: [
      "Restore old pension scheme",
      "Rationalize MLA/MP perks",
      "Establish transparent pension funds",
      "Provide social security coverage",
      "Ensure pension parity across services"
    ],
    timeline: "Implementation within 6 months",
    budget: "₹1,00,000 crores for pension restoration"
  },
  'public-welfare-support': {
    id: 10,
    title: "Public Welfare Support",
    icon: "🤝",
    color: "from-violet-500 to-violet-600",
    image: "/assets/public.avif",
    shortDescription: "Full support to laws like population control and every initiative for public welfare",
    fullDescription: `Public welfare is paramount in our governance philosophy. Our comprehensive support program ensures that all initiatives aimed at improving public welfare receive full governmental backing and resources.

**Key Initiatives:**
• Full implementation of population control measures
• Support for environmental protection initiatives
• Welfare programs for vulnerable sections
• Public health and sanitation drives
• Community development programs

**Implementation Strategy:**
We will provide unwavering support to all public welfare initiatives, ensuring adequate funding, infrastructure, and administrative support for their successful implementation.

**Expected Impact:**
This comprehensive support will improve quality of life, enhance public health, protect the environment, and create sustainable communities across India.`,
    objectives: [
      "Implement population control measures",
      "Launch environmental protection programs",
      "Support vulnerable community welfare",
      "Improve public health infrastructure",
      "Promote sustainable community development"
    ],
    timeline: "Immediate implementation",
    budget: "₹2,00,000 crores for public welfare programs"
  }
};

interface ManifestoDetailProps {
  slug: string;
}

export default function ManifestoDetail({ slug }: ManifestoDetailProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    window.scrollTo(0, 0);
  }, [slug]);

  const manifesto = manifestoDetails[slug];

  if (!manifesto) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 dark:from-gray-900 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Topic Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">The manifesto topic you're looking for doesn't exist.</p>
          <Link
            href="/manifesto"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300"
          >
            Back to Manifesto
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
            <div className={`w-20 h-20 bg-gradient-to-r ${manifesto.color} rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-700 ${loaded ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
              {typeof manifesto.icon === 'string' ? (
                <span className="text-3xl">{manifesto.icon}</span>
              ) : (
                <div className="text-orange-600 dark:text-orange-400">
                  {manifesto.icon}
                </div>
              )}
            </div>

            <h1 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-gray-800 to-green-600 bg-clip-text text-transparent mb-6 transform transition-all duration-700 delay-200 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {manifesto.title}
            </h1>

            <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transform transition-all duration-700 delay-300 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {manifesto.shortDescription}
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
                  src={manifesto.image}
                  alt={manifesto.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{manifesto.title}</h2>
                  <p className="text-gray-200">{manifesto.shortDescription}</p>
                </div>
              </div>

              {/* Detailed Description */}
              <div className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transform transition-all duration-700 delay-500 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About This Initiative</h3>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {manifesto.fullDescription.split('\n\n').map((paragraph: string, index: number) => (
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
                  {manifesto.objectives.map((objective: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 dark:text-gray-300">{objective}</p>
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
                  <p className="text-gray-600 dark:text-gray-300">{manifesto.timeline}</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Budget Allocation</h4>
                  <p className="text-gray-600 dark:text-gray-300">{manifesto.budget}</p>
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
                    <span className="font-semibold text-green-600">Millions</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 dark:text-gray-300">Implementation</span>
                    <span className="font-semibold text-blue-600">Immediate</span>
                  </div>
                </div>
              </div>

              {/* Related Topics */}
              <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg transform transition-all duration-700 delay-900 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Related Topics</h4>
                <div className="space-y-3">
                  {Object.entries(manifestoDetails)
                    .filter(([key]) => key !== slug)
                    .slice(0, 3)
                    .map(([key, topic]) => (
                      <Link
                        key={key}
                        href={`/manifesto/${key}`}
                        className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 bg-gradient-to-r ${topic.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                            {typeof topic.icon === 'string' ? (
                              <span className="text-sm">{topic.icon}</span>
                            ) : (
                              <div className="text-white opacity-80">
                                {React.cloneElement(topic.icon, { className: "w-4 h-4" })}
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                              {topic.title}
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                              {topic.shortDescription}
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
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Share on Twitter
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Share on Facebook
                  </button>
                  <Link
                    href="/get-involved"
                    className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300"
                  >
                    Get Involved
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Manifesto */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Explore More Manifesto Topics
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Discover our comprehensive vision for India's transformation across all sectors
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/manifesto"
              className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Manifesto
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