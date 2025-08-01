import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import ProjectCard from '../ui/ProjectCard';

const FeaturedProjects = () => {
  const { projects } = usePortfolio();
  const featuredProjects = projects.slice(0, 3); // Show first 3 projects

  return (
    <section className="section-padding bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/projects"
            className="btn-primary inline-flex items-center"
          >
            View All Projects
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;