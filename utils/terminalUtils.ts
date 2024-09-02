import { nextTick } from 'vue';

export async function handleCommand(
  currentInput: Ref<string>,
  outputLines: Ref<string[]>,
  isTyping: Ref<boolean>,
  commands: Record<string, () => string>,
  typeWriter: (text: string) => Promise<void>,
  scrollToBottom: () => void
): Promise<void> {
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
}

export async function typeWriter(text: string, outputLines: Ref<string[]>): Promise<void> {
  const words = text.split(' ');
  let result = '';
  for (const word of words) {
    result += word + ' ';
    outputLines.value.push(result);
    await new Promise(resolve => setTimeout(resolve, 50));
  }
}

export function scrollToBottom(terminalContent: Ref<HTMLElement | null>): void {
  nextTick(() => {
    if (terminalContent.value) {
      terminalContent.value.scrollTop = terminalContent.value.scrollHeight;
    }
  });
}