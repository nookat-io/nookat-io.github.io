# Nookat.io Landing Page

Nookat is a lightweight container management tool build with Tauri, Rust and React

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

## License

Apache License 2.0 - see LICENCE.txt for details.
