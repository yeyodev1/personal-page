<script setup>
import { ref, onMounted, nextTick } from 'vue';

const outputLines = ref([]);
const currentInput = ref('');
const isTyping = ref(false);
const terminalContent = ref(null);

const developerInfo = {
  name: 'John Doe',
  title: 'Full Stack Developer',
  skills: ['JavaScript', 'Vue.js', 'Node.js', 'Python', 'SQL'],
  experience: [
    { company: 'Tech Corp', role: 'Senior Developer', period: '2020-Present' },
    { company: 'StartUp Inc', role: 'Full Stack Developer', period: '2018-2020' }
  ],
  projects: [
    { name: 'E-commerce Platform', tech: ['Vue.js', 'Node.js', 'MongoDB'] },
    { name: 'Task Management App', tech: ['React', 'Firebase'] }
  ],
  contact: {
    email: 'john.doe@example.com',
    github: 'github.com/johndoe',
    linkedin: 'linkedin.com/in/johndoe'
  }
};

const commands = {
  help: () => `Available commands: ${Object.keys(commands).join(', ')}`,
  about: () => `Hi, I'm ${developerInfo.name}, a ${developerInfo.title}.`,
  skills: () => `My skills include: ${developerInfo.skills.join(', ')}`,
  experience: () => developerInfo.experience.map(exp => `${exp.role} at ${exp.company} (${exp.period})`).join('<br>'),
  projects: () => developerInfo.projects.map(proj => `${proj.name} - Technologies: ${proj.tech.join(', ')}`).join('<br>'),
  contact: () => `Email: ${developerInfo.contact.email}<br>GitHub: ${developerInfo.contact.github}<br>LinkedIn: ${developerInfo.contact.linkedin}`,
  clear: () => {
    outputLines.value = [];
    return '';
  }
};

const handleCommand = async () => {
  const command = currentInput.value.toLowerCase().trim();
  outputLines.value.push(`${currentInput.value}`);
  currentInput.value = '';
  isTyping.value = true;

  if (commands[command]) {
    await typeWriter(commands[command]());
  } else {
    await typeWriter(`Command not found. Type 'help' for available commands.`);
  }

  isTyping.value = false;
  scrollToBottom();
};

const typeWriter = async (text) => {
  const words = text.split(' ');
  let result = '';
  for (const word of words) {
    result += word + ' ';
    outputLines.value.push(result);
    await new Promise(resolve => setTimeout(resolve, 50));
  }
};

const scrollToBottom = () => {
  nextTick(() => {
    if (terminalContent.value) {
      terminalContent.value.scrollTop = terminalContent.value.scrollHeight;
    }
  });
};

onMounted(async () => {
  await typeWriter("Welcome to my interactive portfolio! Type 'help' to see available commands.");
});
</script>

<template>
  <div class="min-h-screen bg-black text-green-400 p-4 font-mono">
    <div class="container mx-auto">
      <div class="terminal-window bg-gray-900 rounded-lg p-4 shadow-lg">
        <div class="terminal-header flex justify-between items-center mb-4">
          <div class="flex space-x-2">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div class="text-sm text-gray-500">developer@portfolio:~</div>
        </div>
        <div class="terminal-content" ref="terminalContent">
          <div v-for="(line, index) in outputLines" :key="index">
            <span class="text-blue-400">$ </span>
            <span v-html="line"></span>
          </div>
          <div class="flex items-center">
            <span class="text-blue-400">$ </span>
            <input
              v-model="currentInput"
              @keyup.enter="handleCommand"
              type="text"
              class="bg-transparent border-none outline-none flex-grow ml-2"
              :disabled="isTyping"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.terminal-window {
  height: 80vh;
  overflow-y: auto;
}

.terminal-content {
  height: calc(100% - 2rem);
  overflow-y: auto;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.terminal-content::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.terminal-content {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
