# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Vite. This portfolio showcases projects, research work, skills, and provides a way for potential employers or collaborators to get in touch.

## Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **TypeScript**: Built with TypeScript for better development experience
- **Fast**: Powered by Vite for lightning-fast development and builds
- **Accessible**: Built with accessibility best practices
- **SEO Friendly**: Optimized for search engines

## Sections

- **Home**: Hero section with introduction and quick links
- **About**: Detailed information about education, experience, and background
- **Projects**: Showcase of development projects with filtering capabilities
- **Research**: Academic research projects and publications
- **Contact**: Contact form and information

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Deployment**: Ready for deployment on Vercel, Netlify, or any static hosting

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone <your-repo-url>
   cd portfolio-website
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open your browser and visit \`http://localhost:5173\`

### Building for Production

\`\`\`bash
npm run build
\`\`\`

The built files will be in the \`dist\` directory.

## Customization

### Personal Information

Update your personal information in \`src/data/portfolio.ts\`:

- Personal details (name, email, phone, etc.)
- Projects information
- Research projects
- Work experience
- Education
- Skills

### Styling

The project uses Tailwind CSS for styling. You can customize:

- Colors in \`tailwind.config.js\`
- Global styles in \`src/index.css\`
- Component-specific styles in individual component files

### Adding New Sections

1. Create a new page component in \`src/pages/\`
2. Add the route in \`src/App.tsx\`
3. Update the navigation in \`src/components/layout/Header.tsx\`

## Project Structure

\`\`\`
src/
├── components/
│   ├── layout/          # Layout components (Header, Footer, Layout)
│   ├── sections/        # Page sections (Hero, Skills, etc.)
│   └── ui/             # Reusable UI components
├── data/               # Static data and content
├── pages/              # Page components
├── types/              # TypeScript type definitions
├── App.tsx             # Main App component
├── main.tsx           # Entry point
└── index.css          # Global styles
\`\`\`

## Deployment

### Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify

1. Build the project: \`npm run build\`
2. Deploy the \`dist\` folder to Netlify

### GitHub Pages

1. Install gh-pages: \`npm install --save-dev gh-pages\`
2. Add deploy script to package.json
3. Run: \`npm run deploy\`

## Contributing

Feel free to fork this project and customize it for your own portfolio. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).