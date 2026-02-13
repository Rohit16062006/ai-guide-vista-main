import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, Users, Award, User, Box, Menu, X } from 'lucide-react';
import logo from '../assets/srestha-vidya-setu-logo.jpg';
const navItems = [{
  name: 'Home',
  path: '/',
  icon: Home
}, {
  name: 'Courses',
  path: '/courses',
  icon: BookOpen
}, {
  name: 'Dashboard',
  path: '/dashboard',
  icon: Users
}, {
  name: '3D Lab',
  path: '/lab',
  icon: Box
}, {
  name: 'Achievements',
  path: '/achievements',
  icon: Award
}, {
  name: 'Profile',
  path: '/profile',
  icon: User
}];
export default function Navigation() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return <>
      {/* Desktop Navigation */}
      <nav className="glass-panel fixed top-3 left-1/2 transform -translate-x-1/2 z-40 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 hidden md:block">
        <div className="flex items-center space-x-4 lg:space-x-8">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 mr-2 lg:mr-4">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden">
              <img src={logo} alt="Srestha Vidya Setu" className="w-full h-full object-cover" />
            </div>
            
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-3 lg:space-x-6">
            {navItems.map(item => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return <Link key={item.path} to={item.path} className="relative">
                  <motion.div whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} className={`flex items-center space-x-1 lg:space-x-2 px-2 lg:px-4 py-1 lg:py-2 rounded-full transition-all duration-300 ${isActive ? 'neuro-inset text-primary glow-primary' : 'hover:neuro text-muted-foreground hover:text-foreground'}`}>
                    <Icon className="w-3 h-3 lg:w-4 lg:h-4" />
                    <span className="text-xs lg:text-sm font-medium hidden lg:inline">{item.name}</span>
                  </motion.div>
                  
                  {/* Active indicator */}
                  {isActive && <motion.div layoutId="activeTab" className="absolute inset-0 rounded-full border-2 border-primary/30" initial={false} transition={{
                type: "spring",
                stiffness: 500,
                damping: 30
              }} />}
                </Link>;
          })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="glass-panel fixed top-3 left-3 right-3 z-40 px-4 py-3 md:hidden">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src={logo} alt="Srestha Vidya Setu" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-base text-foreground">Srestha Vidya Setu</span>
          </Link>

          {/* Mobile Menu Button */}
          <motion.button whileTap={{
          scale: 0.95
        }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="neuro p-2 rounded-full">
            {isMobileMenuOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
          </motion.button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && <motion.div initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: 'auto'
        }} exit={{
          opacity: 0,
          height: 0
        }} transition={{
          duration: 0.3
        }} className="mt-4 pt-4 border-t border-border/20">
              <div className="grid grid-cols-2 gap-2">
                {navItems.map(item => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className="relative">
                      <motion.div whileTap={{
                  scale: 0.95
                }} className={`flex flex-col items-center space-y-1 p-3 rounded-lg transition-all duration-300 ${isActive ? 'neuro-inset text-primary glow-primary' : 'hover:neuro text-muted-foreground hover:text-foreground'}`}>
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{item.name}</span>
                      </motion.div>
                    </Link>;
            })}
              </div>
            </motion.div>}
        </AnimatePresence>
      </nav>
    </>;
}