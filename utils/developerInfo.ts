import type { DeveloperInfo } from "~/interface/DeveloperInfo";

export const developerInfo: DeveloperInfo = {
  name: 'John Doe',
  title: 'Full Stack Developer',
  skills: ['JavaScript', 'Vue.js', 'Node.js', 'Python', 'SQL'],
  experience: [
    { company: 'Tech Corp', role: 'Senior Developer', period: '2020-Present' },
    { company: 'StartUp Inc', role: 'Full Stack Developer', period: '2018-2020' },
  ],
  projects: [
    { name: 'E-commerce Platform', tech: ['Vue.js', 'Node.js', 'MongoDB'] },
    { name: 'Task Management App', tech: ['React', 'Firebase'] },
  ],
  contact: {
    email: 'john.doe@example.com',
    github: 'github.com/johndoe',
    linkedin: 'linkedin.com/in/johndoe',
  },
};
