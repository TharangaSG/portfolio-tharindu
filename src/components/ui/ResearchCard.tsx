import { Calendar, Users, ExternalLink, FileText } from 'lucide-react';
import { ResearchProject } from '../../types';

interface ResearchCardProps {
  research: ResearchProject;
}

const ResearchCard = ({ research }: ResearchCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{research.title}</h3>
          <p className="text-lg text-gray-700 mb-4">{research.description}</p>
        </div>
        
        <div className="lg:ml-6 lg:text-right">
          {research.publishedDate && (
            <div className="flex items-center lg:justify-end text-gray-600 mb-2">
              <Calendar size={16} className="mr-1" />
              <span className="text-sm">
                {new Date(research.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          )}
          
          {(research.journal || research.conference) && (
            <p className="text-sm text-primary-600 font-medium">
              {research.journal || research.conference}
            </p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">Abstract</h4>
        <p className="text-gray-700 leading-relaxed">{research.abstract}</p>
      </div>

      <div className="flex items-center mb-4">
        <Users size={16} className="text-gray-500 mr-2" />
        <span className="text-sm text-gray-600">
          <strong>Authors:</strong> {research.authors.join(', ')}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {research.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {research.paperUrl && (
        <div className="flex justify-end">
          <a
            href={research.paperUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            <FileText size={18} className="mr-1" />
            Read Paper
            <ExternalLink size={14} className="ml-1" />
          </a>
        </div>
      )}
    </div>
  );
};

export default ResearchCard;