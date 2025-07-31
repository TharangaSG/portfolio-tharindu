import { Project, ResearchProject, Experience, Education, Skill } from '../types';

export const personalInfo = {
  name: "Your Name",
  title: "Computer Science Student & Researcher",
  email: "your.email@university.edu",
  phone: "+1 (555) 123-4567",
  location: "University City, State",
  linkedin: "https://linkedin.com/in/yourprofile",
  github: "https://github.com/yourusername",
  website: "https://yourportfolio.com",
  bio: "Passionate computer science student with a strong interest in artificial intelligence, machine learning, and software development. Currently pursuing my degree while actively engaging in research projects and building innovative applications.",
  profileImageUrl: "/image.jpg"
};

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe API"],
    category: "web",
    githubUrl: "https://github.com/yourusername/ecommerce-platform",
    liveUrl: "https://your-ecommerce-demo.com"
  },
  {
    id: "2",
    title: "Task Management Mobile App",
    description: "A cross-platform mobile application for task management with real-time synchronization and collaborative features.",
    technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
    category: "mobile",
    githubUrl: "https://github.com/yourusername/task-manager-app"
  },
  {
    id: "3",
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for visualizing complex datasets with various chart types and filtering capabilities.",
    technologies: ["Python", "Dash", "Plotly", "Pandas", "PostgreSQL"],
    category: "web",
    githubUrl: "https://github.com/yourusername/data-viz-dashboard"
  }
];

export const researchProjects: ResearchProject[] = [
  {
    id: "1",
    title: "Machine Learning Approaches for Sentiment Analysis in Social Media",
    description: "Investigating various ML algorithms for analyzing sentiment in social media posts with focus on handling sarcasm and context.",
    abstract: "This research explores the effectiveness of different machine learning approaches in sentiment analysis of social media content. We compare traditional methods with modern deep learning techniques and propose a novel approach for handling contextual sentiment analysis.",
    authors: ["Your Name", "Dr. Advisor Name", "Collaborator Name"],
    tags: ["Machine Learning", "NLP", "Sentiment Analysis", "Social Media"],
    publishedDate: "2023-09-15",
    conference: "International Conference on Computational Linguistics",
    paperUrl: "/paper.pdf"
  },
  {
    id: "2",
    title: "Optimization of Neural Network Architectures for Edge Computing",
    description: "Research on developing lightweight neural network architectures suitable for deployment on edge devices with limited computational resources.",
    abstract: "This study focuses on creating efficient neural network architectures that maintain high accuracy while being suitable for edge computing environments. We explore various compression techniques and novel architectural designs.",
    authors: ["Your Name", "Research Team"],
    tags: ["Neural Networks", "Edge Computing", "Optimization", "Mobile Computing"],
    paperUrl: "/paper.pdf"
  }
];

export const experience: Experience[] = [
  {
    id: "1",
    title: "Software Development Intern",
    company: "Tech Company Inc.",
    location: "City, State",
    startDate: "2023-06",
    endDate: "2023-08",
    description: [
      "Developed and maintained web applications using React and Node.js",
      "Collaborated with senior developers on feature implementation",
      "Participated in code reviews and agile development processes",
      "Improved application performance by 25% through optimization"
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Git"]
  },
  {
    id: "2",
    title: "Research Assistant",
    company: "University Research Lab",
    location: "University City, State",
    startDate: "2023-01",
    description: [
      "Assisted in machine learning research projects",
      "Implemented and tested various ML algorithms",
      "Analyzed large datasets and prepared research reports",
      "Presented findings at departmental seminars"
    ],
    technologies: ["Python", "TensorFlow", "PyTorch", "Jupyter"]
  }
];

export const education: Education[] = [
  {
    id: "1",
    degree: "Bachelor of Science in Computer Science",
    institution: "Your University",
    location: "University City, State",
    startDate: "2021-09",
    endDate: "2025-05",
    gpa: "3.8/4.0",
    relevantCourses: [
      "Data Structures and Algorithms",
      "Machine Learning",
      "Database Systems",
      "Software Engineering",
      "Computer Networks",
      "Artificial Intelligence"
    ]
  }
];

export const skills: Skill[] = [
  { name: "JavaScript/TypeScript", level: "Advanced", category: "Programming" },
  { name: "Python", level: "Advanced", category: "Programming" },
  { name: "Java", level: "Intermediate", category: "Programming" },
  { name: "C++", level: "Intermediate", category: "Programming" },
  { name: "React", level: "Advanced", category: "Framework" },
  { name: "Node.js", level: "Intermediate", category: "Framework" },
  { name: "Express.js", level: "Intermediate", category: "Framework" },
  { name: "TensorFlow", level: "Intermediate", category: "Framework" },
  { name: "PyTorch", level: "Beginner", category: "Framework" },
  { name: "MongoDB", level: "Intermediate", category: "Database" },
  { name: "PostgreSQL", level: "Intermediate", category: "Database" },
  { name: "Git", level: "Advanced", category: "Tool" },
  { name: "Docker", level: "Beginner", category: "Tool" },
  { name: "AWS", level: "Beginner", category: "Tool" }
];