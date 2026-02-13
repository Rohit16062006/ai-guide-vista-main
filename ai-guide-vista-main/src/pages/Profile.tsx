import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, BookOpen, Trophy, Calendar, Clock, Target, TrendingUp, Edit3 } from 'lucide-react';
import AITeacher from '../components/AITeacher';

const profileData = {
  name: 'Alex Chen',
  email: 'alex.chen@email.com',
  avatar: '🧑‍🎓',
  joinDate: '2024-01-10',
  totalXP: 4590,
  level: 12,
  streak: 12,
  completedCourses: 3,
  activeCourses: 4,
  achievements: 8,
  totalStudyTime: '45h 30m'
};

const recentActivity = [
  { date: '2024-01-28', activity: 'Completed Advanced Calculus Quiz', xp: 150, type: 'quiz' },
  { date: '2024-01-28', activity: 'Unlocked "Speed Learner" Achievement', xp: 250, type: 'achievement' },
  { date: '2024-01-27', activity: 'Finished Chemistry Lab Session', xp: 200, type: 'lab' },
  { date: '2024-01-27', activity: 'Completed History Essay Assignment', xp: 180, type: 'assignment' },
  { date: '2024-01-26', activity: 'Participated in 3D Heart Model Lab', xp: 120, type: 'lab' }
];

const learningStats = [
  { label: 'Mathematics', progress: 75, xp: 1250, color: 'primary' },
  { label: 'Science', progress: 60, xp: 890, color: 'secondary' },
  { label: 'History', progress: 90, xp: 1800, color: 'accent' },
  { label: 'Literature', progress: 45, xp: 650, color: 'warning' }
];

const badges = [
  { name: 'First Steps', icon: '🌟', unlocked: true },
  { name: 'Speed Learner', icon: '⚡', unlocked: true },
  { name: 'Consistency King', icon: '🔥', unlocked: true },
  { name: 'Perfect Score', icon: '💯', unlocked: true },
  { name: 'Math Master', icon: '🧮', unlocked: false },
  { name: 'Science Star', icon: '🔬', unlocked: false }
];

function StatCard({ icon: Icon, label, value, color = 'primary' }: { 
  icon: any; 
  label: string; 
  value: string; 
  color?: string; 
}) {
  return (
    <div className="glass-card p-6 text-center hover:glass-hover transition-all duration-300">
      <div className={`w-12 h-12 rounded-full bg-${color}/20 flex items-center justify-center mx-auto mb-4`}>
        <Icon className={`w-6 h-6 text-${color}`} />
      </div>
      <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function ProgressBar({ progress, color = 'primary' }: { progress: number; color?: string }) {
  return (
    <div className="w-full bg-muted/30 rounded-full h-2">
      <div 
        className={`h-2 rounded-full transition-all duration-500 ${
          color === 'primary' ? 'bg-primary' :
          color === 'secondary' ? 'bg-secondary' :
          color === 'success' ? 'bg-success' :
          'bg-accent'
        }`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">Your Profile</h1>
          <p className="text-xl text-muted-foreground">
            Track your learning journey and personal achievements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel sticky top-32"
            >
              {/* Avatar & Basic Info */}
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{profileData.avatar}</div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-foreground">{profileData.name}</h2>
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="neuro w-8 h-8 rounded-full flex items-center justify-center hover:glow-primary transition-all duration-300"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-muted-foreground mb-2">{profileData.email}</p>
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  Joined {profileData.joinDate}
                </div>
              </div>

              {/* Level & XP */}
              <div className="neuro p-6 mb-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">Level {profileData.level}</div>
                <div className="text-sm text-muted-foreground mb-3">
                  {profileData.totalXP} XP Total
                </div>
                <ProgressBar progress={75} />
                <div className="text-xs text-muted-foreground mt-2">
                  250 XP to Level {profileData.level + 1}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 neuro-inset rounded-lg">
                  <span className="text-muted-foreground">Study Streak</span>
                  <span className="font-semibold text-foreground">{profileData.streak} days</span>
                </div>
                <div className="flex items-center justify-between p-3 neuro-inset rounded-lg">
                  <span className="text-muted-foreground">Study Time</span>
                  <span className="font-semibold text-foreground">{profileData.totalStudyTime}</span>
                </div>
                <div className="flex items-center justify-between p-3 neuro-inset rounded-lg">
                  <span className="text-muted-foreground">Courses</span>
                  <span className="font-semibold text-foreground">
                    {profileData.completedCourses}/{profileData.completedCourses + profileData.activeCourses}
                  </span>
                </div>
              </div>

              {/* AI Teacher Message */}
              <div className="mt-6">
                <AITeacher 
                  size="small"
                  position="relative"
                  message="Keep up the great work!"
                  showMessage={false}
                  showMicButton={false}
                />
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={Trophy} label="Achievements" value={profileData.achievements.toString()} color="warning" />
                <StatCard icon={BookOpen} label="Courses" value={profileData.activeCourses.toString()} color="primary" />
                <StatCard icon={Target} label="Streak Days" value={profileData.streak.toString()} color="success" />
                <StatCard icon={Clock} label="Study Time" value={profileData.totalStudyTime} color="secondary" />
              </div>
            </motion.div>

            {/* Subject Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-primary" />
                Subject Progress
              </h2>
              
              <div className="space-y-6">
                {learningStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="neuro p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-foreground">{stat.label}</h3>
                      <div className="text-right">
                        <div className="font-bold text-foreground">{stat.progress}%</div>
                        <div className="text-sm text-muted-foreground">{stat.xp} XP</div>
                      </div>
                    </div>
                    <ProgressBar progress={stat.progress} color={stat.color} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-panel"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-primary" />
                Recent Badges
              </h2>
              
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {badges.map((badge, index) => (
                  <motion.div
                    key={badge.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`neuro p-4 text-center transition-all duration-300 ${
                      badge.unlocked 
                        ? 'hover:glow-success cursor-pointer' 
                        : 'opacity-50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{badge.icon}</div>
                    <div className="text-xs font-medium text-foreground">{badge.name}</div>
                    {badge.unlocked && (
                      <div className="text-xs text-success mt-1">Unlocked</div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-panel"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-primary" />
                Recent Activity
              </h2>
              
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="neuro-inset p-4 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium text-foreground">{activity.activity}</div>
                      <div className="text-sm text-muted-foreground">{activity.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-success">+{activity.xp} XP</div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        activity.type === 'achievement' ? 'bg-warning/20 text-warning' :
                        activity.type === 'quiz' ? 'bg-primary/20 text-primary' :
                        activity.type === 'lab' ? 'bg-secondary/20 text-secondary' :
                        'bg-accent/20 text-accent'
                      }`}>
                        {activity.type}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}