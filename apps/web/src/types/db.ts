/**
 * Tipos espejo de supabase/migrations — mantener sincronizados.
 * Fechas como string ISO (YYYY-MM-DD) y timestamps como string ISO 8601.
 */

export interface SystemEvent {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  created_at: string;
}

// ── Alojamientos ─────────────────────────────────────────────

export interface Photo {
  url: string;
  alt?: string;
}

export interface Lodging {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  photos: Photo[];
  amenities: string[];
  location: string | null;
  address: string | null;
  lat: number | null;
  lng: number | null;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  base_price: number;
  currency: string;
  min_nights: number;
  ical_export_token: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type IcalFeedSource = 'airbnb' | 'booking' | 'vrbo' | 'other';

export interface LodgingIcalFeed {
  id: string;
  lodging_id: string;
  source: IcalFeedSource;
  url: string;
  last_synced_at: string | null;
  last_status: string | null;
  created_at: string;
}

export type BusyRangeSource = 'ical' | 'reservation' | 'manual';

export interface LodgingBusyRange {
  id: string;
  lodging_id: string;
  /** Inclusivo */
  start_date: string;
  /** EXCLUSIVO (día de checkout) */
  end_date: string;
  source: BusyRangeSource;
  feed_id: string | null;
  external_uid: string | null;
  reservation_id: string | null;
  created_at: string;
}

export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'expired';

export interface Reservation {
  id: string;
  lodging_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string | null;
  check_in: string;
  /** EXCLUSIVO */
  check_out: string;
  guests: number;
  total: number;
  currency: string;
  status: ReservationStatus;
  payment_provider: string | null;
  payment_ref: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// ── Inmobiliaria ─────────────────────────────────────────────

export type RealEstateType = 'house' | 'land' | 'apartment' | 'commercial';
export type RealEstateStatus = 'available' | 'reserved' | 'sold';

export interface RealEstateProperty {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  property_type: RealEstateType;
  status: RealEstateStatus;
  price: number;
  currency: string;
  area_m2: number | null;
  built_m2: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  parking: number | null;
  features: string[];
  photos: Photo[];
  location: string | null;
  address: string | null;
  lat: number | null;
  lng: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RealEstateLead {
  id: string;
  property_id: string | null;
  name: string;
  email: string | null;
  phone: string | null;
  message: string | null;
  source: string;
  created_at: string;
}

// ── Contenido digital ────────────────────────────────────────

export type DigitalProductType = 'course' | 'guide' | 'video' | 'bundle' | 'other';

export type DeliveryItem =
  | { type: 'file'; path: string; label?: string }
  | { type: 'link'; url: string; label?: string };

export interface DigitalProduct {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  product_type: DigitalProductType;
  price: number;
  currency: string;
  cover_url: string | null;
  delivery: DeliveryItem[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type DigitalOrderStatus = 'pending' | 'paid' | 'delivered' | 'refunded' | 'expired';

export interface DigitalOrder {
  id: string;
  product_id: string;
  buyer_name: string;
  buyer_email: string;
  amount: number;
  currency: string;
  status: DigitalOrderStatus;
  payment_provider: string | null;
  payment_ref: string | null;
  delivery_token: string;
  delivered_at: string | null;
  created_at: string;
  updated_at: string;
}
