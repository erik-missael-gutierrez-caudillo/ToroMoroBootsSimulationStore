import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TicketDescuento } from '../models/chatbot.model';

@Injectable({ providedIn: 'root' })
export class ChatbotService {
	private session: any = { pasoActual: 'inicio' };
	private mapsUrl = "https://www.google.com/maps/embed/v1/place?key=TU_API_KEY&q=Calle+Elena+304,San+Juan+de+Dios,Leon,Gto";
	// Nota: Para modo simulado usamos el link directo de búsqueda
	private mapsSearchUrl = "https://www.google.com.mx/maps/search/Calle+Elena+304,+León,+Guanajuato";

	private readonly RAMAS: any = {
		'inicio': {
			texto: '🤠 ¡Bienvenido a Toro Moro! \n\nDirecto de León, Gto. Calidad artesanal que impone respeto. \n\n¿Para quién buscas botas hoy?',
			hijos: ['cat_caballero', 'cat_dama', 'cat_ninos', 'personalizado'],
			labels: { 'cat_caballero': '🧔 Caballero', 'cat_dama': '💃 Dama', 'cat_ninos': '🧒 Familia/Bebé', 'personalizado': '✨ Pedido Especial' }
		},
		'cat_caballero': {
			texto: 'Excelente. Nuestras botas de caballero son de Corte Goodyear Welt (doble costura). ¿Qué estilo prefieres?',
			hijos: ['exoticas', 'uso_rudo'],
			labels: { 'exoticas': '🐍 Pieles Exóticas', 'uso_rudo': '🏗️ Uso Rudo' }
		},
		'exoticas': {
			texto: 'Pieles genuinas de Avestruz, Pitón y Cocodrilo. 📜 \n\nPara darte disponibilidad y precio de fabricante, ¿cuál es tu nombre?',
			esperaInput: 'nombre',
			siguientePaso: 'captura_whatsapp'
		},
		'captura_whatsapp': {
			texto: 'Mucho gusto, {{nombre}}. Para enviarte fotos reales y tu Cupón de Bienvenida, déjanos tu WhatsApp:',
			esperaInput: 'whatsapp',
			siguientePaso: 'final_ventas'
		},
		'final_ventas': {
			texto: '¡Felicidades {{nombre}}! 🚀 \n\nHe generado un Ticket de Descuento Exclusivo para tu primera compra. Un artesano te contactará al {{whatsapp}} en breve.',
			generaTicket: true,
			hijos: ['ubicacion', 'inicio'],
			labels: { 'ubicacion': '📍 Ver Tienda y Mapa', 'inicio': '🏠 Volver al inicio' }
		},
		'ubicacion': {
			texto: '📍 Estamos en el corazón de León: \n\nCalle Elena 304, Col. San Juan de Dios. \n\n¡Ven y siente la piel! Aquí tienes nuestra ubicación exacta:',
			mostrarMapa: true,
			hijos: ['inicio'],
			labels: { 'inicio': '🏠 Menú Principal' }
		}
	};

	obtenerRespuesta(input: string): Observable<any> {
		const cleanInput = input.toLowerCase().trim();
		let ramaActual = this.RAMAS[this.session.pasoActual];

		// Lógica de captura de datos
		if (ramaActual?.esperaInput) {
			this.session[ramaActual.esperaInput] = input;
			this.session.pasoActual = ramaActual.siguientePaso;
			return this.procesar(this.RAMAS[this.session.pasoActual]);
		}

		// Navegación por botones
		const proximoId = Object.keys(ramaActual.labels || {}).find(key => 
			ramaActual.labels[key].toLowerCase().includes(cleanInput)
		) || cleanInput;

		if (this.RAMAS[proximoId]) {
			this.session.pasoActual = proximoId;
			return this.procesar(this.RAMAS[proximoId]);
		}

		return this.procesar(this.RAMAS['inicio']);
	}

	private procesar(rama: any): Observable<any> {
		let res = { ...rama };
		res.texto = res.texto.replace('{{nombre}}', this.session.nombre || '').replace('{{whatsapp}}', this.session.whatsapp || '');

		if (rama.generaTicket) {
			res.ticket = this.crearTicket();
		}
		if (rama.mostrarMapa) {
			res.mapUrl = this.mapsSearchUrl;
		}

		res.suggestions = rama.hijos?.map((h: string) => rama.labels[h]) || [];
		return of(res);
	}

	private crearTicket(): TicketDescuento {
		const random = Math.random().toString(36).substring(7).toUpperCase();
		return {
			codigo: `MORO-${random}`,
			descuento: '15% + Envío Gratis',
			expira: 'Vence en 48 horas',
			cliente: this.session.nombre || 'Cliente Distinguido'
		};
	}
}