import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel
import { ChatbotService } from '../../../core/services/chatbot.service';
import { ChatbotModel } from '../../../core/models/chatbot.model';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule], // Quitamos ChatbotService de aquí
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  private chatService = inject(ChatbotService); // Forma moderna de inyectar en Angular 18

  isOpen = false;
  messages: { text: string; sender: 'user' | 'bot'; suggestions?: string[] }[] = [];
  inputMessage = '';
  isLoading = false;

  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }

  sendMessage(): void {
    if (!this.inputMessage.trim() || this.isLoading) return;

    const userMessage = this.inputMessage;
    this.messages.push({ text: userMessage, sender: 'user' });
    this.inputMessage = '';
    this.isLoading = true;

    this.chatService.getResponse(userMessage).subscribe({
      next: (res: ChatbotModel) => {
        this.messages.push({ 
          text: res.response, 
          sender: 'bot',
          suggestions: res.suggestions 
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.messages.push({ text: 'Lo siento, hubo un error de conexión.', sender: 'bot' });
        this.isLoading = false;
      }
    });
  }
}