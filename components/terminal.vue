<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { handleCommand, typeWriter, scrollToBottom } from '@/utils/terminalUtils';

const outputLines = ref<string[]>([]);
const currentInput = ref('');
const isTyping = ref(false);
const terminalContent = ref<HTMLElement | null>(null);

const commands: Record<string, () => string> = {
  help: function(): string {
    return `Available commands: ${Object.keys(commands).join(', ')}`;
  },
  about: function(): string {
    return `Hi, I'm ${developerInfo.name}, a ${developerInfo.title}.`;
  },
  skills: function(): string {
    return `My skills include: ${developerInfo.skills.join(', ')}`;
  },
  experience: function(): string {
    return developerInfo.experience.map(exp => `${exp.role} at ${exp.company} (${exp.period})`).join('<br>');
  },
  projects: function(): string {
    return developerInfo.projects.map(proj => `${proj.name} - Technologies: ${proj.tech.join(', ')}`).join('<br>');
  },
  contact: function(): string {
    return `Email: ${developerInfo.contact.email}<br>GitHub: ${developerInfo.contact.github}<br>LinkedIn: ${developerInfo.contact.linkedin}`;
  },
  clear: function(): string {
    outputLines.value = [];
    return '';
  }
};

async function handleCommandInput(): Promise<void> {
  await handleCommand(currentInput, outputLines, isTyping, commands, (text) => typeWriter(text, outputLines), () =>
    scrollToBottom(terminalContent)
  );
}

onMounted(async () => {
  await typeWriter("Welcome to my interactive portfolio! Type 'help' to see available commands.", outputLines);
});
</script>

<template>
  <div class="min-h-screen bg-black text-green-400 p-4 font-mono flex justify-center items-center">
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
              @keyup.enter="handleCommandInput"
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