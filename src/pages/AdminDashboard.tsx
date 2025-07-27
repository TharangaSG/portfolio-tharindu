import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  FolderOpen, 
  GraduationCap, 
  Briefcase, 
  BookOpen, 
  Settings,
  LogOut,
  Plus
} from 'lucide-react';
import PersonalInfoManager from '../components/admin/PersonalInfoManager';
import ProjectsManager from '../components/admin/ProjectsManager';
import ResearchManager from '../components/admin/ResearchManager';
import ExperienceManager from '../components/admin/ExperienceManager';
import EducationManager from '../components/admin/EducationManager';
import SkillsManager from '../components/admin/SkillsManager';

type TabType = 'personal' | 'projects' | 'research' | 'experience' | 'education' | 'skills';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const { logout } = useAuth();

  const tabs = [
    { id: 'personal' as TabType, name: 'Personal Info', icon: User },
    { id: 'projects' as TabType, name: 'Projects', icon: FolderOpen },
    { id: 'research' as TabType, name: 'Research', icon: BookOpen },
    { id: 'experience' as TabType, name: 'Experience', icon: Briefcase },
    { id: 'education' as TabType, name: 'Education', icon: GraduationCap },
    { id: 'skills' as TabType, name: 'Skills', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoManager />;
      case 'projects':
        return <ProjectsManager />;
      case 'research':
        return <ResearchManager />;
      case 'experience':
        return <ExperienceManager />;
      case 'education':
        return <EducationManager />;
      case 'skills':
        return <SkillsManager />;
      default:
        return <PersonalInfoManager />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={logout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-lg shadow-sm p-4">
              <ul className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          activeTab === tab.id
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="mr-3 h-5 w-5" />
                        {tab.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;