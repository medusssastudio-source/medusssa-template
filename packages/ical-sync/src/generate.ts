import type { GenerateIcsOptions, IcalEventInput } from './types';

/** Escapa texto iCal (RFC 5545 §3.3.11) */
function escapeText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/** `YYYY-MM-DD` → `YYYYMMDD` */
function toIcsDate(date: string): string {
  return date.replace(/-/g, '');
}

/** Timestamp DTSTAMP en formato iCal UTC */
function nowStamp(): string {
  return new Date()
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
}

/**
 * Dobla líneas a máximo 75 octetos (RFC 5545 §3.1).
 * Simplificación: corta por caracteres; suficiente para UIDs/summaries ASCII.
 */
function foldLine(line: string): string[] {
  if (line.length <= 75) return [line];
  const parts: string[] = [line.slice(0, 75)];
  let rest = line.slice(75);
  while (rest.length > 74) {
    parts.push(` ${rest.slice(0, 74)}`);
    rest = rest.slice(74);
  }
  if (rest.length > 0) parts.push(` ${rest}`);
  return parts;
}

/**
 * Genera un feed iCal de disponibilidad (estilo OTA) con eventos all-day.
 * `end` de cada evento es EXCLUSIVO (DTEND = día de checkout).
 *
 * El resultado usa CRLF como exige RFC 5545 — apto para servirlo en
 * `/api/ical/[propiedad].ics` y que Airbnb/Booking lo importen.
 */
export function generateIcs(events: IcalEventInput[], options: GenerateIcsOptions): string {
  const stamp = nowStamp();
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:${options.prodId}`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  if (options.calendarName) {
    lines.push(`X-WR-CALNAME:${escapeText(options.calendarName)}`);
  }

  for (const event of events) {
    lines.push(
      'BEGIN:VEVENT',
      `UID:${escapeText(event.uid)}`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${toIcsDate(event.start)}`,
      `DTEND;VALUE=DATE:${toIcsDate(event.end)}`,
      `SUMMARY:${escapeText(event.summary ?? 'Reserved')}`,
      'END:VEVENT',
    );
  }

  lines.push('END:VCALENDAR');

  return lines.flatMap(foldLine).join('\r\n') + '\r\n';
}
