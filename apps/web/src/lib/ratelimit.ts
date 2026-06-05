const requestLog = new Map<string, number[]>();

export function isRateLimited(ip: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const history = requestLog.get(ip) ?? [];
  const recent = history.filter((t) => now - t < windowMs);
  if (recent.length >= limit) return true;
  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

export function getIp(request: Request): string {
  const forwarded = (request as Request & { headers: Headers }).headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() ?? 'unknown';
}
