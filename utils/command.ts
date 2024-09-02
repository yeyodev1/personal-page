import { developerInfo } from './developerInfo';

type CommandFunction = () => string;

export const commands: Record<string, CommandFunction> = {
  help: () => `Available commands: ${Object.keys(commands).join(', ')}`,
  about: () => `Hi, I'm ${developerInfo.name}, a ${developerInfo.title}.`,
  skills: () => `My skills include: ${developerInfo.skills.join(', ')}`,
  experience: () =>
    developerInfo.experience.map((exp) => `${exp.role} at ${exp.company} (${exp.period})`).join('<br>'),
  projects: () =>
    developerInfo.projects.map((proj) => `${proj.name} - Technologies: ${proj.tech.join(', ')}`).join('<br>'),
  contact: () => `Email: ${developerInfo.contact.email}<br>GitHub: ${developerInfo.contact.github}<br>LinkedIn: ${developerInfo.contact.linkedin}`,
  clear: () => '',
};
