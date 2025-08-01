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
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'Advanced':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'Intermediate':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'Beginner':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skillCategories).map(([category, categorySkills]) => (
            categorySkills.length > 0 && (
              <div key={category} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md dark:shadow-gray-900/20">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {category}
                </h3>
                <div className="space-y-3">
                  {categorySkills.map((skill, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
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