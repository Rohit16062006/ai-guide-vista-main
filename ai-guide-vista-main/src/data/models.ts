export interface ModelAnnotation {
  id: string;
  title: string;
  description: string;
  position: [number, number, number];
  category: string;
}

export interface Model3D {
  id: number;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
  annotations: number;
  downloads: number;
  modelType: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  features: string[];
  modelAnnotations: ModelAnnotation[];
  learningObjectives: string[];
  interactiveFeatures: string[];
}

export const models: Model3D[] = [
  {
    id: 1,
    name: 'Human Heart',
    category: 'Biology',
    description: 'Interactive 3D model of the human cardiovascular system with detailed chambers and blood flow',
    thumbnail: '❤️',
    annotations: 12,
    downloads: 2341,
    modelType: 'heart',
    difficulty: 'intermediate',
    duration: '15-20 min',
    features: ['Interactive Hotspots', 'Blood Flow Animation', 'Cross Sections', 'Chamber Details'],
    modelAnnotations: [
      {
        id: 'left-ventricle',
        title: 'Left Ventricle',
        description: 'Main pumping chamber that sends oxygenated blood to the body',
        position: [-0.3, -0.5, 0.1],
        category: 'chamber'
      },
      {
        id: 'right-ventricle', 
        title: 'Right Ventricle',
        description: 'Pumps deoxygenated blood to the lungs',
        position: [0.4, -0.4, 0.2],
        category: 'chamber'
      },
      {
        id: 'left-atrium',
        title: 'Left Atrium',
        description: 'Receives oxygenated blood from the lungs',
        position: [-0.4, 0.4, 0],
        category: 'chamber'
      },
      {
        id: 'aorta',
        title: 'Aorta',
        description: 'Main artery carrying blood from heart',
        position: [0, 0.8, 0],
        category: 'vessel'
      }
    ],
    learningObjectives: [
      'Identify the four chambers of the heart',
      'Understand blood circulation pathways',
      'Explore valve mechanisms and functions',
      'Study cardiac muscle structure',
      'Learn about heart rhythm and electrical conduction'
    ],
    interactiveFeatures: [
      'Click Hotspots',
      'Animation Controls', 
      'Cross Sections',
      'Blood Flow Visualization',
      'Heart Rate Simulation'
    ]
  },
  {
    id: 2,
    name: 'Solar System',
    category: 'Astronomy',
    description: 'Explore planets, orbits, and celestial mechanics in our solar system',
    thumbnail: '🪐',
    annotations: 8,
    downloads: 5672,
    modelType: 'solar-system',
    difficulty: 'beginner',
    duration: '10-15 min',
    features: ['Orbital Animation', 'Planet Details', 'Scale Comparison', 'Distance Visualization'],
    modelAnnotations: [
      {
        id: 'sun',
        title: 'The Sun',
        description: 'Central star of our solar system, source of light and energy',
        position: [0, 0, 0],
        category: 'star'
      },
      {
        id: 'earth',
        title: 'Earth',
        description: 'Third planet from the Sun, our home planet',
        position: [2, 0, 0],
        category: 'planet'
      },
      {
        id: 'mars',
        title: 'Mars',
        description: 'Fourth planet from the Sun, known as the Red Planet',
        position: [2.5, 0, 0],
        category: 'planet'
      }
    ],
    learningObjectives: [
      'Learn about planetary characteristics',
      'Understand orbital mechanics',
      'Compare planet sizes and distances',
      'Explore the concept of gravity',
      'Study the formation of the solar system'
    ],
    interactiveFeatures: [
      'Orbital Animation',
      'Time Controls',
      'Planet Information',
      'Scale Adjustments',
      'Distance Measurements'
    ]
  },
  {
    id: 3,
    name: 'DNA Structure',
    category: 'Biology',
    description: 'Double helix structure with interactive base pairs and genetic information',
    thumbnail: '🧬',
    annotations: 15,
    downloads: 1893,
    modelType: 'dna',
    difficulty: 'advanced',
    duration: '20-25 min',
    features: ['Base Pair Interaction', 'Helix Rotation', 'Genetic Code', 'Molecular Details'],
    modelAnnotations: [
      {
        id: 'double-helix',
        title: 'Double Helix',
        description: 'Two complementary strands twisted around each other',
        position: [0, 0, 0],
        category: 'structure'
      },
      {
        id: 'base-pairs',
        title: 'Base Pairs',
        description: 'Complementary nucleotide pairs (A-T, G-C)',
        position: [0, 1, 0],
        category: 'component'
      },
      {
        id: 'sugar-phosphate',
        title: 'Sugar-Phosphate Backbone',
        description: 'Structural framework of the DNA molecule',
        position: [0.8, 0, 0.8],
        category: 'backbone'
      }
    ],
    learningObjectives: [
      'Understand DNA double helix structure',
      'Learn about base pairing rules',
      'Explore genetic code and information storage',
      'Study DNA replication process',
      'Understand the role of DNA in heredity'
    ],
    interactiveFeatures: [
      'Base Pair Highlighting',
      'Strand Separation',
      'Replication Animation',
      'Genetic Code Decoder',
      'Mutation Examples'
    ]
  },
  {
    id: 4,
    name: 'Chemical Bonds',
    category: 'Chemistry',
    description: 'Molecular structures and bonding visualization with electron interactions',
    thumbnail: '⚛️',
    annotations: 9,
    downloads: 3247,
    modelType: 'chemical-bonds',
    difficulty: 'intermediate',
    duration: '12-18 min',
    features: ['Bond Visualization', 'Electron Clouds', 'Molecular Geometry', 'Reaction Animation'],
    modelAnnotations: [
      {
        id: 'water-molecule',
        title: 'Water Molecule',
        description: 'H2O structure with bent molecular geometry',
        position: [0, 0, 0],
        category: 'molecule'
      },
      {
        id: 'methane',
        title: 'Methane',
        description: 'CH4 with tetrahedral geometry',
        position: [2.5, 0, 0],
        category: 'molecule'
      },
      {
        id: 'covalent-bond',
        title: 'Covalent Bond',
        description: 'Shared electrons between atoms',
        position: [0.3, -0.2, 0],
        category: 'bond'
      }
    ],
    learningObjectives: [
      'Visualize different types of chemical bonds',
      'Understand molecular geometry',
      'Explore electron behavior in bonds',
      'Study bond formation and breaking',
      'Learn about molecular polarity'
    ],
    interactiveFeatures: [
      'Bond Length Measurement',
      'Electron Density Maps',
      'Molecular Vibrations',
      'Reaction Pathways',
      'Energy Diagrams'
    ]
  },
  {
    id: 5,
    name: 'Ancient Rome',
    category: 'History',
    description: 'Virtual tour of the Roman Colosseum and Forum with historical context',
    thumbnail: '🏛️',
    annotations: 6,
    downloads: 4158,
    modelType: 'ancient-rome',
    difficulty: 'beginner',
    duration: '25-30 min',
    features: ['Virtual Tour', 'Historical Timeline', 'Reconstruction Views', 'Archaeological Details'],
    modelAnnotations: [
      {
        id: 'colosseum',
        title: 'Colosseum',
        description: 'Amphitheater for gladiatorial contests',
        position: [0, 0, 0],
        category: 'architecture'
      },
      {
        id: 'doric-column',
        title: 'Doric Column',
        description: 'Classical architectural order',
        position: [2.8, 0.5, 0],
        category: 'architecture'
      },
      {
        id: 'arch-structure',
        title: 'Arch Structure',
        description: 'Roman architectural innovation',
        position: [1.8, -0.1, 0],
        category: 'engineering'
      }
    ],
    learningObjectives: [
      'Explore Roman architecture and engineering',
      'Learn about daily life in ancient Rome',
      'Understand historical context and timeline',
      'Study archaeological reconstruction methods',
      'Examine cultural and social aspects'
    ],
    interactiveFeatures: [
      'Time Period Navigation',
      'Architectural Highlights',
      'Historical Narration',
      'Comparison Views',
      'Interactive Maps'
    ]
  },
  {
    id: 6,
    name: 'Math Functions',
    category: 'Mathematics',
    description: 'Interactive graphs and equation visualizations in 3D space',
    thumbnail: '📊',
    annotations: 11,
    downloads: 2764,
    modelType: 'math-functions',
    difficulty: 'intermediate',
    duration: '15-20 min',
    features: ['Function Plotting', 'Parameter Controls', 'Calculus Visualization', 'Interactive Equations'],
    modelAnnotations: [
      {
        id: 'sine-wave',
        title: 'Sine Wave Surface',
        description: 'z = sin(x)cos(y) mathematical function',
        position: [0, 0.5, 0],
        category: 'function'
      },
      {
        id: 'x-axis',
        title: 'X-Axis',
        description: 'Horizontal coordinate axis',
        position: [2, 0, 0],
        category: 'coordinate'
      },
      {
        id: 'parametric-curve',
        title: 'Parametric Curve',
        description: '3D spiral curve in space',
        position: [0, 1, 0],
        category: 'curve'
      }
    ],
    learningObjectives: [
      'Visualize mathematical functions in 3D',
      'Understand function transformations',
      'Explore calculus concepts visually',
      'Study parametric equations',
      'Learn about mathematical modeling'
    ],
    interactiveFeatures: [
      'Parameter Sliders',
      'Function Animation',
      'Derivative Visualization',
      'Integral Calculation',
      'Surface Analysis'
    ]
  }
];

export const categories = ['All', 'Biology', 'Chemistry', 'Physics', 'Mathematics', 'History', 'Astronomy'];

export function getModelById(id: number): Model3D | undefined {
  return models.find(model => model.id === id);
}

export function getModelsByCategory(category: string): Model3D[] {
  if (category === 'All') return models;
  return models.filter(model => model.category === category);
}