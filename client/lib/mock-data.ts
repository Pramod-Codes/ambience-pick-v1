import { DiningZone, Restaurant, TableDef } from "./types";

export const CATEGORIES = [
  {
    id: "italian",
    name: "Italian",
    image:
      "https://images.unsplash.com/photo-1481931098730-318b6f776db0?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "mexican",
    name: "Mexican",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "chinese",
    name: "Chinese",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "french",
    name: "French",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80",
  },
];

function diningTables(): TableDef[] {
  return [
    { id: 1, capacity: 4, shape: "square", status: "reserved" },
    { id: 2, capacity: 8, shape: "rect", status: "selected", colSpan: 2 },
    { id: 3, capacity: 4, shape: "square", status: "available" },
    { id: 4, capacity: 4, shape: "square", status: "available" },
    { id: 5, capacity: 4, shape: "square", status: "reserved" },
    { id: 6, capacity: 6, shape: "square", status: "available" },
    { id: 7, capacity: 6, shape: "square", status: "available" },
    { id: 8, capacity: 8, shape: "round", status: "available" },
    { id: 9, capacity: 10, shape: "round", status: "available" },
    { id: 10, capacity: 10, shape: "round", status: "reserved" },
  ];
}

function barTables(): TableDef[] {
  return [
    { id: 1, capacity: 2, shape: "seat", status: "available" },
    { id: 2, capacity: 2, shape: "seat", status: "reserved" },
    { id: 3, capacity: 2, shape: "seat", status: "available" },
    { id: 4, capacity: 2, shape: "seat", status: "reserved" },
    { id: 5, capacity: 2, shape: "seat", status: "available" },
    { id: 6, capacity: 2, shape: "seat", status: "reserved" },
    { id: 7, capacity: 2, shape: "seat", status: "available" },
    { id: 8, capacity: 2, shape: "seat", status: "reserved" },
    { id: 9, capacity: 2, shape: "seat", status: "available" },
    { id: 10, capacity: 4, shape: "square", status: "available" },
    { id: 11, capacity: 4, shape: "square", status: "reserved" },
    { id: 12, capacity: 4, shape: "square", status: "available" },
    { id: 13, capacity: 4, shape: "square", status: "available" },
    { id: 14, capacity: 4, shape: "square", status: "available" },
    { id: 15, capacity: 4, shape: "square", status: "reserved" },
    { id: 16, capacity: 6, shape: "rect", status: "selected" },
    { id: 17, capacity: 6, shape: "rect", status: "selected" },
    { id: 18, capacity: 10, shape: "rect", status: "available", colSpan: 3 },
  ];
}

function terraceTables(): TableDef[] {
  return [
    { id: 1, capacity: 4, shape: "square", status: "reserved" },
    { id: 2, capacity: 4, shape: "square", status: "available" },
    { id: 3, capacity: 4, shape: "square", status: "available" },
    { id: 4, capacity: 4, shape: "square", status: "reserved" },
    { id: 5, capacity: 4, shape: "square", status: "reserved" },
    { id: 6, capacity: 6, shape: "square", status: "available" },
    { id: 7, capacity: 6, shape: "square", status: "reserved" },
    { id: 8, capacity: 8, shape: "square", status: "available" },
    { id: 9, capacity: 8, shape: "square", status: "reserved" },
    { id: 10, capacity: 8, shape: "square", status: "available" },
    { id: 11, capacity: 10, shape: "rect", status: "selected", colSpan: 2 },
  ];
}

function tablesFor(seed: number): Record<DiningZone, TableDef[]> {
  const dining = diningTables();
  const bar = barTables();
  const terrace = terraceTables();
  if (seed !== 0) {
    [...dining, ...bar, ...terrace].forEach((t) => {
      if (t.status !== "selected") {
        t.status = (t.id + seed) % 3 === 0 ? "reserved" : "available";
      }
    });
  }
  return { dining, bar, terrace };
}

export const RESTAURANTS: Restaurant[] = [
  {
    id: "westway-diner",
    name: "Westway Diner",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80",
    ],
    michelinStars: 2,
    rating: 4.6,
    reviews: 324,
    tags: ["Italian", "Vegetarian"],
    cuisine: "Italian",
    priceFrom: 40,
    hours: "9:00 AM - 10:00PM",
    isOpen: true,
    address: "614 9th Ave, New York, NY 10036, United States",
    quote:
      "Step into New York's most romantic fusion paradise perfect for an evening getaway",
    description:
      "Italian • Starts from $40 and up • Fine Dining",
    tables: tablesFor(0),
  },
  {
    id: "house-garden",
    name: "House Garden",
    image:
      "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=600&q=80",
    ],
    michelinStars: 3,
    rating: 4.9,
    reviews: 278,
    tags: ["French", "Vegetarian"],
    cuisine: "French",
    priceFrom: 55,
    hours: "10:00 AM - 2:00PM",
    isOpen: false,
    address: "112 Greene St, New York, NY 10012, United States",
    quote: "A quiet garden courtyard hidden in the heart of SoHo",
    description: "French • Starts from $55 and up • Fine Dining",
    tables: tablesFor(1),
  },
  {
    id: "manhatta",
    name: "Manhatta",
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80",
    ],
    michelinStars: 0,
    rating: 4.6,
    reviews: 324,
    tags: ["Mexican", "Vegetarian", "Gluten Free"],
    cuisine: "Mexican",
    priceFrom: 35,
    hours: "5:00 PM - 11:00PM",
    isOpen: true,
    address: "28 Liberty St, New York, NY 10005, United States",
    quote: "Skyline views paired with bold modern Mexican flavors",
    description: "Mexican • Starts from $35 and up • Rooftop Dining",
    tables: tablesFor(2),
  },
];

export const TIME_SLOTS = [
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
];

export const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function getRestaurant(id: string) {
  return RESTAURANTS.find((r) => r.id === id);
}
