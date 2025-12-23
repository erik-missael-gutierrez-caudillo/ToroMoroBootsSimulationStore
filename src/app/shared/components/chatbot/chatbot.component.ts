import { Component, inject, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../../core/services/chatbot.service';
import { Message } from '../../../core/models/chatbot.model';

@Component({
	selector: 'app-chatbot',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './chatbot.component.html',
	styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements AfterViewChecked {
	private chatService = inject(ChatbotService);
	@ViewChild('scrollContainer') private scrollContainer!: ElementRef;

	isOpen = 'hidden';
	messages: Message[] = [];
	inputMessage = '';
	isLoading = false;

	constructor() {
		// Mensaje de bienvenida inicial
		this.sendMessage('hola');
	}

	ngAfterViewChecked() { this.scrollToBottom(); }

	toggleChat(parent?: string) { 
		this.isOpen = this.isOpen === 'hidden' ? 'show' : 'hidden';
		if(parent) {
			const parentElement = document.querySelector(parent);
			if(parentElement) parentElement.classList.toggle('hidden');
		}
	}

	sendMessage(textOverride?: string) {
		const msg = textOverride || this.inputMessage;
		if (!msg.trim() || this.isLoading) return;

		if (!textOverride) this.messages.push({ text: msg, sender: 'user' });
		this.inputMessage = '';
		this.isLoading = true;

		setTimeout(() => {
			this.chatService.obtenerRespuesta(msg).subscribe(res => {
				this.messages.push({
					text: res.texto,
					sender: 'bot',
					suggestions: res.suggestions,
					mapUrl: res.mapUrl,
					ticket: res.ticket
				});
				this.isLoading = false;
			});
		}, 700);
	}

	private scrollToBottom() {
		this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
	}
}