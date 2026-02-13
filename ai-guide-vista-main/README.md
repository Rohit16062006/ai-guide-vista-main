# Srestha Vidya Setu - AI Teacher Platform

## Project Overview

Srestha Vidya Setu is a revolutionary AI-powered education platform that breaks barriers in learning. The platform features voice navigation, sign language support, and personalized AI teachers to provide an inclusive and accessible learning experience.

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- React Three Fiber (for 3D models)

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

Follow these steps to set up the project locally:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd ai-teacher

# Step 3: Install the necessary dependencies
npm install

# Step 4: Start the development server
npm run dev
```

### Environment

Create a `.env` in the project root:

```sh
VITE_GEMINI_API_KEY=your_key_here
VITE_GEMINI_MODEL=gemini-1.5-flash
```

Without `VITE_GEMINI_API_KEY`, a local mock question is used.

### Adaptive Diagnostic Prototype

- Visit `/login`, enter your name (email optional)
- You’ll be redirected to the Dashboard; click “Start Diagnostic Test”
- The diagnostic runs ~7 questions, adapting via Google Gemini
- After finishing, view strengths/weaknesses and a recommended path

### Animations

- Framer Motion is used for transitions. Optionally add `anime.js`:

```sh
npm install animejs
```

Then import in components as needed:

```ts
import anime from 'animejs';
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Features

- AI-powered teaching assistance
- Voice navigation support
- Sign language integration
- 3D model visualization
- Responsive design
- Accessibility features

## Project Structure

- `/src/components` - Reusable React components
- `/src/pages` - Page components
- `/src/assets` - Static assets
- `/src/data` - Data models and configurations
- `/src/hooks` - Custom React hooks
- `/src/lib` - Utility functions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is private and proprietary to Srestha Vidya Setu.