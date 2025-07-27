import { usePortfolio } from '../../contexts/PortfolioContext';

const Skills = () => {
  const { skills } = usePortfolio();
  
  const skillCategories = {
    Programming: skills.filter(skill => skill.category === 'Programming'),
    Framework: skills.filter(skill => skill.category === 'Framework'),
    Database: skills.filter(skill => skill.category === 'Database'),
    Tool: skills.filter(skill => skill.category === 'Tool'),
    Other: skills.filter(skill => skill.category === 'Other'),
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'bg-green-100 text-green-800';
      case 'Advanced':
        return 'bg-blue-100 text-blue-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Beginner':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skillCategories).map(([category, categorySkills]) => (
            categorySkills.length > 0 && (
              <div key={category} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {category}
                </h3>
                <div className="space-y-3">
                  {categorySkills.map((skill, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">
                        {skill.name}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;