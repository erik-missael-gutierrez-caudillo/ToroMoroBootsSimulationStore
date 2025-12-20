import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ChatbotModel } from '../models/chatbot.model';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  // URL de tu API (ejemplo: Dialogflow, OpenAI, o un backend propio en Node.js)
  private apiUrl = 'https://f7f1539e-99c8-4afa-8375-dae711494b4c-00-mseo5q1csmuo.riker.replit.dev/';

  constructor(private http: HttpClient) {}

  getResponse(message: string): Observable<ChatbotModel> {
    // Por ahora, simulamos una respuesta basada en tu modelo
    // Cuando tengas el backend, usarías: return this.http.post<ChatbotModel>(this.apiUrl, { message });

    const mockResponse: ChatbotModel = {
      response: `Gracias por tu mensaje sobre "${message}". En Toro Moro fabricamos botas de piel genuina en León, Gto. ¿Te gustaría ver nuestro catálogo de Cuello de Toro?`,
      status: 'success',
      timestamp: new Date(),
      conversationId: 'conv_123',
      userId: 'user_456',
      messageId: 'msg_789',
      suggestions: ['Ver Botas Hombre', 'Guía de Tallas', 'Contacto'],
      responseType: 'text',
      responseTime: 1200,
      responseStatus: '200'
    };

    return of(mockResponse); // Retorna un observable con la respuesta simulada
  }
}