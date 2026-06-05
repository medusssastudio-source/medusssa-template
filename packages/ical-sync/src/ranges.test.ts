import { describe, expect, it } from 'vitest';
import { isRangeAvailable, mergeRanges, rangesOverlap } from './ranges';

describe('rangesOverlap', () => {
  it('detecta solapamiento real', () => {
    expect(
      rangesOverlap(
        { start: '2026-06-10', end: '2026-06-13' },
        { start: '2026-06-12', end: '2026-06-15' },
      ),
    ).toBe(true);
  });

  it('checkout y check-in el mismo día NO se solapan (end exclusivo)', () => {
    expect(
      rangesOverlap(
        { start: '2026-06-10', end: '2026-06-13' },
        { start: '2026-06-13', end: '2026-06-15' },
      ),
    ).toBe(false);
  });

  it('un rango contenido en otro se solapa', () => {
    expect(
      rangesOverlap(
        { start: '2026-06-01', end: '2026-06-30' },
        { start: '2026-06-10', end: '2026-06-12' },
      ),
    ).toBe(true);
  });
});

describe('mergeRanges', () => {
  it('fusiona rangos solapados y contiguos', () => {
    const merged = mergeRanges([
      { start: '2026-06-12', end: '2026-06-15' },
      { start: '2026-06-10', end: '2026-06-12' }, // contiguo al anterior
      { start: '2026-06-20', end: '2026-06-22' }, // separado
    ]);
    expect(merged).toEqual([
      { start: '2026-06-10', end: '2026-06-15' },
      { start: '2026-06-20', end: '2026-06-22' },
    ]);
  });

  it('no muta el array de entrada', () => {
    const input = [
      { start: '2026-06-12', end: '2026-06-15' },
      { start: '2026-06-10', end: '2026-06-13' },
    ];
    const copy = JSON.parse(JSON.stringify(input));
    mergeRanges(input);
    expect(input).toEqual(copy);
  });

  it('lista vacía → lista vacía', () => {
    expect(mergeRanges([])).toEqual([]);
  });
});

describe('isRangeAvailable', () => {
  const busy = [
    { start: '2026-06-10', end: '2026-06-13' },
    { start: '2026-06-20', end: '2026-06-25' },
  ];

  it('disponible en hueco libre', () => {
    expect(isRangeAvailable(busy, { start: '2026-06-14', end: '2026-06-18' })).toBe(true);
  });

  it('no disponible si pisa una reserva', () => {
    expect(isRangeAvailable(busy, { start: '2026-06-12', end: '2026-06-14' })).toBe(false);
  });

  it('check-in el día del checkout de otra reserva SÍ está disponible', () => {
    expect(isRangeAvailable(busy, { start: '2026-06-13', end: '2026-06-16' })).toBe(true);
  });

  it('checkout el día del check-in de otra reserva SÍ está disponible', () => {
    expect(isRangeAvailable(busy, { start: '2026-06-17', end: '2026-06-20' })).toBe(true);
  });

  it('rango inválido (start >= end) nunca está disponible', () => {
    expect(isRangeAvailable([], { start: '2026-06-15', end: '2026-06-15' })).toBe(false);
    expect(isRangeAvailable([], { start: '2026-06-16', end: '2026-06-15' })).toBe(false);
  });
});
