export interface TicketDescuento {
	codigo: string;
	descuento: string;
	expira: string;
	cliente: string;
}

export interface Message {
	text: string;
	sender: 'user' | 'bot';
	suggestions?: string[];
	mapUrl?: string;
	ticket?: TicketDescuento;
}