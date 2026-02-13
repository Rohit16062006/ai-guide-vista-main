import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rotate3D, Move3D, Zap, Eye, Settings, Download, Maximize, Play, Clock } from 'lucide-react';
import AITeacher from '../components/AITeacher';
import ModelViewer from '../components/3d/ModelViewer';
import ModelControls from '../components/3d/ModelControls';
import FullscreenViewer from '../components/3d/FullscreenViewer';
import { models, categories, type Model3D } from '../data/models';

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner': return 'success';
    case 'intermediate': return 'warning'; 
    case 'advanced': return 'destructive';
    default: return 'muted';
  }
};

function ModelCard({ model, index, onExplore }: { model: Model3D; index: number; onExplore: (model: Model3D) => void }) {
  const [isHovered, setIsHovered] = useState(false);

  const categoryColors = {
    Biology: 'hsl(var(--success))',
    Chemistry: 'hsl(var(--primary))',
    Physics: 'hsl(var(--secondary))',
    Mathematics: 'hsl(var(--accent))',
    History: 'hsl(var(--warning))',
    Astronomy: 'hsl(var(--destructive))'
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'destructive';
      default: return 'muted';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="glass-card p-6 hover:glass-hover transition-all duration-300 group cursor-pointer relative overflow-hidden"
    >
      {/* Hover Glow Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 pointer-events-none"
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
            {model.thumbnail}
          </div>
          <div className="flex flex-col gap-1">
            <span 
              className="px-3 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: categoryColors[model.category as keyof typeof categoryColors] }}
            >
              {model.category}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${getDifficultyColor(model.difficulty)}/20 text-${getDifficultyColor(model.difficulty)}`}>
              {model.difficulty}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {model.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4">
          {model.description}
        </p>

        <div className="flex items-center justify-between text-sm mb-2">
          <div className="flex items-center text-muted-foreground">
            <Eye className="w-4 h-4 mr-1" />
            {model.annotations} annotations
          </div>
          <div className="flex items-center text-muted-foreground">
            <Download className="w-4 h-4 mr-1" />
            {model.downloads}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {model.duration}
          </div>
          <div className="flex items-center">
            <Play className="w-3 h-3 mr-1" />
            {model.features.length} features
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => onExplore(model)}
            className="neuro-button flex-1 flex items-center justify-center group-hover:glow-primary transition-all duration-300"
          >
            <Rotate3D className="w-4 h-4 mr-2" />
            Explore 3D
          </button>
          <button className="neuro w-10 h-10 flex items-center justify-center hover:glow-secondary transition-all duration-300">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Lab() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedModel, setSelectedModel] = useState<Model3D | null>(null);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [fullscreenModel, setFullscreenModel] = useState<Model3D | null>(null);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  const filteredModels = selectedCategory === 'All' 
    ? models 
    : models.filter(model => model.category === selectedCategory);

  const handleExploreModel = (model: Model3D) => {
    setFullscreenModel(model);
    setShowFullscreen(true);
  };

  const handleViewerControls = {
    onReset: () => console.log('Reset view'),
    onZoomIn: () => console.log('Zoom in'),
    onZoomOut: () => console.log('Zoom out'),
    onToggleGrid: () => setShowGrid(!showGrid),
    onToggleAnnotations: () => setShowAnnotations(!showAnnotations),
    onToggleAutoRotate: () => setAutoRotate(!autoRotate),
    onFullscreen: () => {
      if (selectedModel) {
        setFullscreenModel(selectedModel);
        setShowFullscreen(true);
      }
    },
    onSettings: () => console.log('Open settings')
  };

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
            3D Learning Laboratory
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore complex concepts through immersive 3D models and interactive experiences
          </p>
        </motion.div>

        {/* AI Teacher Guidance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                3D Lab Instructions
              </h2>
              <p className="text-muted-foreground mb-2">
                Use mouse to rotate, scroll to zoom, and click on hotspots for detailed information.
              </p>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Rotate3D className="w-4 h-4 mr-1" />
                  Rotate: Drag
                </div>
                <div className="flex items-center">
                  <Move3D className="w-4 h-4 mr-1" />
                  Zoom: Scroll
                </div>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-1" />
                  Info: Click hotspots
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <AITeacher 
                size="small"
                position="relative"
                message="Let's explore in 3D!"
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

        {/* Models Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {filteredModels.map((model, index) => (
            <ModelCard 
              key={model.id} 
              model={model} 
              index={index}
              onExplore={handleExploreModel}
            />
          ))}
        </motion.div>

        {/* Featured Model Viewer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 glass-panel"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Featured: Interactive Heart Model</h2>
              <p className="text-muted-foreground">Experience detailed 3D anatomy with interactive annotations</p>
            </div>
            <button 
              onClick={() => handleExploreModel(models[0])}
              className="neuro-button flex items-center gap-2"
            >
              <Maximize className="w-4 h-4" />
              Open Fullscreen
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 3D Viewer */}
            <div className="relative">
              <div className="neuro-inset rounded-lg h-96 overflow-hidden">
                <ModelViewer
                  modelType="heart"
                  annotations={models[0].modelAnnotations}
                  showAnnotations={showAnnotations}
                  autoRotate={autoRotate}
                  showGrid={showGrid}
                />
              </div>
              
              {/* Controls */}
              <div className="mt-4">
                <ModelControls
                  {...handleViewerControls}
                  showGrid={showGrid}
                  showAnnotations={showAnnotations}
                  autoRotate={autoRotate}
                />
              </div>
            </div>

            {/* Model Information */}
            <div className="space-y-4">
              <div className="neuro p-4">
                <h3 className="font-semibold text-foreground mb-2">About This Model</h3>
                <p className="text-sm text-muted-foreground">
                  {models[0].description}
                </p>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {models[0].duration}
                  </span>
                  <span className={`px-2 py-1 rounded-full bg-${getDifficultyColor(models[0].difficulty)}/20 text-${getDifficultyColor(models[0].difficulty)}`}>
                    {models[0].difficulty}
                  </span>
                </div>
              </div>

              <div className="neuro p-4">
                <h3 className="font-semibold text-foreground mb-2">Learning Objectives</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {models[0].learningObjectives.map((objective, index) => (
                    <li key={index}>• {objective}</li>
                  ))}
                </ul>
              </div>

              <div className="neuro p-4">
                <h3 className="font-semibold text-foreground mb-2">Interactive Features</h3>
                <div className="flex flex-wrap gap-2">
                  {models[0].interactiveFeatures.map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fullscreen Viewer */}
        {fullscreenModel && (
          <FullscreenViewer
            isOpen={showFullscreen}
            onClose={() => setShowFullscreen(false)}
            modelType={fullscreenModel.modelType}
            modelName={fullscreenModel.name}
            annotations={fullscreenModel.modelAnnotations}
          />
        )}
      </div>
    </div>
  );
}