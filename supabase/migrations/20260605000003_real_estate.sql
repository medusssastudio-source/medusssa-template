-- ============================================================
-- INMOBILIARIA: catálogo de inmuebles en venta + leads
-- Sin pagos en línea — las ventas se cierran en persona
-- ============================================================

create table public.real_estate_properties (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  property_type text not null default 'house'
    check (property_type in ('house', 'land', 'apartment', 'commercial')),
  status text not null default 'available'
    check (status in ('available', 'reserved', 'sold')),
  price numeric(14, 2) not null,
  currency text not null default 'MXN',
  area_m2 numeric(10, 2),                          -- terreno
  built_m2 numeric(10, 2),                         -- construcción
  bedrooms int,
  bathrooms numeric(3, 1),
  parking int,
  features jsonb not null default '[]'::jsonb,     -- ['jardín', 'cisterna', ...]
  photos jsonb not null default '[]'::jsonb,       -- [{url, alt}]
  location text,                                   -- texto público (ciudad/zona)
  address text,                                    -- dirección exacta (privada)
  lat double precision,
  lng double precision,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger real_estate_properties_updated_at
  before update on public.real_estate_properties
  for each row execute function public.set_updated_at();

create index real_estate_properties_filter_idx
  on public.real_estate_properties (property_type, status, price);

-- Leads de interesados (formulario de contacto por inmueble o general)
create table public.real_estate_leads (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references public.real_estate_properties (id) on delete set null,
  name text not null,
  email text,
  phone text,
  message text,
  source text not null default 'web',              -- 'web' | 'whatsapp' | ...
  created_at timestamptz not null default now()
);

create index real_estate_leads_property_idx on public.real_estate_leads (property_id);

-- ── RLS ──────────────────────────────────────────────────────
alter table public.real_estate_properties enable row level security;
alter table public.real_estate_leads enable row level security;

-- Catálogo público: solo lectura de inmuebles activos
create policy "real_estate_public_read"
  on public.real_estate_properties for select
  using (is_active = true);

-- leads: sin policies => solo service_role (el INSERT pasa por API route)
