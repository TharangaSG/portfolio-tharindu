import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { ResearchProject } from '../../types';

const ResearchManager = () => {
  const { researchProjects, addResearchProject, updateResearchProject, deleteResearchProject } = usePortfolio();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<ResearchProject | null>(null);

  const emptyResearch: ResearchProject = {
    id: '',
    title: '',
    description: '',
    abstract: '',
    authors: [],
    tags: [],
    publishedDate: '',
    journal: '',
    conference: '',
    paperUrl: ''
  };

  const handleEdit = (research: ResearchProject) => {
    setIsEditing(research.id);
    setEditForm({ ...research });
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditForm({ ...emptyResearch, id: Date.now().toString() });
  };

  const handleSave = () => {
    if (!editForm) return;

    const researchData = {
      ...editForm,
      authors: typeof editForm.authors === 'string' 
        ? (editForm.authors as string).split(',').map((a: string) => a.trim()).filter((a: string) => a)
        : Array.isArray(editForm.authors) ? editForm.authors : [],
      tags: typeof editForm.tags === 'string' 
        ? (editForm.tags as string).split(',').map((t: string) => t.trim()).filter((t: string) => t)
        : Array.isArray(editForm.tags) ? editForm.tags : []
    };

    if (isAdding) {
      addResearchProject(researchData);
      setIsAdding(false);
    } else {
      updateResearchProject(editForm.id, researchData);
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
    if (window.confirm('Are you sure you want to delete this research project?')) {
      deleteResearchProject(id);
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
        <h2 className="text-2xl font-bold text-gray-900">Research Projects</h2>
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Research
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || isEditing) && editForm && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-4">
            {isAdding ? 'Add New Research Project' : 'Edit Research Project'}
          </h3>
          <div className="space-y-4">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Abstract</label>
              <textarea
                name="abstract"
                value={editForm.abstract}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Authors (comma-separated)</label>
                <input
                  type="text"
                  name="authors"
                  value={Array.isArray(editForm.authors) ? editForm.authors.join(', ') : editForm.authors}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="John Doe, Jane Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={Array.isArray(editForm.tags) ? editForm.tags.join(', ') : editForm.tags}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Machine Learning, AI"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Published Date</label>
                <input
                  type="date"
                  name="publishedDate"
                  value={editForm.publishedDate || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Journal</label>
                <input
                  type="text"
                  name="journal"
                  value={editForm.journal || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Conference</label>
                <input
                  type="text"
                  name="conference"
                  value={editForm.conference || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Paper URL</label>
                <input
                  type="url"
                  name="paperUrl"
                  value={editForm.paperUrl || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
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

      {/* Research Projects List */}
      <div className="space-y-4">
        {researchProjects.map((research) => (
          <div key={research.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{research.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{research.description}</p>
                <p className="text-sm text-gray-700 mb-2 line-clamp-2">{research.abstract}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {research.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span>Authors: {research.authors.join(', ')}</span>
                  {research.publishedDate && <span>Published: {research.publishedDate}</span>}
                  {research.journal && <span>Journal: {research.journal}</span>}
                  {research.conference && <span>Conference: {research.conference}</span>}
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(research)}
                  className="p-2 text-gray-600 hover:text-primary-600"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(research.id)}
                  className="p-2 text-gray-600 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {researchProjects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No research projects added yet. Click "Add Research" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchManager;