import { personalInfo, education, experience } from '../data/portfolio';
import { Calendar, MapPin, GraduationCap, Briefcase } from 'lucide-react';

const About = () => {
  return (
    <div className="section-padding">
      <div className="container-max">
        {/* About Section */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Me</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {personalInfo.bio}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                I'm passionate about leveraging technology to solve real-world problems and am always eager to learn new technologies and methodologies. My goal is to contribute to innovative projects that make a positive impact on society.
              </p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <MapPin className="text-primary-600 mr-3" size={20} />
                  <span>{personalInfo.location}</span>
                </li>
                <li className="flex items-center">
                  <GraduationCap className="text-primary-600 mr-3" size={20} />
                  <span>Computer Science Student</span>
                </li>
                <li className="flex items-center">
                  <Briefcase className="text-primary-600 mr-3" size={20} />
                  <span>Software Developer & Researcher</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Education</h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="bg-white p-6 rounded-lg shadow-md border">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-lg text-primary-600">{edu.institution}</p>
                    <p className="text-gray-600 flex items-center mt-1">
                      <MapPin size={16} className="mr-1" />
                      {edu.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 flex items-center justify-end">
                      <Calendar size={16} className="mr-1" />
                      {edu.startDate} - {edu.endDate || 'Present'}
                    </p>
                    {edu.gpa && (
                      <p className="text-gray-700 font-medium">GPA: {edu.gpa}</p>
                    )}
                  </div>
                </div>
                {edu.relevantCourses && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Relevant Coursework:</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.relevantCourses.map((course, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="bg-white p-6 rounded-lg shadow-md border">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                    <p className="text-lg text-primary-600">{exp.company}</p>
                    <p className="text-gray-600 flex items-center mt-1">
                      <MapPin size={16} className="mr-1" />
                      {exp.location}
                    </p>
                  </div>
                  <p className="text-gray-600 flex items-center">
                    <Calendar size={16} className="mr-1" />
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </p>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  {exp.description.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                {exp.technologies && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;