import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';
import Hero from '../components/sections/Hero';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import Skills from '../components/sections/Skills';

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedProjects />
      <Skills />
      
      {/* CTA Section */}
      <section className="bg-primary-600 text-white section-padding">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Let's discuss how I can contribute to your next project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
            >
              Get In Touch
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <a
              href="/resume.pdf"
              download
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
            >
              Download Resume
              <Download className="ml-2" size={20} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;