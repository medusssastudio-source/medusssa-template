/**
 * Fechas SIEMPRE como string ISO `YYYY-MM-DD` (precisión de día).
 * Para rentas vacacionales la unidad es la noche; los feeds iCal de
 * Airbnb/Booking usan VALUE=DATE. Si un feed trae DATETIME, se toma
 * la porción de fecha UTC.
 */
export type IsoDate = string;

/**
 * Rango de fechas con `end` EXCLUSIVO (convención iCal DTEND):
 * una reserva del 10 al 12 ocupa las noches del 10 y 11; el 12 es checkout
 * y queda libre para un nuevo check-in.
 */
export interface DateRange {
  /** Check-in, inclusivo */
  start: IsoDate;
  /** Check-out, EXCLUSIVO */
  end: IsoDate;
}

/** Evento VEVENT parseado de un feed iCal externo */
export interface IcalEvent extends DateRange {
  uid: string;
  summary: string;
}

/** Evento a publicar en nuestro feed iCal */
export interface IcalEventInput extends DateRange {
  uid: string;
  summary?: string;
}

export interface GenerateIcsOptions {
  /** Identificador del producto, ej. '-//Medusssa Studio//keyhandy//ES' */
  prodId: string;
  /** Nombre del calendario (X-WR-CALNAME) */
  calendarName?: string;
}
