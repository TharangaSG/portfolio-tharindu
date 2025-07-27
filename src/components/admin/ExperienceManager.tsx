import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Experience } from '../../types';

const ExperienceManager = () => {
  const { experience, addExperience, updateExperience, deleteExperience } = usePortfolio();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<Experience | null>(null);

  const emptyExperience: Experience = {
    id: '',
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: [],
    technologies: []
  };

  const handleEdit = (exp: Experience) => {
    setIsEditing(exp.id);
    setEditForm({ ...exp });
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditForm({ ...emptyExperience, id: Date.now().toString() });
  };

  const handleSave = () => {
    if (!editForm) return;

    const expData = {
      ...editForm,
      description: typeof editForm.description === 'string' 
        ? editForm.description.split('\n').filter(d => d.trim())
        : editForm.description,
      technologies: typeof editForm.technologies === 'string' 
        ? editForm.technologies.split(',').map(t => t.trim()).filter(t => t)
        : editForm.technologies || []
    };

    if (isAdding) {
      addExperience(expData);
      setIsAdding(false);
    } else {
      updateExperience(editForm.id, expData);
      setIsEditing(null);
    }
    setEditForm(null);
  };

  const handleCancel = () => {
    setIsEditing(null);
    setIsAdding(false);
    setEditForm(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      deleteExperience(id);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editForm) return;
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || isEditing) && editForm && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-4">
            {isAdding ? 'Add New Experience' : 'Edit Experience'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                name="company"
                value={editForm.company}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={editForm.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma-separated)</label>
              <input
                type="text"
                name="technologies"
                value={Array.isArray(editForm.technologies) ? editForm.technologies.join(', ') : editForm.technologies}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="React, Node.js, MongoDB"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={editForm.startDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date (leave empty if current)</label>
              <input
                type="date"
                name="endDate"
                value={editForm.endDate || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (one point per line)</label>
              <textarea
                name="description"
                value={Array.isArray(editForm.description) ? editForm.description.join('\n') : editForm.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="• Developed web applications using React and Node.js&#10;• Collaborated with cross-functional teams&#10;• Improved application performance by 25%"
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              <X className="mr-2 h-4 w-4 inline" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              <Save className="mr-2 h-4 w-4 inline" />
              Save
            </button>
          </div>
        </div>
      )}

      {/* Experience List */}
      <div className="space-y-4">
        {experience.map((exp) => (
          <div key={exp.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{exp.title}</h3>
                <p className="text-primary-600 font-medium">{exp.company}</p>
                <p className="text-sm text-gray-600 mb-2">{exp.location}</p>
                <p className="text-sm text-gray-500 mb-3">
                  {exp.startDate} - {exp.endDate || 'Present'}
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 mb-3 space-y-1">
                  {exp.description.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(exp)}
                  className="p-2 text-gray-600 hover:text-primary-600"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="p-2 text-gray-600 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {experience.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No experience added yet. Click "Add Experience" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceManager;