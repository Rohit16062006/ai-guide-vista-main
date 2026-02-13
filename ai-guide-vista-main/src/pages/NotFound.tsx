import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-8"
        >
          <div className="mb-6">
            <AlertTriangle className="w-16 h-16 text-warning mx-auto mb-4" />
            <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-6">
              Oops! The page you're looking for doesn't exist. Let's get you back on track.
            </p>
          </div>
          
          <Link to="/">
            <button className="neuro-button flex items-center justify-center mx-auto hover:glow-primary transition-all duration-300">
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
