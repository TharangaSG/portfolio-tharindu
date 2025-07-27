import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Project } from '../../types';

const ProjectsManager = () => {
  const { projects, addProject, updateProject, deleteProject } = usePortfolio();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<Project | null>(null);

  const emptyProject: Project = {
    id: '',
    title: '',
    description: '',
    technologies: [],
    category: 'web',
    githubUrl: '',
    liveUrl: ''
  };

  const handleEdit = (project: Project) => {
    setIsEditing(project.id);
    setEditForm({ ...project, technologies: project.technologies || [] });
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditForm({ ...emptyProject, id: Date.now().toString() });
  };

  const handleSave = () => {
    if (!editForm) return;

    const projectData = {
      ...editForm,
      technologies: typeof editForm.technologies === 'string' 
        ? editForm.technologies.split(',').map(t => t.trim()).filter(t => t)
        : editForm.technologies
    };

    if (isAdding) {
      addProject(projectData);
      setIsAdding(false);
    } else {
      updateProject(editForm.id, projectData);
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
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editForm) return;
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || isEditing) && editForm && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-4">
            {isAdding ? 'Add New Project' : 'Edit Project'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={editForm.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="web">Web</option>
                <option value="mobile">Mobile</option>
                <option value="desktop">Desktop</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleInputChange}
                rows={3}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
              <input
                type="url"
                name="githubUrl"
                value={editForm.githubUrl || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Live URL</label>
              <input
                type="url"
                name="liveUrl"
                value={editForm.liveUrl || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4 text-sm text-gray-500">
                  <span>Category: {project.category}</span>
                  {project.githubUrl && <span>GitHub: ✓</span>}
                  {project.liveUrl && <span>Live Demo: ✓</span>}
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 text-gray-600 hover:text-primary-600"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 text-gray-600 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {projects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No projects added yet. Click "Add Project" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsManager;