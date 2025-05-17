// app/layout.js
"use client";

import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const metadata = {
  title: 'Data Streamliner',
  description: 'Streamline your data journey',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 sm:px-6 pt-24 bg-gradient-to-br from-gray-400 to-indigo-400">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

function Navbar() {
  const pathname = usePathname();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  // Check if route is active
  const isActive = (route) => pathname === route;

  return (
    <header className={`fixed w-full bg-gradient-to-r from-blue-800 to-purple-800 backdrop-blur-md shadow-lg z-50 transition-all duration-500 ${showNavbar ? 'top-0' : '-top-24'}`}>
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white hover:text-blue-200 transition">
            <span className="bg-gradient-to-r from-blue-300 to-purple-200 bg-clip-text text-transparent">Data Streamliner</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6">
              <Link 
                href="/" 
                className={`${isActive('/') ? 'text-white font-semibold underline underline-offset-4' : 'text-white/90 hover:text-white'} font-medium transition`}
              >
                Home
              </Link>
              <Link 
                href="/work" 
                className={`${isActive('/work') ? 'text-white font-semibold underline underline-offset-4' : 'text-white/90 hover:text-white'} font-medium transition`}
              >
                How It Works
              </Link>
              <Link 
                href="/eda" 
                className={`${isActive('/eda') ? 'text-white font-semibold underline underline-offset-4' : 'text-white/90 hover:text-white'} font-medium transition`}
              >
                EDA
              </Link>
              <Link 
                href="/clean-data" 
                className={`${isActive('/clean-datar') ? 'text-white font-semibold underline underline-offset-4' : 'text-white/90 hover:text-white'} font-medium transition`}
              >
                Clean Data
              </Link>
              <Link 
                href="/train" 
                className={`${isActive('/train') ? 'text-white font-semibold underline underline-offset-4' : 'text-white/90 hover:text-white'} font-medium transition`}
              >
                Train Model
              </Link>
              <Link 
                href="/report" 
                className={`${isActive('/report') ? 'text-white font-semibold underline underline-offset-4' : 'text-white/90 hover:text-white'} font-medium transition`}
              >
                Reports
              </Link>
               <Link 
                href="/blog" 
                className={`${isActive('/blog') ? 'text-white font-semibold underline underline-offset-4' : 'text-white/90 hover:text-white'} font-medium transition`}
              >
                Blogs
              </Link>
            </div>
            
            
            <div className="flex space-x-4 ml-4">
              <Link 
                href="/feedback" 
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition border border-white/20 hover:border-white/30 shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Feedback
              </Link>
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link 
              href="/" 
              className={`block ${isActive('/') ? 'text-white font-semibold' : 'text-white/90 hover:text-white'} py-2`}
            >
              Home
            </Link>
            <Link 
              href="/work" 
              className={`block ${isActive('/work') ? 'text-white font-semibold' : 'text-white/90 hover:text-white'} py-2`}
            >
              How It Works
            </Link>
            <Link 
              href="/eda" 
              className={`block ${isActive('/eda') ? 'text-white font-semibold' : 'text-white/90 hover:text-white'} py-2`}
            >
              EDA
            </Link>
            <Link 
              href="/clean-data" 
              className={`block ${isActive('/clean-data') ? 'text-white font-semibold' : 'text-white/90 hover:text-white'} py-2`}
            >
              Clean Data
            </Link>
            <Link 
              href="/train" 
              className={`block ${isActive('/train') ? 'text-white font-semibold' : 'text-white/90 hover:text-white'} py-2`}
            >
              Train
            </Link>
            <Link 
              href="/report" 
              className={`block ${isActive('/report') ? 'text-white font-semibold' : 'text-white/90 hover:text-white'} py-2`}
            >
              Reports
            </Link>
            <div className="pt-2">
              <Link 
                href="/feedback" 
                className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium text-center border border-white/20 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Feedback
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-purple-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-purple-200 bg-clip-text text-transparent">Data Streamliner</h3>
            <p className="text-blue-100">
              Empowering your data journey with cutting-edge tools for analysis, cleaning, and modeling.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-blue-200 hover:text-white transition">Home</Link></li>
              <li><Link href="/work" className="text-blue-200 hover:text-white transition">How It Works</Link></li>
              <li><Link href="/blog" className="text-blue-200 hover:text-white transition">Blog</Link></li>
              <li><Link href="/feedback" className="text-blue-200 hover:text-white transition">Feed Back</Link></li>
            </ul>
          </div>
          
          {/* Tools */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Our Tools</h4>
            <ul className="space-y-2">
              <li><Link href="/eda" className="text-blue-200 hover:text-white transition">Exploratory Analysis</Link></li>
              <li><Link href="/clean-data" className="text-blue-200 hover:text-white transition">Data Cleaning</Link></li>
              <li><Link href="/train" className="text-blue-200 hover:text-white transition">Model Training</Link></li>
              <li><Link href="/report" className="text-blue-200 hover:text-white transition">Report Generation</Link></li>
            </ul>
          </div>
          
          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Connect With Us</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span className="text-blue-200">muhammad.umar.ds7@gmail.com</span>
              </div>
              
            <div className="flex space-x-4 mt-4">
  {/* LinkedIn */}
  <a 
    href="https://www.linkedin.com/in/m-umar-ramzan" 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center hover:bg-blue-600 transition"
    aria-label="LinkedIn Profile"
  >
    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  </a>

  {/* GitHub */}
  <a 
    href="https://github.com/muhammad-umar-ramzan" 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition"
    aria-label="GitHub Profile"
  >
    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
    </svg>
  </a>

  {/* Portfolio Website */}
  <a 
    href="https://muhammad-umar-rust.vercel.app" 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-indigo-700 transition"
    aria-label="Portfolio Website"
  >
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
    </svg>
  </a>
</div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-700 mt-8 pt-6 text-center text-blue-300">
          <p>&copy; {new Date().getFullYear()} Data Streamliner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}