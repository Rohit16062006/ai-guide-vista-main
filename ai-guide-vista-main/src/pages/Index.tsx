import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowDown, 
  Users, 
  BookOpen, 
  Shield, 
  Sparkles, 
  Play,
  Brain,
  Gamepad2,
  Clock,
  BarChart3,
  Mic,
  Accessibility,
  Smartphone,
  Download,
  Lock,
  Globe,
  Zap,
  Monitor,
  Tablet,
  Tv,
  RefreshCw,
  Wifi,
  Eye,
  Ear,
  MessageSquare,
  Palette,
  CheckCircle
} from 'lucide-react';
import AITeacher from '../components/AITeacher';

const roleCards = [
  {
    title: 'Student Mode',
    description: 'Learn with personalized AI guidance, track progress, and unlock achievements',
    icon: BookOpen,
    color: 'primary',
    path: '/dashboard?role=student',
    features: ['Interactive Lessons', 'Progress Tracking', 'AI Tutor Chat', 'Gamification']
  },
  {
    title: 'Teacher Mode', 
    description: 'Monitor student progress, create content, and get AI teaching insights',
    icon: Users,
    color: 'secondary',
    path: '/dashboard?role=teacher',
    features: ['Student Analytics', 'Content Creation', 'AI Suggestions', 'Class Management']
  },
  {
    title: 'Admin Mode',
    description: 'Manage platform, analyze data, and configure AI teaching parameters',
    icon: Shield,
    color: 'accent',
    path: '/dashboard?role=admin',
    features: ['User Management', 'System Analytics', 'AI Configuration', 'Platform Settings']
  }
];

const HeroSection = () => (
  <section className="min-h-screen flex items-center justify-center pt-24 px-6">
    <div className="max-w-6xl mx-auto text-center">
      {/* Hero AI Teacher */}
      <div className="mb-12 flex justify-center">
        <AITeacher 
          size="large"
          position="relative"
          message="Welcome to Srestha Vidya Setu!"
          showMessage={true}
          isWaving={true}
          className="animate-slide-up"
        />
      </div>

      {/* Hero Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Learn Anywhere, Anytime
        </h1>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 text-foreground">
          Bridge to the Finest Knowledge
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
          Revolutionary AI-powered education that breaks barriers, personalizes learning, and ensures 
          no student is left behind. Experience true inclusive education with voice navigation, 
          sign language support, and adaptive learning.
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mb-16 flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link to="/dashboard" className="group">
          <button className="neuro-button text-lg px-8 py-4 bg-primary text-primary-foreground hover:glow-primary">
            <Play className="w-5 h-5 mr-2 inline" />
            Start Learning
          </button>
        </Link>
        <Link to="/lab" className="group">
          <button className="neuro-button text-lg px-8 py-4">
            <Sparkles className="w-5 h-5 mr-2 inline" />
            Explore 3D Lab
          </button>
        </Link>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="animate-bounce"
      >
        <ArrowDown className="w-8 h-8 mx-auto text-muted-foreground" />
      </motion.div>
    </div>
  </section>
);

const RoleCards = () => (
  <section className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Choose Your Learning Path</h2>
        <p className="text-lg sm:text-xl text-muted-foreground">
          Whether you're a student, teacher, or administrator, we have the perfect experience for you
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {roleCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Link to={card.path}>
                <div className="glass-panel h-full hover:glass-hover transition-all duration-300 hover:shadow-2xl">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
                    card.color === 'primary' ? 'bg-primary/20 group-hover:glow-primary' :
                    card.color === 'secondary' ? 'bg-secondary/20 group-hover:glow-secondary' :
                    'bg-accent/20 group-hover:glow-accent'
                  }`}>
                    <Icon className={`w-8 h-8 ${
                      card.color === 'primary' ? 'text-primary' :
                      card.color === 'secondary' ? 'text-secondary' :
                      'text-accent'
                    }`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{card.title}</h3>
                  <p className="text-muted-foreground mb-6">{card.description}</p>
                  
                  <div className="space-y-2">
                    {card.features.map((feature) => (
                      <div key={feature} className="flex items-center text-sm">
                        <div className={`w-2 h-2 rounded-full mr-3 ${
                          card.color === 'primary' ? 'bg-primary' :
                          card.color === 'secondary' ? 'bg-secondary' :
                          'bg-accent'
                        }`}></div>
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <button className="neuro-button w-full justify-center group-hover:glow-primary transition-all duration-300">
                      Get Started
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

const FeaturesSection = () => {
  const features = [
    {
      title: 'AI-Powered Teachers',
      description: 'Adaptive AI teachers that personalize lessons to each student\'s learning pace and style',
      icon: Brain,
      color: 'primary'
    },
    {
      title: 'Gamified Learning',
      description: 'Engaging game-based modules that keep students motivated and excited about learning',
      icon: Gamepad2,
      color: 'secondary'
    },
    {
      title: '24/7 AI Doubt Solver',
      description: 'Instant help and clarification available round the clock for any learning queries',
      icon: Clock,
      color: 'accent'
    },
    {
      title: 'Real-time Dashboards',
      description: 'Comprehensive progress tracking for parents and teachers with detailed analytics',
      icon: BarChart3,
      color: 'primary'
    },
    {
      title: 'Voice Navigation',
      description: 'Complete voice-controlled interface for hands-free learning experience',
      icon: Mic,
      color: 'secondary'
    },
    {
      title: 'Sign Language Support',
      description: 'Built-in sign language interpretation for hearing-impaired students',
      icon: Accessibility,
      color: 'accent'
    },
    {
      title: 'Multi-Device Access',
      description: 'Seamless learning across mobile, web, smart TVs, and other connected devices',
      icon: Smartphone,
      color: 'primary'
    },
    {
      title: 'Offline Learning',
      description: 'Download content for offline access, ensuring learning continues without internet',
      icon: Download,
      color: 'secondary'
    },
    {
      title: 'End-to-End Security',
      description: 'Advanced encryption and AI moderation ensuring a safe learning environment',
      icon: Lock,
      color: 'accent'
    }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Why Choose Srestha Vidya Setu?</h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Revolutionary features that make learning engaging, accessible, and effective for everyone
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="glass-card p-6 hover:glass-hover transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  feature.color === 'primary' ? 'bg-primary/20' :
                  feature.color === 'secondary' ? 'bg-secondary/20' :
                  'bg-accent/20'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    feature.color === 'primary' ? 'text-primary' :
                    feature.color === 'secondary' ? 'text-secondary' :
                    'text-accent'
                  }`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const PlatformSection = () => {
  const platforms = [
    {
      title: 'Mobile Apps',
      description: 'iOS & Android native apps',
      icon: Smartphone,
      color: 'primary'
    },
    {
      title: 'Web Platform',
      description: 'Full-featured web application',
      icon: Globe,
      color: 'secondary'
    },
    {
      title: 'Smart TV',
      description: 'Living room learning experience',
      icon: Tv,
      color: 'accent'
    },
    {
      title: 'Tablets',
      description: 'Optimized for touch interfaces',
      icon: Tablet,
      color: 'primary'
    }
  ];

  const capabilities = [
    {
      title: 'Sync Across Devices',
      description: 'Your progress automatically syncs across all devices',
      icon: RefreshCw
    },
    {
      title: 'Offline Capability',
      description: 'Download lessons for learning without internet',
      icon: Wifi
    },
    {
      title: 'Adaptive Interface',
      description: 'UI adapts to your device and preferences',
      icon: Monitor
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Learn Anywhere, Anytime</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Srestha Vidya Setu works seamlessly across all your devices, ensuring continuous learning 
            whether you're at home, school, or on the go.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <motion.div
                key={platform.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="glass-card p-6 text-center hover:glass-hover transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  platform.color === 'primary' ? 'bg-primary/20' :
                  platform.color === 'secondary' ? 'bg-secondary/20' :
                  'bg-accent/20'
                }`}>
                  <Icon className={`w-8 h-8 ${
                    platform.color === 'primary' ? 'text-primary' :
                    platform.color === 'secondary' ? 'text-secondary' :
                    'text-accent'
                  }`} />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{platform.title}</h3>
                <p className="text-muted-foreground text-sm">{platform.description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                className="glass-panel p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{capability.title}</h3>
                <p className="text-muted-foreground text-sm">{capability.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <div className="flex items-center justify-center space-x-8 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="font-medium">Lightning Fast</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-secondary" />
              <span className="font-medium">Global Access</span>
            </div>
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-5 h-5 text-accent" />
              <span className="font-medium">Unified Learning Experience</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AccessibilitySection = () => {
  const accessibilityFeatures = [
    {
      title: 'Voice Navigation',
      description: 'Complete hands-free control with advanced voice recognition',
      icon: Mic,
      features: ['Voice commands', 'Audio feedback', 'Speech-to-text'],
      color: 'primary'
    },
    {
      title: 'Sign Language Support',
      description: 'Real-time sign language interpretation and visual learning aids',
      icon: Accessibility,
      features: ['ASL interpretation', 'Visual cues', 'Gesture recognition'],
      color: 'secondary'
    },
    {
      title: 'Speech Therapy',
      description: 'Built-in speech therapy modules with AI-powered pronunciation help',
      icon: MessageSquare,
      features: ['Pronunciation guide', 'Speech exercises', 'Progress tracking'],
      color: 'accent'
    },
    {
      title: 'Inclusive Design',
      description: 'Designed for learners with diverse abilities and learning styles',
      icon: Palette,
      features: ['High contrast mode', 'Large text options', 'Simplified interface'],
      color: 'primary'
    }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-secondary/5 to-accent/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Breaking Barriers in Education</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Every student deserves quality education. Our platform is designed to be fully accessible, 
            ensuring no learner is left behind.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8 mb-16">
          {accessibilityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="glass-card p-8 hover:glass-hover transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                  feature.color === 'primary' ? 'bg-primary/20' :
                  feature.color === 'secondary' ? 'bg-secondary/20' :
                  'bg-accent/20'
                }`}>
                  <Icon className={`w-8 h-8 ${
                    feature.color === 'primary' ? 'text-primary' :
                    feature.color === 'secondary' ? 'text-secondary' :
                    'text-accent'
                  }`} />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground mb-6">{feature.description}</p>
                <div className="space-y-2">
                  {feature.features.map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <CheckCircle className={`w-4 h-4 ${
                        feature.color === 'primary' ? 'text-primary' :
                        feature.color === 'secondary' ? 'text-secondary' :
                        'text-accent'
                      }`} />
                      <span className="text-foreground text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="glass-panel p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-4 text-foreground">Universal Access</h3>
          <p className="text-lg text-muted-foreground mb-6">
            Supporting students with visual, hearing, speech, and cognitive differences
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Accessible</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">15+</div>
              <div className="text-muted-foreground">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">24/7</div>
              <div className="text-muted-foreground">AI Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default function Index() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <RoleCards />
      <FeaturesSection />
      <PlatformSection />
      <AccessibilitySection />
    </div>
  );
}