import type { DeveloperInfo } from "~/interface/DeveloperInfo";

export const developerInfo: DeveloperInfo = {
  name: 'Diego Reyes | yeyodev',
  title: 'Full Stack Developer',
  skills: ['JavaScript', 'Vue.js', 'Node.js', 'Python', 'MongoDb', 'Typescript', 'OpenAi'],
  experience: [
    { company: 'Tech Corp', role: 'Senior Developer', period: '2020-Present' },
    { company: 'StartUp Inc', role: 'Full Stack Developer', period: '2018-2020' },
  ],
  projects: [
    { name: 'E-commerce Platform', tech: ['Vue.js', 'Node.js', 'MongoDB'] },
    { name: 'Task Management App', tech: ['Nuxt', 'MongoDB'] },
  ],
  contact: {
    email: 'yeyodev@icloud.com',
    github: 'github.com/yeyodev1',
    linkedin: 'linkedin.com/yeyodev',
  },
};
