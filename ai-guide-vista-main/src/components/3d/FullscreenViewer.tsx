import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import ModelViewer from './ModelViewer';
import ModelControls from './ModelControls';

interface FullscreenViewerProps {
  isOpen: boolean;
  onClose: () => void;
  modelType: string;
  modelName: string;
  annotations?: any[];
}

export default function FullscreenViewer({
  isOpen,
  onClose,
  modelType,
  modelName,
  annotations = []
}: FullscreenViewerProps) {
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const handleReset = () => {
    // Reset camera position would be handled by the 3D viewer
    console.log('Reset camera position');
  };

  const handleZoomIn = () => {
    console.log('Zoom in');
  };

  const handleZoomOut = () => {
    console.log('Zoom out');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
        >
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="absolute top-0 left-0 right-0 z-10 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">{modelName}</h2>
                <p className="text-sm text-muted-foreground">Interactive 3D Model</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={onClose}
                className="shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* 3D Viewer */}
          <div className="absolute inset-0 pt-20 pb-20">
            <ModelViewer
              modelType={modelType}
              annotations={annotations}
              showAnnotations={showAnnotations}
              autoRotate={autoRotate}
              showGrid={showGrid}
              className="w-full h-full"
            />
          </div>

          {/* Controls */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          >
            <ModelControls
              onReset={handleReset}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onToggleGrid={() => setShowGrid(!showGrid)}
              onToggleAnnotations={() => setShowAnnotations(!showAnnotations)}
              onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
              onSettings={() => setShowSettings(!showSettings)}
              showGrid={showGrid}
              showAnnotations={showAnnotations}
              autoRotate={autoRotate}
            />
          </motion.div>

          {/* Settings Panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                className="absolute top-20 right-4 w-80 glass-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">3D Settings</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSettings(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Render Quality
                    </label>
                    <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground">
                      <option value="low">Low</option>
                      <option value="medium" selected>Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Animation Speed
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="2"
                      step="0.1"
                      defaultValue="0.5"
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Shadows</span>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Reflections</span>
                    <input type="checkbox" className="toggle" />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Ambient Occlusion</span>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}