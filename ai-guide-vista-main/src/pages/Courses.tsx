import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, Star, ChevronRight, PlayCircle } from 'lucide-react';
import AITeacher from '../components/AITeacher';

const courses = [
  {
    id: 1,
    title: 'Advanced Mathematics',
    description: 'Master calculus, algebra, and mathematical reasoning with interactive 3D visualizations',
    instructor: 'Dr. Sarah Chen',
    duration: '8 weeks',
    students: 1247,
    rating: 4.8,
    progress: 65,
    image: '🧮',
    topics: ['Calculus', 'Linear Algebra', 'Statistics', 'Geometry'],
    difficulty: 'Advanced'
  },
  {
    id: 2,
    title: 'Interactive Science Lab',
    description: 'Explore chemistry, physics, and biology through virtual experiments and simulations',
    instructor: 'Prof. Michael Torres',
    duration: '10 weeks',
    students: 892,
    rating: 4.9,
    progress: 40,
    image: '🔬',
    topics: ['Chemistry', 'Physics', 'Biology', 'Lab Experiments'],
    difficulty: 'Intermediate'
  },
  {
    id: 3,
    title: 'World History Journey',
    description: 'Travel through time with immersive historical experiences and virtual field trips',
    instructor: 'Dr. Elena Rodriguez',
    duration: '6 weeks',
    students: 2156,
    rating: 4.7,
    progress: 80,
    image: '🏛️',
    topics: ['Ancient Civilizations', 'World Wars', 'Cultural History', 'Timeline Analysis'],
    difficulty: 'Beginner'
  },
  {
    id: 4,
    title: 'Creative Writing Workshop',
    description: 'Develop your writing skills with AI-powered feedback and peer collaboration',
    instructor: 'Ms. Amanda Foster',
    duration: '4 weeks',
    students: 654,
    rating: 4.6,
    progress: 20,
    image: '✍️',
    topics: ['Essay Writing', 'Creative Fiction', 'Poetry', 'Grammar'],
    difficulty: 'Beginner'
  }
];

const categories = ['All', 'Mathematics', 'Science', 'History', 'Language Arts', 'Programming'];

function CourseCard({ course, index }: { course: typeof courses[0]; index: number }) {
  const difficultyColors = {
    Beginner: 'success',
    Intermediate: 'warning',
    Advanced: 'destructive'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
      className="glass-card p-6 hover:glass-hover transition-all duration-300 group cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{course.image}</div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${difficultyColors[course.difficulty as keyof typeof difficultyColors]}/20 text-${difficultyColors[course.difficulty as keyof typeof difficultyColors]}`}>
          {course.difficulty}
        </span>
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
        {course.title}
      </h3>
      
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {course.description}
      </p>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Instructor</span>
          <span className="font-medium text-foreground">{course.instructor}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            {course.duration}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="w-4 h-4 mr-1" />
            {course.students}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Star className="w-4 h-4 mr-1 fill-current text-warning" />
            {course.rating}
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">{course.progress}%</span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {course.topics.slice(0, 3).map((topic) => (
          <span key={topic} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
            {topic}
          </span>
        ))}
        {course.topics.length > 3 && (
          <span className="text-xs text-muted-foreground">
            +{course.topics.length - 3} more
          </span>
        )}
      </div>

      <button className="neuro-button w-full flex items-center justify-center group-hover:glow-primary transition-all duration-300">
        <PlayCircle className="w-4 h-4 mr-2" />
        Continue Learning
        <ChevronRight className="w-4 h-4 ml-2" />
      </button>
    </motion.div>
  );
}

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState('All');

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
            Your Learning Journey
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore interactive courses designed to make learning engaging and effective with AI guidance
          </p>
        </motion.div>

        {/* AI Teacher Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                AI Teacher Says:
              </h2>
              <p className="text-muted-foreground">
                "Based on your progress, I recommend focusing on Advanced Mathematics next. 
                You're doing great with the fundamentals!"
              </p>
            </div>
            <div className="hidden md:block">
              <AITeacher 
                size="small"
                position="relative"
                message="Here's what you'll learn today!"
                showMessage={false}
                isPointing={true}
                showMicButton={false}
              />
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="glass-card p-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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

        {/* Courses Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <button className="neuro-button px-8 py-4 hover:glow-primary transition-all duration-300">
            Load More Courses
          </button>
        </motion.div>
      </div>
    </div>
  );
}