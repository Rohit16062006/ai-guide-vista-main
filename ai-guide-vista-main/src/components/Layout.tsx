import React from 'react';
import { Outlet } from 'react-router-dom';
import AITeacher from './AITeacher';
import Navigation from './Navigation';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen w-full relative">
      {/* Background gradient blobs - responsive sizes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-56 sm:h-56 lg:w-80 lg:h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-accent/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main content with proper spacing for mobile navigation */}
      <main className="relative z-10 pt-20 md:pt-24">
        <div className="px-3 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* AI Teacher - responsive positioning */}
      <AITeacher 
        size="medium"
        position="fixed"
        showMicButton={true}
      />
    </div>
  );
}