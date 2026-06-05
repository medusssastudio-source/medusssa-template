-- ============================================================
-- ALOJAMIENTOS: fichas + feeds iCal + rangos ocupados + reservas
-- Sincronización vía iCal (Airbnb/Booking) — ver packages/ical-sync
-- ============================================================

create table public.lodgings (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  photos jsonb not null default '[]'::jsonb,      -- [{url, alt}]
  amenities jsonb not null default '[]'::jsonb,   -- ['wifi', 'alberca', ...]
  location text,                                  -- texto público (ciudad/zona)
  address text,                                   -- dirección completa (privada)
  lat double precision,
  lng double precision,
  max_guests int not null default 2,
  bedrooms int not null default 1,
  bathrooms numeric(3, 1) not null default 1,
  base_price numeric(10, 2) not null,             -- precio por noche
  currency text not null default 'MXN',
  min_nights int not null default 1,
  -- token secreto para la URL del feed iCal de exportación:
  -- /api/ical/[slug].ics?token=...
  ical_export_token uuid not null default gen_random_uuid(),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger lodgings_updated_at
  before update on public.lodgings
  for each row execute function public.set_updated_at();

-- Feeds iCal externos a importar (1 alojamiento → N feeds: Airbnb, Booking...)
create table public.lodging_ical_feeds (
  id uuid primary key default gen_random_uuid(),
  lodging_id uuid not null references public.lodgings (id) on delete cascade,
  source text not null,                            -- 'airbnb' | 'booking' | 'vrbo' | 'other'
  url text not null,
  last_synced_at timestamptz,
  last_status text,                                -- 'ok' | mensaje de error
  created_at timestamptz not null default now()
);

create index lodging_ical_feeds_lodging_idx on public.lodging_ical_feeds (lodging_id);

-- Rangos ocupados (end_date EXCLUSIVO, convención iCal/checkout)
-- Vienen del cron de sync iCal o de reservas directas confirmadas
create table public.lodging_busy_ranges (
  id uuid primary key default gen_random_uuid(),
  lodging_id uuid not null references public.lodgings (id) on delete cascade,
  start_date date not null,
  end_date date not null,                          -- EXCLUSIVO (día de checkout)
  source text not null,                            -- 'ical' | 'reservation' | 'manual'
  feed_id uuid references public.lodging_ical_feeds (id) on delete cascade,
  external_uid text,                               -- UID del VEVENT (para upsert idempotente)
  reservation_id uuid,                             -- fk lógico a reservations
  created_at timestamptz not null default now(),
  constraint busy_range_valid check (start_date < end_date),
  -- idempotencia del sync: mismo feed + mismo UID = mismo rango
  constraint busy_range_feed_uid_unique unique (feed_id, external_uid)
);

create index lodging_busy_ranges_lookup_idx
  on public.lodging_busy_ranges (lodging_id, start_date, end_date);

-- Reservas directas hechas en el sitio
create table public.reservations (
  id uuid primary key default gen_random_uuid(),
  lodging_id uuid not null references public.lodgings (id) on delete restrict,
  guest_name text not null,
  guest_email text not null,
  guest_phone text,
  check_in date not null,
  check_out date not null,                         -- EXCLUSIVO
  guests int not null default 1,
  total numeric(10, 2) not null,
  currency text not null default 'MXN',
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled', 'expired')),
  payment_provider text,                           -- 'stripe' | 'mercadopago' | ...
  payment_ref text,                                -- id de sesión/intent de la pasarela
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint reservation_dates_valid check (check_in < check_out)
);

create trigger reservations_updated_at
  before update on public.reservations
  for each row execute function public.set_updated_at();

create index reservations_lodging_idx on public.reservations (lodging_id, check_in);
create index reservations_email_idx on public.reservations (guest_email);

-- ── RLS ──────────────────────────────────────────────────────
alter table public.lodgings enable row level security;
alter table public.lodging_ical_feeds enable row level security;
alter table public.lodging_busy_ranges enable row level security;
alter table public.reservations enable row level security;

-- Catálogo público: solo lectura de alojamientos activos
create policy "lodgings_public_read"
  on public.lodgings for select
  using (is_active = true);

-- Disponibilidad pública: lectura de rangos ocupados (sin datos personales)
create policy "busy_ranges_public_read"
  on public.lodging_busy_ranges for select
  using (true);

-- feeds y reservations: sin policies => solo service_role (server)
