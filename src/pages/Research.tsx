import { usePortfolio } from '../contexts/PortfolioContext';
import ResearchCard from '../components/ui/ResearchCard';

const Research = () => {
  const { researchProjects } = usePortfolio();
  
  return (
    <div className="section-padding">
      <div className="container-max">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Research Projects</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            My research focuses on advancing the field of computer science through innovative 
            approaches and practical applications. Here are some of my key research contributions.
          </p>
        </div>

        <div className="space-y-8">
          {researchProjects.map((research) => (
            <ResearchCard key={research.id} research={research} />
          ))}
        </div>

        {researchProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">Research projects will be added soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Research;