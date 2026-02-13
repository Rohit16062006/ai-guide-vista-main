import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Target, Zap, Crown, Award } from 'lucide-react';
import AITeacher from '../components/AITeacher';

const achievements = [
  {
    id: 1,
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🌟',
    category: 'Getting Started',
    xp: 100,
    unlocked: true,
    unlockedDate: '2024-01-15',
    rarity: 'common'
  },
  {
    id: 2,
    name: 'Speed Learner',
    description: 'Complete 5 lessons in one day',
    icon: '⚡',
    category: 'Learning Speed',
    xp: 250,
    unlocked: true,
    unlockedDate: '2024-01-20',
    rarity: 'uncommon'
  },
  {
    id: 3,
    name: 'Consistency King',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    category: 'Consistency',
    xp: 300,
    unlocked: true,
    unlockedDate: '2024-01-22',
    rarity: 'uncommon'
  },
  {
    id: 4,
    name: 'Perfect Score',
    description: 'Get 100% on any test',
    icon: '💯',
    category: 'Excellence',
    xp: 500,
    unlocked: true,
    unlockedDate: '2024-01-25',
    rarity: 'rare'
  },
  {
    id: 5,
    name: 'Math Master',
    description: 'Complete all advanced mathematics courses',
    icon: '🧮',
    category: 'Subject Mastery',
    xp: 750,
    unlocked: false,
    progress: 75,
    rarity: 'epic'
  },
  {
    id: 6,
    name: 'Science Star',
    description: 'Excel in all science subjects',
    icon: '🔬',
    category: 'Subject Mastery',
    xp: 750,
    unlocked: false,
    progress: 60,
    rarity: 'epic'
  },
  {
    id: 7,
    name: 'Knowledge Seeker',
    description: 'Complete 100 lessons across all subjects',
    icon: '📚',
    category: 'Dedication',
    xp: 1000,
    unlocked: false,
    progress: 45,
    rarity: 'legendary'
  },
  {
    id: 8,
    name: 'AI Whisperer',
    description: 'Have 50 conversations with the AI Teacher',
    icon: '🤖',
    category: 'Interaction',
    xp: 400,
    unlocked: false,
    progress: 32,
    rarity: 'rare'
  }
];

const leaderboard = [
  { rank: 1, name: 'Alex Chen', xp: 15420, avatar: '👨‍🎓', streak: 45 },
  { rank: 2, name: 'Sarah Johnson', xp: 14890, avatar: '👩‍🎓', streak: 38 },
  { rank: 3, name: 'Miguel Rodriguez', xp: 13750, avatar: '👨‍💻', streak: 42 },
  { rank: 4, name: 'Emma Wilson', xp: 12960, avatar: '👩‍🔬', streak: 31 },
  { rank: 5, name: 'You', xp: 4590, avatar: '🧑‍🎓', streak: 12 },
  { rank: 6, name: 'James Park', xp: 4120, avatar: '👨‍🏫', streak: 8 },
  { rank: 7, name: 'Lisa Zhang', xp: 3845, avatar: '👩‍🎨', streak: 15 },
];

const categories = ['All', 'Getting Started', 'Learning Speed', 'Consistency', 'Excellence', 'Subject Mastery', 'Dedication', 'Interaction'];

function AchievementCard({ achievement, index }: { achievement: typeof achievements[0]; index: number }) {
  const rarityColors = {
    common: 'muted',
    uncommon: 'success',
    rare: 'primary',
    epic: 'secondary',
    legendary: 'warning'
  };
  
  const rarityGlow = {
    common: '',
    uncommon: 'hover:glow-success',
    rare: 'hover:glow-primary',
    epic: 'hover:glow-secondary',
    legendary: 'hover:glow-warning'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className={`relative ${
        achievement.unlocked 
          ? `glass-card hover:glass-hover ${rarityGlow[achievement.rarity as keyof typeof rarityGlow]}` 
          : 'glass-card opacity-50'
      } p-6 transition-all duration-300 overflow-hidden`}
    >
      {/* Rarity Border */}
      <div className={`absolute inset-0 rounded-lg border-2 border-${rarityColors[achievement.rarity as keyof typeof rarityColors]}/30 pointer-events-none`} />
      
      {/* Unlocked Animation */}
      {achievement.unlocked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2"
        >
          <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
            <Trophy className="w-3 h-3 text-white" />
          </div>
        </motion.div>
      )}

      <div className="text-center">
        <div className="text-4xl mb-3 transform hover:scale-110 transition-transform duration-300">
          {achievement.icon}
        </div>
        
        <h3 className="font-bold text-lg text-foreground mb-2">{achievement.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
        
        <div className="flex items-center justify-between text-xs mb-3">
          <span className={`px-2 py-1 rounded-full bg-${rarityColors[achievement.rarity as keyof typeof rarityColors]}/20 text-${rarityColors[achievement.rarity as keyof typeof rarityColors]} font-medium`}>
            {achievement.rarity.toUpperCase()}
          </span>
          <span className="text-muted-foreground">+{achievement.xp} XP</span>
        </div>

        {achievement.unlocked ? (
          <div className="text-xs text-success font-medium">
            Unlocked: {achievement.unlockedDate}
          </div>
        ) : achievement.progress ? (
          <div>
            <div className="w-full bg-muted/30 rounded-full h-2 mb-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${achievement.progress}%` }}
              />
            </div>
            <div className="text-xs text-muted-foreground">
              {achievement.progress}% complete
            </div>
          </div>
        ) : (
          <div className="text-xs text-muted-foreground">Locked</div>
        )}
      </div>
    </motion.div>
  );
}

function LeaderboardCard({ player, index }: { player: typeof leaderboard[0]; index: number }) {
  const isCurrentUser = player.name === 'You';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
        isCurrentUser 
          ? 'neuro-inset glow-primary' 
          : 'neuro hover:shadow-lg'
      }`}
    >
      <div className="flex items-center space-x-4 flex-1">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          player.rank <= 3 
            ? player.rank === 1 
              ? 'bg-warning text-warning-foreground' 
              : player.rank === 2 
                ? 'bg-muted text-muted-foreground' 
                : 'bg-accent text-accent-foreground'
            : 'bg-muted/50 text-muted-foreground'
        }`}>
          {player.rank <= 3 ? (
            player.rank === 1 ? <Crown className="w-4 h-4" /> :
            player.rank === 2 ? <Award className="w-4 h-4" /> :
            <Star className="w-4 h-4" />
          ) : (
            player.rank
          )}
        </div>
        
        <div className="text-2xl">{player.avatar}</div>
        
        <div className="flex-1">
          <div className={`font-semibold ${isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
            {player.name}
          </div>
          <div className="text-sm text-muted-foreground">
            {player.streak} day streak
          </div>
        </div>
        
        <div className="text-right">
          <div className="font-bold text-foreground">{player.xp.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">XP</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredAchievements = selectedCategory === 'All' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalXP = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xp, 0);

  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Achievements & Leaderboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Track your progress and compete with other learners
          </p>
        </motion.div>

        {/* AI Teacher Encouragement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Keep up the great work!
              </h2>
              <p className="text-muted-foreground">
                You've unlocked {unlockedCount} achievements and earned {totalXP} XP. 
                You're making excellent progress on your learning journey!
              </p>
            </div>
            <div className="hidden md:block">
              <AITeacher 
                size="small"
                position="relative"
                message="You're doing amazing!"
                showMessage={false}
                isClapping={true}
                showMicButton={false}
              />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Achievements Section */}
          <div className="lg:col-span-2">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Unlocked', value: `${unlockedCount}/${achievements.length}`, icon: Trophy },
                { label: 'Total XP', value: totalXP.toLocaleString(), icon: Zap },
                { label: 'Rare+', value: achievements.filter(a => ['rare', 'epic', 'legendary'].includes(a.rarity) && a.unlocked).length, icon: Star }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-4 text-center"
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-lg font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <div className="glass-card p-4">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category
                          ? 'neuro-inset text-primary glow-primary'
                          : 'neuro hover:shadow-lg text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Achievements Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {filteredAchievements.map((achievement, index) => (
                <AchievementCard key={achievement.id} achievement={achievement} index={index} />
              ))}
            </motion.div>
          </div>

          {/* Leaderboard Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-panel sticky top-32"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <Target className="w-6 h-6 mr-2 text-primary" />
                Leaderboard
              </h2>
              
              <div className="space-y-3">
                {leaderboard.map((player, index) => (
                  <LeaderboardCard key={player.rank} player={player} index={index} />
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Keep learning to climb the ranks!
                </p>
                <button className="neuro-button w-full hover:glow-primary transition-all duration-300">
                  View Full Leaderboard
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}