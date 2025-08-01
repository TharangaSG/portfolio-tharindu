import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';

const Hero = () => {
  const { personalInfo } = usePortfolio();
  
  return (
    <section className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 section-padding transition-colors duration-200">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Hi, I'm{' '}
              <span className="text-primary-600 dark:text-primary-400">{personalInfo.name}</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
              {personalInfo.title}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              {personalInfo.bio}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                to="/projects"
                className="btn-primary inline-flex items-center justify-center"
              >
                View My Work
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                to="/contact"
                className="btn-secondary inline-flex items-center justify-center"
              >
                Get In Touch
              </Link>
            </div>

            <div className="flex space-x-6">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          <div className="relative flex justify-center">
            {personalInfo.profileImageUrl ? (
              <img
                src={personalInfo.profileImageUrl}
                alt={personalInfo.name}
                className="w-80 h-80 rounded-full object-cover border-8 border-primary-200 dark:border-primary-600 shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const placeholder = target.nextElementSibling as HTMLElement;
                  if (placeholder) placeholder.style.display = 'flex';
                }}
              />
            ) : (
              <div className="w-80 h-80 bg-gradient-to-br from-primary-200 to-primary-400 dark:from-primary-600 dark:to-primary-800 rounded-full flex items-center justify-center border-8 border-primary-200 dark:border-primary-600 shadow-2xl">
                <div className="text-center text-white">
                  <div className="text-6xl mb-2">Photo</div>
                  <div className="text-lg font-medium">Add your photo</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;