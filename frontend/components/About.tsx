'use client'

import React from 'react';

export default function About() {
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
              src="/assets/hero_img.jpeg"
              alt="Swadeshi Hind Party"
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