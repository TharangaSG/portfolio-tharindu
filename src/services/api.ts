// API service for backend communication
const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Personal Info API
  async getPersonalInfo() {
    return this.request('/personal-info');
  }

  async updatePersonalInfo(data: any) {
    return this.request('/personal-info', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Projects API
  async getProjects() {
    return this.request('/projects');
  }

  async createProject(data: any) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProject(id: string, data: any) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProject(id: string) {
    return this.request(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Research Projects API
  async getResearchProjects() {
    return this.request('/research-projects');
  }

  async createResearchProject(data: any) {
    return this.request('/research-projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateResearchProject(id: string, data: any) {
    return this.request(`/research-projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteResearchProject(id: string) {
    return this.request(`/research-projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Experience API
  async getExperiences() {
    return this.request('/experiences');
  }

  async createExperience(data: any) {
    return this.request('/experiences', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateExperience(id: string, data: any) {
    return this.request(`/experiences/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteExperience(id: string) {
    return this.request(`/experiences/${id}`, {
      method: 'DELETE',
    });
  }

  // Education API
  async getEducation() {
    return this.request('/education');
  }

  async createEducation(data: any) {
    return this.request('/education', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateEducation(id: string, data: any) {
    return this.request(`/education/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteEducation(id: string) {
    return this.request(`/education/${id}`, {
      method: 'DELETE',
    });
  }

  // Skills API
  async getSkills() {
    return this.request('/skills');
  }

  async createSkill(data: any) {
    return this.request('/skills', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateSkill(id: string, data: any) {
    return this.request(`/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async updateSkillByName(name: string, data: any) {
    return this.request(`/skills/name/${encodeURIComponent(name)}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteSkill(id: string) {
    return this.request(`/skills/${id}`, {
      method: 'DELETE',
    });
  }

  async deleteSkillByName(name: string) {
    return this.request(`/skills/name/${encodeURIComponent(name)}`, {
      method: 'DELETE',
    });
  }

  // Auth API
  async login(username: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }
}

export const apiService = new ApiService();
export default apiService;