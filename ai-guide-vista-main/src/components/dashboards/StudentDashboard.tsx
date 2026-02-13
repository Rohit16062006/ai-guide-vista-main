import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target, Trophy, TrendingUp, Star, Clock, Award } from 'lucide-react';
import AITeacher from '../AITeacher';

const courseData = [
  { name: 'Mathematics', progress: 75, xp: 1250, color: 'primary', nextTopic: 'Calculus Basics' },
  { name: 'Science', progress: 60, xp: 890, color: 'secondary', nextTopic: 'Chemical Reactions' },
  { name: 'History', progress: 90, xp: 1800, color: 'accent', nextTopic: 'World War II' },
  { name: 'Literature', progress: 45, xp: 650, color: 'warning', nextTopic: 'Shakespeare' }
];

const achievements = [
  { name: 'First Steps', icon: '🌟', unlocked: true, description: 'Complete your first lesson' },
  { name: 'Speed Learner', icon: '⚡', unlocked: true, description: 'Complete 5 lessons in one day' },
  { name: 'Consistency King', icon: '🔥', unlocked: true, description: '7-day learning streak' },
  { name: 'Math Master', icon: '🧮', unlocked: false, description: 'Complete advanced mathematics' },
  { name: 'Science Star', icon: '🔬', unlocked: false, description: 'Excel in all science topics' },
  { name: 'Perfect Score', icon: '💯', unlocked: false, description: 'Get 100% on any test' }
];

const recentActivity = [
  { action: 'Completed', subject: 'Algebra Quiz', time: '2 hours ago', score: 95 },
  { action: 'Started', subject: 'Chemical Bonds', time: '1 day ago', score: null },
  { action: 'Completed', subject: 'Essay Writing', time: '2 days ago', score: 88 },
  { action: 'Reviewed', subject: 'History Timeline', time: '3 days ago', score: null }
];

function ProgressRing({ progress, size = 'medium' }: { progress: number; size?: 'small' | 'medium' | 'large' }) {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16', 
    large: 'w-20 h-20'
  };
  
  const radius = size === 'small' ? 16 : size === 'medium' ? 24 : 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`${sizeClasses[size]} relative`}>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-muted/30"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-primary transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold">{progress}%</span>
      </div>
    </div>
  );
}

export default function StudentDashboard() {
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Alex!</h1>
            <p className="text-muted-foreground">Ready to continue your learning journey?</p>
          </div>
          <div className="hidden md:block">
            <AITeacher 
              size="small"
              position="relative"
              message="Let's make today amazing!"
              showMessage={false}
              isWaving={false}
              showMicButton={false}
            />
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total XP', value: '4,590', icon: Star, color: 'primary' },
          { label: 'Courses Active', value: '4', icon: BookOpen, color: 'secondary' },
          { label: 'Study Streak', value: '12 days', icon: Target, color: 'accent' },
          { label: 'Achievements', value: '8/15', icon: Trophy, color: 'warning' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 text-center hover:glass-hover transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-full bg-${stat.color}/20 flex items-center justify-center mx-auto mb-4`}>
                <Icon className={`w-6 h-6 text-${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Course Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel"
      >
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-primary" />
          Course Progress
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courseData.map((course, index) => (
            <motion.div
              key={course.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="neuro p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-foreground">{course.name}</h3>
                <ProgressRing progress={course.progress} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">XP Earned</span>
                  <span className="font-medium text-foreground">{course.xp}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Next Topic</span>
                  <span className="font-medium text-foreground">{course.nextTopic}</span>
                </div>
              </div>
              
              <button className="neuro-button w-full mt-4 hover:glow-primary transition-all duration-300">
                Continue Learning
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievements & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <Award className="w-6 h-6 mr-2 text-primary" />
            Achievements
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`neuro p-4 text-center transition-all duration-300 ${
                  achievement.unlocked 
                    ? 'hover:glow-success' 
                    : 'opacity-50 hover:opacity-70'
                }`}
              >
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <div className="text-sm font-medium text-foreground mb-1">{achievement.name}</div>
                <div className="text-xs text-muted-foreground">{achievement.description}</div>
                {achievement.unlocked && (
                  <div className="mt-2">
                    <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">
                      Unlocked
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-panel"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <Clock className="w-6 h-6 mr-2 text-primary" />
            Recent Activity
          </h2>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="neuro-inset p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground">
                      {activity.action} {activity.subject}
                    </div>
                    <div className="text-sm text-muted-foreground">{activity.time}</div>
                  </div>
                  {activity.score && (
                    <div className="text-right">
                      <div className="font-bold text-success">{activity.score}%</div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}