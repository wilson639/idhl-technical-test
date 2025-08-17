# IDHL Technical Test

A basic project setup using npm, Webpack, SASS, and JavaScript modules.

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run watch` - Watch mode for development

## Webpack Configuration

The project uses a custom Webpack configuration that:
- Processes SASS files with `sass-loader`
- Handles JavaScript modules
- Generates HTML from templates
- Extracts CSS for production builds
- Provides development server with hot reload