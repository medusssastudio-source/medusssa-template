import type { DateRange } from './types';

/**
 * ¿Se solapan dos rangos? `end` es EXCLUSIVO en ambos:
 * [10,12) y [12,14) NO se solapan — el 12 es checkout de uno y check-in del otro.
 * Las fechas ISO `YYYY-MM-DD` se comparan lexicográficamente (orden correcto).
 */
export function rangesOverlap(a: DateRange, b: DateRange): boolean {
  return a.start < b.end && b.start < a.end;
}

/**
 * Fusiona rangos solapados o contiguos ([10,12) + [12,15) → [10,15)).
 * Devuelve la lista ordenada por fecha de inicio.
 */
export function mergeRanges(ranges: DateRange[]): DateRange[] {
  if (ranges.length === 0) return [];

  const sorted = [...ranges].sort((a, b) => a.start.localeCompare(b.start));
  const first = sorted[0]!;
  const merged: DateRange[] = [{ start: first.start, end: first.end }];

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i]!;
    const last = merged[merged.length - 1]!;
    if (current.start <= last.end) {
      // Solapado o contiguo → extender
      if (current.end > last.end) last.end = current.end;
    } else {
      merged.push({ start: current.start, end: current.end });
    }
  }

  return merged;
}

/**
 * ¿Está disponible el rango `candidate` dado un conjunto de rangos ocupados?
 * (ej. validar una solicitud de reserva contra el calendario sincronizado)
 */
export function isRangeAvailable(busy: DateRange[], candidate: DateRange): boolean {
  if (candidate.start >= candidate.end) return false;
  return !busy.some((range) => rangesOverlap(range, candidate));
}
