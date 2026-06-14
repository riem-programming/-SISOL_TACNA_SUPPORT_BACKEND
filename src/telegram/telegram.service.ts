import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegramMessage } from './model/telegram.model';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly token: string;
  private readonly chatId: string;
  private readonly apiUrl: string;
  private readonly enabled: boolean;
  private readonly frontendUrl: string;

  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpService,
  ) {
    this.token = this.config.get<string>('TELEGRAM_BOT_TOKEN', '');
    this.chatId = this.config.get<string>('TELEGRAM_CHAT_ID', '');
    this.frontendUrl = this.config.get<string>('FRONTEND_URL', '');
    this.apiUrl = `https://api.telegram.org/bot${this.token}`;
    this.enabled = !!(this.token && this.chatId);

    if (!this.enabled) {
      this.logger.warn(
        'Telegram no configurado — las notificaciones están desactivadas',
      );
    }
  }

  // Método principal — nunca lanza excepción para no romper el flujo
  async notify(mensaje: TelegramMessage): Promise<void> {
    if (!this.enabled) return;

    const texto = this.formatear(mensaje);

    try {
      await this.enviarConReintento(texto, 2);
    } catch (error) {
      // Loguea pero NO propaga — el ticket ya se guardó en Postgres
      this.logger.error(
        `No se pudo enviar notificación Telegram para ticket #${mensaje.ticketId}: ${error}`,
      );
    }
  }

  // Atajos semánticos para cada evento del ticket
  async notificarTicketNuevo(
    ticketId: number,
    asunto: string,
    usuario: string,
    prioridad: string,
    supportMode?: string,
  ): Promise<void> {
    const url = `${this.frontendUrl}/admin/ticket/${ticketId}`;
    await this.notify({
      emoji: '🎫',
      texto: `Ticket nuevo #${ticketId}\n<b>${asunto}</b>\nUsuario: ${usuario}\nPrioridad: ${prioridad}${supportMode ? `\nModalidad: ${supportMode}` : ''}\n<a href="${url}">${url}</a>`,
      ticketId,
    });
  }

  async notificarCambioEstado(
    ticketId: number,
    asunto: string,
    estadoAnterior: string,
    estadoNuevo: string,
  ): Promise<void> {
    const emoji = this.emojiEstado(estadoNuevo);
    await this.notify({
      emoji,
      texto: `Ticket #${ticketId} — cambio de estado\n<b>${asunto}</b>\n${estadoAnterior} → <b>${estadoNuevo}</b>`,
      ticketId,
    });
  }

  async notificarRespuestaUsuario(
    ticketId: number,
    asunto: string,
    usuario: string,
  ): Promise<void> {
    await this.notify({
      emoji: '💬',
      texto: `Nueva respuesta en ticket #${ticketId}\n<b>${asunto}</b>\nDe: ${usuario}`,
      ticketId,
    });
  }

  async notificarNuevoMensajeChat(
    ticketId: number,
    usuario: string,
    mensaje: string,
  ): Promise<void> {
    const url = `${this.frontendUrl}/admin/ticket/${ticketId}/chat`;
    await this.notify({
      emoji: '💬',
      texto: `Nuevo mensaje ticket #${ticketId}\nDe: <b>${usuario}</b>\n\n"${mensaje}"\n<a href="${url}">${url}</a>`,
      ticketId,
    });
  }

  async notificarTicketSinRespuesta(
    ticketId: number,
    asunto: string,
    horas: number,
  ): Promise<void> {
    await this.notify({
      emoji: '⏰',
      texto: `Ticket #${ticketId} sin respuesta hace ${horas}h\n<b>${asunto}</b>`,
      ticketId,
    });
  }

  // Envío con reintentos simples
  private async enviarConReintento(
    texto: string,
    intentosRestantes: number,
  ): Promise<void> {
    try {
      await firstValueFrom(
        this.http.post(`${this.apiUrl}/sendMessage`, {
          chat_id: this.chatId,
          text: texto,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      );
    } catch (error) {
      if (intentosRestantes > 0) {
        this.logger.warn(
          `Reintentando envío Telegram (${intentosRestantes} intentos restantes)`,
        );
        await this.sleep(1000);
        return this.enviarConReintento(texto, intentosRestantes - 1);
      }
      throw error;
    }
  }

  private formatear(msg: TelegramMessage): string {
    const prefijo = msg.emoji ? `${msg.emoji} ` : '';
    return `${prefijo}${msg.texto}`;
  }

  private emojiEstado(estado: string): string {
    const mapa: Record<string, string> = {
      abierto: '🟢',
      en_proceso: '🔵',
      esperando_usuario: '🟡',
      resuelto: '✅',
      cerrado: '⬛',
    };
    return mapa[estado] ?? '📋';
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
