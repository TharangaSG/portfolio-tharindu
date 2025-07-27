import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';

const Hero = () => {
  const { personalInfo } = usePortfolio();
  
  return (
    <section className="bg-gradient-to-br from-primary-50 to-white section-padding">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Hi, I'm{' '}
              <span className="text-primary-600">{personalInfo.name}</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 mb-6">
              {personalInfo.title}
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
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
                className="text-gray-600 hover:text-primary-600 transition-colors"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-gray-600 hover:text-primary-600 transition-colors"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-primary-200 to-primary-400 rounded-2xl flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold">
                    {personalInfo.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <p className="text-lg font-medium">Profile Photo</p>
                <p className="text-sm opacity-80">Add your photo here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;