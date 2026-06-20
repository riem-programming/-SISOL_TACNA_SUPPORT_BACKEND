export interface TelegramMessage {
  texto: string;
  ticketId?: number;
  emoji?: string;
  boton?: TelegramBoton;
}

export interface TelegramBoton {
  texto: string;
  url: string;
}
