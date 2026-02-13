import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import StudentDashboard from '../components/dashboards/StudentDashboard';
import TeacherDashboard from '../components/dashboards/TeacherDashboard';
import AdminDashboard from '../components/dashboards/AdminDashboard';
import { Users, BookOpen, Shield } from 'lucide-react';
import { useUser } from '../context/UserContext';

const roles = [
  { id: 'student', name: 'Student', icon: BookOpen, color: 'primary' },
  { id: 'teacher', name: 'Teacher', icon: Users, color: 'secondary' },
  { id: 'admin', name: 'Admin', icon: Shield, color: 'accent' }
];

export default function Dashboard() {
  const { user } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentRole, setCurrentRole] = useState(searchParams.get('role') || 'student');

  const handleRoleChange = (roleId: string) => {
    setCurrentRole(roleId);
    setSearchParams({ role: roleId });
  };

  const renderDashboard = () => {
    switch (currentRole) {
      case 'teacher':
        return <TeacherDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card p-6 mb-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{user ? `Welcome, ${user.name}` : 'Welcome'}</h1>
              <p className="text-muted-foreground">Your personalized learning hub</p>
            </div>
            <Link to="/diagnostic">
              <button className="neuro-button">Start Diagnostic Test</button>
            </Link>
          </div>
        </motion.div>
        {/* Role Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="glass-panel p-4">
            <div className="flex items-center justify-center space-x-4">
              <span className="text-sm font-medium text-muted-foreground mr-4">Switch Role:</span>
              {roles.map((role) => {
                const Icon = role.icon;
                const isActive = currentRole === role.id;
                
                return (
                  <motion.button
                    key={role.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRoleChange(role.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      isActive 
                        ? `neuro-inset ${
                          role.color === 'primary' ? 'text-primary glow-primary' :
                          role.color === 'secondary' ? 'text-secondary glow-secondary' :
                          'text-accent glow-accent'
                        }` 
                        : 'neuro hover:shadow-lg text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{role.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Dashboard Content */}
        <motion.div
          key={currentRole}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderDashboard()}
        </motion.div>
      </div>
    </div>
  );
}