import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  isOpen = false;
  messages: { text: string; sender: 'user' | 'bot' }[] = [];
  inputMessage = '';

  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }

  sendMessage(): void {
    if (this.inputMessage.trim()) {
      this.messages.push({ text: this.inputMessage, sender: 'user' });
      // TODO: Conectar a API de chatbot
      this.messages.push({ text: '¿Cómo puedo ayudarte?', sender: 'bot' });
      this.inputMessage = '';
    }
  }
}
