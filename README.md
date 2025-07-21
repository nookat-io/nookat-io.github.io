# Nookat Landing Page - React TypeScript

A modern, clean React TypeScript landing page for Nookat - Free Docker Desktop Alternative.

## Features

- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Single HTML file output** for easy deployment
- **Animated backgrounds** with gradient transitions
- **Responsive design** that works on all devices
- **OS detection** for smart download buttons
- **Performance optimized** animations

## Quick Start

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Build single HTML file for GitHub Pages
npm run build:single
\`\`\`

## Deployment to GitHub Pages

1. Run `npm run build:single`
2. Copy the generated `dist/index.html` to your repository root
3. Enable GitHub Pages in repository settings
4. Your site will be live at `https://yourusername.github.io/repository-name`

## Project Structure

\`\`\`
src/
├── components/          # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── WhySection.tsx
│   ├── DownloadSection.tsx
│   └── Footer.tsx
├── App.tsx             # Main App component
├── main.tsx           # React entry point
└── index.css          # Global styles with animations
\`\`\`

## Customization

### Update Download Links
Edit the `downloads` array in `src/components/DownloadSection.tsx`:

\`\`\`typescript
const downloads = [
  {
    platform: 'macOS',
    filename: '.dmg',
    requirements: 'macOS 10.15 or later',
    downloadUrl: 'https://github.com/nookat/nookat/releases/download/v1.0.0/nookat-macos.dmg',
  },
  // ...
];
\`\`\`

### Modify Colors
Update the color values in `src/index.css` to match your brand colors.

## Performance

- All animations use CSS transforms for 60fps performance
- GPU-accelerated animations
- Optimized bundle size
- Single file output for fast loading

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is free to use and modify.
