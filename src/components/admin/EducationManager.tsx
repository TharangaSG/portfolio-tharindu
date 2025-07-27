import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Education } from '../../types';

const EducationManager = () => {
  const { education, addEducation, updateEducation, deleteEducation } = usePortfolio();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<Education | null>(null);

  const emptyEducation: Education = {
    id: '',
    degree: '',
    institution: '',
    location: '',
    startDate: '',
    endDate: '',
    gpa: '',
    relevantCourses: []
  };

  const handleEdit = (edu: Education) => {
    setIsEditing(edu.id);
    setEditForm({ ...edu });
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditForm({ ...emptyEducation, id: Date.now().toString() });
  };

  const handleSave = () => {
    if (!editForm) return;

    const eduData = {
      ...editForm,
      relevantCourses: typeof editForm.relevantCourses === 'string' 
        ? (editForm.relevantCourses as string).split(',').map((c: string) => c.trim()).filter((c: string) => c)
        : Array.isArray(editForm.relevantCourses) ? editForm.relevantCourses : []
    };

    if (isAdding) {
      addEducation(eduData);
      setIsAdding(false);
    } else {
      updateEducation(editForm.id, eduData);
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
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      deleteEducation(id);
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
        <h2 className="text-2xl font-bold text-gray-900">Education</h2>
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || isEditing) && editForm && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-4">
            {isAdding ? 'Add New Education' : 'Edit Education'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
              <input
                type="text"
                name="degree"
                value={editForm.degree}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Bachelor of Science in Computer Science"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
              <input
                type="text"
                name="institution"
                value={editForm.institution}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="University Name"
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
                placeholder="City, State"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GPA (optional)</label>
              <input
                type="text"
                name="gpa"
                value={editForm.gpa || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="3.8/4.0"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Relevant Courses (comma-separated)</label>
              <textarea
                name="relevantCourses"
                value={Array.isArray(editForm.relevantCourses) ? editForm.relevantCourses.join(', ') : editForm.relevantCourses}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Data Structures and Algorithms, Machine Learning, Database Systems"
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

      {/* Education List */}
      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{edu.degree}</h3>
                <p className="text-primary-600 font-medium">{edu.institution}</p>
                <p className="text-sm text-gray-600 mb-2">{edu.location}</p>
                <p className="text-sm text-gray-500 mb-3">
                  {edu.startDate} - {edu.endDate || 'Present'}
                  {edu.gpa && <span className="ml-4">GPA: {edu.gpa}</span>}
                </p>
                {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Relevant Courses:</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.relevantCourses.map((course, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(edu)}
                  className="p-2 text-gray-600 hover:text-primary-600"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(edu.id)}
                  className="p-2 text-gray-600 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {education.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No education entries added yet. Click "Add Education" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationManager;