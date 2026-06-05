import type { IcalEvent, IsoDate } from './types';

/**
 * Des-dobla líneas iCal (RFC 5545 §3.1): las líneas largas se parten y la
 * continuación empieza con espacio o tab. Acepta CRLF, LF o CR.
 */
function unfoldLines(ics: string): string[] {
  const raw = ics.split(/\r\n|\n|\r/);
  const lines: string[] = [];
  for (const line of raw) {
    if ((line.startsWith(' ') || line.startsWith('\t')) && lines.length > 0) {
      lines[lines.length - 1] += line.slice(1);
    } else if (line.length > 0) {
      lines.push(line);
    }
  }
  return lines;
}

/**
 * Convierte un valor de fecha iCal a `YYYY-MM-DD`.
 * - `20260615` (VALUE=DATE, lo usual en Airbnb/Booking) → `2026-06-15`
 * - `20260615T140000Z` (DATETIME) → porción de fecha UTC `2026-06-15`
 */
function toIsoDate(value: string): IsoDate | null {
  const m = value.match(/^(\d{4})(\d{2})(\d{2})(?:T\d{6}Z?)?$/);
  if (!m) return null;
  return `${m[1]}-${m[2]}-${m[3]}`;
}

/** Quita escapes de texto iCal (RFC 5545 §3.3.11) */
function unescapeText(value: string): string {
  return value
    .replace(/\\n/gi, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\');
}

/**
 * Parsea un feed iCal y devuelve los eventos con fecha de inicio y fin.
 *
 * Diseñado para feeds de disponibilidad de OTAs (Airbnb, Booking, Vrbo):
 * solo extrae UID, SUMMARY, DTSTART y DTEND de cada VEVENT. Eventos sin
 * DTSTART válido se ignoran. Si falta DTEND (algunos feeds lo omiten en
 * eventos de un día), se asume un día: end = start + 1.
 *
 * `end` es EXCLUSIVO (día de checkout), igual que DTEND en iCal.
 */
export function parseIcs(ics: string): IcalEvent[] {
  const lines = unfoldLines(ics);
  const events: IcalEvent[] = [];

  let inEvent = false;
  let uid = '';
  let summary = '';
  let start: IsoDate | null = null;
  let end: IsoDate | null = null;

  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') {
      inEvent = true;
      uid = '';
      summary = '';
      start = null;
      end = null;
      continue;
    }

    if (line === 'END:VEVENT') {
      if (inEvent && start) {
        events.push({
          uid,
          summary,
          start,
          end: end ?? addDays(start, 1),
        });
      }
      inEvent = false;
      continue;
    }

    if (!inEvent) continue;

    // Separar nombre(;params):valor — ej. `DTSTART;VALUE=DATE:20260615`
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const name = line.slice(0, colon).split(';')[0]?.toUpperCase() ?? '';
    const value = line.slice(colon + 1).trim();

    switch (name) {
      case 'UID':
        uid = value;
        break;
      case 'SUMMARY':
        summary = unescapeText(value);
        break;
      case 'DTSTART':
        start = toIsoDate(value);
        break;
      case 'DTEND':
        end = toIsoDate(value);
        break;
    }
  }

  return events;
}

/** Suma días a una fecha ISO `YYYY-MM-DD` (aritmética UTC, sin sorpresas de TZ) */
export function addDays(date: IsoDate, days: number): IsoDate {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}
