import { DiningZone, Restaurant, TableDef } from "./types";

export const CATEGORIES = [
  {
    id: "italian",
    name: "Italian",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: "mexican",
    name: "Mexican",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: "chinese",
    name: "Chinese",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: "french",
    name: "French",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: "japanese",
    name: "Japanese",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: "indian",
    name: "Indian",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: "korean",
    name: "Korean",
    image:
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: "seafood",
    name: "Seafood",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: "mediterranean",
    name: "Mediterranean",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: "brunch",
    name: "Brunch",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=85",
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
  {
    id: "kumo-ramen",
    name: "Kumo Ramen House",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=600&q=80",
    ],
    michelinStars: 0,
    rating: 4.8,
    reviews: 412,
    tags: ["Japanese", "Ramen"],
    cuisine: "Japanese",
    priceFrom: 28,
    hours: "11:30 AM - 10:30 PM",
    isOpen: true,
    address: "89 Mott St, New York, NY 10013, United States",
    quote: "Steaming bowls, warm wood, and late-night Tokyo energy",
    description: "Japanese • Starts from $28 and up • Casual Dining",
    tables: tablesFor(3),
  },
  {
    id: "saffron-table",
    name: "Saffron Table",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
    ],
    michelinStars: 1,
    rating: 4.7,
    reviews: 186,
    tags: ["Indian", "Spicy"],
    cuisine: "Indian",
    priceFrom: 42,
    hours: "12:00 PM - 10:00 PM",
    isOpen: true,
    address: "230 Park Ave S, New York, NY 10003, United States",
    quote: "A colorful table of fragrant spices and modern Indian plates",
    description: "Indian • Starts from $42 and up • Modern Dining",
    tables: tablesFor(4),
  },
  {
    id: "seoul-garden",
    name: "Seoul Garden",
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=600&q=80",
    ],
    michelinStars: 0,
    rating: 4.5,
    reviews: 239,
    tags: ["Korean", "BBQ"],
    cuisine: "Korean",
    priceFrom: 48,
    hours: "5:00 PM - 11:00 PM",
    isOpen: false,
    address: "38 W 26th St, New York, NY 10010, United States",
    quote: "Smoky tabletop grilling with a lively Seoul-inspired soundtrack",
    description: "Korean • Starts from $48 and up • Social Dining",
    tables: tablesFor(5),
  },
  {
    id: "harbor-and-salt",
    name: "Harbor & Salt",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1534080564583-35c9d92a54c8?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80",
    ],
    michelinStars: 2,
    rating: 4.9,
    reviews: 301,
    tags: ["Seafood", "Waterfront"],
    cuisine: "Seafood",
    priceFrom: 68,
    hours: "12:00 PM - 10:00 PM",
    isOpen: true,
    address: "Pier 17, New York, NY 10038, United States",
    quote: "Fresh catches, sunset light, and a front-row seat to the harbor",
    description: "Seafood • Starts from $68 and up • Waterfront Dining",
    tables: tablesFor(6),
  },
  {
    id: "olive-and-thyme",
    name: "Olive & Thyme",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    ],
    michelinStars: 0,
    rating: 4.7,
    reviews: 154,
    tags: ["Mediterranean", "Healthy"],
    cuisine: "Mediterranean",
    priceFrom: 38,
    hours: "11:00 AM - 9:30 PM",
    isOpen: true,
    address: "74 Greenwich Ave, New York, NY 10011, United States",
    quote: "Sun-washed Mediterranean plates made for long, easy lunches",
    description: "Mediterranean • Starts from $38 and up • Garden Dining",
    tables: tablesFor(7),
  },
  {
    id: "daybreak-social",
    name: "Daybreak Social",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=600&q=80",
    ],
    michelinStars: 0,
    rating: 4.6,
    reviews: 287,
    tags: ["Brunch", "Coffee"],
    cuisine: "Brunch",
    priceFrom: 24,
    hours: "8:00 AM - 3:00 PM",
    isOpen: true,
    address: "180 Franklin St, Brooklyn, NY 11222, United States",
    quote: "Bright mornings, stacked pancakes, and the best seat by the window",
    description: "Brunch • Starts from $24 and up • All-day Cafe",
    tables: tablesFor(8),
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
