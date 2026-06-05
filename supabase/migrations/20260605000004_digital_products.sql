-- ============================================================
-- CONTENIDO DIGITAL: productos (cursos, guías, videos) + órdenes
-- Entrega simple post-pago: email con links de acceso/descarga
-- ============================================================

create table public.digital_products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  product_type text not null default 'course'
    check (product_type in ('course', 'guide', 'video', 'bundle', 'other')),
  price numeric(10, 2) not null,
  currency text not null default 'MXN',
  cover_url text,
  -- Contenido a entregar tras el pago:
  -- [{type: 'file', path: 'storage/...', label} | {type: 'link', url, label}]
  -- files => signed URLs de Supabase Storage; links => Vimeo unlisted, etc.
  delivery jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger digital_products_updated_at
  before update on public.digital_products
  for each row execute function public.set_updated_at();

-- Órdenes de compra (1 orden = 1 producto; suficiente para entrega simple)
create table public.digital_orders (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.digital_products (id) on delete restrict,
  buyer_name text not null,
  buyer_email text not null,
  amount numeric(10, 2) not null,
  currency text not null default 'MXN',
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'delivered', 'refunded', 'expired')),
  payment_provider text,                           -- 'stripe' | 'mercadopago' | ...
  payment_ref text,                                -- id de sesión/intent (idempotencia webhook)
  -- token de la página de acceso post-compra: /contenido/[order_id]?t=[delivery_token]
  delivery_token uuid not null default gen_random_uuid(),
  delivered_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger digital_orders_updated_at
  before update on public.digital_orders
  for each row execute function public.set_updated_at();

create index digital_orders_product_idx on public.digital_orders (product_id);
create index digital_orders_email_idx on public.digital_orders (buyer_email);
-- idempotencia del webhook de pago: una orden por referencia de pago
create unique index digital_orders_payment_ref_unique
  on public.digital_orders (payment_provider, payment_ref)
  where payment_ref is not null;

-- ── RLS ──────────────────────────────────────────────────────
alter table public.digital_products enable row level security;
alter table public.digital_orders enable row level security;

-- Catálogo público: solo lectura de productos activos
create policy "digital_products_public_read"
  on public.digital_products for select
  using (is_active = true);

-- órdenes: sin policies => solo service_role (checkout y entrega por API routes)
