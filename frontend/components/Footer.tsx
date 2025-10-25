export default function Footer() {
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
                  <a
                    href={item.path}
                    className="text-orange-200 dark:text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </a>
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
  );
}