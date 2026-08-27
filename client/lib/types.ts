export type TableShape = "square" | "round" | "rect" | "seat";
export type TableStatus = "available" | "reserved" | "selected";

export interface TableDef {
  id: number;
  seats: number;
  shape: TableShape;
  status: TableStatus;
  colSpan?: number;
}

export type DiningZone = "dining" | "bar" | "terrace";

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  gallery: string[];
  michelinStars: number;
  rating: number;
  reviews: number;
  tags: string[];
  cuisine: string;
  priceFrom: number;
  hours: string;
  isOpen: boolean;
  address: string;
  quote: string;
  description: string;
  tables: Record<DiningZone, TableDef[]>;
}

export interface BookingDraft {
  restaurantId: string;
  date: string | null;
  time: string | null;
  guests: number;
  zone: DiningZone | null;
  tableId: number | null;
}

export interface ConfirmedBooking {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  address: string;
  zone: DiningZone;
  tableId: number;
  date: string;
  time: string;
  guests: number;
  amountPaid: number;
  fullName: string;
  phone: string;
  status: "Confirmed";
}
