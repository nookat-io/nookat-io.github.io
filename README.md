# Nookat.io Landing Page

A modern, responsive landing page for Nookat - a free and open source Docker Desktop alternative. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Modern Design**: Clean, professional design with dark/light theme support
- **Responsive**: Optimized for all device sizes
- **Fast**: Lightweight and optimized for performance
- **Accessible**: Built with accessibility in mind
- **Static Export**: Can be built as a single HTML file for easy deployment

## Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful icons
- **Radix UI** - Accessible UI primitives
- **Class Variance Authority** - Type-safe component variants

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Build single file for static deployment
npm run build:single

# Preview production build
npm run preview
```

## Project Structure

```
├── app/
│   ├── globals.css      # Global styles and utilities
│   ├── layout.tsx       # Root layout component with theme provider
│   └── page.tsx         # Main page component
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── BackgroundEffects.tsx
│   ├── Carousel.tsx
│   ├── Download.tsx
│   ├── Features.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── index.ts         # Component exports
│   ├── Screenshots.tsx
│   ├── ThemeProvider.tsx
│   ├── ThemeToggle.tsx
│   └── WhyNookat.tsx
├── lib/
│   └── utils.ts         # Utility functions
├── public/              # Static assets
│   ├── screenshots/     # App screenshots (dark/light themes)
│   └── favicon.png
├── vite.config.ts       # Vite configuration
└── vite.single.config.ts # Single file build configuration
```

## Key Dependencies

- `react` & `react-dom` ^19
- `@vitejs/plugin-react` ^4.7.0
- `lucide-react` ^0.454.0
- `@radix-ui/react-slot` 1.1.1
- `class-variance-authority` ^0.7.1
- `tailwindcss` ^3.4.17
- `vite-plugin-singlefile` ^2.3.0

## Design Principles

- **DRY (Don't Repeat Yourself)**: Reusable components and utility classes
- **SOLID Principles**: Single responsibility, open/closed, etc.
- **Simplicity**: Clean, maintainable code
- **Performance**: Optimized for fast loading
- **Accessibility**: WCAG compliant with Radix UI primitives

## Deployment

The project can be built as a single HTML file using:

```bash
npm run build:single
```

This creates a self-contained HTML file that can be deployed anywhere using the `vite-plugin-singlefile` plugin.

## License

Apache License 2.0 - see LICENCE.txt for details.
