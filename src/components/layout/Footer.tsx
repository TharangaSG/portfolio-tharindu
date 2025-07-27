import { Github, Linkedin, Mail } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';

const Footer = () => {
  const { personalInfo } = usePortfolio();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300 mb-2">{personalInfo.email}</p>
            <p className="text-gray-300 mb-2">{personalInfo.phone}</p>
            <p className="text-gray-300">{personalInfo.location}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/projects" className="hover:text-white transition-colors">Projects</a></li>
              <li><a href="/research" className="hover:text-white transition-colors">Research</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 {personalInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;