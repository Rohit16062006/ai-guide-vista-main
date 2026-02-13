import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Settings, TrendingUp, Database, Shield, AlertTriangle, Activity } from 'lucide-react';
import AITeacher from '../AITeacher';

const systemStats = [
  { label: 'Total Users', value: '2,847', change: '+12%', trend: 'up', icon: Users },
  { label: 'Active Courses', value: '156', change: '+8%', trend: 'up', icon: BookOpen },
  { label: 'System Load', value: '78%', change: '-5%', trend: 'down', icon: Activity },
  { label: 'Storage Used', value: '2.3TB', change: '+15%', trend: 'up', icon: Database }
];

const userManagement = [
  { name: 'Sarah Johnson', role: 'Teacher', status: 'active', lastLogin: '2h ago', courses: 3 },
  { name: 'Mike Chen', role: 'Student', status: 'active', lastLogin: '5m ago', courses: 4 },
  { name: 'Emma Wilson', role: 'Teacher', status: 'inactive', lastLogin: '2d ago', courses: 2 },
  { name: 'Alex Rodriguez', role: 'Admin', status: 'active', lastLogin: '1h ago', courses: 0 },
  { name: 'Lisa Park', role: 'Student', status: 'pending', lastLogin: 'never', courses: 0 }
];

const aiConfiguration = [
  {
    setting: 'Response Complexity',
    value: 'Adaptive',
    description: 'AI adjusts explanations based on student level',
    status: 'optimal'
  },
  {
    setting: 'Learning Path Generation',
    value: 'Enabled',
    description: 'Automatically creates personalized learning paths',
    status: 'optimal'
  },
  {
    setting: 'Content Moderation',
    value: 'High',
    description: 'Strict filtering for age-appropriate content',
    status: 'optimal'
  },
  {
    setting: 'Analytics Collection',
    value: 'Full',
    description: 'Comprehensive learning analytics and insights',
    status: 'warning'
  }
];

const systemAlerts = [
  { type: 'warning', message: 'High server load detected in EU region', time: '15m ago' },
  { type: 'info', message: 'Scheduled maintenance in 2 hours', time: '1h ago' },
  { type: 'success', message: 'AI model update completed successfully', time: '3h ago' },
  { type: 'error', message: 'Failed login attempts from IP 192.168.1.100', time: '5h ago' }
];

function StatCard({ stat, index }: { stat: typeof systemStats[0]; index: number }) {
  const Icon = stat.icon;
  const trendColor = stat.trend === 'up' ? 'success' : 'warning';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-6 hover:glass-hover transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <span className={`text-sm font-medium text-${trendColor}`}>
          {stat.change}
        </span>
      </div>
      <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
      <div className="text-sm text-muted-foreground">{stat.label}</div>
    </motion.div>
  );
}

function UserRow({ user, index }: { user: typeof userManagement[0]; index: number }) {
  const statusColors = {
    active: 'success',
    inactive: 'warning',
    pending: 'secondary',
    suspended: 'destructive'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="neuro-inset p-4 flex items-center justify-between"
    >
      <div className="flex-1">
        <div className="font-medium text-foreground">{user.name}</div>
        <div className="text-sm text-muted-foreground">{user.role}</div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-center">
          <div className="text-sm font-medium text-foreground">{user.courses}</div>
          <div className="text-xs text-muted-foreground">Courses</div>
        </div>
        
        <div className="text-center">
          <div className="text-sm text-muted-foreground">{user.lastLogin}</div>
          <div className="text-xs text-muted-foreground">Last Login</div>
        </div>
        
        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${statusColors[user.status as keyof typeof statusColors]}/20 text-${statusColors[user.status as keyof typeof statusColors]}`}>
          {user.status}
        </span>
        
        <div className="flex gap-1">
          <button className="neuro w-8 h-8 rounded flex items-center justify-center text-xs hover:glow-primary transition-all duration-300">
            <Settings className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">System overview and platform management</p>
          </div>
          <div className="hidden md:block">
            <AITeacher 
              size="small"
              position="relative"
              message="System running smoothly!"
              showMessage={false}
              showMicButton={false}
            />
          </div>
        </div>
      </motion.div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>

      {/* System Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel"
      >
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-primary" />
          System Alerts
        </h2>
        
        <div className="space-y-3">
          {systemAlerts.map((alert, index) => {
            const alertColors = {
              error: 'destructive',
              warning: 'warning',
              info: 'primary',
              success: 'success'
            };
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="neuro-inset p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-${alertColors[alert.type as keyof typeof alertColors]}`} />
                  <span className="text-foreground">{alert.message}</span>
                </div>
                <span className="text-sm text-muted-foreground">{alert.time}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Management */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <Users className="w-6 h-6 mr-2 text-primary" />
            User Management
          </h2>
          
          <div className="space-y-3">
            {userManagement.map((user, index) => (
              <UserRow key={user.name} user={user} index={index} />
            ))}
          </div>
          
          <div className="flex gap-2 mt-4">
            <button className="neuro-button flex-1 hover:glow-primary transition-all duration-300">
              Add User
            </button>
            <button className="neuro-button flex-1 hover:glow-secondary transition-all duration-300">
              Bulk Actions
            </button>
          </div>
        </motion.div>

        {/* AI Configuration */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-panel"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-primary" />
            AI Configuration
          </h2>
          
          <div className="space-y-4">
            {aiConfiguration.map((config, index) => {
              const statusColors = {
                optimal: 'success',
                warning: 'warning',
                error: 'destructive'
              };
              
              return (
                <motion.div
                  key={config.setting}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="neuro p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{config.setting}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full bg-${statusColors[config.status as keyof typeof statusColors]}`} />
                      <span className="text-sm font-medium text-foreground">{config.value}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{config.description}</p>
                  <button className="neuro-button text-sm hover:glow-primary transition-all duration-300">
                    Configure
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Analytics Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-panel"
      >
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-primary" />
          Platform Analytics
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="neuro p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">94.5%</div>
            <div className="text-sm text-muted-foreground mb-2">User Satisfaction</div>
            <div className="text-xs text-success">+2.3% from last month</div>
          </div>
          
          <div className="neuro p-6 text-center">
            <div className="text-3xl font-bold text-secondary mb-2">1.2M</div>
            <div className="text-sm text-muted-foreground mb-2">Lessons Completed</div>
            <div className="text-xs text-success">+18% from last month</div>
          </div>
          
          <div className="neuro p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">45min</div>
            <div className="text-sm text-muted-foreground mb-2">Avg Session Time</div>
            <div className="text-xs text-success">+5% from last month</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}