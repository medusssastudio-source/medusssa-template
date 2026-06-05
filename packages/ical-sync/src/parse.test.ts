import { describe, expect, it } from 'vitest';
import { addDays, parseIcs } from './parse';

const CRLF = '\r\n';

/** Feed estilo Airbnb: VALUE=DATE, summaries "Reserved"/"Not available" */
const AIRBNB_FEED = [
  'BEGIN:VCALENDAR',
  'PRODID:-//Airbnb Inc//Hosting Calendar 1.0//EN',
  'CALSCALE:GREGORIAN',
  'VERSION:2.0',
  'BEGIN:VEVENT',
  'DTSTAMP:20260601T120000Z',
  'DTSTART;VALUE=DATE:20260610',
  'DTEND;VALUE=DATE:20260613',
  'SUMMARY:Reserved',
  'UID:1418fd-airbnb-1@airbnb.com',
  'END:VEVENT',
  'BEGIN:VEVENT',
  'DTSTAMP:20260601T120000Z',
  'DTSTART;VALUE=DATE:20260620',
  'DTEND;VALUE=DATE:20260622',
  'SUMMARY:Airbnb (Not available)',
  'UID:1418fd-airbnb-2@airbnb.com',
  'END:VEVENT',
  'END:VCALENDAR',
].join(CRLF);

describe('parseIcs', () => {
  it('parsea un feed estilo Airbnb con VALUE=DATE', () => {
    const events = parseIcs(AIRBNB_FEED);
    expect(events).toHaveLength(2);
    expect(events[0]).toEqual({
      uid: '1418fd-airbnb-1@airbnb.com',
      summary: 'Reserved',
      start: '2026-06-10',
      end: '2026-06-13',
    });
    expect(events[1]?.summary).toBe('Airbnb (Not available)');
  });

  it('parsea DTSTART/DTEND con DATETIME UTC tomando la fecha', () => {
    const ics = [
      'BEGIN:VCALENDAR',
      'BEGIN:VEVENT',
      'UID:x@y.com',
      'DTSTART:20260701T140000Z',
      'DTEND:20260703T110000Z',
      'SUMMARY:Booking',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join(CRLF);
    const events = parseIcs(ics);
    expect(events[0]?.start).toBe('2026-07-01');
    expect(events[0]?.end).toBe('2026-07-03');
  });

  it('des-dobla líneas largas (RFC 5545 folding)', () => {
    const ics = [
      'BEGIN:VCALENDAR',
      'BEGIN:VEVENT',
      'UID:un-uid-extremadamente-largo-que-se-parte-en-dos-lineas',
      ' -continuacion@example.com',
      'DTSTART;VALUE=DATE:20260801',
      'DTEND;VALUE=DATE:20260802',
      'SUMMARY:Reserva',
      '  con folding', // doble espacio: 1º = marca de fold (se quita), 2º = espacio real

      'END:VEVENT',
      'END:VCALENDAR',
    ].join(CRLF);
    const events = parseIcs(ics);
    expect(events[0]?.uid).toBe(
      'un-uid-extremadamente-largo-que-se-parte-en-dos-lineas-continuacion@example.com',
    );
    expect(events[0]?.summary).toBe('Reserva con folding');
  });

  it('acepta LF en lugar de CRLF (feeds mal formados)', () => {
    const ics = AIRBNB_FEED.replace(/\r\n/g, '\n');
    expect(parseIcs(ics)).toHaveLength(2);
  });

  it('asume 1 día cuando falta DTEND', () => {
    const ics = [
      'BEGIN:VCALENDAR',
      'BEGIN:VEVENT',
      'UID:sin-dtend@x.com',
      'DTSTART;VALUE=DATE:20260815',
      'SUMMARY:Blocked',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join(CRLF);
    const events = parseIcs(ics);
    expect(events[0]?.end).toBe('2026-08-16');
  });

  it('ignora eventos sin DTSTART válido', () => {
    const ics = [
      'BEGIN:VCALENDAR',
      'BEGIN:VEVENT',
      'UID:roto@x.com',
      'DTSTART;VALUE=DATE:no-es-fecha',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join(CRLF);
    expect(parseIcs(ics)).toHaveLength(0);
  });

  it('quita escapes del SUMMARY', () => {
    const ics = [
      'BEGIN:VCALENDAR',
      'BEGIN:VEVENT',
      'UID:esc@x.com',
      'DTSTART;VALUE=DATE:20260901',
      'DTEND;VALUE=DATE:20260902',
      'SUMMARY:Casa\\, terraza\\; vista\\nal mar',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join(CRLF);
    expect(parseIcs(ics)[0]?.summary).toBe('Casa, terraza; vista\nal mar');
  });

  it('devuelve lista vacía con feed vacío o sin eventos', () => {
    expect(parseIcs('')).toHaveLength(0);
    expect(parseIcs(['BEGIN:VCALENDAR', 'VERSION:2.0', 'END:VCALENDAR'].join(CRLF))).toHaveLength(
      0,
    );
  });
});

describe('addDays', () => {
  it('suma días con cruce de mes y año', () => {
    expect(addDays('2026-06-30', 1)).toBe('2026-07-01');
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(addDays('2026-06-15', -5)).toBe('2026-06-10');
  });

  it('maneja año bisiesto', () => {
    expect(addDays('2028-02-28', 1)).toBe('2028-02-29');
  });
});
