import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, TrendingUp, MessageSquare, Calendar, Award, AlertCircle, CheckCircle } from 'lucide-react';
import AITeacher from '../AITeacher';

const studentProgress = [
  { name: 'Emma Wilson', progress: 85, subject: 'Mathematics', lastActive: '2h ago', avatar: '👩‍🎓' },
  { name: 'James Park', progress: 72, subject: 'Science', lastActive: '4h ago', avatar: '👨‍🎓' },
  { name: 'Sofia Rodriguez', progress: 94, subject: 'History', lastActive: '1h ago', avatar: '👩‍💻' },
  { name: 'Alex Chen', progress: 67, subject: 'Literature', lastActive: '3h ago', avatar: '🧑‍🎓' },
  { name: 'Maya Patel', progress: 88, subject: 'Mathematics', lastActive: '5h ago', avatar: '👩‍🔬' }
];

const aiSuggestions = [
  {
    type: 'student',
    title: 'Emma needs help with Calculus',
    description: 'Student struggling with integration concepts. Recommend additional practice problems.',
    priority: 'high',
    action: 'Review Progress'
  },
  {
    type: 'content',
    title: 'Add 3D models to Chemistry',
    description: 'Students would benefit from molecular structure visualizations in organic chemistry.',
    priority: 'medium',
    action: 'Browse Models'
  },
  {
    type: 'engagement',
    title: 'Gamify History lessons',
    description: 'Consider adding timeline challenges to improve engagement in World War II unit.',
    priority: 'low',
    action: 'Create Challenge'
  }
];

const recentSubmissions = [
  { student: 'Sofia Rodriguez', assignment: 'WWII Essay', score: 95, submitted: '2h ago', status: 'graded' },
  { student: 'James Park', assignment: 'Chemistry Lab Report', score: null, submitted: '4h ago', status: 'pending' },
  { student: 'Emma Wilson', assignment: 'Calculus Problem Set', score: 87, submitted: '1d ago', status: 'graded' },
  { student: 'Alex Chen', assignment: 'Literature Analysis', score: null, submitted: '6h ago', status: 'pending' }
];

function StudentCard({ student, index }: { student: typeof studentProgress[0]; index: number }) {
  const getProgressColor = (progress: number) => {
    if (progress >= 85) return 'success';
    if (progress >= 70) return 'warning';
    return 'destructive';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="neuro p-4 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{student.avatar}</div>
          <div>
            <h4 className="font-semibold text-foreground">{student.name}</h4>
            <p className="text-sm text-muted-foreground">{student.subject}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`font-bold text-${getProgressColor(student.progress)}`}>
            {student.progress}%
          </div>
          <div className="text-xs text-muted-foreground">{student.lastActive}</div>
        </div>
      </div>
      
      <div className="w-full bg-muted/30 rounded-full h-2 mb-3">
        <div 
          className={`bg-${getProgressColor(student.progress)} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${student.progress}%` }}
        />
      </div>
      
      <div className="flex gap-2">
        <button className="neuro-button text-xs flex-1">Message</button>
        <button className="neuro-button text-xs flex-1">View Details</button>
      </div>
    </motion.div>
  );
}

function SuggestionCard({ suggestion, index }: { suggestion: typeof aiSuggestions[0]; index: number }) {
  const priorityColors = {
    high: 'destructive',
    medium: 'warning',  
    low: 'success'
  };

  const typeIcons = {
    student: Users,
    content: BookOpen,
    engagement: TrendingUp
  };

  const Icon = typeIcons[suggestion.type as keyof typeof typeIcons];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-4 hover:glass-hover transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5 text-primary" />
          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${priorityColors[suggestion.priority as keyof typeof priorityColors]}/20 text-${priorityColors[suggestion.priority as keyof typeof priorityColors]}`}>
            {suggestion.priority}
          </span>
        </div>
      </div>
      
      <h4 className="font-semibold text-foreground mb-2">{suggestion.title}</h4>
      <p className="text-sm text-muted-foreground mb-4">{suggestion.description}</p>
      
      <button className="neuro-button w-full text-sm hover:glow-primary transition-all duration-300">
        {suggestion.action}
      </button>
    </motion.div>
  );
}

export default function TeacherDashboard() {
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, Professor Martinez!</h1>
            <p className="text-muted-foreground">Here's what's happening with your students today</p>
          </div>
          <div className="hidden md:block">
            <AITeacher 
              size="small"
              position="relative"
              message="Your students are doing great!"
              showMessage={false}
              showMicButton={false}
            />
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', value: '28', icon: Users, color: 'primary', change: '+3 this week' },
          { label: 'Active Courses', value: '5', icon: BookOpen, color: 'secondary', change: '2 new modules' },
          { label: 'Avg Progress', value: '78%', icon: TrendingUp, color: 'success', change: '+5% this month' },
          { label: 'Pending Reviews', value: '12', icon: MessageSquare, color: 'warning', change: '4 urgent' }
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
              <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.change}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Student Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <Users className="w-6 h-6 mr-2 text-primary" />
            Student Progress
          </h2>
          
          <div className="space-y-4">
            {studentProgress.map((student, index) => (
              <StudentCard key={student.name} student={student} index={index} />
            ))}
          </div>
          
          <button className="neuro-button w-full mt-4 hover:glow-primary transition-all duration-300">
            View All Students
          </button>
        </motion.div>

        {/* AI Suggestions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <MessageSquare className="w-6 h-6 mr-2 text-primary" />
            AI Teaching Insights
          </h2>
          
          <div className="space-y-4">
            {aiSuggestions.map((suggestion, index) => (
              <SuggestionCard key={index} suggestion={suggestion} index={index} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Submissions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-panel"
      >
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <Calendar className="w-6 h-6 mr-2 text-primary" />
          Recent Submissions
        </h2>
        
        <div className="space-y-3">
          {recentSubmissions.map((submission, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="neuro-inset p-4 flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="font-medium text-foreground">{submission.student}</div>
                <div className="text-sm text-muted-foreground">{submission.assignment}</div>
                <div className="text-xs text-muted-foreground">{submission.submitted}</div>
              </div>
              
              <div className="flex items-center space-x-4">
                {submission.score && (
                  <div className="text-right">
                    <div className="font-bold text-success">{submission.score}%</div>
                    <div className="text-xs text-muted-foreground">Score</div>
                  </div>
                )}
                
                <div className="flex items-center">
                  {submission.status === 'graded' ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-warning" />
                  )}
                  <span className="text-sm ml-2 capitalize">{submission.status}</span>
                </div>
                
                {submission.status === 'pending' && (
                  <button className="neuro-button text-sm">Grade</button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}