export interface DeveloperInfo {
  name: string;
  title: string;
  skills: string[];
  experience: { company: string; role: string; period: string }[];
  projects: { name: string; tech: string[] }[];
  contact: { email: string; github: string; linkedin: string };
}