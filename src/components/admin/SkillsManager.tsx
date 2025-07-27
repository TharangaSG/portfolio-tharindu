import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Skill } from '../../types';

const SkillsManager = () => {
  const { skills, addSkill, updateSkill, deleteSkill } = usePortfolio();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<Skill | null>(null);

  const emptySkill: Skill = {
    name: '',
    level: 'Beginner',
    category: 'Programming'
  };

  const handleEdit = (skill: Skill) => {
    setIsEditing(skill.name);
    setEditForm({ ...skill });
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditForm({ ...emptySkill });
  };

  const handleSave = () => {
    if (!editForm) return;

    if (isAdding) {
      addSkill(editForm);
      setIsAdding(false);
    } else {
      updateSkill(isEditing!, editForm);
      setIsEditing(null);
    }
    setEditForm(null);
  };

  const handleCancel = () => {
    setIsEditing(null);
    setIsAdding(false);
    setEditForm(null);
  };

  const handleDelete = (name: string) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      deleteSkill(name);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editForm) return;
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || isEditing) && editForm && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-4">
            {isAdding ? 'Add New Skill' : 'Edit Skill'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <select
                name="level"
                value={editForm.level}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={editForm.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="Programming">Programming</option>
                <option value="Framework">Framework</option>
                <option value="Tool">Tool</option>
                <option value="Database">Database</option>
                <option value="Other">Other</option>
              </select>
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

      {/* Skills List by Category */}
      <div className="space-y-6">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category} className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{category}</h3>
            <div className="space-y-2">
              {categorySkills.map((skill) => (
                <div key={skill.name} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-900">{skill.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                      {skill.level}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="p-1 text-gray-600 hover:text-primary-600"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(skill.name)}
                      className="p-1 text-gray-600 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {skills.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No skills added yet. Click "Add Skill" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsManager;