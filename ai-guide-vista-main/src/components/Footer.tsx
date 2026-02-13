import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Youtube,
  BookOpen,
  Users,
  Award,
  User,
  Box,
  Home
} from 'lucide-react';
import logo from '../assets/srestha-vidya-setu-logo.jpg';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Courses', path: '/courses', icon: BookOpen },
    { name: 'Dashboard', path: '/dashboard', icon: Users },
    { name: '3D Lab', path: '/lab', icon: Box },
    { name: 'Achievements', path: '/achievements', icon: Award },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const features = [
    'AI-Powered Teachers',
    'Gamified Learning',
    '24/7 AI Doubt Solver',
    'Real-time Dashboards',
    'Voice Navigation',
    'Sign Language Support'
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: '#' },
    { name: 'Twitter', icon: Twitter, url: '#' },
    { name: 'Instagram', icon: Instagram, url: '#' },
    { name: 'LinkedIn', icon: Linkedin, url: '#' },
    { name: 'YouTube', icon: Youtube, url: '#' }
  ];

  return (
    <footer className="bg-gradient-to-t from-background/95 to-background/80 backdrop-blur-sm border-t border-border/20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={logo} alt="Srestha Vidya Setu" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">Srestha Vidya Setu</h3>
                <p className="text-sm text-muted-foreground">Bridge to the Finest Knowledge</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 text-sm">
              Revolutionary AI-powered education platform breaking barriers and making quality learning accessible to everyone.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-primary" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.path}>
                    <Link 
                      to={link.path}
                      className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Key Features</h4>
            <ul className="space-y-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-center space-x-2 text-muted-foreground text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@sresthavidyasetu.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-start space-x-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>Education Hub, Tech City<br />Bangalore, Karnataka 560001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 Srestha Vidya Setu. All rights reserved. Bridging minds to excellence.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;