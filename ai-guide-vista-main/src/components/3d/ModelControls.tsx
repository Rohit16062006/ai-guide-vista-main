import React from 'react';
import { motion } from 'framer-motion';
import { 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Move3D, 
  Rotate3D, 
  Grid3X3, 
  Info, 
  Play, 
  Pause,
  Maximize,
  Settings
} from 'lucide-react';
import { Button } from '../ui/button';

interface ModelControlsProps {
  onReset?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onToggleGrid?: () => void;
  onToggleAnnotations?: () => void;
  onToggleAutoRotate?: () => void;
  onFullscreen?: () => void;
  onSettings?: () => void;
  showGrid?: boolean;
  showAnnotations?: boolean;
  autoRotate?: boolean;
  isPlaying?: boolean;
  className?: string;
}

export default function ModelControls({
  onReset,
  onZoomIn,
  onZoomOut,
  onToggleGrid,
  onToggleAnnotations,
  onToggleAutoRotate,
  onFullscreen,
  onSettings,
  showGrid = false,
  showAnnotations = false,
  autoRotate = true,
  isPlaying = true,
  className = ''
}: ModelControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-3 ${className}`}
    >
      <div className="flex flex-wrap gap-2">
        {/* Navigation Controls */}
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="h-8 w-8 p-0"
            title="Reset View"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onZoomIn}
            className="h-8 w-8 p-0"
            title="Zoom In"
          >
            <ZoomIn className="w-3 h-3" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onZoomOut}
            className="h-8 w-8 p-0"
            title="Zoom Out"
          >
            <ZoomOut className="w-3 h-3" />
          </Button>
        </div>

        <div className="w-px h-6 bg-border" />

        {/* Display Controls */}
        <div className="flex gap-1">
          <Button
            variant={showGrid ? "default" : "outline"}
            size="sm"
            onClick={onToggleGrid}
            className="h-8 w-8 p-0"
            title="Toggle Grid"
          >
            <Grid3X3 className="w-3 h-3" />
          </Button>
          
          <Button
            variant={showAnnotations ? "default" : "outline"}
            size="sm"
            onClick={onToggleAnnotations}
            className="h-8 w-8 p-0"
            title="Toggle Annotations"
          >
            <Info className="w-3 h-3" />
          </Button>
        </div>

        <div className="w-px h-6 bg-border" />

        {/* Animation Controls */}
        <div className="flex gap-1">
          <Button
            variant={autoRotate ? "default" : "outline"}
            size="sm"
            onClick={onToggleAutoRotate}
            className="h-8 w-8 p-0"
            title="Toggle Auto Rotate"
          >
            {autoRotate ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </Button>
        </div>

        <div className="w-px h-6 bg-border" />

        {/* View Controls */}
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={onFullscreen}
            className="h-8 w-8 p-0"
            title="Fullscreen"
          >
            <Maximize className="w-3 h-3" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onSettings}
            className="h-8 w-8 p-0"
            title="Settings"
          >
            <Settings className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Rotate3D className="w-3 h-3" />
            <span>Drag to rotate</span>
          </div>
          <div className="flex items-center gap-1">
            <Move3D className="w-3 h-3" />
            <span>Right-click to pan</span>
          </div>
          <div className="flex items-center gap-1">
            <ZoomIn className="w-3 h-3" />
            <span>Scroll to zoom</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}