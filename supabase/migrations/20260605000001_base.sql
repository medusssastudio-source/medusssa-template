-- ============================================================
-- BASE: tabla de eventos (audit trail) + trigger de updated_at
-- Template Medusssa — genérico para cualquier proyecto
-- ============================================================

-- Audit trail de eventos del sistema (regla de oro: registrar eventos críticos)
create table public.events (
  id uuid primary key default gen_random_uuid(),
  type text not null, -- ej. 'reservation.requested', 'payment.succeeded', 'lead.created'
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index events_type_idx on public.events (type, created_at desc);

-- RLS activo, sin policies => solo service_role (server) puede leer/escribir
alter table public.events enable row level security;

-- Helper reutilizable: mantener updated_at al día
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
