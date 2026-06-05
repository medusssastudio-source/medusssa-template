import { describe, expect, it } from 'vitest';
import { generateIcs } from './generate';
import { parseIcs } from './parse';

const OPTS = { prodId: '-//Medusssa Studio//test//ES', calendarName: 'Casa Test' };

describe('generateIcs', () => {
  it('genera un VCALENDAR válido con eventos all-day', () => {
    const ics = generateIcs(
      [{ uid: 'res-1@medusssa.studio', start: '2026-06-10', end: '2026-06-13' }],
      OPTS,
    );

    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('PRODID:-//Medusssa Studio//test//ES');
    expect(ics).toContain('X-WR-CALNAME:Casa Test');
    expect(ics).toContain('DTSTART;VALUE=DATE:20260610');
    expect(ics).toContain('DTEND;VALUE=DATE:20260613');
    expect(ics).toContain('SUMMARY:Reserved');
    expect(ics).toContain('END:VCALENDAR');
  });

  it('usa CRLF y termina con salto de línea (RFC 5545)', () => {
    const ics = generateIcs([], OPTS);
    expect(ics.endsWith('\r\n')).toBe(true);
    // Sin LF sueltos
    expect(ics.replace(/\r\n/g, '')).not.toContain('\n');
  });

  it('escapa texto en SUMMARY', () => {
    const ics = generateIcs(
      [{ uid: 'u@x', start: '2026-06-01', end: '2026-06-02', summary: 'Casa, centro; bonita' }],
      OPTS,
    );
    expect(ics).toContain('SUMMARY:Casa\\, centro\\; bonita');
  });

  it('round-trip: lo generado se puede parsear de vuelta', () => {
    const input = [
      { uid: 'r1@medusssa.studio', start: '2026-06-10', end: '2026-06-13', summary: 'Reserved' },
      { uid: 'r2@medusssa.studio', start: '2026-07-01', end: '2026-07-05', summary: 'Blocked' },
    ];
    const events = parseIcs(generateIcs(input, OPTS));
    expect(events).toHaveLength(2);
    expect(events[0]).toMatchObject({
      uid: 'r1@medusssa.studio',
      start: '2026-06-10',
      end: '2026-06-13',
    });
    expect(events[1]).toMatchObject({
      uid: 'r2@medusssa.studio',
      start: '2026-07-01',
      end: '2026-07-05',
    });
  });

  it('dobla líneas de más de 75 caracteres', () => {
    const longUid = 'x'.repeat(120);
    const ics = generateIcs([{ uid: longUid, start: '2026-06-01', end: '2026-06-02' }], OPTS);
    for (const line of ics.split('\r\n')) {
      expect(line.length).toBeLessThanOrEqual(75);
    }
    // y el parser lo recupera completo
    expect(parseIcs(ics)[0]?.uid).toBe(longUid);
  });
});
